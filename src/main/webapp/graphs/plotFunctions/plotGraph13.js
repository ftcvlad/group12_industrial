function plotGraph13(res){


	console.log(res);
	
	/*var seriesObj = {
		"235": {name: "DOJ catering", color: "", data: [], shadow: false},
		"236": {name: "Air Bar", color: "", data: [], shadow: false},
		"237": {name: "Floor Five", color: "", data: [], shadow: false},
		"238": {name: "Library", color: "", data: [], shadow: false},
		"239": {name: "Spare", color: "", data: [], shadow: false},
		"240": {name: "Food on Four", color: "", data: [], shadow: false},
		"241": {name: "Liar bar", color: "", data: [], shadow: false},
		"242": {name: "Mono", color: "", data: [], shadow: false},
		"243": {name: "Ents", color: "", data: [], shadow: false},
		"343": {name: "Remote Campus Shop", color: "", data: [], shadow: false},
		"456": {name: "DUSA The Union Marketplace", color: "", data: [], shadow: false},,
		"2676": {name: "Premier Shop", color: "", data: [], shadow: false},
		"2677": {name: "College Shop", color: "", data: [], shadow: false},,
		"2679": {name: "Ninewells Shop", color: "", data: [], shadow: false},
	};*/

	var seriesObj = {
		"235": {name: "DOJ catering", color:"rgba(250, 190, 190, 1)", data: [], shadow: false},
		"236": {name: "Air Bar", color:"rgba(60, 180, 75, 1)", data: [], shadow: false},
		"237": {name: "Floor Five", color:"rgba(240, 50, 230, 1)", data: [], shadow: false},
		"238": {name: "Library", color:"rgba(170, 255, 195, 1)", data: [], shadow: false},
		"239": {name: "Spare",  color:"rgba(245, 130, 48, 1)", data: [], shadow: false},
		"240": {name: "Food on Four", color:"rgba(145, 30, 180, 1)", data: [], shadow: false},
		"241": {name: "Liar bar",  color:"rgba(225, 225, 25, 1)", data: [], shadow: false, shadow: false},
		"242": {name: "Mono",  color:"rgba(0, 130, 200, 1)", data: [], shadow: false},
		"243": {name: "Ents",  color:"rgba(230, 25, 75, 1)", data: [], shadow: false},
		"343": {name: "Remote Campus Shop",  color:"rgba(0, 128, 128, 1)", data: [], shadow: false},
		"456": {name: "DUSA The Union Marketplace",  color:"rgba(230, 190, 255, 1)",  data: [], shadow: false},
		"2676": {name: "Premier Shop",  color:"rgba(170, 110, 40, 1)",  data: [], shadow: false},
		"2677": {name: "College Shop",  color:"rgba(255, 250, 200, 1)", data: [], shadow: false},
		"2679": {name: "Ninewells Shop",  color:"rgba(128, 0, 0, 1)",  data: [], shadow: false},
	};
	
	for (var i=0; i<res.length; i++){
		seriesObj[res[i].outletRef].data.push([res[i].countTotal, res[i].sumTotal]);
	
	}
	
	var allSeries = [];
	for (var property in seriesObj) {
	    if (seriesObj.hasOwnProperty(property)) {
	    	//if (property != 241){
	    		allSeries.push(seriesObj[property]);
	    	//}
	    
	        
	    }
	}
	
	console.log(allSeries);
	
	Highcharts.chart('graph13', {
	    chart: {
	        type: 'scatter',
	        zoomType: 'xy',
	        animation: false
	    },
	    title: {
	        text: 'Height Versus Weight of 507 Individuals by Gender'
	    },
	    subtitle: {
	        text: 'Source: Heinz  2003'
	    },
	    xAxis: {
	        title: {
	            enabled: true,
	            text: 'Spending'
	        },
	        startOnTick: true,
	        endOnTick: true,
	        showLastLabel: true,
	        min: 0
	    },
	    yAxis: {
	        title: {
	            text: 'Transactions'
	        }
	    },
	  /*  legend: {
	        layout: 'vertical',
	        align: 'left',
	        verticalAlign: 'top',
	        x: 100,
	        y: 70,
	        floating: true,
	        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
	        borderWidth: 1
	    },*/
	    plotOptions: {
	        scatter: {
	            marker: {
	                radius: 3,
	                states: {
	                    hover: {
	                        enabled: true,
	                        lineColor: 'rgb(100,100,100)'
	                    }
	                }
	            },
	            states: {
	                hover: {
	                    marker: {
	                        enabled: false
	                    }
	                }
	            },
	            pointStart: 0,
	            tooltip: {
	            	animation:false,
	                headerFormat: '<b>{series.name}</b><br>',
	                pointFormat: 'trans: {point.x},  \u00A3: {point.y} '
	            }
	        }
	    },
	    series: allSeries
	});
	

	
	

}