'use strict';

/**
 *  Note Model
 * @param app   exress object
 * @param database  database model
 * @see https://github.com/ryanfitz/vogels#define-a-model
 */
module.exports = function(app, database) {
    var tableName = 'Note';
    var Model = database.define(tableName, function (schema) {
        schema.UUID('_id', {hashKey: true});
        schema.StringSet('content');
        schema.Date('created', {default: Date.now});
    });
    app.db.models[tableName] = Model;
    app.defines[Model] = {readCapacity: 1, writeCapacity: 1};
/*
    Model.createTable({readCapacity: 1, writeCapacity: 1}, function(err, results){
        if(! err || err.code === 'ResourceInUseException' )
            console.log('table ar   e now created and active');
        else
            console.error('Error creating tables', err);
    });
*/

/*
  var noteSchema = new mongoose.Schema({
    data: { type: String, default: '' },
    userCreated: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: '' },
      time: { type: Date, default: Date.now }
    }
  });
  app.db.model('Note', noteSchema);
*/
};
