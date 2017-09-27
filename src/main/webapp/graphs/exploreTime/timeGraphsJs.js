
var allGraphs = {
	
	 "10":{
	 	filters:{
			id: 10,
			locations: allLocations.slice(),
			yAxisType:  yAxisTypes.totalSpending
		},
		fetching: false,
		plotData: plotGraph10,
		spinner: null,
		url: 'timeGraphs'
	 },
	 "11":{
	 	filters:{
			id: 11,
			locations: allLocations.slice()
		},
		fetching: false,
		plotData: plotGraph11,
		spinner: null,
		url: 'timeGraphs'
	 }
	 
	 
};

var isDashboard = false;




$( document ).ready(function() {
   

	
	//GRAPH 10
	$('#selectpickerLocationGraph10').selectpicker({
	  size: 14,
	  actionsBox: true,
	  width: "150px"
	 
	});
	$('#selectpickerLocationGraph10').addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
	$('#selectpickerLocationGraph10').selectpicker('selectAll');
	
	
	$('#selectpickerLocationGraph10').on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
			 	
	 	if (clickedIndex === undefined){//select/deselect all
	 		 var firstSelected = $(event.target[0]).is(':selected');
	 		allGraphs["10"].filters.locations = (firstSelected === true) ? allLocations.slice() : [] ;
	 	}
	 	else{//select/deselect 1 option
	 		var outletRef = $(event.target[clickedIndex]).data("outlet");
	 		newValue === true ? allGraphs["10"].filters.locations.push(outletRef) : allGraphs["10"].filters.locations.splice(allGraphs["10"].filters.locations.indexOf(outletRef), 1);
	 	}
	 	
	});
	
	

    
    //GRAPH 10
    $('#transVsSpendingGraph10').selectpicker({
	  size: 2,
	  width: "150px"
	});
	$('#transVsSpendingGraph10').addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
	$('#transVsSpendingGraph10').on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
 		 allGraphs["10"].filters.yAxisType = $(event.target[clickedIndex]).data("yaxistype");
	});
    
    
    
    //GRAPH 11
	$('#selectpickerLocationGraph11').selectpicker({
	  size: 14,
	  actionsBox: true,
	  width: "150px"
	 
	});
	$('#selectpickerLocationGraph11').addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
	$('#selectpickerLocationGraph11').selectpicker('selectAll');
	
	
	$('#selectpickerLocationGraph11').on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
			 	
	 	if (clickedIndex === undefined){//select/deselect all
	 		 var firstSelected = $(event.target[0]).is(':selected');
	 		allGraphs["11"].filters.locations = (firstSelected === true) ? allLocations.slice() : [] ;
	 	}
	 	else{//select/deselect 1 option
	 		var outletRef = $(event.target[clickedIndex]).data("outlet");
	 		newValue === true ? allGraphs["11"].filters.locations.push(outletRef) : allGraphs["11"].filters.locations.splice(allGraphs["11"].filters.locations.indexOf(outletRef), 1);
	 	}
	 	
	});
    
     $('#filters11').show();
 
     $('#filters10').show();
    
     requestData(11);
     requestData(10);
   
    
  	
});	
  
  
  
