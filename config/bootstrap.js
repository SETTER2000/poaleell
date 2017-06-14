/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {
    const XlsxPopulate = require('xlsx-populate');
    const Ranges = require('named-ranges');
    const DateRu = require('date-ru');
    const XLSX = require('xlsx');
    const Watcher = require('listener-dir');
    const fs = require('fs');
    const mime = require('mime');

    Array.prototype.diff = function (a) {
        return this.filter(function (i) {
            return a.indexOf(i) < 0;
        });
    };


    /**
     * Путь до папки с файлами .xlsx из SKD
     */
    //const sourceReportSkd = 'F:/!_NODE_PROJECTS/KADR/skd-report/';
    //const targetReportSkd = 'F:/host/home/kadr/www/assets/images/skd/xlsx/';
    const sourceReportSkd = sails.config.skd.sourceReportSkd;
    const reportFileBad = sails.config.skd.sourceReportSkdErr;
    const reportFileOk = sails.config.skd.targetReportOk;
    const targetReportSkd = sails.config.skd.targetReportSkd;

    /**
     *  После определения класса Watcher можно воспользоваться им,
     *  создав объект Watcher
     *  Первый аргумен папка для прослушивания
     *  Второй аргумент папка назначения файла. Куда он будет перемещён.
     * @type {Watcher}
     */
    const watcher = new Watcher(sourceReportSkd, targetReportSkd);


    /**
     * В только что созданном объекте Watcher можно использовать метод on,
     * унаследованный от класса генератора событий, чтобы создать
     * логику обработки каждого файла,
     */
    watcher.on('process', function process(file) {
        var watchFile = this.watchDir + file;

        if (mime.lookup(watchFile) === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || mime.lookup(watchFile) === 'application/vnd.ms-excel') {

            /**
             * Этот if проверяет расширение файла и если оно равно xls,
             * то код внутри конвертирует этот файл в форма xlsx,
             * а следющий if уже отправляет xlsx папку назначения
             */

            if (file.slice(-3) == 'xls') {

                console.log('watchFile');
                console.log(watchFile);
                var nameFile = file.slice(0, -3);
                var workbook2 = XLSX.readFile(watchFile);
                //console.log(err, 'Не возможно прочитать входящий файл.');


                var first_sheet_name = workbook2.SheetNames[0];
                var worksheet = workbook2.Sheets[first_sheet_name];
                XLSX.utils.sheet_to_json(worksheet, {header: ["A", "B", "C", "D", "E", "F"]});
                XLSX.writeFile(workbook2, this.watchDir + nameFile + 'xlsx');
                fs.unlink(this.watchDir + nameFile + file.slice(-3), (err)=> {
                    "use strict";
                    if (err) return cb();
                })
            }

            if (file.slice(-4) == 'xlsx') {
                sails.log('Перемещаемый файл: ' + watchFile);
                watcher.mov(file);

            }
        }
    });

    /**
     * Инициировать мониторинг папки:
     */
    watcher.start();


    /**
     *  После определения класса Watcher можно воспользоваться им,
     *  создав объект Watcher
     *  Первый аргумен папка для прослушивания
     *  Второй аргумент папка назначения файла. Куда он будет перемещён.
     * @type {Watcher}
     */
    const watcher2 = new Watcher(sourceReportSkd, reportFileBad);


    /**
     * В только что созданном объекте Watcher можно использовать метод on,
     * унаследованный от класса генератора событий, чтобы создать
     * логику обработки каждого файла,
     */
    watcher2.on('process', function process(file) {
        const watchFile = this.watchDir + '/' + file;
        const processedFile = this.processedDir + '/' + file;
        const reportOk = sails.config.skd.targetReportOk + '/' + file;
        const pathToXlsxFile = watchFile;

        /**
         * Путь и название файла отчета по загрузке
         * @type {string}
         */
        const pathToReport = processedFile;

        const date = new Date();
        const tpl = '%d.%m.%y %H:%M:%S';
        const tpl2 = '%d.%m.%y_%H-%M-%S';
        const dateRu = new DateRu(date, tpl);
        const dateRu2 = new DateRu(date, tpl2);

        /**
         * Текущая дата
         */
        // dateRu.localFormat();


        /**
         * Именование статусов
         * @type {string}
         */
        const statusSec = 'Принят частично';
        const statusOk = 'Принят полностью';
        const statusErr = 'Не принят';


        /**
         * Формируем название файла отчёта NEW
         */
        const date2 = dateRu.localFormat();
        const fname = 'report-' + dateRu2 + '.xlsx';


        /**
         *  Массив-шаблон названия столбцов,
         *  с его помощью будет проверяться соответствие столбцов в загружаемом файле
         * @type {string[]}
         */
        const arrNameColumnsIdeal = [
            'Дата',
            'Отдел',
            'ФИО',
            'Таб. №',
            'События'
        ];


        // Загрузить существующую книгу xlsx
        XlsxPopulate.fromFileAsync(pathToXlsxFile)
            .then(
                function (workbook) {
                    "use strict";

                    /**
                     * Название листа.
                     * @type {Sheet|Sheet|undefined}
                     */
                    const nameList = workbook.sheet(0);


                    /**
                     * Матрица вся книга.
                     * @type {Range|undefined}
                     */
                    const matrix = workbook.sheet(0).usedRange();


                    /**
                     * Всего строк в книге
                     */
                    const allRows = matrix._numRows;


                    /**
                     * Проверяем наличие данных в книге
                     */
                    if (allRows < 2) {
                        console.log('Книга пустая, проверять нечего! ');
                        // return res.forbidden({
                        //     message: 'Книга пустая, проверять нечего! '
                        // });
                    }


                    /**
                     * Количество колонок в прайсе, которое должно быть по умолчанию
                     * @type {Number}
                     */
                    const countColumnsIdeal = arrNameColumnsIdeal.length;


                    /**
                     *  Массив для добавления имён столбцов из загружаемого файла
                     * @type {Array}
                     */
                    const arrNameColumns = [];

                    /**
                     *  Получить названия колонок в загружаемом файле
                     */
                    for (var i = 1; i <= countColumnsIdeal; i++) {
                        var nameColumn = workbook.sheet(0).row(7).cell(i).value();
                        if (typeof nameColumn == 'undefined' && arrNameColumns.length < countColumnsIdeal) {
                            console.log('Кол-во колонок не совпадает с шаблоном по умолчанию! ');
                            // return res.forbidden({
                            //     message: 'Кол-во колонок не совпадает с шаблоном по умолчанию! ' +
                            //     'Должно быть ' + countColumnsIdeal + ' колонок. '
                            // });
                        }
                        if (arrNameColumnsIdeal[i - 1] !== nameColumn) {
                            console.log('Не верное имя колонки ++++!');
                            // return res.forbidden({
                            //     message: 'Не верное имя колонки ' +
                            //     nameColumn + '! Колонка должна называться ' + arrNameColumnsIdeal[i - 1]
                            // });
                        }

                        arrNameColumns.push(workbook.sheet(0).row(7).cell(i).value());
                    }


                    /**
                     * Инициализация объектов диапазона
                     * @type {Ranges}
                     */
                    // Объект all будет содержать общую информацию по книге
                    const all = new Ranges(workbook, 'ALL', `A1:J${allRows}`);
                    const named = new Ranges(workbook, 'NAMED', 'A1:F1');
                    const info = new Ranges(workbook, 'INFO', 'C3:D5');
                    const header = new Ranges(workbook, 'HEADER', 'A7:E7');
                    const headerTwo = new Ranges(workbook, 'HEADERTWO', 'E8:F8');
                    const dateReport = new Ranges(workbook, 'DATEREPORT', `A9:A${allRows}`);
                    const department = new Ranges(workbook, 'DEPARTMENT', `B9:B${allRows}`, {
                        bold: true,
                        fontFamily: 'Arial',
                        numberFormat: 4,
                        fontSize: 8,
                        fontColor: 'ff0000',
                        horizontalAlignment: 'center',
                        verticalAlignment: 'center'
                    });
                    const fio = new Ranges(workbook, 'FIO', `C9:C${allRows}`);
                    const tab = new Ranges(workbook, 'TAB', `D9:D${allRows}`);
                    const coming = new Ranges(workbook, 'COMING', `E9:E${allRows}`);
                    const exit = new Ranges(workbook, 'EXIT', `F9:F${allRows}`);


                    /**
                     * Инициализация имён диапазонов в загружаемой книге
                     */

                        // ALL
                    workbook.definedName(all.getName(), workbook.sheet(0).range(all.getRange()));

                    // NAMED
                    workbook.definedName(named.getName(), workbook.sheet(0).range(named.getRange()));

                    // INFO
                    workbook.definedName(info.getName(), workbook.sheet(0).range(info.getRange()));

                    // HEADER
                    workbook.definedName(header.getName(), workbook.sheet(0).range(header.getRange()));

                    // HEADERTWO
                    workbook.definedName(headerTwo.getName(), workbook.sheet(0).range(headerTwo.getRange()));

                    // DATEREPORT
                    workbook.definedName(dateReport.getName(), workbook.sheet(0).range(dateReport.getRange()));

                    // DEPARTMENT
                    workbook.definedName(department.getName(), workbook.sheet(0).range(department.getRange()));

                    // FIO
                    workbook.definedName(fio.getName(), workbook.sheet(0).range(fio.getRange()));

                    // TAB
                    workbook.definedName(tab.getName(), workbook.sheet(0).range(tab.getRange()));

                    // COMING
                    workbook.definedName(coming.getName(), workbook.sheet(0).range(coming.getRange()));

                    // EXIT
                    workbook.definedName(exit.getName(), workbook.sheet(0).range(exit.getRange()));


                    /**
                     * VALIDATION
                     */
                    dateReport.validationColumn(/^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])|undefined/gi);
                    fio.validationReplaceStringColumn(/([а-яё]+)\s(\(.*\))\s([а-яё]+)\s([а-яё]+)/gi, '$1 $3 $4');
                    fio.validationColumn(/^([а-яё]+)\s([а-яё]+)\s([а-яё]+)|undefined/gi);
                    coming.validationReplaceStringColumn(/(\([а-яё]+\))/gi, 0);
                    coming.validationReplaceStringColumn(/(\d\d:\d\d)\s\(\d+\)/gi, '$1');
                    exit.validationReplaceStringColumn(/(\([а-яё]+\))/gi, 0);
                    exit.validationReplaceStringColumn(/(\d\d:\d\d)\s\(\d+\)/gi, '$1');


                    /**
                     * Применить стили для диапазона
                     */
                    department.setStyle();


                    /**
                     * Собираем номера строк, которые имеют ошибки во входящем прайсе
                     * @type {Array.<T>}
                     */
                    all.arrRowsError = all.arrRowsError.concat(
                        all.arrRowsError,
                        header.arrRowsError,
                        headerTwo.arrRowsError,
                        named.arrRowsError,
                        info.arrRowsError,
                        dateReport.arrRowsError,
                        department.arrRowsError,
                        fio.arrRowsError,
                        tab.arrRowsError,
                        coming.arrRowsError,
                        exit.arrRowsError
                    );


                    /**
                     * Сверяет кол-во колонок с шаблоном по умолчанию
                     */
                    if (countColumnsIdeal != arrNameColumns.length) {
                        console.log('Кол-во колонок не совпадает с шаблоном по умолчанию!');
                        return cb();
                    }

                    /**
                     * В загружаемом файле, проверяем соответствие заголовков столбцов шаблону и
                     * возвращаем массив заголовков не соответствующих шаблону либо пустой массив
                     *
                     */
                    var rs = arrNameColumnsIdeal.diff(arrNameColumns);

                    if (rs.length == 1) {
                        const cll = workbook.sheet(0).row(7).find(rs[0]);
                        workbook.sheet(0).row(7).cell(cll[0]._columnNumber).style({bold: true, fontColor: 'f90b0b'});
                        workbook.toFileAsync(pathToReport);
                        console.log('Ошибка в названии столбца ');
                        return cb();
                    }

                    if (rs.length > 1) {
                        console.log('Есть ошибки в названии столбцов ' + rs + '!');
                        return cb();
                    }


                    // !!! НЕ УДАЛЯТЬ !!
                    console.log('');
                    console.log('***********************************');
                    console.log('*    Имя файла                    *');
                    console.log('***********************************');
                    console.log(file);
                    console.log('');
                    console.log('***********************************');
                    console.log('*    Всего ошибок                *');
                    console.log('***********************************');
                    console.log(all.arrRowsError.length);
                    console.log('');
                    console.log('***********************************');
                    console.log('*    Кол-во ошибок в колонках     *');
                    console.log('***********************************');
                    console.log('Header: ' + header.currentError + ' Строки: ' + header.arrRowsError);
                    console.log('HeaderTwo: ' + headerTwo.currentError + ' Строки: ' + headerTwo.arrRowsError);
                    console.log('NAMED: ' + named.currentError + ' Строки: ' + named.arrRowsError);
                    console.log('INFO: ' + info.currentError + ' Строки: ' + info.arrRowsError);
                    console.log('DateReport: ' + dateReport.currentError + ' Строки: ' + dateReport.arrRowsError);
                    console.log('Department: ' + department.currentError + ' Строки: ' + department.arrRowsError);
                    console.log('Fio: ' + fio.currentError + ' Строки: ' + fio.arrRowsError);
                    console.log('Tab: ' + tab.currentError + ' Строки: ' + tab.arrRowsError);
                    console.log('Coming: ' + coming.currentError + ' Строки: ' + coming.arrRowsError);
                    console.log('Exit: ' + exit.currentError + ' Строки: ' + exit.arrRowsError);
                    console.log('');
                    console.log('**********************************************');
                    console.log('* Процентное соотношение загружаемого прайса *');
                    console.log('**********************************************');
                    console.log('Валидный на: ' + all.getAllValidPercent() + '%');
                    console.log('Ошибок: ' + all.getAllErrorPercent() + '%');
                    console.log('');


                    if (all.uniqueArray().length == (allRows - 1)) {
                        console.log('Книга не валидная! Ни одна строка не записана.');
                        return cb();
                    }

                    if (all.arrRowsError.length) {
                        workbook.toFileAsync(pathToReport).then((response)=> {
                        }).catch((error) => {
                            console.log(error, 'Promise error 99933');
                        });
                    } else {
                        fs.readFile(pathToReport, function (err, data) {
                            if (err) {
                                workbook.toFileAsync(reportOk).then((response)=> {
                                }).catch((error) => {
                                    console.log(error, 'Promise error 9997788');
                                });
                                console.error('Файл для удаления из папки bad не найден: ' + err);
                            } else {

                                fs.unlink(pathToReport, (err)=> {
                                    if (err) console.log('Ошибка удаления файла! ' + pathToReport);
                                    workbook.toFileAsync(sails.config.skd.targetReportOk + '/' + file).then((response)=> {
                                    }).catch((error) => {
                                        console.log(error, 'Promise error 0007788');
                                    });
                                });
                            }
                        });
                    }
                }
            ).catch((error) => {
            console.log('Promise error 885588');
        });

    });


    /**
     * Теперь, после создания всего необходимого кода, инициировать мониторинг
     * папки можно с помощью такой команды:
     */
    watcher2.start();


    /**
     * Слушает папку Ok и при поступлении новых файлов, производит обработку и загрузку данных в БД
     */
    const watcher3 = new Watcher(reportFileOk, reportFileBad);

    watcher3.on('process', function process(file) {
        const watchFile = this.watchDir + '/' + file;
        const processedFile = this.processedDir + '/' + file;
        const pathToXlsxFile = watchFile;
        fs.open(pathToXlsxFile, 'a+', (err, fd) => {
            if (err) sails.log();
        });
        /**
         * Путь и название файла отчета по загрузке
         * @type {string}
         */
        const pathToReport = processedFile;

        const date = new Date();
        const tpl = '%d.%m.%y %H:%M:%S';
        const tpl2 = '%d.%m.%y_%H-%M-%S';
        const dateRu = new DateRu(date, tpl);
        const dateRu2 = new DateRu(date, tpl2);

        /**
         * Текущая дата
         */
        // dateRu.localFormat();


        /**
         * Именование статусов
         * @type {string}
         */
        const statusSec = 'Принят частично';
        const statusOk = 'Принят полностью';
        const statusErr = 'Не принят';


        /**
         * Формируем название файла отчёта NEW
         */
        const date2 = dateRu.localFormat();
        const fname = 'report-' + dateRu2 + '.xlsx';


        /**
         *  Массив-шаблон названия столбцов,
         *  с его помощью будет проверяться соответствие столбцов в загружаемом файле
         * @type {string[]}
         */
        const arrNameColumnsIdeal = [
            'Дата',
            'Отдел',
            'ФИО',
            'Таб. №',
            'События'
        ];


        // Загрузить существующую книгу xlsx
        XlsxPopulate.fromFileAsync(pathToXlsxFile)
            .then(
                function (workbook) {
                    "use strict";

                    /**
                     * Матрица вся книга.
                     * @type {Range|undefined}
                     */
                    const matrix = workbook.sheet(0).usedRange();


                    /**
                     * Всего строк в книге
                     */
                    const allRows = matrix._numRows;


                    let report = [];
                    let datePeriod = '';
                    let name = '';
                    let arrName = '';
                    for (let i = 9; i < allRows; i++) {
                        let row = {};

                        if (workbook.sheet(0).cell(`A${i}`).value()) {
                            datePeriod = workbook.sheet(0).cell(`A${i}`).value();
                        }
                        if (workbook.sheet(0).cell(`C${i}`).value()) {
                            name = workbook.sheet(0).cell(`C${i}`).value();
                            arrName = name.match(/([а-яё]+)/gi);
                        }
                        row.date = (workbook.sheet(0).cell(`A${i}`).value()) ? workbook.sheet(0).cell(`A${i}`).value() : datePeriod;
                        row.name = (workbook.sheet(0).cell(`C${i}`).value()) ? workbook.sheet(0).cell(`C${i}`).value() : name;
                        row.startPeriod = workbook.sheet(0).cell(`E${i}`).value();
                        row.endPeriod = workbook.sheet(0).cell(`F${i}`).value();

                        //if(row.name == "Андреев Денис Игоревич"){
                        sails.log(row.name);
                        //}

                        /**
                         * Проверяем есть ли фамилия
                         */
                        if (arrName[0]) {
                            //report.push(row);
                            User.findOne({
                                    lastName: arrName[0],
                                    firstName: arrName[1],
                                    patronymicName: arrName[2]
                                })
                                .exec(function (err, foundUser) {
                                    if (err) console.log('error 5555');
                                    if (!foundUser) return console.log('Пользователь не найден.');
                                    row.owner = foundUser.id;

                                    Skd.findOrCreate(row)
                                        .exec(function (err, createdTutorial) {
                                            if (err) return console.log('Ошибка. Строка отчёта не записалась.');
                                            sails.log('Создана запись: ' + createdTutorial);
                                        });
                                });
                        }
                    }
                }
            ).catch((error) => {
            console.log('Promise error 223322: ' + error);
        });
    });

    watcher3.start();


    return cb();

};



