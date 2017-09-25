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


//initial values

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
	 },
	 "2": {
		 	filters:{
				id: 2
			},
			fetching: false,
			plotData: plotGraph2,
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
   
   
	//----------------------------------------------------------------------------------------
   
   
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
    
     $('#filters6').show();
    
   
    
     requestData(9);
     requestData(6);
  	
});	
  
  
  
  
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
  
  
  //GRAPH 6 !!! 	
  function plotGraph6(data){

	var totalSpending = data.map(function(next) {
	   return {name: locationsMap[next.C] , y: next.sumTotal };
	});
	
	var uniqueCustomers = data.map(function(next) {
	   return {name: locationsMap[next.C] , y: next.uniqueCustomers };
	});
	
	var totalTransactions = data.map(function(next) {
	   return {name: locationsMap[next.C] , y: next.countTotal };
	});
  	 
  	 var chart = new Highcharts.Chart('graph6', {
		
		chart: {
		    type: 'pie'
		},
		title: {
		    text: 'Location statistics'
		},
		legend:{
			enabled:true
		},
		series: [{
		    data: totalSpending,
		    center: ['20%'],
		    name: 'Total spending',
		    title: {
	            // align: 'left',
	            // x: 0
	            // style: { color: XXX, fontStyle: etc }
	            text: '<b>Total spending</b>',
	            verticalAlign: 'top',
	            y: -40
       		},
       		showInLegend:true
		},
		{
		    data: totalTransactions,
		    center: ['50%'],
		   
		    name: 'Total transactions',
		    title: {
	            text: '<b>Total transactions</b>',
	            verticalAlign: 'top',
	            y: -40
       		},
       		showInLegend:false
		},
		{
		    data: uniqueCustomers,
		    center: ['80%', '50%'],
		    name: 'Unique customers',
		     innerSize: '35%',
		    title: {
	            text: '<b>Unique customers</b>',
	            verticalAlign: 'top',
	            y: -40
       		},
       		showInLegend:false
		}],
		plotOptions: {
		    pie: {
		        dataLabels: {
		            enabled: false
		        },
		        cursor: 'pointer', 
				allowPointSelect: true   ,
				size: "60%"        
		    }            
		}
	}, function(chart) {//https://stackoverflow.com/questions/16730755/two-pies-one-legend-with-unique-items-merge-legends
            
        $(chart.series[0].data).each(function(i, e) {
            e.legendItem.on('click', function(event) {
                var legendItem=e.name;
                
                event.stopPropagation();
                
                $(chart.series).each(function(j,f){
                       $(this.data).each(function(k,z){
                           if(z.name==legendItem) {
                               if(z.visible){
                                   z.setVisible(false);
                               }
                               else{
                                   z.setVisible(true);
                               }
                           }
                       });
                });
                
            });
            
        });
     });
  	 
  	//GRAPH 2
  	  function plotGraph6(data){

  		var totalSpending = data.map(function(next) {
  		   return {name: locationsMap[next.C] , y: next.sumTotal };
  		});
  		
  		var uniqueCustomers = data.map(function(next) {
  		   return {name: locationsMap[next.C] , y: next.uniqueCustomers };
  		});
  		
  		var totalTransactions = data.map(function(next) {
  		   return {name: locationsMap[next.C] , y: next.countTotal };
  		});
  	  	 
  	  	 var chart = new Highcharts.Chart('graph2', {
  			
  			chart: {
  			    type: 'pie'
  			},
  			title: {
  			    text: 'Location statistics'
  			},
  			legend:{
  				enabled:true
  			},
  			series: [{
  			    data: totalSpending,
  			    center: ['20%'],
  			    name: 'Total spending',
  			    title: {
  		            // align: 'left',
  		            // x: 0
  		            // style: { color: XXX, fontStyle: etc }
  		            text: '<b>Total spending</b>',
  		            verticalAlign: 'top',
  		            y: -40
  	       		},
  	       		showInLegend:true
  			},
  			{
  			    data: totalTransactions,
  			    center: ['50%'],
  			   
  			    name: 'Total transactions',
  			    title: {
  		            text: '<b>Total transactions</b>',
  		            verticalAlign: 'top',
  		            y: -40
  	       		},
  	       		showInLegend:false
  			},
  			{
  			    data: uniqueCustomers,
  			    center: ['80%', '50%'],
  			    name: 'Unique customers',
  			     innerSize: '35%',
  			    title: {
  		            text: '<b>Unique customers</b>',
  		            verticalAlign: 'top',
  		            y: -40
  	       		},
  	       		showInLegend:false
  			}],
  			plotOptions: {
  			    pie: {
  			        dataLabels: {
  			            enabled: false
  			        },
  			        cursor: 'pointer', 
  					allowPointSelect: true   ,
  					size: "60%"        
  			    }            
  			}
  		}, function(chart) {//https://stackoverflow.com/questions/16730755/two-pies-one-legend-with-unique-items-merge-legends
  	            
  	        $(chart.series[0].data).each(function(i, e) {
  	            e.legendItem.on('click', function(event) {
  	                var legendItem=e.name;
  	                
  	                event.stopPropagation();
  	                
  	                $(chart.series).each(function(j,f){
  	                       $(this.data).each(function(k,z){
  	                           if(z.name==legendItem) {
  	                               if(z.visible){
  	                                   z.setVisible(false);
  	                               }
  	                               else{
  	                                   z.setVisible(true);
  	                               }
  	                           }
  	                       });
  	                });
  	                
  	            });
  	            
  	        });
  	     });
  	 
  	 
	
  	 
  	 
  	 
  }
