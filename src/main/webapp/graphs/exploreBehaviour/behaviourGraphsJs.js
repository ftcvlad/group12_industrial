
var allGraphs = {
	"2": {
		filters:{
		   id: 2
	   },
	   fetching: false,
	   plotData: plotGraph2,
	   spinner: null
	}
};



var isDashboard = false;


$( document ).ready(function() {
   

	$('#filters2').show();
   
	requestData(2);
  	
});
  
  