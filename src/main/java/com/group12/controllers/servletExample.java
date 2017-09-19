package com.group12.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.group12.models.RetailModel;
import com.group12.models.YoyoTransaction;


@WebServlet(name = "ServletExample", urlPatterns = {"upload"}, loadOnStartup = 1) 
public class servletExample extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       
       
        request.setAttribute("page", "upload");
        request.getRequestDispatcher("upload/upload.jsp").forward(request, response); 
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    	
        
    	Gson gson = new GsonBuilder().create();
    	BufferedReader reader = request.getReader();
    	List<YoyoTransaction> list = gson.fromJson(reader, new TypeToken<List<YoyoTransaction>>(){}.getType());
    	
    	
    	

        
        RetailModel.saveRetailData(list);
        
	        
        //return json
        //response.setContentType("application/json");
	    // PrintWriter out = response.getWriter();
	    // out.print("{\"zz\":"+num+"}");
	    // out.flush();
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
