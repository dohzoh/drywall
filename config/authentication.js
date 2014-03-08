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

/*console.log("load authom");
var authom = require("authom");


var EventEmitter = require("events").EventEmitter

var solution = function(options) {
    var server = new EventEmitter

    server.on("request", function(req, res) {
        // respond to the request, redirecting the user as needed

        if (successful) {
            // pass an object containing the service's user data
            server.emit("auth", req, res, obj)
        }

        else {
            // pass an object containing an error message
            server.emit("error", req, res, obj)
        }
    })

    return server
}

authom.registerService("customAuth", solution);

authom.createServer({
    service: "customAuth"
    , username: "username"
    , password: "password"
});

authom.on("auth", function(req, res, data) {
    console.log("auth success");
    // called when a user is authenticated on any service
});

authom.on("error", function(req, res, data) {
    console.log("auth fail");
    // called when an error occurs during authentication
});
*/
//app.get("/auth/:service", authom.app);
//var list = Array();
//for(var key in GLOBAL.global){
//    list.push(key);
//}
//console.log("global.Hook.hooks", list);
/*
module.exports = {
    express: {
        customMiddleware: function(app){
            console.log('Express midleware for passport');
//            app.use(passport.initialize());
//            app.use(passport.session());
        }
    }
};

*/
