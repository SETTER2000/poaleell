/**
 * SkdController
 *
 * @description :: Server-side logic for managing skds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


const XLSX = require('xlsx');
const XlsxPopulate = require('xlsx-populate');
const Ranges = require('named-ranges');
const DateRu = require('date-ru');
const http = require('http');
const fs = require('fs');
const Watcher = require('listener-dir');
const execFile = require('child_process').execFile;


module.exports = {
    getReportSkd: function (req, res) {
        function SKD(sourceReportSkd, targetReportSkd) {
            this.name = {};
            this.dateCreate = new Date(0, 0, 0);
            this.startPeriod = new Date(0, 0, 0);
            this.endPeriod = new Date(0, 0, 0);
            this.headerOneRow = {};
            this.headerTwoRow = {};
            this.data = [];
            this.sourceReportSkd = sourceReportSkd;
            this.targetReportSkd = targetReportSkd;
        }

        //
        // /**
        //  * Путь до папки с файлами .xlsx из SKD
        //  */
        // const sourceReportSkd = 'F:/!_NODE_PROJECTS/KADR/skd-report/';
        // const targetReportSkd = 'F:/host/home/kadr/www/assets/images/skd/xlsx/';
        //
        //
        // /**
        //  * Поток чтения файла
        //  */
        // // var myReadStream = fs.createReadStream(sourceReportSkd + fileName);
        //
        // /**
        //  * Поток записи файла
        //  */
        // // var myWriteStream = fs.createWriteStream(targetReportSkd + fileName);
        //
        //
        // /**
        //  *  После определения класса Watcher можно воспользоваться им,
        //  *  создав объект Watcher
        //  *  Первый аргумен папка для прослушивания
        //  *  Второй аргумент папка назначения файла. Куда он будет перемещён.
        //  * @type {Watcher}
        //  */
        // var watcher = new Watcher(sourceReportSkd, targetReportSkd);
        //
        //
        // /**
        //  * В только что созданном объекте Watcher можно использовать метод on,
        //  * унаследованный от класса генератора событий, чтобы создать
        //  * логику обработки каждого файла,
        //  */
        // watcher.on('process', function process(file) {
        //     var pt = this.watchDir;
        //     var watchFile = this.watchDir + '/' + file;
        //     var processedFile = this.processedDir + '/' + file;
        //
        //     execFile('file', ['-b', '--mime-type', watchFile], function (error, stdout, stderr) {
        //         if (stdout.trim() === 'application/vnd.ms-office' || stdout.trim() === 'application/zip') {
        //             if (file.slice(-3) == 'xls') {
        //                 var nameFile = file.slice(0, -3);
        //                 console.log(nameFile);
        //                 var workbook2 = XLSX.readFile(watchFile);
        //                 var first_sheet_name = workbook2.SheetNames[0];
        //
        //                 /* Get worksheet */
        //                 var worksheet = workbook2.Sheets[first_sheet_name];
        //                 var obj = XLSX.utils.sheet_to_json(worksheet, {header: ["A", "B", "C", "D", "E", "F"]});
        //                 console.log(obj[1]);
        //                 // let i = 5;
        //                 // async.each(obj[1], function (reportSkd, next) {
        //                         // i++;
        //                         // console.log(reportSkd);
        //
        //
        //                         // Skd.create().exec((err, skdReport)=> {
        //                         //     if (err) return res.negotiate(err);
        //                         //     sails.log(skdReport);
        //                         // });
        //
        //
        //                         // return next();
        //                     // },
        //                     // function (err) {
        //                     //     sails.log(err);
        //                     //     if (err) return res.negotiate('uhu' + err);
        //                     // });
        //                 res.ok();
        //                 // console.log(XLSX.utils.sheet_to_json(worksheet, {header:["A","E","I","O","U","6","9"]}));
        //                 // console.log(XLSX.utils.sheet_to_json(worksheet, {header:1}));
        //                 // console.log(XLSX.utils.sheet_to_json(worksheet, {header:"A"}));
        //
        //                 XLSX.writeFile(workbook2, pt + nameFile + 'xlsx');
        //                 fs.unlink(pt + nameFile + file.slice(-3), (err)=> {
        //                     "use strict";
        //                     if (err) throw err;
        //                 })
        //             }
        //             if (file.slice(-4) == 'xlsx') {
        //                 fs.rename(watchFile, processedFile, (err)=> {
        //                     if (err) console.error("Server Error" + err);
        //                     XlsxPopulate.fromFileAsync(processedFile).then(function (workbook) {
        //                             "use strict";
        //                             /**
        //                              * Матрица вся книга.
        //                              * @type {Range|undefined}
        //                              */
        //                             const matrix = workbook.sheet(0).usedRange();
        //                             // console.log(matrix);
        //                         },
        //                         function (reject) {
        //                             console.log('Error reject: ' + reject);
        //                         });
        //                 });
        //             }
        //         }
        //     });
        // });
        //
        //
        // /**
        //  * Теперь, после создания всего необходимого кода, инициировать мониторинг
        //  * папки можно с помощью такой команды:
        //  */
        // watcher.start();
    },
    getList: function (req, res) {
        User.find({}).exec(function getUser(err, users) {
            if (err) return res.negotiate(err);
            if (users) {
                async.each(users, function (userRow, next) {
                        console.log(userRow);
                        return next();
                    },
                    function (err) {
                        sails.log(err);
                        if (err) return res.negotiate('uhu' + err);
                    });
                res.ok();
            }
        });
    }
};

