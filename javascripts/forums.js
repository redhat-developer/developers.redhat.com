app.forums = {};
app.forums.chart = function() {
  $('td.histogram > div').each(function(index, value) {
    var forumData = $.parseJSON($('div.chart-data', this).text()),
        chart = new google.visualization.LineChart(value);

    var chartOptions = {
      axisTitlesPosition : 'none',
      enableInteractivity: false,
      crosshair : {
        opacity :  0.0
      },
      legend : {
        position : 'none'
      },
      hAxis : {
        gridlines : {
          color : '#FFF'
        },
        baselineColor : '#FFF',
        textStyle : {
          color : '#FFF'
        }
      },
      vAxis : {
        gridlines : {
          color : '#FFF'
        },
        baselineColor : '#FFF',
        textStyle : {
          color : '#FFF'
        }
      },
    };
    chart.draw(google.visualization.arrayToDataTable(forumData), chartOptions);
  });
}
google.setOnLoadCallback(app.forums.chart)

