<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE html>



<html>




<head>
<title>DUSA Data App</title>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="graphs/graphVlad.js"></script>
<script src="http://code.highcharts.com/highcharts.js"></script>

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


					<!-- <div class=" form-group ">
						<input type="checkbox" data-id="2" name="fancy-checkbox-default"
							id="calendarCheckbox2" autocomplete="off" />
						<div class=" btn-group ">
							<label for="calendarCheckbox2" class="btn btn-default btn-sm ">
								<span class=" glyphicon glyphicon-ok "></span> <span> </span>
							</label> <label for="calendarCheckbox2"
								class=" btn btn-default btn-sm active "> Other graph </label>
						</div>
					</div> -->




				</div>
			


				<div style="margin-top:10px;">
					<button type="button" class="btn btn-primary btn-sm filterButton" onClick="filterMultipleGraphs()">Apply calendar</button>
				</div>




				

			</div>


		</div>

		<div class="panel panel-default">

			<div class="panel-body">
				<div id="graph9">
					<div id="loadingOverlay9" class="loadingOverlay">
						<div id="spinnerContainer9" class="spinnerContainer"></div>
						<div id="spinnerTextContainer9" class="spinnerTextContainer">Fetching...</div>
					</div>
				</div>

				<div id="filters9" class="filtersContainer" style="display: none">

					<div class="filterItem">
						<label for="selectpickerLocationGraph9">Location</label>
						<div class="input-group">
							<select id="selectpickerLocationGraph9" multiple>
								<option data-outlet="235">DOJ Catering</option>
								<option data-outlet="236">Air Bar </option>
								<option data-outlet="237">Floor Five</option>
								<option data-outlet="238">Library</option>
								<option data-outlet="239">Spare</option>

								<option data-outlet="240">Food on Four</option>
								<option data-outlet="241">Liar bar </option>
								<option data-outlet="242">Mono</option>
								<option data-outlet="243">Ents</option>
								<option data-outlet="343">Remote Campus Shop</option>

								<option data-outlet="456">DUSA The Union Marketplace</option>
								<option data-outlet="2676">Premier Shop</option>
								<option data-outlet="2677">College Shop</option>
								<option data-outlet="2679">Ninewells Shop</option>
							</select>
						</div>

					</div>

					<div class="filterItem">
						<label for="transVsSpendingGraph9">Type</label>
						<div class="input-group">
							<select id="transVsSpendingGraph9">
								<option data-yaxistype="1">Total spending</option>
								<option data-yaxistype="2">Total transactions </option>
							</select>
						</div>
					</div>

					<div class="filterItem">
						<button type="button" class="btn btn-primary btn-sm filterButton"
							onClick="requestData(9)">Filter</button>
					</div>
				</div>

			</div>
		</div>



		<div class="graph_container"></div>



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