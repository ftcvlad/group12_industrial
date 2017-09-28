//GRAPH 2 	
function plotGraph2(data){
	
	var _data = {
		Mon : data[1].spent,
		Tue : data[5].spent,
		Wed : data[6].spent,
		Thu : data[4].spent,
		Fri : data[0].spent,
		Sat : data[2].spent,
		Sun : data[3].spent
	};
	
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
				_data.Mon,
				_data.Tue,
				_data.Wed,
				_data.Thu,
				_data.Fri,
				_data.Sat,
				_data.Sun
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
