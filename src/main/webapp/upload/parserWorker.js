
importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.11.3/xlsx.core.min.js');


	

function js_xlsx(file){
			var reader = new FileReader();

		    reader.onload = function(e) {
	
		      var data = e.target.result;
		      self.postMessage({"log": ("reading data...: "+new Date().getTime()) });
		      var workbook = XLSX.read(data, {
		        type: 'binary'
		      });
		      
		      self.postMessage({"log": ("read data: "+new Date().getTime()) });
		      
		       
		 	
		 	  
		    
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
		     

			var paymentTypeMap = {
				"Payment": 1,
				"Discounted payment": 2,
				"Redemption": 3,
				"Refund": 4,
				"Reversal": 5
			
			};

		      for (var i=0; i<XL_row_object1.length;i++){
		      		XL_row_object1[i]["A"] = XL_row_object2[i]["A"];//add date
		      		XL_row_object1[i]["F"] = XL_row_object1[i]["F"].substr(5);//remove 'dusa-'
		      		XL_row_object1[i]["G"] = paymentTypeMap[XL_row_object1[i]["G"]];//convert payment type to number
		      }
		      
		   
		 	  
		 	 self.postMessage({"log": ("converted to json: "+new Date().getTime()) });
		    
		     
		    
		    
		    	
		    	
		    	
		    	ajax("/group12/upload",  XL_row_object1, function(data) {
				   //do something with the data like:
				    self.postMessage({"log": ("success: "+new Date().getTime()) });
				}, function (data){
					self.postMessage({'error':data});
				}, 'POST');
		    	
		
		    };
		
		    reader.onerror = function(ex) {
		      console.log(ex);
		      //TODO: some error message
		    };
		
		    reader.readAsBinaryString(file);


}




self.addEventListener('message', function(e) {
  //self.postMessage(e.data);
  
  js_xlsx(e.data);
}, false);



var ajax = function(url, XL_row_object1, successCallback, failCallback, type) {

  
  var req = new XMLHttpRequest();
  req.open(type, url, false);
 
  req.setRequestHeader("Content-type", "application/json");
  req.onreadystatechange = function() {
    if (req.readyState === 4 && req.status === 200) {
       successCallback(req.responseText);
    }
    else {
    	failCallback(req.statusText);
    }
  };
  self.postMessage({"log": ("sending data...: "+new Date().getTime()) });
  req.send(JSON.stringify(XL_row_object1));
 
};

///sooooooo
//req.setRequestHeader("Content-type", "application/json");
//req.send(JSON.stringify(XL_row_object1));
//...stringbuilder

//or 

//req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
////req.send("parsedXls="+JSON.stringify(XL_row_object1));//!!!
//httpservletRequest.getParameter('parsedXls')


