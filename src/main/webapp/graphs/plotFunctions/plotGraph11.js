function plotGraph11(data){



		//result11: [{day: 1440370800 nOfNewCustomers:7},...], filters: {}
		//console.log(data);
		var sum = 0;
		var allSeries = [];
		if (data.filters.comparison === false){
			var processed = [];
			for (var i=0; i<data.result11.length; i++){
				processed.push([data.result11[i].day*1000, data.result11[i].nOfNewCustomers]);
				sum+= data.result11[i].nOfNewCustomers;
			}
			
			allSeries = [{
			        	name: "New customers",
			        	data: processed,
			        	type: 'area'
			        }];
		
		}
		else {
		
			var previousYear = "";
		
			for (var i=0; i<data.result11.length;i++){
				var myMoment =  moment(data.result11[i].day*1000);
				var nextYear = myMoment.year();
			
				if (previousYear !== nextYear){
					allSeries.push({name:nextYear, data: [], type: 'area'});
				}
	
				allSeries[allSeries.length-1].data.push([myMoment.year(2015).unix()*1000,  data.result11[i].nOfNewCustomers]);
				sum+= data.result11[i].nOfNewCustomers;
				previousYear = nextYear;
			}
		
		}
		
		
		

	
		
		
		
		
		
		
		
		
		Highcharts.chart('graph11', {
		        chart: {
		            zoomType: 'x'
		        },
		        title: {
		            text: 'Customer base growth'
		        },
		        subtitle: {
				    text: 'Total unique customers: ' + sum
				},
		        xAxis: {
		            type: 'datetime',
		             dateTimeLabelFormats:{
			            month: '%b %e'
			          }  // label in x axis will be displayed like Jan 1, 2012
		        },
		        yAxis: {
		            title: {
		                text: "New customers per day"
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
			
		        series: allSeries
		    });
		


}

