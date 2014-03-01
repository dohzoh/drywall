'use strict';

module.exports = function(app, database) {
    var tableName = 'AdminGroup';
    var Model = database.define(tableName, function (schema) {
        schema.UUID('id', {hashKey: true});
        schema.StringSet('content');
        schema.Date('created', {default: Date.now});
    });
    app.models[tableName] = Model;
    app.defines[Model] = {readCapacity: 1, writeCapacity: 1};
/*
  var adminGroupSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String, default: '' },
    permissions: [{ name: String, permit: Boolean }]
  });
  adminGroupSchema.plugin(require('./plugins/pagedFind'));
  adminGroupSchema.index({ name: 1 }, { unique: true });
  adminGroupSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('AdminGroup', adminGroupSchema);
*/
};
