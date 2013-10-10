'use strict';
angular.module('d3App')
    .controller('MainCtrl', function ($scope) {

      // setup junk. data
      var palette = new Rickshaw.Color.Palette({ scheme: 'classic9' });
      var colors = [];
      var seriesData = [];
      var series = ['Moscow', 'Shanghai', 'Amsterdam', 'Paris', 'Tokyo', 'London', 'New York'];

      for (var s = 0; s < series.length; s++) {
        colors.push(palette.color());
        seriesData.push([]);
      }

      // random continual data
      var random = new Rickshaw.Fixtures.RandomData(150);
      for (var i = 0; i < 150; i++) {
        random.addData(seriesData);
      }

      // add data
      var updateSeries = function (data) {
        data = [] || data;
        for (i = 0; i < series.length; i++) {
          data.push({
            color: colors[i],
            data: seriesData[i],
            name: series[i]
          });
        }
        return data;
      };

      $scope.doSomething = function () {
        console.log(arguments);
        console.log(this);
      };

      var intervalId = 0;

      var addData = function () {
        console.log('adding data');

        random.removeData(seriesData);
        random.addData(seriesData);

        // THIS does not execute in angular
        $scope.data = updateSeries();

        if ($scope.apply) {
          $scope.$apply();
          console.log('apply called');
        }
      };

      // note this will rebind when config.speed changes (rebind the interval)
      $scope.$watch('speed', function (value) {
        if (intervalId) clearInterval(intervalId);

        $scope.speed = value || 3000;
        intervalId = setInterval(addData, $scope.speed);
      });


      $scope.data = updateSeries();
      $scope.apply = true;
      $scope.speed = 3000;

    });
