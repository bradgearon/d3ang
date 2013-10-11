'use strict';
angular.module('d3App.controllers', [])
    .controller('MainCtrl', ['$scope', 'randomSvc', function ($scope, $random) {
        $scope.doSomething = function () {
            console.log(arguments);
            console.log(this);
        };

        var opts = {
            palette: new Rickshaw.Color.Palette({ scheme: 'classic9' })
        };

        var random = new $random().init(opts);
        var random2 = new $random().init(opts);
        var intervalId = 0;

        // note this will rebind when config.speed changes (rebind the interval)
        $scope.$watch('speed', function (value) {

            $scope.speed = value || 30000;
            if (intervalId) clearInterval(intervalId);

            intervalId = setInterval(function () {
                console.log('adding data');

                // THIS is not in angular scope
                $scope.data = random.updateData(true);
                $scope.data2 = random2.updateData(false);

                if ($scope.apply) {
                    $scope.$apply();
                    console.log('apply called');
                }
            }, value);
        });

        $scope.data = random.updateData(true);
        $scope.data2 = random2.updateData(true);

        $scope.apply = true;
        $scope.speed = 1000;

    }]);

