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
<link rel="stylesheet"	href="libs/bootstrap-select.min.css">
<script src="libs/bootstrap-select.min.js"></script>
<script lang="javascript" src="libs/spinner.min.js"></script>

</head>

<body>

	<%@ include file="../includes/sidebar.jsp"%>

	<div class="main_content">

		<div class="panel panel-default">

			<div class="panel-body">
				<div id="graph9">
					<div id="loadingOverlay">
						<div id="spinnerContainer" ></div>
						<div id="spinnerTextContainer">Fetching...</div>
					</div>
				</div>
				
				<div id="filters9" class="filtersContainer" style="display: none">

					<div class="filterItem" >
					    <label for="selectpickerLocationGraph9">Location</label>
					    <div class="input-group">
						    <select id="selectpickerLocationGraph9"  multiple>
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
						<button type="button" class="btn btn-primary btn-sm filterButton" onClick="requestData()">Filter</button>
					</div>
					
					
					
			

				</div>

			</div>
		</div>



		<div class="graph_container"></div>



	</div>

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