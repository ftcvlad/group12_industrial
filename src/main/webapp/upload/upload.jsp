
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>

<html>

<head>
<title>DUSA Data App</title>
<link rel="stylesheet" href="styles.css">
<link
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
	crossorigin="anonymous">
	

<link href="upload/upload.css" rel="stylesheet"	>
	
<script lang="javascript"
	src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.11.3/xlsx.core.min.js"></script>
	
	<script lang="javascript" src="libs/spinner.min.js"></script>
	
	

	
</head>

<body>

	<%@ include file="../includes/sidebar.jsp"%>

	<div class="main_content">

		<div class="panel panel-default">
			
			<div class="panel-body" >
			
				<h2>Upload data</h2>
				<p>Uploading large files may take a couple of minutes. Stay patient!</p>
				
				<div id="uploadControlContainer"  >
						<div id="messageDiv"></div>
						<div id="loadingOverlay">
							
							<div id="spinnerContainer" ></div>
						
							<div id="spinnerTextContainer">Processing...</div>
							<div id="cancelButtonContainer">
								<button type="button" class="btn btn-primary" onClick="cancelUpload()">Cancel</button>
							</div>
						</div>
					
						<div  >
							<label class="btn btn-default" for="fileInput">
							    <input id="fileInput" type="file" style="display:none" onchange="$('#upload-file-info').html(this.files[0].name)">
							    Browse
							</label>
							<span class='label label-info' id="upload-file-info">No file chosen</span>
						</div>
						
						<div >
							<button type="button" class="btn btn-primary" onClick="uploadData()">Upload</button>
						</div>
				
				</div>
				<br>
				<h2>Upload history</h2>
				<br>
				<div id="uploadStatsContainer">
					<table class="table">
					  <thead >
					    <tr>
					      
					      <th>File name</th>
					      <th>Period start</th>
					      <th>Period end</th>
					    </tr>
					  </thead>
					  <tbody id="tableBody">
					    
						<c:forEach var="item" items="${allDataUploads}">
							 <tr>
							 	
							 
							      <th><c:out value="${item.fileName}"/></th>
							      <th><fmt:formatDate value="${item.periodStart}" pattern="yyyy-MM-dd HH:mm:ss" /></th>
							      <th><fmt:formatDate value="${item.periodEnd}" pattern="yyyy-MM-dd HH:mm:ss" /></th>
						    </tr>
						</c:forEach>
					
					  </tbody>
					</table>
				</div>
			
				
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
