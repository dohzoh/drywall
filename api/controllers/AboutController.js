/**
 * AboutController.js 
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
            var container = viewContainer.factory(req);    // @see api/services/viewContainer.js

            return res.view(self.layout,container);
        }
    };

    module.exports = self;

})();


