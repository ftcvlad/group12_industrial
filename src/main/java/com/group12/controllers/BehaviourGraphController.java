package com.group12.controllers;


import java.io.IOException;




import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


import com.group12.beans.GraphFilters;






@WebServlet(name = "BehaviourGraphController", urlPatterns = { "behaviourGraphs" })
public class BehaviourGraphController extends HttpServlet {
	

	private static final int GRAPH999 = 999;
	
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		
		String filters = request.getParameter("filters");
	
		if ( filters != null) {
		
			Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm:ss").create();
			GraphFilters filtObj =  gson.fromJson(filters, GraphFilters.class);
			String jsonResult = null;

			if (filtObj.getId() == GRAPH999) {
				jsonResult = "999";
			}
			
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsonResult);
		}
		else {
			request.setAttribute("page", "exploreBehaviour");
			request.getRequestDispatcher("graphs/exploreBehaviour/behaviourGraphs.jsp").forward(request, response);
		}
		
	}
	

	
	
	
}
