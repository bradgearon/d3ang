'use strict';
angular.module('d3App')
  .controller('MainCtrl', function ($scope) {

      // setup junk. data
      var palette = new Rickshaw.Color.Palette({ scheme: 'classic9' });
      var seriesData = [[], [], [], [], [], [], [], [], []];
      var series = ['Moscow', 'Shanghai', 'Amsterdam', 'Paris', 'Tokyo', 'London', 'New York'];

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
                  color: palette.color(),
                  data: seriesData[i],
                  name: series[i]
              });
          }
          return data;
      };

      var intervalId = 0;
      // note this will rebind when config.speed changes (rebind the interval)
      $scope.$watch('speed', function (value) {

          $scope.speed = value || 30000;
          if (intervalId) clearInterval(intervalId);
          
          intervalId = setInterval(function () {
              console.log('adding data');

              random.removeData(seriesData);
              random.addData(seriesData);
              // THIS is not in angular scope
              $scope.data = updateSeries();

              if ($scope.apply) {
                  $scope.$apply();
                  console.log('apply called');
              }
          }, value);
      });

      $scope.data = updateSeries();

  });
