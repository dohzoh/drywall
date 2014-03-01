'use strict';

module.exports = function(app, database) {
    var tableName = 'Status';
    var Model = database.define(tableName, function (schema) {
        schema.UUID('_id', {hashKey: true});
        schema.StringSet('content');
        schema.Date('created', {default: Date.now});
    });
    app.db.models[tableName] = Model;
    app.defines[Model] = {readCapacity: 1, writeCapacity: 1};

/*  var statusSchema = new mongoose.Schema({
    _id: { type: String },
    pivot: { type: String, default: '' },
    name: { type: String, default: '' }
  });
  statusSchema.plugin(require('./plugins/pagedFind'));
  statusSchema.index({ pivot: 1 });
  statusSchema.index({ name: 1 });
  statusSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Status', statusSchema);
*/
};
