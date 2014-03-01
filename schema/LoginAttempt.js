'use strict';

module.exports = function(app, database) {
    var tableName = 'LoginAttempt';
    var Model = database.define(tableName, function (schema) {
        schema.UUID('id', {hashKey: true});
        schema.StringSet('content');
        schema.Date('created', {default: Date.now});
    });
    app.models[tableName] = Model;
    app.defines[Model] = {readCapacity: 1, writeCapacity: 1};
/*
  var attemptSchema = new mongoose.Schema({
    ip: { type: String, default: '' },
    user: { type: String, default: '' },
    time: { type: Date, default: Date.now, expires: app.config.loginAttempts.logExpiration }
  });
  attemptSchema.index({ ip: 1 });
  attemptSchema.index({ user: 1 });
  attemptSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('LoginAttempt', attemptSchema);
*/
};
