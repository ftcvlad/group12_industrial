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
import com.group12.beans.Graph11Data;
import com.group12.beans.GraphFilters;
import com.group12.beans.GraphResponse;
import com.group12.models.TimeGraphModel;



@WebServlet(name = "TimeGraphsController", urlPatterns = { "timeGraphs" })
public class TimeGraphsController extends HttpServlet {
	

	private static final int GRAPH10 = 10;
	private static final int GRAPH11 = 11;
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		
		String filters = request.getParameter("filters");
	
		if ( filters != null) {
		
			Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm:ss").create();
			GraphFilters filtObj =  gson.fromJson(filters, GraphFilters.class);
			String jsonResult = null;

			if (filtObj.getId() == GRAPH10) {
				
				List<Graph10Data> result = TimeGraphModel.getGraph10Data(filtObj);

				GraphResponse grr = new GraphResponse();
				grr.setResult10(result);
				grr.setFilters(filtObj);
				
				Gson gson1 = new GsonBuilder().create();
				jsonResult = gson1.toJson(grr);
				
			}
			else if (filtObj.getId() == GRAPH11) {
				
				List<Graph11Data> result = TimeGraphModel.getGraph11Data(filtObj);
				
				GraphResponse gr = new GraphResponse();
				gr.setResult11(result);
				gr.setFilters(filtObj);
				
				Gson gson1 = new GsonBuilder().create();
				jsonResult = gson1.toJson(gr);
				
			}
			
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsonResult);
		}
		else {
			request.setAttribute("page", "exploreTime");
			request.getRequestDispatcher("graphs/exploreTime/timeGraphs.jsp").forward(request, response);
		}
		
	}
	

	
	
	
}
