/**
 * Created by dozo on 14/03/05.
 */

//console.log("load config");
var options = require("./session.js").session;

//console.log("show session options", options);

// config/express.js
module.exports.express = {
    middleware: {
        custom: true
    }

    , customMiddleware: function(app){

        var connect = require('connect'),
        DynamoDBStore = require('connect-dynamodb')(connect);
        app
            .use(connect.cookieParser())
            .use(connect.session({ store: new DynamoDBStore(options), secret: options.secret}));


    }
};
