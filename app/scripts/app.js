'use strict';
angular.module('d3App.directives', ['ng', 'd3App.services'])
    .directive('graph', ['graphSvc', function (graphSvc) {
        return {
            // scope -- not a new one.  but appending these attributes (@)
            scope: {
                data: '@graphData',
                domain: '@graphDomain',
                type: '@graphType'
            },
            link: function (scope, element, attrs) {
                var graph;

                // watch the data...
                scope.$watch('data', function (changed) {
                    if (!changed) return;

                    var value = scope.$eval(changed);

                    if (!graph) {
                        graph = graphSvc.init({
                            element: element,
                            data: value
                        });
                    }

                    graph.setSeries(value);
                    graph.update();

                });
            }
        }
    }]);


angular.module('d3App', ['d3App.directives'])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
            .otherwise({ redirectTo: '/' });
    });
