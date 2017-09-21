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


var graphTypes = {
	"totalSpending": 1,
	"totalTransactions": 2
};
$( document ).ready(function() {
   
 	var filters = {
 		//locations: [235, 236, 237, 238, 239, 240, 241, 242, 243, 343, 456, 2676, 2677, 2679],
 		locations: [236, 237, 239],
 		graphType:  graphTypes.totalSpending//transactions vs spending
 	};
 	
    $.ajax({
    	url: "graphVlad", 
    	method: "GET",
    	contentType: "application/x-www-form-urlencoded",
    	data: {"filters":JSON.stringify(filters)},
    	dataType:'json', 
    	success: function(data){
        	
        	plotGraph9(data);
    	},
    	error: function(jqXHR, textStatus, errorThrown){
    		alert(textStatus);
    	
    	}
    });
  	
  	
  	
  	
  	
  function plotGraph9(data){
  	console.log(data);
  
  }
});