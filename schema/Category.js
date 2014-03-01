'use strict';

module.exports = function(app, database) {
    var tableName = 'Category';
    var Model = database.define(tableName, function (schema) {
        schema.UUID('_id', {hashKey: true});
        schema.StringSet('content');
        schema.Date('created', {default: Date.now});
    });
    app.db.models[tableName] = Model;
    app.defines[Model] = {readCapacity: 1, writeCapacity: 1};
/*
  var categorySchema = new mongoose.Schema({
    _id: { type: String },
    pivot: { type: String, default: '' },
    name: { type: String, default: '' }
  });
  categorySchema.plugin(require('./plugins/pagedFind'));
  categorySchema.index({ pivot: 1 });
  categorySchema.index({ name: 1 });
  categorySchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Category', categorySchema);
*/
};
