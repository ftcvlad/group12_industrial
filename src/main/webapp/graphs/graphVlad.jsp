<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %> 
<!DOCTYPE html>



<html>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>

<head>
    <title>DUSA Data App</title>
  	<link rel="stylesheet" href="styles.css">
</head>

<body>

    <%@ include file="includes/sidebar.jsp" %>

    <div class="main_content">
    
		<div class="graph_container">
			<div id="piechart1">
			</div>
		</div>
		
		
		
    </div>
	

</body>
</html>