angular.module('SliderModule')
    .controller('SliderController', function ($scope) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    let slides = $scope.slides = [];
    let currIndex = 0;

    $scope.addSlide = function() {
        let newWidth = 1140 + slides.length + 1;
        slides.push({
            image: '//unsplash.it/' + newWidth + '/400',
            text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 9],
            id: currIndex++
        });
    };

    $scope.randomize = function() {
        let indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    };

    for (let i = 0; i < 4; i++) {
        $scope.addSlide();
    }

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
        for (let i = 0, l = slides.length; i < l; i++) {
            slides[i].id = indexes.pop();
        }
    }

    function generateIndexesArray() {
        let indexes = [];
        for (let i = 0; i < currIndex; ++i) {
            indexes[i] = i;
        }
        return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
        let tmp, current, top = array.length;

        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }

        return array;
    }
});