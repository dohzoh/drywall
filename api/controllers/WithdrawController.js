/**
 * WithdrawController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
(function () {
    "use strict";

    var self = {
        layout: "layoutMember"

        /**
         * `WithdrawController.index`
         */
        , index: function (req, res) {
            if (req.method !== 'POST') {
                return res.view({
                    layout: self.layout
                });
            }

            else {
                // Send a Default View
                return res.view("withdraw/success", {
                    layout: self.layout
                });
            }
        }
    };

    module.exports = self;

})();
