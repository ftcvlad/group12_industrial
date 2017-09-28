//GRAPH 2 	
function plotGraph2(data){
	
	console.log(data);
	
	//Line
	var chart = Highcharts.chart('graph2', {
		chart: {
			type: 'line'
		},
		title: {
			text: 'Total Spending per Weekday'
		},
		xAxis: {
			categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			title: {
				text: 'Total Spending'
			}
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true
				},
				enableMouseTracking: false
			}
		},
		series: [{
			name: 'Total spending per week day',
			data: [
				data.Mon,
				data.Tue,
				data.Wed,
				data.Thu,
				data.Fri,
				data.Sat,
				data.Sun
			]
		}]
	});
	
	//Column
	/*
	var chart = new Highcharts.chart('graph2', {
		chart: {
			type: 'column'
		},
		title: {
			text: 'Total Spending Per Weekday'
		},
		xAxis: {
			type: 'Weekday',
			labels: {
				rotation: -45,
				style: {
					fontSize: '13px',
					fontFamily: 'Verdana, sans-serif'
				}
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Total Spending'
			}
		},
		legend: {
			enabled: false
		},
		tooltip: {
			pointFormat: '{point.y}'
		},
		series: [{
			name: 'Total Spending',
			data: [
				['Monday', data.Mon],
				['Tuesday', data.Tue],
				['Wednesday', data.Wed],
				['Thursday', data.Thu],
				['Friday', data.Fri],
				['Saturday', data.Sat],
				['Sunday', data.Sun]
			]
		}]
	});
	*/
}
