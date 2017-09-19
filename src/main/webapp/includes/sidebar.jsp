<link rel="stylesheet" href="includes/sidebarStyles.css">
<!-- tag for sidebar -->
    <div id="sidebar">
        <image id="DusaLogo" src="images/DLOG.png"></images>
  
       	<button onclick="location.href='upload'" class="module_button <c:if test="${page == 'upload'}">selected</c:if>" id="uploadBtn">
           Upload
           <div>
               <image class="module_button_image" src="images/upload.png"></image>
           </div>
        </button>
        
        <button onclick="location.href='http://www.google.com'" class="module_button">
            Graphs
            <div>
                <image class="module_button_image" src="images/graph.png"></image>
            </div>
        </button>
        
        <button onclick="location.href='http://www.google.com'" class="module_button">
            Calendar
            <div>
                <image class="module_button_image" src="images/calendar.png"></image>
            </div>
        </button>
        
        <button onclick="location.href='http://www.google.com'" class="module_button">
            Settings
            <div>
                <image class="module_button_image" src="images/settings.png"></image>
            </div>
        </button>
    </div>