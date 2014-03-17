/**
 * SignupController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */


(function () {
    "use strict";

    var self = {
        layout: "layoutGuest"

        /**
         * `SignupController.index`
         */
        , index: function (req, res) {
            return res.view({
                layout: self.layout
            });
        }
        /**
         * `SignupController.social`
         */

        , social: function (req, res) {
            return res.view({
                layout: self.layout
            });
        }
        /**
         * `SignupController.activate`
         */

        , activate: function (req, res) {
            return res.view({
                layout: self.layout
            });
        }

    };

    module.exports = self;

})();
