angular.module('d3App.services', [])
    .factory('graphSvc', [function () {

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
