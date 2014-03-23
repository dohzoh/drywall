(function(){
   "use strict" ;

    var self = {
        pickupErrors: function(container, error){
             for(var key in error){
                 if(require("lodash").isArray(error[key]))
                    container.errors[key] = error[key];
             }
            sails.log(error);
        }
    };
   
   module.exports = self;
})();