'use strict';
angular.module('d3App')
  .controller('MainCtrl', function ($scope) {
    var palette = new Rickshaw.Color.Palette({ scheme: 'classic9' });
    var seriesData = [[], [], [], [], [], [], [], [], []];
    var random = new Rickshaw.Fixtures.RandomData(150);
    for (var i = 0; i < 150; i++) {
      random.addData(seriesData);
    }
    var series = ['Moscow', 'Shanghai', 'Amsterdam', 'Paris', 'Tokyo', 'London', 'New York'];
    var data = [];
    for (i = 0; i < series.length; i++) {
      data.push({
        color: palette.color(),
        data: seriesData[i],
        name: series[i]
      });
    }
    $scope.data = data;

  });
