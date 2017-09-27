
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

var isDashboard = false;




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
  
  
  
