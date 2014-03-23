/**
 * ContactController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
(function () {
    "use strict";

    var self = {
        layout: "layoutGuest"

        /**
        * `ContactController.index`
        */
        , index: function (req, res) {
            var container = viewContainer.factory(req, res);    // @see api/services/viewContainer.js
            
            if (req.method !== 'POST') {
                // Send a Default View
                return res.view(self.layout,container);
            }

            else {
                var params = req.params.all();
                container.username = params.username;
                container.email = params.email;
                container.message = params.message;
                
                Contact.create({
                    name: container.username
                    , email: container.email
                    , message: container.message
                }, function(error, userInfo){
                    if(error) res.send("500", 500)
                    else{
                        container.partials.body = "contact/success";

                        return res.view(self.layout,container);
                        
                    }
                })
            }
        }
    };

    module.exports = self;

})();

