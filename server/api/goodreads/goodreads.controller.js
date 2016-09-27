'use strict';

import _ from 'lodash';
import parser from 'xml2json';
import request from 'request-promise';

function handleError(res, statusCode) {
  statusCode = statusCode || 500;

  return function (err) {
    res.status(statusCode).send(err);
  };
}

export function show(req, res) {
  request({
    uri: `${GOODREADS_API_URL}/search/index.xml`,
    qs: {
      q: req.params.q,
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
