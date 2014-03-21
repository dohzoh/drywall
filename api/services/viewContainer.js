(function(){
    "use strict";
    
    /**
     * view container
     *  set default view parameters
     * @param object req  request object 
     * @returns {_L1.self}
     */
    var self = {
        factory: function(req){
            return new self.container(req);
        }
        
        , container: function(req){
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
        }
    }        
    
    module.exports = self;
    
})();