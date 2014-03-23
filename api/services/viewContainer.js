(function(){
    "use strict";
    
    /**
     * view container
     *  set default view parameters
     * @param object req  request object 
     * @returns {_L1.self}
     */
    var self = {
        factory: function(req, res){
            return new self.container(req, res);
        }
        
        , container: function(req, res){
        // set default property
            this.errors = {};
        
        // set default view
            var defaultView = "";
            defaultView += req.options.controller;
            defaultView += "/"+req.options.action;
            if(req.options.action!=="index") defaultView += "/index"
            
            this.partials = {
                body: defaultView
            };
            
        // set page title
            this.layoutTitle = req.options.controller;

        // set user info
            if(! require("lodash").isEmpty(req.session.userInfo)){
                this.userInfo = req.session.userInfo;
            }

        
            this._csrf = req.csrfToken();
             
        }
    }        
    
    module.exports = self;
    
})();