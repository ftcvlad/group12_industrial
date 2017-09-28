var locationsMap ={
	"235": "DOJ Catering",
	"236": "Air Bar",
	"237": "Floor Five",
	"238": "Library",
	"239": "Spare",
	"240": "Food on Four",
	"241": "Liar bar",
	"242": "Mono",
	"243": "Ents",
	"343": "Remote Campus Shop",
	"456": "DUSA The Union Marketplace",
	"2676": "Premier Shop",
	"2677": "College Shop",
	"2679":"Ninewells Shop"
};

var yAxisTypes = {
	"totalSpending": 1,
	"totalTransactions": 2
};

var allLocations = [235, 236, 237, 238, 239, 240, 241, 242, 243, 343, 456, 2676, 2677, 2679];


var calendar ={
	startDatetime: null,
	endDatetime: null,
	selectedGraphs: []
	
};





$( document ).ready(function() {
   
   
    //CALENDAR
    $('#datetimepickerStart').datetimepicker();
    $('#datetimepickerEnd').datetimepicker({
        useCurrent: false //Important! See issue #1075
    });
    $("#datetimepickerStart").on("dp.change", function (e) {
        $('#datetimepickerEnd').data("DateTimePicker").minDate(e.date);
        
        
        calendar.startDatetime = e.date;//moment.js object
        
    });
    $("#datetimepickerEnd").on("dp.change", function (e) {
        $('#datetimepickerStart').data("DateTimePicker").maxDate(e.date);
        
        calendar.endDatetime = e.date;
    });
   

   	$("#calendarCheckboxes :checkbox").change(function(e){
   		var id = $(this).data("id");
	    if (this.checked){
	    	calendar.selectedGraphs.push(id);
	    }
	    else{
	    	calendar.selectedGraphs.splice(calendar.selectedGraphs.indexOf(id), 1);
	    }
	});
   
   
	//----------------------------------------------------------------------------------------
   
   
   	//TODO: move initialisation for each graph here
   	for (var id in allGraphs) {
	    if (allGraphs.hasOwnProperty(id)) {
	    
	    	allGraphs[id].spinner = new Spinner({top:'50%', width: 1, length:30, radius:15}).spin();
	    	document.getElementById("spinnerContainer"+id).appendChild(allGraphs[id].spinner.el);
	       
	    }
	}
  	
    //----------------------------------------------------------------------------------------
    
    
	
  	//set state of pin buttons
	var pinnedIds = localStorage.getItem("pinnedGraphs");
    if (pinnedIds){
    	pinnedIds = JSON.parse(pinnedIds);
    	$(".pinButton").each(function(index, element) {
    		var id = $(element).data("id");
    		if (pinnedIds.indexOf(id) !== -1){
    			$(element).data('on', 1);
    			$(element).text('Unpin');
    		}  
	    });
    }
  	
  	
});	
  
  
  
function addToDashboard(elem, graphId){


	if (typeof(Storage) !== "undefined") {
	
		var jElem = $(elem);
		var isOn = jElem.data("on");
		
		var pinnedGraphs = localStorage.getItem("pinnedGraphs");
		if (pinnedGraphs === null){
		    pinnedGraphs = [];
		}
		else {
			pinnedGraphs = JSON.parse(pinnedGraphs);
		}
		
		if (isOn === 0){//PIN
		
		    if (pinnedGraphs.indexOf(graphId) === -1){
		    	 pinnedGraphs.push(graphId);
		   		 localStorage.setItem("pinnedGraphs", JSON.stringify(pinnedGraphs));
		    }
		    jElem.text('Unpin');
		   	jElem.data('on', 1);
		    
		}
		else if (isOn === 1){//UNPIN
			
		    var ind = pinnedGraphs.indexOf(graphId);
		    if (ind !== -1){
		    	 pinnedGraphs.splice(ind, 1);
		   		 localStorage.setItem("pinnedGraphs", JSON.stringify(pinnedGraphs));
		    }
		    
		    if (isDashboard){
		    	jElem.parent().parent().hide();
		    	
		    	
		    	
		    	$("#graphContainer"+graphId).hide();
		    	$("#calendarCheckbox"+graphId).parent().hide();
		    	
		    }
		    else{
		    	jElem.text('Pin');
				jElem.data('on', 0);
		    
		    }
		    
		    
		   
		}
	
	   
	} else {
	   alert("your browser doesn't support local storage!");
	}
	
	
}
  
  
function filterMultipleGraphs(){
	
	for (var i=0; i<calendar.selectedGraphs.length; i++){
		requestData(calendar.selectedGraphs[i]);
	}
}  
  

function appendOverlay(graphId){

	if ($("#loadingOverlay"+graphId).length === 0){
		$("#graph"+graphId).append('<div id="loadingOverlay'+graphId+'" class="loadingOverlay">'+
						'<div id="spinnerContainer'+graphId+'" class="spinnerContainer" ></div>'+
						'<div id="spinnerTextContainer'+graphId+'" class="spinnerTextContainer">Fetching...</div>'+
					'</div>');
					
		document.getElementById("spinnerContainer"+graphId).appendChild(allGraphs[graphId].spinner.el);
		
		
		

	}
}

function removeOverlay(graphId){
	$("#loadingOverlay"+graphId).remove();
}


function attachDatetimeFilters(graphId, filters){

	if (calendar.selectedGraphs.indexOf(graphId) !== -1){
		if (calendar.startDatetime === null || calendar.endDatetime === null){
			return false;
		}
		filters.startDatetime = calendar.startDatetime.format("D/M/YYYY hh:mm:ss").toString();
		filters.endDatetime = calendar.endDatetime.format("D/M/YYYY hh:mm:ss").toString();
	}
	else {
		delete filters.startDatetime;
		delete filters.endDatetime; 
	}
	return true;
}

  
function requestData(graphId){
	
	if (allGraphs[graphId].fetching) return;
	
	var filters = allGraphs[graphId].filters;
	
	if (filters.locations && filters.locations.length === 0){
		alert('you must select at least 1 location');
		return;
	}
	
	
	if (!attachDatetimeFilters(graphId, filters)){
		alert('datetime not setup correctly');
		return;
	}
	
	
	//console.log(filters);
	
	appendOverlay(graphId);
	allGraphs[graphId].fetching = true;
	
	
  	$.ajax({
    	url: allGraphs[graphId].url, 
    	method: "GET",
    	contentType: "application/x-www-form-urlencoded",
    	data: {"filters":JSON.stringify(filters)},
    	dataType:'json', 
    	success: function(data){
    		
    		allGraphs[graphId].plotData(data);
    		
        	
    	},
    	error: function(jqXHR, textStatus, errorThrown){
    		removeOverlay(graphId);
    		alert(textStatus);
    	},
    	complete: function(){
    		
    		allGraphs[graphId].fetching = false;
    	}
	});
	
}	
  	
 
