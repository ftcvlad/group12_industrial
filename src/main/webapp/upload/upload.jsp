
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE html>



<html>

<head>
<title>DUSA Data App</title>

<link
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
	crossorigin="anonymous">


<script lang="javascript"
	src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.11.3/xlsx.core.min.js"></script>
</head>

<body>

	<%@ include file="../includes/sidebar.jsp"%>

	<div class="main_content">

		<div class="panel panel-default">
			<div class="panel-heading">Panel heading without title</div>
			<div class="panel-body">
				<input name="myFile" type="file" id="fileInput">
				<button type="button" class="btn btn-primary" onClick="uploadData()">Primary</button>
			</div>
		</div>
	</div>


	<script src="http://code.jquery.com/jquery-3.2.1.min.js"
		integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
		crossorigin="anonymous"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"
		integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4"
		crossorigin="anonymous"></script>
	<script
		src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"
		integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1"
		crossorigin="anonymous"></script>
	<script type="text/javascript" src="upload/upload.js"></script>
</body>
</html>