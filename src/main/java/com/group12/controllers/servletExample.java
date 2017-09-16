package com.group12.controllers;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.io.PrintWriter;
import com.group12.models.RetailModel;

@WebServlet(name = "ServletExample", urlPatterns = {"upload"}, loadOnStartup = 1) 
public class servletExample extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
       
        request.setAttribute("page", "upload");
        request.getRequestDispatcher("upload/upload.jsp").forward(request, response); 
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    	
    	
    	String data = (String) request.getParameter("parsedXls");
        System.out.println(data);
        
        
        RetailModel.saveRetailData();
        
	        
        //return json
        //response.setContentType("application/json");
	    // PrintWriter out = response.getWriter();
	    // out.print("{\"zz\":"+num+"}");
	    // out.flush();
    }
}
