<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %> 
<!DOCTYPE html>



<html>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>

<head>
    <title>DUSA Data App</title>
  	<link rel="stylesheet" href="styles.css">
</head>

<body>

    <%@ include file="includes/sidebar.jsp" %>

    <div class="main_content">
    
		<div class="graph_container">
			<div id="piechart1">
			</div>
		</div>
		
		<div class="graph_container">
			<div id = container></div>
		</div>
		
		<div class="graph_container">

		</div>
		
		<div class="graph_container">

		</div>
		
    </div>
	<script>
		Highcharts.chart('piechart1', {
		    chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: null,
		        plotShadow: false,
		        type: 'pie'
		    },
		    title: {
		        text: 'YoYo Sales per Day for the Time Period'
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    },
		    plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled: true,
		                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                style: {
		                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                }
		            }
		        }
		    },
		    series: [{
		        name: 'Brands',
		        colorByPoint: true,
		        data: [{
		            name: '18/09/2017',
		            y: 12
		        }, {
		            name: '11/09/2017',
		            y: 16
		        }, {
		            name: '04/09/2017',
		            y: 25
		        }, {
		            name: '28/09/2017',
		            y: 6
		        }, {
		            name: '21/09/2017',
		            y: 8
		        }, {
		            name: '14/09/2017',
		            y: 4
		        }]
		    }]
		});
	</script>
	
	<script>
	
		/* [Date, ammount of customers first purchase on specified date] */
	
		var data = [
		    [Date.UTC(2015, 8, 24), 2],
		    [Date.UTC(2015, 8, 25), 4],
		    [Date.UTC(2015, 8, 26), 5],
		    [Date.UTC(2015, 8, 27), 10],
		    [Date.UTC(2015, 8, 28), 90],
		    [Date.UTC(2015, 8, 29), 10],
		    [Date.UTC(2015, 8, 30), 1],
		    [Date.UTC(2015, 8, 31), 90],
		    [Date.UTC(2015, 9, 1), 30],
		    [Date.UTC(2015, 9, 2), 20],
		    [Date.UTC(2015, 9, 3), 70],
		    [Date.UTC(2015, 9, 4), 48],
		    [Date.UTC(2015, 9, 5), 45],
		    [Date.UTC(2015, 9, 6), 9],
		];
	
		Draw(data, "Customer Growth");
	
		function Draw (data, title){
		  $(document).ready(function () {
		  
		          // create the detail chart
		          function createDetail(masterChart) {
	
		              // prepare the detail chart
		              var detailData = [],
		                  detailStart = data[0][0];
	
		              $.each(masterChart.series[0].data, function () {
		                  if (this.x >= detailStart) {
		                      detailData.push(this.y);
		                  }
		              });
	
		              // create a detail chart referenced by a global variable
		              detailChart = Highcharts.chart('detail-container', {
		                  chart: {
		                      marginBottom: 120,
		                      reflow: false,
		                      marginLeft: 50,
		                      marginRight: 20,
		                      style: {
		                          position: 'absolute'
		                      }
		                  },
		                  credits: {
		                      enabled: false
		                  },
		                  title: {
		                      text: title
		                  },
		                  xAxis: {
		                      type: 'datetime'
		                  },
		                  yAxis: {
		                      title: {
		                          text: null
		                      },
		                      maxZoom: 0.1
		                  },
		                  legend: {
		                      enabled: false
		                  },
		                  plotOptions: {
		                      series: {
		                          marker: {
		                              enabled: false,
		                              states: {
		                                  hover: {
		                                      enabled: true,
		                                      radius: 3
		                                  }
		                              }
		                          }
		                      }
		                  },
		                  series: [{
		                      name: 'New Customers',
		                      pointStart: detailStart,
		                      pointInterval: 24 * 3600 * 1000,
		                      data: detailData
		                  }],
	
		                  exporting: {
		                      enabled: false
		                  }
	
		              }); // return chart
		          }
	
		          // create the master chart
		          function createMaster() {
		              Highcharts.chart('master-container', {
		                  chart: {
		                      reflow: false,
		                      borderWidth: 0,
		                      backgroundColor: null,
		                      marginLeft: 50,
		                      marginRight: 20,
		                      zoomType: 'x',
		                      events: {
	
		                          // listen to the selection event on the master chart to update the
		                          // extremes of the detail chart
		                          selection: function (event) {
		                              var extremesObject = event.xAxis[0],
		                                  min = extremesObject.min,
		                                  max = extremesObject.max,
		                                  detailData = [],
		                                  xAxis = this.xAxis[0];
	
		                              // reverse engineer the last part of the data
		                              $.each(this.series[0].data, function () {
		                                  if (this.x > min && this.x < max) {
		                                      detailData.push([this.x, this.y]);
		                                  }
		                              });
	
		                              // move the plot bands to reflect the new detail span
		                              xAxis.removePlotBand('mask-before');
		                              xAxis.addPlotBand({
		                                  id: 'mask-before',
		                                  from: data[0][0],
		                                  to: min,
		                                  color: 'rgba(0, 0, 0, 0.2)'
		                              });
	
		                              xAxis.removePlotBand('mask-after');
		                              xAxis.addPlotBand({
		                                  id: 'mask-after',
		                                  from: max,
		                                  to: data[data.length - 1][0],
		                                  color: 'rgba(0, 0, 0, 0.2)'
		                              });
	
	
		                              detailChart.series[0].setData(detailData);
	
		                              return false;
		                          }
		                      }
		                  },
		                  title: {
		                      text: null
		                  },
		                  xAxis: {
		                      type: 'datetime',
		                      showLastTickLabel: true,
		                      maxZoom: 14 * 24 * 3600000, // fourteen days
		                      plotBands: [{
		                          id: 'mask-before',
		                          from: data[0][0],
		                          to: data[data.length - 1][0],
		                          color: 'rgba(0, 0, 0, 0.2)'
		                      }],
		                      title: {
		                          text: null
		                      }
		                  },
		                  yAxis: {
		                      gridLineWidth: 0,
		                      labels: {
		                          enabled: false
		                      },
		                      title: {
		                          text: null
		                      },
		                      min: 0.6,
		                      showFirstLabel: false
		                  },
		                  tooltip: {
		                      formatter: function () {
		                          return false;
		                      }
		                  },
		                  legend: {
		                      enabled: false
		                  },
		                  credits: {
		                      enabled: false
		                  },
		                  plotOptions: {
		                      series: {
		                          fillColor: {
		                              linearGradient: [0, 0, 0, 70],
		                              stops: [
		                                  [0, Highcharts.getOptions().colors[0]],
		                                  [1, 'rgba(255,255,255,0)']
		                              ]
		                          },
		                          lineWidth: 1,
		                          marker: {
		                              enabled: false
		                          },
		                          shadow: false,
		                          states: {
		                              hover: {
		                                  lineWidth: 1
		                              }
		                          },
		                          enableMouseTracking: false
		                      }
		                  },
	
		                  series: [{
		                      type: 'area',
		                      name: 'New Customers',
		                      pointInterval: 24 * 3600 * 1000,
		                      pointStart: data[0][0],
		                      data: data
		                  }],
	
		                  exporting: {
		                      enabled: false
		                  }
	
		              }, function (masterChart) {
		                  createDetail(masterChart);
		              }); // return chart instance
		          }
	
		          // make the container smaller and add a second container for the master chart
		          var $container = $('#container')
		              .css('position', 'relative');
	
		          $('<div id="detail-container">')
		              .appendTo($container);
	
		          $('<div id="master-container">')
		              .css({
		                  position: 'absolute',
		                  top: 300,
		                  height: 100,
		                  width: '100%'
		              })
		                  .appendTo($container);
	
		          // create master and in its callback, create the detail chart
		          createMaster();
		      });
		}
	</script>
</body>
</html>