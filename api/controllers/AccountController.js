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
            
            return res.view(self.layout,container);
        }

        /**
         * `AccountController.password`
         */
        , password: function (req, res) {
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            return res.view(self.layout,container);
        }
        /**
         * `AccountController.email`
         */
        , email: function (req, res) {
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            return res.view(self.layout,container);
        }
        /**
         * `AccountController.settings`
         */
        , settings: function (req, res) {
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            User.findOne({user_id: req.session.user_id}, function(error, userInfo){
                if(error) req.send("500", 500);
                else {
                    container.userInfo = userInfo;

                    return res.view(self.layout,container);
                }
            });
        }
        /**
         * `AccountController.verification`
         */

        , verification: function (req, res) {
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            return res.view(self.layout,container);
        }
    };

    module.exports = self;

})();
