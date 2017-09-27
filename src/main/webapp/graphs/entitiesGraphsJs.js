
var allGraphs = {
	"9": {
		filters:{
			locations: allLocations.slice(),
			yAxisType:  yAxisTypes.totalSpending,//transactions vs spending,
			id: 9
		},
		fetching: false,
		plotData: plotGraph9,
		spinner: null
	 },
	 "6": {
	 	filters:{
			id: 6
		},
		fetching: false,
		plotData: plotGraph6,
		spinner: null
	 }
};






$( document ).ready(function() {
   

	
	//LOCATIONS selector   GRAPH9
    $('#selectpickerLocationGraph9').selectpicker({
	  size: 14,
	  actionsBox: true,
	  width: "150px"
	 
	});
	$('#selectpickerLocationGraph9').addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
	$('#selectpickerLocationGraph9').selectpicker('selectAll');
	
	
	$('#selectpickerLocationGraph9').on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
			 	
	 	if (clickedIndex === undefined){//select/deselect all
	 		 var firstSelected = $(event.target[0]).is(':selected');
	 		allGraphs["9"].filters.locations = (firstSelected === true) ? allLocations.slice() : [] ;
	 	}
	 	else{//select/deselect 1 option
	 		var outletRef = $(event.target[clickedIndex]).data("outlet");
	 		newValue === true ? allGraphs["9"].filters.locations.push(outletRef) : allGraphs["9"].filters.locations.splice(allGraphs["9"].filters.locations.indexOf(outletRef), 1);
	 	}
	 	
	});
	
    //TYPE (total trans/total spending) selector  GRAPH 9
    $('#transVsSpendingGraph9').selectpicker({
	  size: 2,
	  width: "150px"
	});
	$('#transVsSpendingGraph9').addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
	$('#transVsSpendingGraph9').on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
 		 allGraphs["9"].filters.yAxisType = $(event.target[clickedIndex]).data("yaxistype");
	});
    
    
 
	 $('#filters9').show();
	 $('#filters6').show();
	
	 requestData(9);
	 requestData(6);
   
    
  	
});	
  
  
  
  //GRAPH 9 !!! 	
  function plotGraph9(data){
  

  	var yAxisType = data.yAxisType[0];
  
  	var yAxisTitle = (yAxisType === yAxisTypes.totalSpending) ? "% of all revenue" : "% of all transactions";
  	var xAxisTitle = (yAxisType === yAxisTypes.totalSpending) ? "Percentiles (% of customers spending less)" : "Percentiles (% of customers having fewer transactions)";
  	var title = (yAxisType === yAxisTypes.totalSpending) ? "Spending distribution" : "Transaction distribution";
  
  
  	var categories = [];
  	
  	var a = 100;
  	var percentileStep = 10;
	do{
	   a-= percentileStep;
	   categories.push(a+'%')
	} while (a>0);
  	
  	
  	var dataPoints = [];
  	for (var i=0; i<data.bucketTotalSpendingTransaction.length; i++){
  		dataPoints.push({"y": data.bucketTotalSpendingTransaction[i], 
  						"average1":data.averageTotalSpendingTransaction[i]
  						} );
  	}
  	
 
  	
  
  	 var tooltipTitle =  (yAxisType === yAxisTypes.totalSpending) ? 'Average customer spending (\u00A3): ' : 'Average customer transactions: ';
  	 var myChart = Highcharts.chart('graph9', {
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        xAxis: {
            categories: categories,
            title: {
            	text: xAxisTitle
            }
        },
        yAxis: [{
	            	title: {text: yAxisTitle}
	            },
	            {
	            	title: {text: "Average transaction value"},
	            	opposite: true
	            }],
        series: [{
           			data: dataPoints,
           			
           			yAxis: 0,
           			name: "percentOfAll"
		        },
		        {
           			data: data.averageTransactionValue,
           			
           			yAxis: 1,
           			name: "average transaction value"
		        }],
		tooltip: {
				  formatter: function() {

			        	 if (this.series.name == 'percentOfAll') {
					         return ' ' + yAxisTitle + ': ' + this.point.y.toFixed(2) + '<br />'+
			        					tooltipTitle + this.point.average1.toFixed(2) + '<br />'; 
					     } 
					     else {
					         return " Average transaction value (\u00A3): "+ this.point.y.toFixed(2);
					     }
			        		
			      }
				}
		
    });
  
  
  
  }
  
  
 
  
  
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
