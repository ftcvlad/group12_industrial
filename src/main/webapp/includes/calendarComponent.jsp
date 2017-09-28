<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

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
				
					<c:forEach var="item" items="${paramValues.graphChecboxId}">
					
						<div class="form-group <c:if test="${param.onDashboard == true}">hiddenElement</c:if>" >
							<input type="checkbox" data-id="${item}" name="fancy-checkbox-default"
								id="calendarCheckbox${item}" autocomplete="off" />
							<div class="btn-group ">
								<label for="calendarCheckbox${item}" class=" btn btn-default btn-sm ">
									<span class=" glyphicon glyphicon-ok "></span> <span> </span>
								</label> <label for="calendarCheckbox${item}" class=" btn btn-default btn-sm active ">
								 	<c:if test="${item == 10}">Time comparison</c:if>
								 	<c:if test="${item == 9}">Spending distribution</c:if>
								 	<c:if test="${item == 6}">Location statistics</c:if>
								 	<c:if test="${item == 11}">Customer base growth</c:if>
								 	<c:if test="${item == 12}">Daily buying behaviour</c:if>
								 	<c:if test="${item == 13}">Customer segments</c:if>
								</label>
							</div>
						</div>
					
					
					
					</c:forEach>
				
				</div>
			
				<div style="margin-top:10px;">
					<button type="button" class="btn btn-primary btn-sm filterButton" onClick="filterMultipleGraphs()">Apply calendar</button>
				</div>

			</div>


</div>