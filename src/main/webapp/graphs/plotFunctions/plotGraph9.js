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
  
  
 
  
  
 