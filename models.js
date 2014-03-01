'use strict';

module.exports = function(app, database) {
  //embeddable docs first
  require('./schema/Note')(app, database);
  require('./schema/Status')(app, database);
  require('./schema/StatusLog')(app, database);
  require('./schema/Category')(app, database);

  //then regular docs
  require('./schema/User')(app, database);
  require('./schema/Admin')(app, database);
  require('./schema/AdminGroup')(app, database);
  require('./schema/Account')(app, database);
  require('./schema/LoginAttempt')(app, database);

    database.createTables(app.defines, function (err) {
        if(err) {
            console.log('Error creating tables', err);
        } else {
            console.log('table are now created and active');
        }
    });


};
