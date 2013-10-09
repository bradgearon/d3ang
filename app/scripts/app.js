'use strict';

angular.module('d3App.directives', [])
  .directive('graph', function () {
    return function (scope, element, attrs) {
      var pointType = '';
      var syncObj = '?';

      var onRedraw = function (graph) {
        scope.domain = graph.x.domain();
        scope.panMode = graph.panMode;
        scope.$apply();
      };

      var onPointSelect = function (graph, point) {
        scope.selectedPoint = {
          load: point.y
        };
        scope.$apply();
      };

      element.empty();

      var graph;
      
      scope.$watch(attrs.graphData, function (value) {
        if (value) {
          graph = new Rickshaw.Graph({
            xmax: 60,
            xmin: 0,
            ymax: 40,
            ymin: 0,
            onRedraw: onRedraw,
            onPointSelect: onPointSelect,
            element: element,
            width: 900,
            height: 500,
            renderer: 'area',
            stroke: true,
            preserve: true,
            series: value
          });

          var ticksTreatment = 'glow';
          graph.render();

          var xAxis = new Rickshaw.Graph.Axis.Time({
            graph: graph,
            ticksTreatment: ticksTreatment,
            timeFixture: new Rickshaw.Fixtures.Time.Local()
          });

          
          var yAxis = new Rickshaw.Graph.Axis.Y({
            graph: graph,
            tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
            ticksTreatment: ticksTreatment
          });

          xAxis.render();
          yAxis.render();

          setInterval(function () {
            random.removeData(seriesData);
            random.addData(seriesData);
            graph.update();

          }, 3000);

        }
      });

      scope.$watch(attrs.graphType, function (value) {
        switch (value) {
          case 'load':
            break;
          case 'time':
            break;
          default:
            break;
        }
      });

      // watch attribute graph-domain on directive
      scope.$watch(attrs.graphDomain, function (value) {
        if (value) {
          graph.panMode = scope.panMode;
          graph.x.domain(value);
        }
      });
    }
  }
);


angular.module('d3App', ['d3App.directives'])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
		.when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
		.otherwise({ redirectTo: '/' });
  });
