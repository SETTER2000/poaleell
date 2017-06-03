/**
 * MailController
 *
 * @description :: Server-side logic for managing mails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
const nodemailer = require('nodemailer');
const fs = require('fs');
const SMTPServer = require('smtp-server').SMTPServer;
const MailParser = require('mailparser');



module.exports = {
    // send: function (req, res) {
    //
    //     //--------------------------------//
    //     //          ПРИЕМ ПИСЕМ           //
    //     //--------------------------------//
    //
    //     const server = new SMTPServer({
    //         name: sails.config.mail.host,
    //         port: sails.config.mail.port,
    //         secure: false,
    //         //key: fs.readFileSync('./key.pem'),
    //         //cert: fs.readFileSync('./cert.pem'),
    //         onRcptTo,
    //         onData,
    //         authOptional: true
    //     });
    //     server.listen(sails.config.mail.port);
    //     // Валидация получателя. Для каждого адреса функция вызывается отдельно.
    //     function onRcptTo({address}, session, callback) {
    //         if (address.starts('noreply@')) {
    //             callback(new Error(`Address ${address} is not allowed receiver`));
    //         }
    //         else {
    //             callback();
    //         }
    //     }
    //
    //     // Обработка данных письма
    //     function onData(stream, session, callback) {
    //         const parser = new MailParser();
    //         stream.pipe(parser);
    //         parser.on('error', callback);
    //         parser.on('end', (mail) => {
    //             sails.log(mail);
    //             // Process mail body...
    //             stream.pipe(process.stdout); // print message to console
    //             stream.on('end', callback);
    //             callback();
    //         });
    //     }
    //
    //
    //
    //
    //     //************************************//
    //     //******* ОТПРАВКА ПИСЕМ *************//
    //     //************************************//
    //
    //     // Создать многоразовый объект транспортера с использованием транспорта SMTP по умолчанию
    //     let transporter = nodemailer.createTransport({
    //         host: sails.config.mail.host,
    //         port: sails.config.mail.port
    //         //secure:true
    //         //auth: {
    //         //    user: sails.config.mail.user,
    //         //    pass: sails.config.mail.password
    //         //}
    //     });
    //
    //     // Проверить конфигурацию соединения
    //     transporter.verify(function (error, success) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log('Сервер готов принять наши сообщения.');
    //         }
    //     });
    //
    //     // Настроить данные электронной почты с помощью символов Unicode
    //     let mailOptions = {
    //         from: '"Fred Foo" <' + sails.config.admin.email + '>', // от кого
    //         to: sails.config.admin.email, // список получателей
    //         subject: 'Hello ✔', // тема
    //         text: 'Hello world ? Thanks, Серёга!', // текст письма
    //         html: '<b>Hello world ?</b>' // html body
    //     };
    //
    //     // Отправлять почту с определенным транспортным объектом
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             return console.log(error);
    //         }
    //         console.log('Message %s sent: %s', info.messageId, info.response);
    //     });
    // }
};

