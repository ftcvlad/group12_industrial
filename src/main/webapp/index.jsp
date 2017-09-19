<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %> 
<!DOCTYPE html>



<html>
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
		
		<div class="graph_container">

		</div>
		
		<div class="graph_container">

		</div>
		
		<div class="graph_container">

		</div>
		
    </div>
	<script>
	Highcharts.chart('piechart1', {
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
	    },
	    title: {
	        text: 'YoYo Sales per Day for the Time Period'
	    },
	    tooltip: {
	        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: true,
	                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                style: {
	                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                }
	            }
	        }
	    },
	    series: [{
	        name: 'Brands',
	        colorByPoint: true,
	        data: [{
	            name: '18/09/2017',
	            y: 12
	        }, {
	            name: '11/09/2017',
	            y: 16
	        }, {
	            name: '04/09/2017',
	            y: 25
	        }, {
	            name: '28/09/2017',
	            y: 6
	        }, {
	            name: '21/09/2017',
	            y: 8
	        }, {
	            name: '14/09/2017',
	            y: 4
	        }]
	    }]
	});
	</script>
</body>
</html>