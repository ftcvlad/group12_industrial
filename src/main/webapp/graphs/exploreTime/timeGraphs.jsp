<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page isELIgnored="false"%>

<!DOCTYPE html>



<html>




<head>
<title>DUSA Data App</title>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="http://code.highcharts.com/highcharts.js"></script>

<script type="text/javascript" src="libs/highchartPlugins.js"></script>

<link
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
	crossorigin="anonymous">

<link rel="stylesheet" href="graphs/graphVlad.css">
<link rel="stylesheet" href="libs/bootstrap-select.min.css">

<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css">

<script src="libs/bootstrap-select.min.js"></script>


<script src= "graphs/plotFunctions/plotGraph10.js"></script>
<script src= "graphs/plotFunctions/plotGraph11.js"></script>
<script lang="javascript" src="graphs/allGraphJs.js"></script>
<script lang="javascript" src="graphs/exploreTime/timeGraphsJs.js"></script>

<script lang="javascript" src="libs/spinner.min.js"></script>

</head>

<body>

	<%@ include file="../../includes/sidebar.jsp"%>

	<div class="main_content">


		<!--  Calendar -->
		
		<jsp:include page="/includes/calendarComponent.jsp">
	         <jsp:param name="graphChecboxId" value="10" />
	          <jsp:param name="graphChecboxId" value="11" />
	    </jsp:include>
		
		
		<!-- GRAPH 11 -->
		<jsp:include page="/includes/graphComponent.jsp">
	        <jsp:param name="graphId" value="11"/>
	        <jsp:param name="locationFilter" value="true"/>
	        <jsp:param name="transSpendingFilter" value="false"/>
	    </jsp:include>

		<!-- GRAPH 10 -->
		<jsp:include page="/includes/graphComponent.jsp">
	        <jsp:param name="graphId" value="10"/>
	        <jsp:param name="locationFilter" value="true"/>
	        <jsp:param name="transSpendingFilter" value="true"/>
	    </jsp:include>


		
	</div>


	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
	<script type="text/javascript"
		src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>

	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
		integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4"
		crossorigin="anonymous"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"
		integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1"
		crossorigin="anonymous"></script>

</body>
</html>