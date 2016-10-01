'use strict';

import _ from 'lodash';
import parser from 'xml2json';
import request from 'request-promise';

import User from '../user/user.model';

function handleError(res, statusCode) {
  statusCode = statusCode || 500;

  return function (err) {
    res.status(statusCode).send(err);
  };
}

var handleEntityNotFound = (res, err) => {
  return entity => {
    if (!entity) {
      res.status(404).send(err);
      return null;
    }

    return entity;
  };
}

export function search(req, res) {
  request({
    uri: `${GOODREADS_API_URL}/search/index.xml`,
    qs: {
      q: req.query.q,
      page: req.query.page || 1,
      key: process.env.GOODREADS_ID
    },
    transform: body => {
      return parser.toJson(body, {object: true});
    }
  })
    .then(data => {
      var search = data.GoodreadsResponse.search;
      var books = _.transform(search.results.work, (result, value) => {
          var book = value.best_book;

          result.push({
            id: book.id.$t,
            title: book.title,
            author: {
              id: book.author.id.$t,
              name: book.author.name
            },
            image_url: book.image_url,
            small_image_url: book.small_image_url
          });
        }, []
      );

      res.json({
        start: search['results-start'],
        end: search['results-end'],
        total: search['total-results'],
        books
      });
    })
    .catch(handleError(res));
}

export function show(req, res) {
  User.findOne(
    {'quotes.id': req.params.id},
    'name goodreads.id quotes.$'
  )
    .then(handleEntityNotFound(res, 'Quote not found.'))
    .then(user => res.json(user))
    .catch(handleError(res));
}

export function add(req, res) {
  var book = req.body.book,
    body = req.body.body,
    date = new Date();

  request({
    method: 'POST',
    uri: `${GOODREADS_API_URL}/quotes?format=xml`,
    oauth: {
      consumer_key: process.env.GOODREADS_ID,
      consumer_secret: process.env.GOODREADS_SECRET,
      token: req.user.goodreads.accessToken,
      token_secret: req.user.goodreads.refreshToken
    },
    body: {
      author_name: book.author.name,
      author_id: book.author.id,
      book_id: book.id,
      body
    },
    json: true,
    transform: body => {
      return parser.toJson(body, {object: true});
    }
  })
    .then(data => {
      var id = data.quote.id.$t * 1;

      User.update(
        {'_id': req.user.id, 'quotes.id': {$ne: id}},
        {$addToSet: {'quotes': {id, body, book, date}}}
      ).exec();

      res.json({id});
    })
    .catch(handleError(res));
}
