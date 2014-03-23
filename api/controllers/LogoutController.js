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
            self._deleteSession(req);
            // Send a JSON response
            res.redirect('/', 302);
        }
        
        , withdraw: function(req, res){
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            
            self._deleteSession(req);
            
            container.partials.body = "withdraw/success";
            return res.view(self.layout, container);
        }
        
        , _deleteSession: function(req){
            delete req.session.authenticated;
            delete req.session.user_id;
            delete req.session.userInfo;
        }
    };

    module.exports = self;

})();
