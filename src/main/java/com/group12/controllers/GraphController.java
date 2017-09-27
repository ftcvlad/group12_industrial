package com.group12.controllers;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializer;
import com.group12.beans.Graph10Data;
import com.group12.beans.GraphFilters;
import com.group12.beans.YoyoTransaction;
import com.group12.models.Graph10Model;
import com.group12.models.GraphModel;



@WebServlet(name = "GraphController", urlPatterns = { "graphVlad" })
public class GraphController extends HttpServlet {
	
	private static final int GRAPH1 = 1;
	private static final int GRAPH2 = 2;
	private static final int GRAPH5 = 5;


	
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		
		String filters = request.getParameter("filters");
	
		if ( filters != null) {
		
			
			
			Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm:ss").create();
			GraphFilters filtObj =  gson.fromJson(filters, GraphFilters.class);
			String jsonResult = "999";

			
			/*
			else if (filtObj.getId() == GRAPH2) {
				List<YoyoTransaction> result = getGraph2Data(filtObj);
				jsonResult = new Gson().toJson(result);		
			}
			*/
			
			/*else if (filtObj.getId() == GRAPH5) {
				List<YoyoTransaction> result = getGraph5Data(filtObj);
				jsonResult = new Gson().toJson(result);		
			}*/
			
			

			
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsonResult);
		}
		else {
			
			request.setAttribute("page", "graphs1");
			request.getRequestDispatcher("graphs/graphVlad.jsp").forward(request, response);
		}
		
	}
	

	
	
	
	/*
	private static List<YoyoTransaction> getGraph5Data(GraphFilters filters) {
		
		List<YoyoTransaction> result = GraphModel.getGraph5Data(filters);
		return result;
		
	}
	*/
	
	
	
}
