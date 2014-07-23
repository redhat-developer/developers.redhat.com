---
interpolate: true
---
app.forums = {};
app.forums.histogram = #{JSON.dump(site.products.keys.inject({}) do |map,k| 
    map[site.products[k]['forum']['name']] = site.products[k]['forum']['histogram']; 
    map
  end)}

app.forums.chart = function() {
  $('td.histogram > div').each(function(index, value) {
    var forumName = $(value).data('forum-name'),
        chart = new google.visualization.LineChart(value),
        dataArray = [['Day', 'Count']],
        lastMonth = new Date((new Date()).setMonth(new Date().getMonth() - 1));

    console.debug(forumName);
    console.debug("histogram size: " + app.forums.histogram[forumName].length);
    $(app.forums.histogram[forumName]).each(function(i, v) {
      var nextDate = new Date(v.time);
      console.debug("new histogram date:" + nextDate + " new histogram data: " + v.count);
      if (nextDate > lastMonth) {
        var peekedItem = dataArray.peek();
        if (typeof peekedItem !== 'undefined' && peekedItem[0] instanceof Date) {
          // Pad form the last date to the next date
          for (var j = peekedItem[0].getDate(); j < nextDate.getDate(); j++) {
            dataArray.push([new Date(peekedItem[0].setDate(j)), 0]); // Add a new day with 0 for the count of posts
            console.debug('pushed to array empty data');
          }
        }
        dataArray.push([nextDate, v.count])
        console.debug('pushed to array real data');
      }
    });

    if (dataArray.length === 1) { // Fake a straight line
      for (var i = 1; i < 5; i++) {
        dataArray.push([new Date(lastMonth.setDate(i)),0]);
      }
    }

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
    chart.draw(google.visualization.arrayToDataTable(dataArray), chartOptions);
  });
}

google.load("visualization", "1.0", {"packages":["corechart"]});
google.setOnLoadCallback(app.forums.chart);
