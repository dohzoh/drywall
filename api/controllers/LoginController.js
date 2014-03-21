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
            var container = viewContainer.factory(req);    // @see api/services/viewContainer.js
            if (req.method !== 'POST') {
                return res.view(self.layout,container);
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
            var container = viewContainer.factory(req);    // @see api/services/viewContainer.js

            if (req.method !== 'POST') {
                
                return res.view(self.layout,container);
            }

            else {
                container.partials.body = "login/forgot/confirm";
                return res.view(self.layout, container);
            }
        }

        /**
         * `LoginController.rest`
         */

        , reset: function (req, res) {
            var container = viewContainer.factory(req);    // @see api/services/viewContainer.js

            if (req.method !== 'POST') {
                return res.view(self.layout,container);
            }

            else {
                container.partials.body = "login/reset/success";
                return res.view(self.layout, container);
            }
        }
    };

    module.exports = self;

})();

