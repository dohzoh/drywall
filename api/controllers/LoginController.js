/**
 * LoginController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
(function () {
    "use strict";

    var self = {
        layout: "layoutGuest"

        /**
         * `LoginController.index`
         */
        , index: function (req, res) {
            if (req.method !== 'POST') {
                return res.view({
                    layout: self.layout
                });
            }

            else {
                // Send a Default View
                res.redirect("/account", 302)
            }
        }
        /**
         * `LoginController.forgot`
         */

        , forgot: function (req, res) {

            if (req.method !== 'POST') {
                return res.view({
                    layout: "../" + self.layout
                });
            }

            else {
                // Send a Default View
                return res.view("login/forgot/confirm", {
                    layout: self.layout
                });
            }
        }

        /**
         * `LoginController.rest`
         */

        , reset: function (req, res) {
            if (req.method !== 'POST') {
                return res.view({
                    layout: "../" + self.layout
                    , id: ""
                });
            }

            else {
                // Send a Default View
                return res.view("login/reset/success", {
                    layout: self.layout
                });
            }
        }
    };

    module.exports = self;

})();

