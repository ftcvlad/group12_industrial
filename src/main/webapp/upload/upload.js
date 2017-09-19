$( document ).ready(function() {
    var spinner = new Spinner({top:'35%', width: 1, length:20, radius:15}).spin();
	document.getElementById("spinnerContainer").appendChild(spinner.el);
 
    //$("#uploadBtn").addClass("selected");
  
});



function uploadData(){
	 var file = document.getElementById("fileInput").files[0];
         
        
     if (!file) {
        alert('no file');
     }
     else{
        	
          	startWorker(file);
         
     }

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
              }
              else if (e.data.error){
              	//handle error
              	console.log('error handler!');
              }
              
              
			  
			}, false);
			            
            w.postMessage(file);
        }
    
    } else {
        document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
    }
}

function stopWorker() { 
    w.terminate();
    w = undefined;
}




