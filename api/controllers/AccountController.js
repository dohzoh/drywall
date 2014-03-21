/**
 * AccountController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
(function () {
    "use strict";

    var self = {
        layout: "layoutMember"

        /**
         * `AccountController.index`
         */
        , index: function (req, res) {
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            
            container.username = "default username";
            container.email = "default email";
            container.createAt = "default createat";

            return res.view(self.layout,container);
        }

        /**
         * `AccountController.password`
         */
        , password: function (req, res) {
            return res.view("account/password", {
                layout: "../"+self.layout
            });
        }
        /**
         * `AccountController.email`
         */
        , email: function (req, res) {
            return res.view("account/email", {
                layout: "../"+self.layout
            });
        }
        /**
         * `AccountController.settings`
         */
        , settings: function (req, res) {
            return res.view("account/settings", {
                layout: "../"+self.layout
            });
        }
        /**
         * `AccountController.verification`
         */

        , verification: function (req, res) {
            return res.view("account/verification", {
                layout: "../" + self.layout
            });
        }
    };

    module.exports = self;

})();
