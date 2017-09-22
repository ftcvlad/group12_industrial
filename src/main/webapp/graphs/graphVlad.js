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

$( document ).ready(function() {
   
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
  


  
function requestData(){
	if (fetching) return;
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
    		alert(textStatus);
    	},
    	complete: function(){
    		fetching = false;
    	}
	});
	
}	
  	
  	
  function plotGraph9(data, yAxisType){
  
  	var yAxisTitle = (yAxisType === yAxisTypes.totalSpending) ? "Total Spending" : "Total transactions";
  	var xAxisTitle = (yAxisType === yAxisTypes.totalSpending) ? "Percentiles (% of customers spending less)" : "Percentiles (% of customers having fewer transactions)";
  	var title = (yAxisType === yAxisTypes.totalSpending) ? "Spending distribution" : "Transaction distribution";
  
  
  	var categories = [];
  	
  	var a = 100;
	do{
	   a-= percentileStep;
	   categories.push(a+'%')
	} while (a>0);
  	
  	
  	
  
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
        yAxis: {
            title: {
                text: yAxisTitle
            }
        },
        series: [{
             showInLegend: false,  
            data: data
        }]
    });
  
  
  
  }
