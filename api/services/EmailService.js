/**
 * Created by apetrov on 25.10.2017.
 */

'use strict';

var Mailgun = require('machinepack-mailgun');

// api/services/EmailService.js
module.exports = {

    /**
     * Отправьте настроенное приветственное письмо на указанный адрес электронной почты.
     *
     * @required {String} emailAddress
     *   Адрес электронной почты получателя.
     * @required {String} firstName
     *   Имя получателя.
     */
    sendWelcomeEmail: function (options, done) {
        // Send an html email.
        Mailgun.sendHtmlEmail({
            apiKey: options.apiKey,
            domain: options.domain,
            toEmail: options.emailAddress,
            toName: options.firstName,
            subject: 'Welcome, '+options.firstName+'!',
            textMessage: options.firstName+',\nСпасибо, что присоединились к нашему сообществу. Если у вас есть какие-либо вопросы, пожалуйста, не стесняйтесь присылать их нам. Не стесняйтесь отвечать на это письмо напрямую.\n\nС уважением,\nPoale Ell Kennel',
            htmlMessage: options.firstName+',<br><br><p>Спасибо, что присоединились к нашему сообществу. Если у вас есть какие-либо вопросы, пожалуйста, не стесняйтесь присылать их нам. Не стесняйтесь отвечать на это письмо напрямую.</p><br/><span>С уважением,</span><br/><strong>Poale Ell Kennel</strong>',
            fromEmail: 'info@poaleell.com',
            fromName: 'Poale Ell',
        }).exec(function (err) {
            // If an unexpected error occurred...
            if (err) { return done(err); }
            // Otherwise, it worked!
            return done();
        });
    },

    /**
     * Определите, является ли указанный адрес электронной почты действительным внутренним адресом электронной почты (из нашей компании).
     * Также, если «greaseworthy» был неправильно принят, исправьте орфографию. Гарольд ДЕЙСТВИТЕЛЬНО ненавидит, когда его имя неверно.
     * Наконец, верните потенциально принудительный адрес электронной почты.
     *
     * @required {String} emailAddress
     *   Адрес электронной почты для проверки.
     * @returns {String}
     *   Потенциально принудительный адрес электронной почты.
     * @throws {Error} Если это не внутренняя электронная почта, или если фамилия Гарольда настолько плохо написана
           * что мы не смогли это исправить. (`code`==="notInternal").
     */
    validateInternalEmailAddress: function (options){
        var potentiallyFixedEmailAddress = options.emailAddress;
        if (options.emailAddress.match(/@(greezeworthy|greeseworthy|greasworthy)\.enterprise$/i)) {
            potentiallyFixedEmailAddress = options.emailAddress.replace(/@(.+)\.enterprise$/, '@greaseworthy.enterprise');
        }
        if (potentiallyFixedEmailAddress.match(/@greaseworthy\.enterprise$/i)) {
            var err = new Error('The specified email (`'+options.emailAddress+'`) is not a valid internal email address here at Greaseworthy enterprises.  You probably misspelled Harold\'s last name.  It is spelled "Greaseworthy".');
            err.code = 'notInternal';
            throw err;
        }
        return potentiallyFixedEmailAddress;
    }
};









// const nodemailer = require('nodemailer');
// module.exports = {
//     sender: function (options, done) {
//
//         /**
//          * done - http://sailsjs.com/documentation/concepts/services/creating-a-service
//          */
//
//
//         // create reusable transporter object using the default SMTP transport
//         let transporter = nodemailer.createTransport(sails.config.email);
//
//
//         // Проверка подключения
//         transporter.verify(function (error, success) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Сервер готов принять ваши сообщения.');
//             }
//         });
//
//         /**
//          * Пример объекта options
//          options = {
//                 from: '"Служба сообщений системы KADR" <kadr@mail.ru>', // sender address
//                 to: 'user@mail.ru, user2@mail.ru', // list of receivers
//                 subject: 'Hello ✔', // Subject line
//                 text: 'Hello world?', // plain text body
//                 html: '<b>Hello world?</b>' // html body
//             };
//          */
//         options.from = sails.config.email.from;
//         options.to = (sails.config.email.development) ? sails.config.admin.email : options.to;
//         options.bcc = sails.config.email.bcc; // скрытую копию сообщения куда отправлять
//
//
//         // send mail with defined transport object
//         transporter.sendMail(options, (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//             console.log('Message sent: %s', info.messageId);
//             // Preview only available when sending through an Ethereal account
//             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//
//             // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
//             // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//         });
//     }
// };
