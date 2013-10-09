// instantiate our graph!
var slider = new Rickshaw.Graph.RangeSlider({
  graph: graph,
  element: $('#slider')
});

var hoverDetail = new Rickshaw.Graph.HoverDetail({
  graph: graph,
  xFormatter: function (x) {
    return new Date(x * 1000).toString();
  }
});

var annotator = new Rickshaw.Graph.Annotate({
  graph: graph,
  element: document.getElementById('timeline')
});

var legend = new Rickshaw.Graph.Legend({
  graph: graph,
  element: document.getElementById('legend')

});

var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
  graph: graph,
  legend: legend
});

var order = new Rickshaw.Graph.Behavior.Series.Order({
  graph: graph,
  legend: legend
});

var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
  graph: graph,
  legend: legend
});

var smoother = new Rickshaw.Graph.Smoother({
  graph: graph,
  element: $('#smoother')
})

var controls = new RenderControls({
  element: document.querySelector('form'),
  graph: graph
});

// add some data every so often

setInterval(function () {
  random.removeData(seriesData);
  random.addData(seriesData);
  graph.update();

}, 3000);