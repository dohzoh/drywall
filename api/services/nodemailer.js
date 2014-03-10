/**
 * Created by yozo-matsui on 14/03/10.
 */
(function(){
    "use strict"
    var nodemailer = require('nodemailer');

    var self = {

        /**
         * Sends an email to a given recipient
         * @param  {object}   email           an object containing all of the necessary data to email
         * @param  {Function} cb[err, res]    the callback to call once email is sent, or if it fails
         */
        send: function(emailInfo, cb){
            sails.log.debug("load nodemailer::send");

            /** sets up the modemailer smtp transport */
            switch(sails.config.nodemailer.transport){
                case "smtp":
                    var transport = nodemailer.createTransport("SMTP", {
                        host: sails.config.nodemailer.smtp.host,
                        secureConnection: sails.config.nodemailer.smtp.usessl, // use SSL
                        port: sails.config.nodemailer.smtp.port, // port for secure SMTP
                        auth: {
                            user: sails.config.nodemailer.smtp.user,
                            pass: sails.config.nodemailer.smtp.pass
                        }
                    });
                    break;

                case "sendmail":
                    var transport = nodemailer.createTransport("sendmail", sails.config.nodemailer.sendmail);
                    break;

                case "pickup":
                default:
                    var transport = nodemailer.createTransport("PICKUP", sails.config.nodemailer.pickup);
                    break;
            }

            /** sets up the mail options, from and such like that **/
            /*
            var from    = email.from || 'nobody@nobody.com';
            if (sails.config.nodemailer.prepend_subject){
                var subject = sails.config.nodemailer.prepend_subject +  email.subject;
            }else{
                var subject = email.subject;
            }
*/
            var mailOptions = {
                from:       "from@outlook.com"
                , to:         emailInfo.name+"<"+emailInfo.email+">"
                , subject:       'New Account Acivation Required'
                , text: emailInfo.text // plaintext body
//                , html: "<b>Hello world </b>" // html body
            }

            sails.log.debug(mailOptions);

            /** Actually sends the email */
            transport.sendMail(mailOptions, function(err, response){
                if(err) return cb(err);
                return cb();
            });
        }

        , _makeBody: function(){

        }

    };

    module.exports = self;
})();
