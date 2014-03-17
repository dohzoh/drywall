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
            if (req.method !== 'POST') {
                return res.view({
                    layout: self.layout
                });
            }

            else {
                // Send a Default View
                return res.view("signup/confirm", {
                    layout: self.layout
                });
            }
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
            return res.view("signup/success", {
                layout: self.layout
            });
            return res.view("signup/failed", {
                layout: self.layout
            });
        }

    };

    module.exports = self;

})();
