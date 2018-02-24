/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the production        *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    // models: {
    //   connection: 'someMysqlServer'
    // },
    models: {
        connection: 'productionMongodbServer'
    },
    connections: {
        productionMongodbServer: {
            adapter: 'sails-mongo',
            url: process.env.MONGODB_URI
        }
    }
    /***************************************************************************
     * Set the port in the production environment to 80                        *
     ***************************************************************************/

    // port: 80,

    /***************************************************************************
     * Set the log level in production environment to "silent"                 *
     ***************************************************************************/

    // log: {
    //   level: "silent"
    // }

};
module.exports.skd = {
    targetReportOk: '/images/skd/ok',
    targetReportSkd: '/images/skd/xlsx',
    sourceReportSkd: 'D:/xl',
    sourceReportSkdErr: '/images/skd/bad'
};


module.exports.valueSystem = {
    colorDog: {
        'Бело-бронзовый': 'Бело-бронзовый',
        'Бело-голубой': 'Бело-голубой',
        'Бело-кремовый': 'Бело-кремовый',
        'Бело-черный': 'Бело-черный',
        'Бело-шоколадный': 'Бело-шоколадный',
        'Белый': 'Белый',
        'Бронзово-белый': 'Бронзово-белый',
        'Бронзовый': 'Бронзовый',
        'Голубо-белый': 'Голубо-белый',
        'Голубой': 'Голубой',
        'Кремово-белый': 'Кремово-белый',
        'Кремовый': 'Кремовый',
        'Муругий(соболинный)': 'Муругий(соболинный)',
        'Трёхцветный': 'Трёхцветный',
        'Чёрно-белый': 'Чёрно-белый',
        'Чёрно-подпалый': 'Чёрно-подпалый',
        'Чёрный': 'Чёрный',
        'Шоколадно-белый': 'Шоколадно-белый',
        'Шоколадно-подпалый': 'Шоколадно-подпалый',
        'Шоколадный': 'Шоколадный'
    },
};

module.exports.admin = {
    company: 'Poale Ell',
    email: 'admin@poaleell.com',
    fname: 'Александр',
    lname: 'Петров',
    pname: 'Вячеславович',
    shortName: function () {
        return this.lname + ' ' + this.fname.substr(0, 1) + '.' + this.pname.substr(0, 1) + '.';
    },
    longName: function () {
        return this.lname + ' ' + this.fname + ' ' + this.pname;
    }
};