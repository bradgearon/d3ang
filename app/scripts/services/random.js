angular.module('d3App.random', [])
    .factory('randomSvc', [function () {

        var random = function() { };

        // setup junk. data
        var defaults = {
            palette: new Rickshaw.Color.Palette({ scheme: 'classic9' }),
            series: ['Moscow', 'Shanghai', 'Amsterdam', 'Paris', 'Tokyo', 'London', 'New York'],
            length: 9
        };

        random.prototype.init = function(opts) {
            this.opts = angular.extend(defaults, opts);
            this.randomizer = new Rickshaw.Fixtures.RandomData(150);
            this.data = [];
            this.colors = [];

            for(var i = 0; i < this.opts.length; i++) {
                this.data.push([]);
                this.colors.push(this.opts.palette.color());
            }

            for (i = 0; i < 150; i++) {
                this.randomizer.addData(this.data);
            }

            return this;
        };


        random.prototype.updateData = function (preserve) {
            this.data = preserve && this.data || this.init(this.opts);
            var meta = [];

            this.randomizer.removeData(this.data);
            this.randomizer.addData(this.data);

            for (var i = 0; i < this.opts.series.length; i++) {
                meta.push({
                    color: this.colors[i],
                    data: this.data[i],
                    name: this.opts.series[i]
                });
            }
            return meta;
        };

        return new random();
    }]);