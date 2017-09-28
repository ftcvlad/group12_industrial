function plotGraph13(res){
	
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
	
	var uniqueCustomers = res.length;
	var nextTransactions ;
	for (var i=0; i<res.length; i++){
		nextTransactions = res[i].countTotal +(+(Math.random()-0.5).toFixed(2));//+jittering
		seriesObj[res[i].outletRef].data.push([nextTransactions, res[i].sumTotal]);
	}
	
	var allSeries = [];
	for (var property in seriesObj) {
	    if (seriesObj.hasOwnProperty(property)) {
	    	allSeries.push(seriesObj[property]);
	    }
	}
	
	
	Highcharts.chart('graph13', {
	    chart: {
	        type: 'scatter',
	        zoomType: 'xy',
	        animation: false
	    },
	    title: {
	        text: 'Customer preference scatter'
	    },
	    subtitle: {
	        text: 'Unique customers: '+uniqueCustomers
	    },
	    xAxis: {
	        title: {
	            enabled: true,
	            text: 'Transactions'
	        },
	        startOnTick: true,
	        endOnTick: true,
	        showLastLabel: true,
	        min: 0
	    },
	    yAxis: {
	        title: {
	            text: 'Spending'
	        }
	    },
	    plotOptions: {
	        scatter: {
	            marker: {
	                radius: 2,
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