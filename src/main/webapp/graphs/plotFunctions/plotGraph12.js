function plotGraph12(data){

	
	var totalSpending = [];
	var totalTransactions = [];
	
	//hours may come with holes
	var indInData = 0;
	for (var i=0;i<24;i++){
		
		if (data.result12[indInData].hour === i){
			totalSpending.push(data.result12[indInData].sumTotal);
			totalTransactions.push(data.result12[indInData].countTotal);

			indInData = Math.min(indInData+1, data.result12.length-1);
		}
		else {
			totalSpending.push(0);
			totalTransactions.push(0);
		}
	
	}

	
	
	Highcharts.chart('graph12', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'Daily buying behaviour'
	    },
	    xAxis: {
	        categories: [ '00:00', '01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00',
	       				'11:00', '12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00',
	       				'22:00', '23:00'],
	        crosshair: true
	    },
	    yAxis:  [{
	            	title: {text: "Total spending"}
	            },
	            {
	            	title: {text: "Total transactions"},
	            	opposite: true
	    }],
	        
	  
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        }
	    },
	    series: [{
	        name: 'Total spending',
	        data: totalSpending,
	        yAxis: 0
	    },
	    { name: 'Total transactions',
	        data: totalTransactions,
	        yAxis: 1
	
	    }]
	});
	
	
	
}