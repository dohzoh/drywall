'use strict';

module.exports = function(app, database) {
    var tableName = 'StatusLog';
    var Model = database.define(tableName, function (schema) {
        schema.UUID('id', {hashKey: true});
        schema.StringSet('content');
        schema.Date('created', {default: Date.now});
    });
    app.models[tableName] = Model;
    app.defines[Model] = {readCapacity: 1, writeCapacity: 1};
/*
  var statusLogSchema = new mongoose.Schema({
    id: { type: String, ref: 'Status' },
    name: { type: String, default: '' },
    userCreated: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: '' },
      time: { type: Date, default: Date.now }
    }
  });
  app.db.model('StatusLog', statusLogSchema);
*/
};
