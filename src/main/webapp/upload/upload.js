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
		      console.log(new Date().getTime());
		      var workbook = XLSX.read(data, {
		        type: 'binary'
		      });
		      
		      console.log(new Date().getTime());
		      //set needed columns and key names
		      var arr = [];
		      arr[2] = "C";
		      arr[5] = "F";
		      arr[6] = "G";
		      arr[7] = "I";
		      arr[8] = "J";
		      var XL_row_object1 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:arr, range:1, raw:true})//drop header row and use A,B,C as keys
		     
		     
		      //take dateTime values separately, as i don't know how to specify "raw" property per column
		      var arr2 = [];
		      arr2[0] = "A";
		      var XL_row_object2 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:arr2, range:1, raw:false})
		     

		      for (var i=0; i<XL_row_object1.length;i++){
		      		XL_row_object1[i]["A"] = XL_row_object2[i]["A"];	
		      }
		      
		     console.log(new Date().getTime());
		    
		      $.ajax({
		      
			      	url: "upload", 
			      	method: "POST",
			      	//contentType:"application/json; charset=utf-8",
			      	cache: false,
			      	data: {'parsedXls': JSON.stringify(XL_row_object1)},
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


