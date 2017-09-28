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
import com.group12.beans.Graph12Data;
import com.group12.beans.Graph13Data;
import com.group12.beans.Graph2Data;
import com.group12.beans.GraphFilters;
import com.group12.beans.GraphResponse;

import com.group12.models.BehaviourGraphModel;







@WebServlet(name = "BehaviourGraphController", urlPatterns = { "behaviourGraphs" })
public class BehaviourGraphController extends HttpServlet {
	

	private static final int GRAPH12 = 12;
	private static final int GRAPH2 = 2;
	private static final int GRAPH13 = 13;
	
	
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		
		String filters = request.getParameter("filters");
	
		if ( filters != null) {
		
			Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm:ss").create();
			GraphFilters filtObj =  gson.fromJson(filters, GraphFilters.class);
			String jsonResult = null;

			if (filtObj.getId() == GRAPH12) {
				
				List<Graph12Data> res = BehaviourGraphModel.getGraph12Data(filtObj);
				GraphResponse gr = new GraphResponse();
				gr.setFilters(filtObj);
				gr.setResult12(res);
				jsonResult = new Gson().toJson(gr);	
			}
			else if(filtObj.getId() == GRAPH2){
				List<Graph2Data> result = BehaviourGraphModel.getGraph2Data(filtObj);
				jsonResult = new Gson().toJson(result);	
			}
			else if(filtObj.getId() == GRAPH13){
				List<Graph13Data> result = BehaviourGraphModel.getGraph13Data(filtObj);
				jsonResult = new Gson().toJson(result);	
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
