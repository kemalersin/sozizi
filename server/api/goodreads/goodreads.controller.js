'use strict';

import _ from 'lodash';
import parser from 'xml2json';
import request from 'request-promise';

import config from '../../config/environment';

import User from '../user/user.model';
import Quote from './models/quote.model';

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

export class books {
  static search(req, res) {
      request({
        uri: `${config.GOODREADS_API_URL}/search/index.xml`,
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
          let search = data.GoodreadsResponse.search;
          let books = _.transform(search.results.work, (result, value) => {
              let book = value.best_book;

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
            items: books
          });
        })
        .catch(handleError(res));
    }
}

export class quotes {
  static show(req, res) {
    Quote.findOne({'id': +req.params.id}, {'_id': 0})
      .then(handleEntityNotFound(res, 'Quote not found.'))
      .then(quote => {
        User.findOne({'goodreads.id': quote.userId}, 'name')
          .then(user => {
            let userName = user ? user.name : 'Unknown';
            let data = _.assignIn(quote.toObject(), {userName});

            res.json(data);
          });
      })
      .catch(handleError(res));
  }

  static search(req, res) {
    let q = new RegExp(req.query.q, 'i');

    let page = req.query.page || 1;
    let perPage = config.SEARCH_RESULTS_PER_PAGE;
    let offset = perPage * (page - 1);

    let id = req.params.id ? +req.params.id : req.user.goodreads.id;

    let filter = {
      'userId': id,
      $or: [
        {'body': q},
        {'book.title': q},
        {'book.author.name': q}
      ]
    };

    if (!id) {
      return res.status(404).send('User not found.');
    }

    Quote.find(filter, {'_id': 0})
      .sort('-date')
      .skip(offset)
      .limit(perPage)
      .then(handleEntityNotFound(res, 'Archive is empty.'))
      .then(entity => {
        let items = _.transform(entity, (result, value) =>
          result.push(
            _.merge(value, {
              body: _.truncate(value.body, {length: 140})
            })
          ), []);

        Quote.count(filter).then(total => res.json({items, total}));
      })
      .catch(handleError(res));
  }

  static add(req, res) {
    let book = req.body.book,
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
        let id = +data.quote.id.$t;
        let userId = req.user.goodreads.id;

        let quote = new Quote({id, userId, body, book, date});

        quote.save();

        res.json({id});
      })
      .catch(handleError(res));
  }
}
