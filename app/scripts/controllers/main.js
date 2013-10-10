'use strict';
angular.module('d3App')
    .controller('MainCtrl', ['$scope', 'randomSvc', function ($scope, $random) {

        $scope.doSomething = function () {
            console.log(arguments);
            console.log(this);
        };

        var intervalId = 0;

        // note this will rebind when config.speed changes (rebind the interval)
        $scope.$watch('speed', function (value) {

            $scope.speed = value || 30000;
            if (intervalId) clearInterval(intervalId);

            intervalId = setInterval(function () {
                console.log('adding data');

                // THIS is not in angular scope
                $scope.data = $random.updateData(true);

                if ($scope.apply) {
                    $scope.$apply();
                    console.log('apply called');
                }
            }, value);
        });

        var opts = {
          palette: new Rickshaw.Color.Palette({ scheme: 'classic9' })
        };

        $scope.data = new $random(opts);
    }]);

