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

        /**
        * `AboutController.index`
        */
        , index: function (req, res) {
            return res.view({
                layout: self.layout
                , todo: 'Not implemented yet!'
            });
        }
    };

    module.exports = self;

})();


