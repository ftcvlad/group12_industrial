package com.group12.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.group12.beans.DataUpload;
import com.group12.models.UploadModel;
import com.group12.beans.YoyoTransaction;

@WebServlet(name = "UploadController", urlPatterns = { "upload" })
public class UploadController extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		List<DataUpload> allUploads = UploadModel.getAllDataUploads();

		request.setAttribute("page", "upload");
		request.setAttribute("allDataUploads", allUploads);
		request.getRequestDispatcher("upload/upload.jsp").forward(request, response);
	}

	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String fileName = request.getParameter("fileName");

		Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm:ss").create();
		BufferedReader reader = request.getReader();
		List<YoyoTransaction> list = gson.fromJson(reader, new TypeToken<List<YoyoTransaction>>() {
		}.getType());
		
		for (YoyoTransaction y: list) {
			System.out.println(y);
		}
		

		boolean wasUploaded = UploadModel.checkFileAlreadyUploaded(list);
		if (wasUploaded) {
			response.setStatus(400);
		} else {
			DataUpload finishedUpload = UploadModel.saveRetailData(list, fileName);

			if (finishedUpload == null) {
				response.setStatus(500);
			} else {
				response.setContentType("application/json");
				PrintWriter out = response.getWriter();
				
				
				SimpleDateFormat dt1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String start = dt1.format(finishedUpload.getPeriodStart());
				String end = dt1.format(finishedUpload.getPeriodEnd());
				
				
				
				out.print("{\"periodStart\":" + "\"" + start + "\"" + ",\"periodEnd\":" + "\""
						+ end + "\"" + "}");
				out.flush();
			}
		}

	}

	/*
	 * private class YoyoTransactionDeserialiser implements
	 * JsonDeserializer<YoyoTransaction> {
	 * 
	 * @Override public YoyoTransaction deserialize(JsonElement json, Type type,
	 * JsonDeserializationContext context) throws JsonParseException {
	 * 
	 * JsonObject jobject = json.getAsJsonObject();
	 * 
	 * YoyoTransaction yyt = new YoyoTransaction();
	 * yyt.setDateTime(jobject.get("A").getAsString());
	 * yyt.setOutletRef(jobject.get("C").getAsInt());
	 * yyt.setCustomer(jobject.get("F").getAsString());
	 * 
	 * //map to int? yyt.setTransactionType(jobject.get("G").getAsString());
	 * 
	 * 
	 * yyt.setSpent(jobject.get("H").getAsFloat());
	 * yyt.setSpent(jobject.get("I").getAsFloat());
	 * yyt.setSpent(jobject.get("J").getAsFloat());
	 * 
	 * 
	 * 
	 * 
	 * return yyt;
	 * 
	 * 
	 * } }
	 */

}
