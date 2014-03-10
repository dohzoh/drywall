/**
 * Created by yozo-matsui on 14/03/10.
 */

module.exports.nodemailer = {
    transport: "pickup"   // e.g {"pickup", "sendmail", "smtp", "SES"} default: pickup

    // smtp setting
    , smtp: {
        usessl: true,
        port: 465,
        from: "foo@outlook.com",
        host: 'smtp.mailgun.org',
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS
    }
    // sendmail setting
    , "sendmail": {
        path: "/usr/usr/sbin/sendmail",
        args: ["-t", "-f", "foo@outlook.com"]
    }

    , "pickup":{
        directory: "./.tmp/"
    }

    , prepend_subject: false

}
