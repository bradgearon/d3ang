'use strict';
angular.module('d3App.services', [])
    .factory('graphSvc', [ function () {
      var graph = function () {};

      graph.prototype.init = function (opts) {
        if (opts && opts.element) {
          this.graphImpl = new Rickshaw.Graph({
            element: opts.element,
            width: opts.width,
            height: opts.height,
            renderer: 'area',
            stroke: true,
            preserve: true,
            series: opts.data
          });

          var ticksTreatment = 'glow';

          var xAxis = new Rickshaw.Graph.Axis.Time({
            graph: this.graphImpl,
            ticksTreatment: ticksTreatment,
            timeFixture: new Rickshaw.Fixtures.Time.Local()
          });

          var yAxis = new Rickshaw.Graph.Axis.Y({
            graph: this.graphImpl,
            tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
            ticksTreatment: ticksTreatment
          });

          this.graphImpl.render();
          xAxis.render();
          yAxis.render();
        }
        return this;
      };

      graph.prototype.update = function () {
        this.graphImpl.update();
      };

      graph.prototype.setSeries = function (data) {
        if (data) {
          // just replacing data with current
          for (var i = 0; i < data.length; i++) {
            if (this.graphImpl.series[i]) {
              this.graphImpl.series[i] = data[i];
            }
          }
        }
      };

      graph.prototype.$get = function () {
        return new graph();
      };

      return graph;
    }]);


angular.module('d3App.directives', ['ng', 'd3App.services'])
    .directive('graph', ['graphSvc', function (graphSvc) {
      return {
        scope: {
          data: '=graphData',
          domain: '=graphDomain',
          type: '=graphType'
        },
        link: function (scope, element, attrs) {
          

          var pointType = '';
          var syncObj = '?';

          // this isnt used
          var onRedraw = function (graph) {
            scope.domain = graph.x.domain();
            scope.panMode = graph.panMode;
            scope.$apply();
          };

          // this isnt used
          var onPointSelect = function (graph, point) {
            scope.selectedPoint = {
              load: point.y
            };
            scope.$apply();
          };
          
          // watch the data...
          scope.$watch('data', function (changed) {
            if (!changed) return;

            if (!scope.graph) {
              scope.graph = new graphSvc().init({
                element: element.get(0),
                width: element.width(),
                height: element.height(),
                data: changed
                });
            }

            scope.graph.setSeries(changed);
            scope.graph.update();

          });

          // this isnt used
          scope.$watch('type', function (value) {
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
          // this isnt used
          scope.$watch('domain', function (value) {
            if (value) {
              graph.panMode = scope.panMode;
              graph.x.domain(value);
            }
          });


        }
      }
    }]);
	
angular.module('d3App', ['d3App.directives'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider
          .when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
          .otherwise({ redirectTo: '/' });
    }]);
