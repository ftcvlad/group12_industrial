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

import com.group12.beans.Graph10Data;
import com.group12.beans.GraphFilters;

import com.group12.models.Graph10Model;



@WebServlet(name = "TimeGraphsController", urlPatterns = { "timeGraphs" })
public class TimeGraphsController extends HttpServlet {
	

	private static final int GRAPH10 = 10;
	
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		
		String filters = request.getParameter("filters");
	
		if ( filters != null) {
		
			Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm:ss").create();
			GraphFilters filtObj =  gson.fromJson(filters, GraphFilters.class);
			String jsonResult = null;

			if (filtObj.getId() == GRAPH10) {
				
				List<Graph10Data> result = Graph10Model.getGraph10Data(filtObj);

				Gson gson1 = new GsonBuilder().create();
				jsonResult = gson1.toJson(result);
				
			}
			
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsonResult);
		}
		else {
			request.setAttribute("page", "exploreTime");
			request.getRequestDispatcher("graphs/timeGraphs.jsp").forward(request, response);
		}
		
	}
	

	
	
	
}
