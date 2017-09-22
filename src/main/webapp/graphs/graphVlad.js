var locationsMap ={
	"DOJ Catering": 235,
	"Air Bar": 236,
	"Floor Five": 237,
	"Library": 238,
	"Spare": 239,
	"Food on Four": 240,
	"Liar bar": 241,
	"Mono": 242,
	"Ents":243,
	"Remote Campus Shop": 343,
	"DUSA The Union Marketplace": 456,
	"Premier Shop": 2676,
	"College Shop": 2677,
	"Ninewells Shop": 2679
};


var yAxisTypes = {
	"totalSpending": 1,
	"totalTransactions": 2
};

var percentileStep = 10;
var allLocations = [235, 236, 237, 238, 239, 240, 241, 242, 243, 343, 456, 2676, 2677, 2679];
var fetching = false;

//initial values
var filters = {
	locations: allLocations.slice(),
	yAxisType:  yAxisTypes.totalSpending//transactions vs spending
};

var spinner ;

$( document ).ready(function() {
   
   	spinner = new Spinner({top:'50%', width: 1, length:30, radius:15}).spin();
  	document.getElementById("spinnerContainer").appendChild(spinner.el);
   
	//LOCATIONS selector
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
	 		 filters.locations = (firstSelected === true) ? allLocations.slice() : [] ;
	 	}
	 	else{//select/deselect 1 option
	 		var outletRef = $(event.target[clickedIndex]).data("outlet");
	 		newValue === true ? filters.locations.push(outletRef) : filters.locations.splice(filters.locations.indexOf(outletRef), 1);
	 	}
	});
	
	//TYPE (total trans/total spending) selector
	
	
    $('#transVsSpendingGraph9').selectpicker({
	  size: 2,
	  width: "150px"
	});
	$('#transVsSpendingGraph9').addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
	$('#transVsSpendingGraph9').on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
 		filters.yAxisType = $(event.target[clickedIndex]).data("yaxistype");
	});
    
    $('#filters9').show();
    
    
    requestData();
  	
});	
  

function appendOverlay(){

	if ($("#loadingOverlay").length === 0){
		$("#graph9").append('<div id="loadingOverlay">'+
						'<div id="spinnerContainer" ></div>'+
						'<div id="spinnerTextContainer">Fetching...</div>'+
					'</div>');
					
		document.getElementById("spinnerContainer").appendChild(spinner.el);
	
	}
	

}
  
function requestData(){
	if (fetching) return;
	
	if (filters.locations.length === 0){
		alert('you must select at least 1 location');
		return;
	}
	
	appendOverlay();
	fetching = true;
	
	
  	$.ajax({
    	url: "graphVlad", 
    	method: "GET",
    	contentType: "application/x-www-form-urlencoded",
    	data: {"filters":JSON.stringify(filters)},
    	dataType:'json', 
    	success: function(data){
    		
        	plotGraph9(data, filters.yAxisType);
    	},
    	error: function(jqXHR, textStatus, errorThrown){
    		$("#loadingOverlay").remove();
    		alert(textStatus);
    	},
    	complete: function(){
    		
    		fetching = false;
    	}
	});
	
}	
  	
  	
  function plotGraph9(data, yAxisType){
  
  	var yAxisTitle = (yAxisType === yAxisTypes.totalSpending) ? "% of all revenue" : "% of all transactions";
  	var xAxisTitle = (yAxisType === yAxisTypes.totalSpending) ? "Percentiles (% of customers spending less)" : "Percentiles (% of customers having fewer transactions)";
  	var title = (yAxisType === yAxisTypes.totalSpending) ? "Spending distribution" : "Transaction distribution";
  
  
  	var categories = [];
  	
  	var a = 100;
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
