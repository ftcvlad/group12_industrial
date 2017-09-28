
var allGraphs = {
	"2": {
		filters:{
		   id: 2
	   },
	   fetching: false,
	   plotData: plotGraph2,
	   spinner: null
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
	 }
};



var isDashboard = false;


$( document ).ready(function() {
   
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
	
	
   


	$('#filters12').show();
	requestData(12);



	//GRAPH 2
	$('#filters2').show();
	requestData(2);
  	
});
  
  