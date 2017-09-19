$( document ).ready(function() {
   
 
    var spinner = new Spinner({top:'35%', width: 1, length:20, radius:15}).spin();
  	document.getElementById("spinnerContainer").appendChild(spinner.el);
});



function uploadData(){

	 var file = document.getElementById("fileInput").files[0];
         
        
     if (!file) {
        updateStatusMessage("select file!", false);
     }
     else{
        	
        	updateSpinnerMessage("reading data...");
        	updateStatusMessage("", true);
			document.getElementById("loadingOverlay").style.display = "inherit";
          	startWorker(file);
         
     }

}

function cancelUpload(){
	
	finishWork("Upload cancelled", false);
}

function stopWorker() { 
	if (w !== undefined){
		w.terminate();
    	w = undefined;
	}
    
}


function finishWork(message, success){
	stopWorker();
	document.getElementById("loadingOverlay").style.display = "none";
	updateStatusMessage(message, success);

}
function updateSpinnerMessage(message){
	document.getElementById("spinnerTextContainer").innerHTML = message;
}

function updateStatusMessage(message, success){
	if (success){
		document.getElementById("messageDiv").style.color = "green";
	}
	else {
		document.getElementById("messageDiv").style.color = "red";
	}
	document.getElementById("messageDiv").innerHTML = message;
}

var w;
function startWorker(file) {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("upload/parserWorker.js");
            
            w.addEventListener('message', function(e) {
            	
              if (e.data.log){
              	 console.log('Worker said: ', e.data.log);
              }
             
              if (e.data.success){
             
              	//handle success
              	finishWork("Uploaded successfully!", true);
              	addUploadRecord(e.data.success, file.name);
              }
              else if (e.data.error){
              	//handle error
              	finishWork(e.data.error, false);
              }
              
              if (e.data.spinnerMessageUpdate){
              	  updateSpinnerMessage(e.data.spinnerMessageUpdate);
              }
              
              
			  
			}, false);
			            
            w.postMessage(file);
        }
    
    } else {
    	updateStatusMessage("Sorry! No Web Worker support. Start using a normal browser!", false);
    }
}

//TODO: disable cancel button when started to do request
//TODO: 


function addUploadRecord(dataStr, fileName){

	var obj = JSON.parse(dataStr);
	
	$('#tableBody').prepend('<tr><td>'+fileName+'</td><td>'+obj.periodStart+'</td><td>'+obj.periodEnd+'</td></tr>');


}


