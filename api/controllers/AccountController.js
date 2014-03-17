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
            return res.view({
                layout: self.layout
                , username: "username"
                , email: "email"
                , createAt: "create"
            });
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
