/**
 * HomeController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

(function () {
    "use strict";

    var self = {
        layout: "layoutGuest"
        
        , viewContainer: {
// /media/sf_Shared/intellij/drywall/views/            
            partials: {body: "home/index"}
            , error: false
            , errors: {}
        }

        /**
        * `AboutController.index`
        */
        , index: function (req, res) {
            var container = require("lodash").cloneDeep(self.viewContainer) ;

            return res.view(self.layout,container);
        }
    };

    module.exports = self;

})();


