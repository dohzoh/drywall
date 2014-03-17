/**
 * AccountController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
(function () {
    "use strict";

    var self = {
        layout: "layoutGuest"

        /**
         * `AccountController.index`
         */
        , index: function (req, res) {
            return res.view({
                layout: self.layout
            });
        }

        /**
         * `AccountController.settings`
         */
        , settings: function (req, res) {
            return res.view({
                layout: self.layout
            });
        }
        /**
         * `AccountController.verification`
         */

        , verification: function (req, res) {
            return res.view({
                layout: self.layout
            });
        }
    };

    module.exports = self;

})();
