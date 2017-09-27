//GRAPH 6 !!! 	
  function plotGraph6(data){

	var totalSpending = data.map(function(next) {
	   return {name: locationsMap[next.C] , y: next.sumTotal };
	});
	
	var uniqueCustomers = data.map(function(next) {
	   return {name: locationsMap[next.C] , y: next.uniqueCustomers };
	});
	
	var totalTransactions = data.map(function(next) {
	   return {name: locationsMap[next.C] , y: next.countTotal };
	});
  	 
  	 var chart = new Highcharts.Chart('graph6', {
		
		chart: {
		    type: 'pie'
		},
		title: {
		    text: 'Location statistics'
		},
		legend:{
			enabled:true
		},
		series: [{
		    data: totalSpending,
		    center: ['20%'],
		    name: 'Total spending',
		    title: {
	            // align: 'left',
	            // x: 0
	            // style: { color: XXX, fontStyle: etc }
	            text: '<b>Total spending</b>',
	            verticalAlign: 'top',
	            y: -40
       		},
       		showInLegend:true
		},
		{
		    data: totalTransactions,
		    center: ['50%'],
		   
		    name: 'Total transactions',
		    title: {
	            text: '<b>Total transactions</b>',
	            verticalAlign: 'top',
	            y: -40
       		},
       		showInLegend:false
		},
		{
		    data: uniqueCustomers,
		    center: ['80%', '50%'],
		    name: 'Unique customers',
		     innerSize: '35%',
		    title: {
	            text: '<b>Unique customers</b>',
	            verticalAlign: 'top',
	            y: -40
       		},
       		showInLegend:false
		}],
		plotOptions: {
		    pie: {
		        dataLabels: {
		            enabled: false
		        },
		        cursor: 'pointer', 
				allowPointSelect: true   ,
				size: "60%"        
		    }            
		}
	}, function(chart) {//https://stackoverflow.com/questions/16730755/two-pies-one-legend-with-unique-items-merge-legends
            
        $(chart.series[0].data).each(function(i, e) {
            e.legendItem.on('click', function(event) {
                var legendItem=e.name;
                
                event.stopPropagation();
                
                $(chart.series).each(function(j,f){
                       $(this.data).each(function(k,z){
                           if(z.name==legendItem) {
                               if(z.visible){
                                   z.setVisible(false);
                               }
                               else{
                                   z.setVisible(true);
                               }
                           }
                       });
                });
                
            });
            
        });
     });
  }