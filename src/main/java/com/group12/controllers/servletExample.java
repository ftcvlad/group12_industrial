package com.group12.controllers;

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
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import java.lang.reflect.Type;

import com.group12.models.YoyoTransaction;
import com.group12.models.RetailModel;


@WebServlet(name = "ServletExample", urlPatterns = {"upload"}, loadOnStartup = 1) 
public class servletExample extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       
       
        request.setAttribute("page", "upload");
        request.getRequestDispatcher("upload/upload.jsp").forward(request, response); 
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    	
    	
    	String data = (String) request.getParameter("parsedXls");
        
        
    	Gson gson = new GsonBuilder().create();
    	
    	List<YoyoTransaction> list = gson.fromJson(data, new TypeToken<List<YoyoTransaction>>(){}.getType());
    	

    	
    	list.forEach(x -> System.out.println(x));
        
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
