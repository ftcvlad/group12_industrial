
var allGraphs = {
	"2": {
		filters:{
		   id: 2,
		   locations: allLocations.slice()
	   },
	   fetching: false,
	   plotData: plotGraph2,
	   spinner: null,
	   url: 'behaviourGraphs'
	},
	 "12":{
	 	filters:{
			id: 12,
			locations: allLocations.slice()
		},
		fetching: false,
		plotData: plotGraph12,
		spinner: null,
		url: 'behaviourGraphs'
	 },
	 "13":{
	 	filters:{
			id: 13,
			locations: allLocations.slice()
		},
		fetching: false,
		plotData: plotGraph13,
		spinner: null,
		url: 'behaviourGraphs'
	 }
};



var isDashboard = false;


$( document ).ready(function() {
   
   
   	 //GRAPH 2
	$('#selectpickerLocationGraph2').selectpicker({
	  size: 14,
	  actionsBox: true,
	  width: "150px"
	 
	});
	$('#selectpickerLocationGraph2').addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
	$('#selectpickerLocationGraph2').selectpicker('selectAll');
	
	
	$('#selectpickerLocationGraph2').on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
			 	
	 	if (clickedIndex === undefined){//select/deselect all
	 		 var firstSelected = $(event.target[0]).is(':selected');
	 		allGraphs["2"].filters.locations = (firstSelected === true) ? allLocations.slice() : [] ;
	 	}
	 	else{//select/deselect 1 option
	 		var outletRef = $(event.target[clickedIndex]).data("outlet");
	 		newValue === true ? allGraphs["2"].filters.locations.push(outletRef) : allGraphs["2"].filters.locations.splice(allGraphs["2"].filters.locations.indexOf(outletRef), 1);
	 	}
	 	
	});
   
   
   	//GRAPH 12
	$('#selectpickerLocationGraph12').selectpicker({
	  size: 14,
	  actionsBox: true,
	  width: "150px"
	 
	});
	$('#selectpickerLocationGraph12').addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
	$('#selectpickerLocationGraph12').selectpicker('selectAll');
	
	
	$('#selectpickerLocationGraph12').on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
			 	
	 	if (clickedIndex === undefined){//select/deselect all
	 		 var firstSelected = $(event.target[0]).is(':selected');
	 		allGraphs["12"].filters.locations = (firstSelected === true) ? allLocations.slice() : [] ;
	 	}
	 	else{//select/deselect 1 option
	 		var outletRef = $(event.target[clickedIndex]).data("outlet");
	 		newValue === true ? allGraphs["12"].filters.locations.push(outletRef) : allGraphs["12"].filters.locations.splice(allGraphs["12"].filters.locations.indexOf(outletRef), 1);
	 	}
	 	
	});
	
	
   
    //GRAPH 13
	$('#selectpickerLocationGraph13').selectpicker({
	  size: 14,
	  actionsBox: true,
	  width: "150px"
	 
	});
	$('#selectpickerLocationGraph13').addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
	$('#selectpickerLocationGraph13').selectpicker('selectAll');
	
	
	$('#selectpickerLocationGraph13').on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
			 	
	 	if (clickedIndex === undefined){//select/deselect all
	 		 var firstSelected = $(event.target[0]).is(':selected');
	 		allGraphs["13"].filters.locations = (firstSelected === true) ? allLocations.slice() : [] ;
	 	}
	 	else{//select/deselect 1 option
	 		var outletRef = $(event.target[clickedIndex]).data("outlet");
	 		newValue === true ? allGraphs["13"].filters.locations.push(outletRef) : allGraphs["13"].filters.locations.splice(allGraphs["13"].filters.locations.indexOf(outletRef), 1);
	 	}
	 	
	});
   

	$('#filters13').show();
	requestData(13);
	

	$('#filters12').show();
	requestData(12);



	//GRAPH 2
	$('#filters2').show();
	requestData(2);
  	
});
  
  