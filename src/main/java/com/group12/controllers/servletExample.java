package com.group12.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.group12.models.DataUpload;
import com.group12.models.RetailModel;
import com.group12.models.YoyoTransaction;


@WebServlet(name = "ServletExample", urlPatterns = {"upload"}, loadOnStartup = 1) 
public class servletExample extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    	  List<DataUpload> allUploads = RetailModel.getAllDataUploads();
      
        request.setAttribute("page", "upload");
        request.setAttribute("allDataUploads", allUploads);
        request.getRequestDispatcher("upload/upload.jsp").forward(request, response); 
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    	  String fileName = request.getParameter("fileName");
    	
        Gson gson = new GsonBuilder().create();
        BufferedReader reader = request.getReader();
        List<YoyoTransaction> list = gson.fromJson(reader, new TypeToken<List<YoyoTransaction>>(){}.getType());
    	

        boolean wasUploaded = RetailModel.checkFileAlreadyUploaded(list);
        if (wasUploaded) {
            response.setStatus(400);
        }
        else {
            DataUpload finishedUpload = RetailModel.saveRetailData(list, fileName);

            if (finishedUpload == null) {
              response.setStatus(500);
            }
            else {
              response.setContentType("application/json");
              PrintWriter out = response.getWriter();
              out.print("{\"periodStart\":"+"\""+finishedUpload.getPeriodStart()+"\""+",\"periodEnd\":"+"\""+finishedUpload.getPeriodEnd()+"\""+"}");
              out.flush();
            }
        }


    }
    
    
    /*private class YoyoTransactionDeserialiser implements JsonDeserializer<YoyoTransaction> {

    	@Override
    	public YoyoTransaction deserialize(JsonElement json, Type type, JsonDeserializationContext context) throws JsonParseException {

    	    JsonObject jobject = json.getAsJsonObject();

    	    YoyoTransaction yyt = new YoyoTransaction();
    	    yyt.setDateTime(jobject.get("A").getAsString());
    	    yyt.setOutletRef(jobject.get("C").getAsInt());
    	    yyt.setCustomer(jobject.get("F").getAsString());
    	    
    	    //map to int?
    	    yyt.setTransactionType(jobject.get("G").getAsString());
    	    
    	  
    	    yyt.setSpent(jobject.get("H").getAsFloat());
    	    yyt.setSpent(jobject.get("I").getAsFloat());
    	    yyt.setSpent(jobject.get("J").getAsFloat());
    	   
    	   
    	    
    	    
    	    return yyt;
    	    
    	  
    	}
    }*/
    
}
