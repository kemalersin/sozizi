'use strict';
/*eslint no-invalid-this:0*/
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

var QuoteSchema = new Schema({
  id: Number,
  userId: Number,
  body: String,
  date: Date,
  book: {
    id: Number,
    title: String,
    author: {
      id: Number,
      name: String
    },
    image_url: String,
    small_image_url: String
  }
});

QuoteSchema.path('id')
  .validate(function(value, respond) {
    return this.constructor.findOne({ id: value }).exec()
      .then(quote => {
        if (quote) {
          if (this.user_id === quote.user_id) {
            return respond(false);
          }

          return respond(true);
        }

        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'Quote exists.');

export default mongoose.model('Quote', QuoteSchema);
