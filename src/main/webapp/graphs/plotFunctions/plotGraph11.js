function plotGraph11(data){


		//[{day: 1440370800 nOfNewCustomers:7},...]
		var sum = 0;
		var processed = [];
		for (var i=0; i<data.length; i++){
			processed.push([data[i].day*1000, data[i].nOfNewCustomers]);
			sum+= data[i].nOfNewCustomers;
		
		}
		
		console.log(sum);
		
		
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
			
		        series: [{
		        	name: "New customers",
		        	data: processed,
		        	type: 'area'
		        }]
		    });
		


}

