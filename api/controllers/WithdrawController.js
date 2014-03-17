/**
 * WithdrawController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
(function () {
    "use strict";

    var self = {
        layout: "layoutGuest"

        /**
         * `WithdrawController.index`
         */
        , index: function (req, res) {
            return res.view({
                layout: self.layout
            });
        }
    };

    module.exports = self;

})();
