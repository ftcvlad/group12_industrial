
importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.11.3/xlsx.core.min.js');


	

function js_xlsx(file){
			var reader = new FileReader();

		    reader.onload = function(e) {
	
		      var data = e.target.result;
		      self.postMessage({"log": ("reading data...: "+new Date().getTime()) });
		      var workbook = XLSX.read(data, {
		        type: 'binary'
		      });
		      
		      self.postMessage({"log": ("read data: "+new Date().getTime()), "spinnerMessageUpdate": "processing data..." });
		      
		       
		 	
		 	  
		    
		      //set needed columns and key names
		      var arr = [];
		      arr[0] = "A";
		      arr[2] = "C";
		      arr[5] = "F";
		      arr[6] = "G";
		      arr[7] = "H";
		      arr[8] = "I";
		      arr[9] = "J";
		      var XL_row_object1 = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:arr, range:1, raw:false})//drop header row and use A,B,C as keys
		     self.postMessage({"log": ("1: "+new Date().getTime()) });
		     
			
			var paymentTypeMap = {
				"Payment": 1,
				"Discounted payment": 2,
				"Redemption": 3,
				"Refund": 4,
				"Reversal": 5
			
			};
			self.postMessage({"log": ("2: "+new Date().getTime()) });

		      for (var i=0; i<XL_row_object1.length;i++){
		      	
		      		XL_row_object1[i]["F"] = XL_row_object1[i]["F"].substr(5);//remove 'dusa-'
		      		XL_row_object1[i]["G"] = paymentTypeMap[XL_row_object1[i]["G"]];//convert payment type to number
		     		
		     		XL_row_object1[i]["H"] = XL_row_object1[i]["H"].replace(/\u00A3/g, '');
		      		XL_row_object1[i]["I"] = XL_row_object1[i]["I"].replace(/\u00A3/g, '');
		      		XL_row_object1[i]["J"] = XL_row_object1[i]["J"].replace(/\u00A3/g, '');
		      	
		      }
		     // self.postMessage({"log": XL_row_object1 });
			  //reading--read 183sec
		     //read data -- converted to json (308sec) (137sec)
			 //convert to json -- saved 194 sec
		
		 	  
		 	 	self.postMessage({"log": ("converted to json 3: "+new Date().getTime()), "spinnerMessageUpdate": "saving to database..." });
		    
		     
		    	
		    	//TODO: urlencode :) spaces + some sql injection? but not in this life
		    	//+ when inserted not sorted by time
		    	//+ not bold when inserted
		    	//will do for now
		    	ajax("/group12/upload?fileName="+file.name,  XL_row_object1, function(data) {
				    self.postMessage({"log": ("success: "+new Date().getTime()), "success": data });
				}, function (data){
					self.postMessage({'error':data});
				}, 'POST');
		    	
		
		    };
		
		    reader.onerror = function(ex) {
		      self.postMessage({'error':ex});
		    };
		
		    reader.readAsBinaryString(file);


}




self.addEventListener('message', function(e) {
  
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


