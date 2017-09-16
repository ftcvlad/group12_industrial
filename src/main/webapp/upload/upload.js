$( document ).ready(function() {
    
 
    //$("#uploadBtn").addClass("selected");
  
});



function uploadData(){
	 var file = document.getElementById("fileInput").files[0];
         
     if (!file) {
        alert('no file');
     }
     else{
        
          	var reader = new FileReader();

		    reader.onload = function(e) {
		 
		      var data = e.target.result;
		      var workbook = XLSX.read(data, {
		        type: 'binary'
		      });

		      var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:'A'})
		      var json_object = JSON.stringify(XL_row_object);
		     
		    
		    
		      $.ajax({
		      
			      	url: "upload", 
			      	method: "POST",
			      	//contentType:"application/json; charset=utf-8",
			      	cache: false,
			      	data: {'parsedXls': json_object},
			      	success: function(result){
			        	console.log(result);
			        	
			        	//TODO: some message
			    	},
			    	error: function(jqXHR, textStatus, errorThrown ){
			    		alert(errorThrown);
			    		//TODO: some error message
			    	}
		    	
		    	});
		
		    };
		
		    reader.onerror = function(ex) {
		      console.log(ex);
		      //TODO: some error message
		    };
		
		    reader.readAsBinaryString(file);
         
     }

}


