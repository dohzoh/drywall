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
            self._deleteSession();
            // Send a JSON response
            res.redirect('/', 302);
        }
        
        , withdraw: function(req, res){
            self._deleteSession();
            
            container.partials.body = "withdraw/success";
            return res.view(self.layout, container);
        }
        
        , _deleteSession: function(){
            delete req.session.authenticated;
            delete req.session.user_id;
            delete req.session.userInfo;
        }
    };

    module.exports = self;

})();
