<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %> 
<!DOCTYPE html>



<html>


<head>
    <title>DUSA Data App</title>
  	<link rel="stylesheet" href="emptyPageStyles.css">
  	<link
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
	crossorigin="anonymous">
</head>

<body>

    <%@ include file="includes/sidebar.jsp" %>

	
    <div class="main_content">
		
		
			<div class="panel panel-default" >

				<div class="panel-heading">
					<ol>
						<li> <h4>Upload data</h4></li>
						<li> <h4>Explore data</h4></li>
						<li> <h4>Pin your favorite graphs to dashboard</h4></li>
					</ol>
				</div>
				<div class="panel-body">
					
				
					<div >
			
			
					 <ul>
						  <li> <a href="#" onclick="location.href='upload'">Upload </a></li>
						  <li> <a href="#"  onclick="location.href='dashboard'" >Dashboard </a></li>
						  <li>
						  	<a href="#"  onclick="location.href='timeGraphs'" >Explore time </a>
						  	<ul>
						  		<li> <a href="#" onclick="location.href='timeGraphs#graph11'" >Customer base growth</a></li>
						  		<li> <a href="#" onclick="location.href='timeGraphs#graph10'" >Sales over time</a></li>
						  	</ul>
						  </li>
						  <li>
						  	<a href="#" onclick="location.href='behaviourGraphs'">Explore behaviour </a>
						  	<ul>
						  		<li> <a href="#" onclick="location.href='behaviourGraphs#graph13'" >Customer segments</a></li>
						  		<li> <a href="#" onclick="location.href='behaviourGraphs#graph12'" >Daily buying behaviour</a></li>
						  		<li> <a href="#" onclick="location.href='behaviourGraphs#graph2'" >Total spending per weekday</a></li>
						  	</ul>
						  </li>
						  <li>
						  	<a href="#" onclick="location.href='entitiesGraphs' " >Explore entities </a>
						  	<ul>
						  		<li> <a href="#" onclick="location.href='entitiesGraphs#graph9'"  >Spending distribution</a></li>
						  		<li> <a href="#" onclick="location.href='entitiesGraphs#graph6'"  >Location statistics</a></li>
						  	</ul>
						  </li>
						  <li> <a href="#" onclick="location.href='settings'">Settings </a></li>
					  </ul>
					 
					</div>
				</div>
			</div>
		
			
		
		
		
    </div>
	
	
	
</body>
</html>