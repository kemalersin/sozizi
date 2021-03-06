'use strict';
/*eslint no-process-env:0*/

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/sozizi-test'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  }
};
