
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
	 "9": {
		filters:{
			locations: allLocations.slice(),
			yAxisType:  yAxisTypes.totalSpending,//transactions vs spending,
			id: 9
		},
		fetching: false,
		plotData: plotGraph9,
		spinner: null,
		url: 'entitiesGraphs'
	 },
	 "6": {
	 	filters:{
			id: 6
		},
		fetching: false,
		plotData: plotGraph6,
		spinner: null,
		url: 'entitiesGraphs'
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



var isDashboard = true;


$( document ).ready(function() {
   
	var pinnedIds = localStorage.getItem("pinnedGraphs");
	if (!pinnedIds){ return;}
	
	
	pinnedIds = JSON.parse(pinnedIds);
	
	console.log(pinnedIds);
	for (var i=0; i<pinnedIds.length; i++){
	
		var nextId = pinnedIds[i];
		if (allGraphs[nextId].filters.locations){
		
			
			//GRAPH 10
			$('#selectpickerLocationGraph'+nextId).selectpicker({
			  size: 14,
			  actionsBox: true,
			  width: "150px"
			 
			});
			$('#selectpickerLocationGraph'+nextId).addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
			$('#selectpickerLocationGraph'+nextId).selectpicker('selectAll');
			
			
			$('#selectpickerLocationGraph'+nextId).on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
					 	
			 	if (clickedIndex === undefined){//select/deselect all
			 		 var firstSelected = $(event.target[0]).is(':selected');
			 		allGraphs[nextId].filters.locations = (firstSelected === true) ? allLocations.slice() : [] ;
			 	}
			 	else{//select/deselect 1 option
			 		var outletRef = $(event.target[clickedIndex]).data("outlet");
			 		newValue === true ? allGraphs[nextId].filters.locations.push(outletRef) : allGraphs[nextId].filters.locations.splice(allGraphs[nextId].filters.locations.indexOf(outletRef), 1);
			 	}
			 	
			});
		
		}
		
		
		if (allGraphs[nextId].filters.yAxisType){
			 //GRAPH 10
		    $('#transVsSpendingGraph'+nextId).selectpicker({
			  size: 2,
			  width: "150px"
			});
			$('#transVsSpendingGraph'+nextId).addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
			$('#transVsSpendingGraph'+nextId).on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
		 		 allGraphs[nextId].filters.yAxisType = $(event.target[clickedIndex]).data("yaxistype");
			});
		
		}
		
		
		$('#calendarCheckbox'+nextId).parent().show();
		
		
		$('#filters'+nextId).show();
		$('#graphContainer'+nextId).show();
		requestData(nextId);
	}
	
  	
});	
  
 

  
 

