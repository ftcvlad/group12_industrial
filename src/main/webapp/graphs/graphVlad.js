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

var allLocations = [235, 236, 237, 238, 239, 240, 241, 242, 243, 343, 456, 2676, 2677, 2679];


//initial values

var allGraphs = {
	"9": {
		filters:{
			locations: allLocations.slice(),
			yAxisType:  yAxisTypes.totalSpending//transactions vs spending,
		},
		fetching: false,
		plotData: plotGraph9,
		spinner: null
	 }

};

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
   
   

   
   
   	//TODO: move initialisation for each graph here
   	for (var id in allGraphs) {
	    if (allGraphs.hasOwnProperty(id)) {
	    
	    	allGraphs[id].spinner = new Spinner({top:'50%', width: 1, length:30, radius:15}).spin();
	    	document.getElementById("spinnerContainer"+id).appendChild(allGraphs[id].spinner.el);
	       
	    }
	}
  	
   
	//LOCATIONS selector
    $('#selectpickerLocationGraph9').selectpicker({
	  size: 14,
	  actionsBox: true,
	  width: "150px"
	 
	});
	$('#selectpickerLocationGraph9').addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
	$('#selectpickerLocationGraph9').selectpicker('selectAll');
	
	var graph9LocationsRef = allGraphs["9"].filters.locations;
	$('#selectpickerLocationGraph9').on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
			 	
	 	if (clickedIndex === undefined){//select/deselect all
	 		 var firstSelected = $(event.target[0]).is(':selected');
	 		graph9LocationsRef = (firstSelected === true) ? allLocations.slice() : [] ;
	 	}
	 	else{//select/deselect 1 option
	 		var outletRef = $(event.target[clickedIndex]).data("outlet");
	 		newValue === true ? graph9LocationsRef.push(outletRef) : graph9LocationsRef.splice(graph9LocationsRef.indexOf(outletRef), 1);
	 	}
	});
	
	
	
	//TYPE (total trans/total spending) selector
    $('#transVsSpendingGraph9').selectpicker({
	  size: 2,
	  width: "150px"
	});
	$('#transVsSpendingGraph9').addClass('btn-group-sm').addClass('select-container').selectpicker('setStyle');
	$('#transVsSpendingGraph9').on('changed.bs.select', function ( event, clickedIndex, newValue, oldValue) {
 		 allGraphs["9"].filters.yAxisType = $(event.target[clickedIndex]).data("yaxistype");
	});
    
    
    
    
    $('#filters9').show();
    
    
   
    
    requestData(9);
  	
});	
  
  
  
  
function filterMultipleGraphs(){
	
	for (var i=0; i<calendar.selectedGraphs.length; i++){
		requestData(calendar.selectedGraphs[i]);
	}
}  
  

function appendOverlay(graphId){

	if ($("#loadingOverlay"+graphId).length === 0){
		$("#graph"+graphId).append('<div id="loadingOverlay'+graphId+'">'+
						'<div id="spinnerContainer'+graphId+'" ></div>'+
						'<div id="spinnerTextContainer'+graphId+'">Fetching...</div>'+
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
	
	console.log(filters);
	
	
	
	appendOverlay(graphId);
	allGraphs[graphId].fetching = true;
	
	
  	$.ajax({
    	url: "graphVlad", 
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
  	
 
//GRAPH 9 !!! 	
  function plotGraph9(data){
  

  	var yAxisType = data.yAxisType[0];
  
  	var yAxisTitle = (yAxisType === yAxisTypes.totalSpending) ? "% of all revenue" : "% of all transactions";
  	var xAxisTitle = (yAxisType === yAxisTypes.totalSpending) ? "Percentiles (% of customers spending less)" : "Percentiles (% of customers having fewer transactions)";
  	var title = (yAxisType === yAxisTypes.totalSpending) ? "Spending distribution" : "Transaction distribution";
  
  
  	var categories = [];
  	
  	var a = 100;
  	var percentileStep = 10;
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
