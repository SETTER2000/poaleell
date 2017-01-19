module.exports.custom = {
    sendMail: {
        service: 'gmail',
        auth: {
            user: 'apptest387@gmail.com', pass: 'Code:-123000'
        },
        mail: {
            from: 'tester@gmail.com',
            to: ['lphp@mail.ru', 'apetrov@landata.ru'],
            subject: 'Регистрация',
            text: "Вы успешно зарегистрированы."
        }
    }
};