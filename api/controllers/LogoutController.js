/**
 * LogoutController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
(function () {
    "use strict";

    var self = {
        layout: "layoutGuest"

        /**
         * `LogoutController.index`
         */
        , index: function (req, res) {
            delete req.session.authenticated;
            delete req.session.user_id;
            delete req.session.userInfo;
            // Send a JSON response
            res.redirect('/', 302);
        }
    };

    module.exports = self;

})();
