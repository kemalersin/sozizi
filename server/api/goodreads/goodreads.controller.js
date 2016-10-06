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

export class books {
  static search(req, res) {
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
            items: books
          });
        })
        .catch(handleError(res));
    }
}

export class quotes {
  static show(req, res) {
    User.findOne(
      {'quotes.id': +req.params.id},
      'name goodreads.id quotes.$'
    )
      .then(handleEntityNotFound(res, 'Quote not found.'))
      .then(user => res.json(user))
      .catch(handleError(res));
  }

  static search(req, res) {
    const perPage = 20;

    var id = +req.params.id;

    var q = new RegExp(req.query.q, 'i');
    var page = req.query.page || 1;
    var offset = perPage * (page - 1);

    if (!id && req.user) {
      id = req.user.goodreads.id;
    }

    id ? User.aggregate(
      {$unwind: '$quotes'},
      {
        $match: {
          'goodreads.id': id,
          $or: [
            {'quotes.body': q},
            {'quotes.book.title': q},
            {'quotes.book.author.name': q}
          ]
        }
      },
      {$sort: {'quotes.date': -1}},
      {$project: {'quotes': 1}}
    )
      .then(handleEntityNotFound(res, 'Not found.'))
      .then(entity => {
        User.findOne(entity._id, 'name')
          .then(user => {
            let all = _.transform(entity, (result, value) => result.push({
              id: value.quotes.id,
              date: value.quotes.date,
              book: value.quotes.book,
              body: _.truncate(value.quotes.body, {length: 140})
            }), []);

            let name = user.name,
              total = all.length,
              items = all.slice(offset, offset + perPage);

            res.json({name, items, total});
          });
      })
      .catch(handleError(res)) :
      res.sendStatus(404);
  }

  static add(req, res) {
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
}
