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

var bandWidth = 20;
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
	  actionsBox: true
	});
	
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
	  size: 2
	});
	
	$('#transVsSpendingGraph9').on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {

 		filters.yAxisType = $(event.target[clickedIndex]).data("yaxistype");
	});
    
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
  
  	 var myChart = Highcharts.chart('graph9', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['100% - 90%', '90%-80%', '80%-70%']
        },
        yAxis: {
            title: {
                text: yAxisTitle
            }
        },
        series: [{
            name: 'Jane',
            data: data
        }]
    });
  
  
  
  }
