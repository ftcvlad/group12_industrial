function plotGraph10(data){
	
		//countPerDay: 9, sumPerDay: 16.85, day: 1440370800

		var type = allGraphs["10"].filters.yAxisType;
		
		
		
		var allSeries = [];
		
		var lengthOfCompPeriod = "year";
		
		if (lengthOfCompPeriod === "year"){
			var previousYear = "";
			
			for (var i=0; i<data.length;i++){
				var myMoment =  moment(data[i].day*1000);//multiply by 1000 as unix timestamps in seconds, js uses milliseconds
				var nextYear = myMoment.year();
			
				if (previousYear !== nextYear){
					allSeries.push({name:nextYear, data: [], type: 'area'});
				}
				
				if (type === yAxisTypes.totalSpending){
					allSeries[allSeries.length-1].data.push([myMoment.year(2015).unix()*1000,  data[i].sumPerDay]);
				}
				else {
					allSeries[allSeries.length-1].data.push([myMoment.year(2015).unix()*1000,  data[i].countPerDay]);
				}
				previousYear = nextYear;
			}
		
		}
		
		var yAxisTitle = "";
		if (type === yAxisTypes.totalSpending){
			yAxisTitle = "Total spending";
		}
		else {
			yAxisTitle = "Total transactions";
		}
		
		 
		Highcharts.chart('graph10', {
		        chart: {
		            zoomType: 'x'
		        },
		        title: {
		            text: 'Time comparison'
		        },
		        xAxis: {
		            type: 'datetime',
		             dateTimeLabelFormats:{
			            month: '%b %e'
			          }  // label in x axis will be displayed like Jan 1, 2012
		        },
		        yAxis: {
		            title: {
		                text: yAxisTitle
		            }
		        },
		        legend: {
		            enabled: true
		        },
		        plotOptions: {
		            area: {
		                fillColor: {
		                    linearGradient: {
		                        x1: 0,
		                        y1: 0,
		                        x2: 0,
		                        y2: 1
		                    },
		                    stops: [
		                        [0, Highcharts.getOptions().colors[0]],
		                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
		                    ]
		                },
		                marker: {
		                    radius: 2
		                },
		                lineWidth: 1,
		                states: {
		                    hover: {
		                        lineWidth: 1
		                    }
		                },
		                threshold: null
		            }
		        },
				tooltip: {

			            formatter: function() {
			            	 var s =  Highcharts.dateFormat('%e-%b', new Date(this.x));
						        $.each(this.points, function(i, point) {
						            s += '<br/><span style="color:' + point.color + '">\u25CF</span>: ' + point.series.name + ': <b>' + point.y+'</b>';
						        });
						        return s;
			            },
			            shared: true
				},
		        series: allSeries
		    });
		
		
		
}