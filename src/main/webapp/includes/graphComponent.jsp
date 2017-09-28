<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div id="graphContainer${param.graphId}" class="panel panel-default graphContainer <c:if test="${param.onDashboard == true}">hiddenElement</c:if>"  >

			<div class="pinButtonDiv" >
				<button type="button" data-id="${param.graphId}" data-on="0" class="btn btn-primary btn-sm pinButton" onClick="addToDashboard(this, ${param.graphId})">Pin</button>
			
			</div>
			
			<div class="panel-body">
				
			
			
				<div id="graph${param.graphId}">
					<div id="loadingOverlay${param.graphId}" class="loadingOverlay">
						<div id="spinnerContainer${param.graphId}" class="spinnerContainer"></div>
						<div id="spinnerTextContainer${param.graphId}" class="spinnerTextContainer">Fetching...</div>
					</div>
				</div>

				<div id="filters${param.graphId}" class="filtersContainer" style="display: none">

					<c:if test="${param.locationFilter == true}">
						<div class="filterItem">
							<label for="selectpickerLocationGraph${param.graphId}">Location</label>
							<div class="input-group">
								<select id="selectpickerLocationGraph${param.graphId}" multiple>
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
						
					</c:if>


					<c:if test="${param.transSpendingFilter == true}">
						<div class="filterItem">
							<label for="transVsSpendingGraph${param.graphId}">Type</label>
							<div class="input-group">
								<select id="transVsSpendingGraph${param.graphId}">
									<option data-yaxistype="1">Total spending</option>
									<option data-yaxistype="2">Total transactions </option>
								</select>
							</div>
						</div>
					</c:if>
					
					<c:if test="${param.comparisonFilter == true}">
						<div class="filterItem">
							<label for="comparisonCheckbox${param.graphId}">Comparison</label>
							<div class="input-group">
								 <input checked onclick="(function(id){
									    allGraphs[id].filters.comparison = !allGraphs[id].filters.comparison;
								    		})(${param.graphId});" id="comparisonCheckbox${param.graphId}" class="form-check-input" type="checkbox" value="">
							</div>
						</div>
					</c:if>
					

					<div class="filterItem">
						<button type="button" class="btn btn-primary btn-sm filterButton"
							onClick="requestData(${param.graphId})">Filter</button>
					</div>
				</div>

			</div>
		</div>