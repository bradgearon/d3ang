'use strict';

angular.module('d3App.directives', ['ng'])
  .directive('graph', function () {
      return {
          // scope -- not a new one.  but appending these attributes (@)
          scope: {
              data: '@graphData',
              domain: '@graphDomain',
              type: '@graphType'
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

              var graph;

              // watch the data... 
              scope.$watch('data', function (changed) {
                  
                  if (changed) {
                      var value = scope.$eval(changed);
                      if (!graph) {
                          // graphsvc.create or something...

                          graph = new Rickshaw.Graph({
                              element: element.get(0),
                              width: element.width(),
                              height: element.height(),
                              renderer: 'area',
                              stroke: true,
                              preserve: true,
                              series: value
                          });

                          var xmax = 60,
                              xmin = 0,
                              ymax = 40,
                              ymin = 0,
                              onRedraw = onRedraw,
                              onPointSelect = onPointSelect;

                          var ticksTreatment = 'glow';

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

                          graph.render();
                          xAxis.render();
                          yAxis.render();
                      }

                      // just replacing data with current
                      for (var i = 0; i < value.length; i++) {
                          if (graph.series[i]) {
                              graph.series[i] = value[i];
                          }
                      }
                      // render
                      graph.update();
                  }
              });
              
              // this isnt used
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
              // this isnt used
              scope.$watch(attrs.graphDomain, function (value) {
                  if (value) {
                      graph.panMode = scope.panMode;
                      graph.x.domain(value);
                  }
              });
          }
      }
  });


angular.module('d3App', ['d3App.directives'])
  .config(function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider
          .when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
          .otherwise({ redirectTo: '/' });
  });
