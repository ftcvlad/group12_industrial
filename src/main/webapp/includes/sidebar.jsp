<link rel="stylesheet" href="includes/sidebarStyles.css">
<!-- tag for sidebar -->
    <div id="sidebar">
       
  		<button onclick="location.href='index.jsp'" class="module_button" >
           <div>
               <image class="module_button_image" src="images/DLOG.png"></image>
           </div>
        </button>
  
  
       	<button onclick="location.href='upload'" class="module_button <c:if test="${page == 'upload'}">selectedMenuItem</c:if>" id="uploadBtn">
           Upload
           <div>
               <image class="module_button_image" src="images/upload.png"></image>
           </div>
        </button>
        
        <div id="graphButtons">
	        <button onclick="location.href='dashboard'" class="module_button <c:if test="${page == 'dashboard'}">selectedMenuItem</c:if>">
		            Graph dashboard
		            <div>
		                <image class="module_button_image" src="images/graph.png"></image>
		            </div>
		    </button>
	        
	        <div id="graphCategoryButtons">
	        	<button onclick="location.href='timeGraphs'" class="module_button  <c:if test="${page == 'exploreTime'}">selectedMenuItem</c:if>">
		            Explore time
		            <div>
		                <image class="module_button_image" src="images/graph.png"></image>
		            </div>
		        </button>
		        
		        <button onclick="location.href='behaviourGraphs'" class="module_button  <c:if test="${page == 'exploreBehaviour'}">selectedMenuItem</c:if>">
		            Explore behaviour
		            <div>
		                <image class="module_button_image" src="images/graph.png"></image>
		            </div>
		        </button>
		        
		        <button onclick="location.href='entitiesGraphs' " class="module_button  <c:if test="${page == 'exploreEntities'}">selectedMenuItem</c:if>">
		            Explore entities
		            <div>
		                <image class="module_button_image" src="images/graph.png"></image>
		            </div>
		        </button>
	        
	        
	        </div>
        
        </div>

        
        <button onclick="location.href='settings'" class="module_button <c:if test="${page == 'settings'}">selectedMenuItem</c:if>">
            Settings
            <div>
                <image class="module_button_image" src="images/settings.png"></image>
            </div>
        </button>
        
    </div>
    
    <!--  and a little nav -->
   
    	<ul class="nav nav-pills ">
		  <li  class="pull-right" role="presentation"><a href="#">Sign in</a></li>
		  <li style="border-right: solid 1px white" class="pull-right" role="presentation"><a href="#">Sign up</a></li>
		</ul>
   
	