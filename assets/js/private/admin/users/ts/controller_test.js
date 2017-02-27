describe("Controller Test", function () {

    // Arrange
    var mockScope = {};
    var controller;
    var alfavit=['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Э', 'Ю', 'Я'];
    // (angular.mock.module("exampleApp") используется для загрузки модуля "exampleApp"
    beforeEach(angular.mock.module("UserModule"));
    
    // angular.mock.inject предоставляет возможность использования DI в тестах
    beforeEach(angular.mock.inject(function ($controller, $rootScope) {    
        // создание нового scope
        mockScope = $rootScope.$new();

        // сервис $controller испольльзуется для инстанциирования объекта контроллера
        // метод принимает 2 аргумента имя контроллера и объект содержащий свойства, которые используются для разрешения зависимостей
        controller = $controller("ListController", {
            $scope: mockScope
        });
    }));

    // Act and Assess
    it("Создание свойства alfavit", function () {
        /**
         * Если контроллер работает правильно, то после его создания переменная alfavit
         * будет содержать такое же значение как переменная alfavit созданная в тесте
         */
        expect(mockScope.alfavit).toBe(alfavit);
    });
    // it("Инкримент свойства", function () {
    //     // после запуска функции incrementCounter значение счетчика должно быть равным 1
    //     mockScope.incrementCounter();
    //     expect(mockScope.alfavit).toBe(alfavit);
    // });
});
// Обычно этап Assert содержит множество функций
// которые используются для определения точного условия успешного прохождения теста:

// expect(x).toEqual(val)       проверяет содержится ли в х такое же значение как и в val (но не обязательно один и тот же объект)
// expect(x).toBe(obj)          проверяет что х и obj одинаковые объекты
// expect(x).toMatch(regexp)    проверяет что х подходит под определение регулярного выражения
// expect(x).toBeDefined()      проверяет что х определен
// expect(x).toBeUndefined()    проверяет что х не определен (undefined)
// expect(x).toBeNull()         проверяет что х равно null
// expect(x).toBeTruthy()       проверяет что х true
// expect(x).toBeFalsy()        проверяет что х false
// expect(x).toContain(y)       проверяет что х строка которая содержит у
// expect(x).toBeGreaterThan(y) проверяет что х больше у

// Для тестирования ситуаций ожиданием противоположного результата следует использовать приставку not:
// expect(x).not.toEqual(val)