<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page isELIgnored="false"%>

<!DOCTYPE html>



<html>




<head>
<title>DUSA Data App</title>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="graphs/graphVlad.js"></script>
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
<script lang="javascript" src="libs/spinner.min.js"></script>

</head>

<body>

	<%@ include file="../includes/sidebar.jsp"%>

	<div class="main_content">

		<div class="panel panel-default" id="accordion">

			
			<div class="panel-heading">
		      <h4 class="panel-title">
		        <!-- <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#calendar">
		          Calendar
		        </a>-->
		        Calendar
		      </h4>
		    </div>
			

			<div id="calendar" class="panel-body">
				<div id="datepickerHolder">
					<div class="form-group datepicker">
						<div class='input-group date' id='datetimepickerStart'>
							<span class="input-group-addon" id="basic-addon1">Start</span> 
							<input	type='text' class="form-control" /> 
							<span class="input-group-addon"> 
								<span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>


					<div class="form-group datepicker">
						<div class='input-group date' id='datetimepickerEnd'>
							<span class="input-group-addon" id="basic-addon1">End&nbsp;
							</span> <input type='text' class="form-control" /> <span
								class="input-group-addon"> <span
								class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
				</div>

				<div id="calendarCheckboxes">
					<div class=" form-group ">
						<input type="checkbox" data-id="9" name="fancy-checkbox-default"
							id="calendarCheckbox9" autocomplete="off" />
						<div class="btn-group ">
							<label for="calendarCheckbox9" class=" btn btn-default btn-sm ">
								<span class=" glyphicon glyphicon-ok "></span> <span> </span>
							</label> <label for="calendarCheckbox9"
								class=" btn btn-default btn-sm active "> Spending
								distribution </label>
						</div>
					</div>

					<div class=" form-group ">
						<input type="checkbox" data-id="6" name="fancy-checkbox-default"
							id="calendarCheckbox6" autocomplete="off" />
						<div class=" btn-group ">
							<label for="calendarCheckbox6" class="btn btn-default btn-sm ">
								<span class=" glyphicon glyphicon-ok "></span> <span> </span>
							</label> <label for="calendarCheckbox6"
								class=" btn btn-default btn-sm active ">Location statistics</label>
						</div>
					</div>

					<!-- GRAPH 2
					<div class=" form-group ">
						<input type="checkbox" data-id="2" name="fancy-checkbox-default"
							id="calendarCheckbox6" autocomplete="off" />
						<div class=" btn-group ">
							<label for="calendarCheckbox6" class="btn btn-default btn-sm ">
								<span class=" glyphicon glyphicon-ok "></span> <span> </span>
							</label> <label for="calendarCheckbox5"
								class=" btn btn-default btn-sm active ">Location statistics</label>
						</div>
					</div>
					-->
					
				</div>
			
				<div style="margin-top:10px;">
					<button type="button" class="btn btn-primary btn-sm filterButton" onClick="filterMultipleGraphs()">Apply calendar</button>
				</div>

			</div>


		</div>

		<!-- GRAPH 9 -->
	    <jsp:include page="/includes/graphComponent.jsp">
	        <jsp:param name="graphId" value="9"/>
	        <jsp:param name="locationFilter" value="true"/>
	        <jsp:param name="transSpendingFilter" value="true"/>
	    </jsp:include>
		

		<!-- GRAPH 6 -->
		<jsp:include page="/includes/graphComponent.jsp">
	        <jsp:param name="graphId" value="6"/>
	        <jsp:param name="locationFilter" value="false"/>
	        <jsp:param name="transSpendingFilter" value="false"/>
	    </jsp:include>
	    
	    <!-- GRAPH 2 -->
		<jsp:include page="/includes/graphComponent.jsp">
	        <jsp:param name="graphId" value="2"/>
	        <jsp:param name="locationFilter" value="false"/>
	        <jsp:param name="transSpendingFilter" value="false"/>
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
