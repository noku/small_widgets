$(function() {

  // We use an inline data source in the example, usually data would
  // be fetched from a server or other resource available
  var data = [], data2 = [], totalPoints = 500, ypoints = 100;

  var updateInterval = 1000;  //Fetch data ever x milliseconds
  var realtime = "on";        //If == to on then fetch data every x seconds. else stop fetching

 //======================================================================
 //   Helper function
 //======================================================================

    // generate random data numbers
    function getRandomData() {
      if (data.length > 0 || data2.length > 0)
          data = data.slice(1);
          data2 = data2.slice(1);

      // Do a random walk
      while (data.length < totalPoints) {

          var prev = data.length > 0 ? data[data.length - 1] : 50,
                  y = prev + Math.random() * 10 - 5,
                  y2 = prev/2 + Math.random() * 10 - 5;

          if (y < 0) {
              y = 0;
          } else if (y > 100) {
              y = 100;
          }

          data.push(y);
          data2.push(y2);
      }

      // Zip the generated y values with the x values
      var res = {
        'first' : {
          label: 'First',
          data: []
        },
        'second' : {
          label : "Second",
          data: []
        }
      };

      for (var i = 0; i < data.length; ++i) {
          res["first"].data.push([i, data[i]]);
          res["second"].data.push([i, data2[i]]);
      }
      return res;
    }

   // generate random data numbers
    function getRandomDataDonut() {
      var one = Math.random() * 100,
          two = 100 - one;

      var donutData = [
        {label: "Series1", data: one, color: "#3c8dbc"},
        {label: "Series2", data: two, color: "#0073b7"},
        // {label: "Series4", data: 50, color: "#00c0ef"}
      ];

      return donutData;
    }

 //======================================================================
 // DONUT CHART 
 //======================================================================

    var donut_interactive = $.plot("#donut-chart", getRandomDataDonut(), {
        series: {
            pie: {
                show: true,
                radius: 1,
                innerRadius: 0.5,
                label: {
                    show: true,
                    radius: 2 / 3,
                    formatter: labelFormatter,
                    threshold: 0.1
                }

            }
        },
        legend: {
            show: false
        }
    });

 //======================================================================
 //   FULL WIDTH STATIC AREA CHART   
 //======================================================================

    var area_interactive = $.plot("#area-chart", [getRandomData()["second"]], {
        grid: {
            borderWidth: 0
        },
        series: {
            shadowSize: 0, // Drawing is faster without shadows
            color: "#00c0ef"
        },
        lines: {
            fill: true //Converts the line chart to area chart
        },
        yaxis: {
            min: 0,
            max: 100,
            show: false
        },
        xaxis: {
            min: 0,
            show: false
        }
    });

 //======================================================================
 //   Line Chart
 //======================================================================

    // hard-code color indices to prevent them from shifting as
    // value are turned on/off

    var i = 0;
    $.each(getRandomData(), function(key, val) {
      val.color = i;
      ++i;
    });

    // insert checkboxes 
    var choiceContainer = $("#legend");
    $.each(getRandomData(), function(key, val) {
      choiceContainer.append("<br/><input type='checkbox' name='" + key +
        "' checked='checked' id='id" + key + "'></input>" +
        "<label for='id" + key + "'>"
        + val.label + "</label>");
    });

    // choiceContainer.find("input").click(update2);

    var line_interactive = $.plot("#line-chart", [getRandomData()['first'], getRandomData()["second"]], {
        grid: {
            hoverable: true,
            borderColor: "#f3f3f3",
            borderWidth: 1,
            tickColor: "#f3f3f3"
        },
        series: {
            shadowSize: 0,
            lines: {
                show: true
            },
            // points: {
            //     show: true
            // }
        },
        lines: {
            fill: false,
            color: ["#3c8dbc", "#f56954"]
        },
        yaxis: {
            min: 0,
            max: 100,
            show: true,
        },
        xaxis: {
            show: true
        },
        selection: {
            mode: "x"
        }
    });

    // Enable connection between the two graphs
    $("#line-chart").bind("plotselected", function (event, ranges) {

      // do the zooming
      $.each(line_interactive.getXAxes(), function(_, axis) {
        var opts = axis.options;
        opts.min = ranges.xaxis.from;
        opts.max = ranges.xaxis.to;
      });
      line_interactive.setupGrid();
      line_interactive.draw();
      line_interactive.clearSelection();

      // don't fire event on the overview to prevent eternal loop
      overview.setSelection(ranges, true);
      interactive_plot.setSelection(ranges, true);
      stop_feed();
    });

    //Initialize tooltip on hover
    $("<div class='tooltip-inner' id='line-chart-tooltip'></div>").css({
        position: "absolute",
        display: "none",
        opacity: 0.8
    }).appendTo("body");
    $("#line-chart").bind("plothover", function(event, pos, item) {

        if (item) {
            var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);

            $("#line-chart-tooltip").html(item.series.label + " of " + x + " = " + y)
                    .css({top: item.pageY + 5, left: item.pageX + 5})
                    .fadeIn(200);
        } else {
            $("#line-chart-tooltip").hide();
        }
    });

 //======================================================================
 //  Main Interactive Chart
 //======================================================================

    // initiate the graph
    var interactive_plot = $.plot("#interactive", [getRandomData()["first"]], {
        grid: {
            borderColor: "#f3f3f3",
            borderWidth: 1,
            tickColor: "#f3f3f3"
        },
        series: {
            shadowSize: 0,      // Drawing is faster without shadows
            color: "#3c8dbc"
        },
        lines: {
            fill: true,         //Converts the line chart to area chart
            color: "#3c8dbc"
        },
        yaxis: {
            min: 0,
            max: 100,
            show: true
        },
        xaxis: {
            show: true
        },
        selection: {
            mode: "x"
        }
    });

    var overview = $.plot("#overview", [getRandomData()["first"]], {
      grid: {
        borderColor: "#ccc",
        borderWidth: 1,
        tickColor: "#f3f3f3"
      },
      series: {
        lines: {
          show: true,
          color: "#3c8dbc",
          lineWidth: 1
        },
        shadowSize: 1
      },
      lines: {
          fill: true,         //Converts the line chart to area chart
          color: "#000000"
      },
      xaxis: {
        ticks: [],
        show: true,
        mode: "x"
      },
      yaxis: {
        ticks: [],
        min: 0,
        autoscaleMargin: 0.1
      },
      selection: {
        mode: "x"
      }
    });

    function update() {
        // interactive and overviev plot
        interactive_plot.setData([getRandomData()["first"]]);
        overview.setData([getRandomData()["first"]]);
        // Since the axes don't change, we don't need to call plot.setupGrid()
        interactive_plot.draw();
        overview.draw();

        // line plot
        var data = [];

        choiceContainer.find("input:checked").each(function () {
          var key = $(this).attr("name");
          if (key && getRandomData()[key]) {
            data.push(getRandomData()[key]);
          }
        });

        line_interactive.setData(data);
        // Since the axes don't change, we don't need to call plot.setupGrid()
        line_interactive.draw();

        area_interactive.setData([getRandomData()["second"]]);
        area_interactive.draw();

        // donut_interactive.setData(getRandomDataDonut);
        // donut_interactive.draw();

        if (realtime === "on")
            setTimeout(update, updateInterval);
    }

    //INITIALIZE REALTIME DATA FETCHING
    if (realtime === "on") {
        update();
    }

    //REALTIME TOGGLE
    $("#realtime .btn").click(function() {
        if ($(this).data("toggle") === "on") {
            realtime = "on";
        }
        else {
            realtime = "off";
        }
        update();
    });

    // Enable connection between the two graphs
    $("#interactive").bind("plotselected", function (event, ranges) {

      // do the zooming
      $.each(interactive_plot.getXAxes(), function(_, axis) {
        var opts = axis.options;
        opts.min = ranges.xaxis.from;
        opts.max = ranges.xaxis.to;
      });
      interactive_plot.setupGrid();
      interactive_plot.draw();
      interactive_plot.clearSelection();

      // don't fire event on the overview to prevent eternal loop
      overview.setSelection(ranges, true);
      line_interactive.setSelection(ranges);
      stop_feed();
    });

    $("#overview").bind("plotselected", function (event, ranges) {
      interactive_plot.setSelection(ranges);
      line_interactive.setSelection(ranges);
      stop_feed();
    });

    $("#fullgraph").click(function() {
      var ranges = {
        xaxis: {
          from : 0,
          to: totalPoints 
        },
        yaxis: {
          from : 0,
          to: ypoints
        }
      }
      // set full selection and clear selection for the small one
      // restart the live feed
      interactive_plot.setSelection(ranges);
      line_interactive.setSelection(ranges)
      overview.clearSelection();
      restart_feed();
    });

    // helper functions

    function stop_feed(){
      if(realtime == "on"){
        $('.btn-group[data-toggle="btn-toggle"]').each(function() {
            $(this).find(".btn").not(".active").trigger("click");   
        });
      }
      realtime = "off";
      update();
    }

    function restart_feed(){
      if(realtime == "off"){
        $('.btn-group[data-toggle="btn-toggle"]').each(function() {
            $(this).find(".btn").not(".active").trigger("click");
        });
      }
      realtime = "on";
      update();
    }

 //======================================================================
 //  BAR CHART
 //======================================================================

    var bar_data = {
        data: [["January", 10], ["February", 8], ["March", 4], ["April", 13], ["May", 17], ["June", 9]],
        color: "#3c8dbc"
    };
    $.plot("#bar-chart", [bar_data], {
        grid: {
            borderWidth: 1,
            borderColor: "#f3f3f3",
            tickColor: "#f3f3f3"
        },
        series: {
            bars: {
                show: true,
                barWidth: 0.5,
                align: "center"
            }
        },
        xaxis: {
            mode: "categories",
            tickLength: 0
        }
    });

});

/*
 * Custom Label formatter
 * ----------------------
 */
function labelFormatter(label, series) {
    return "<div style='font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;'>"
            + label
            + "<br/>"
            + Math.round(series.percent) + "%</div>";
}
