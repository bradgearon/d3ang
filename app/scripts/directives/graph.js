angular.module('d3App.directives', ['ng', 'd3App.services'])
    .directive('graph', ['graphSvc', function (graphSvc) {
        return {
            // scope -- not a new one.  but appending these attributes (@)
            scope: {
                data: '=graphData',
                domain: '=graphDomain',
                type: '=graphType'
            },
            link: function (scope, element, attrs) {
                //watch the data...
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
            }
        }
    }]);