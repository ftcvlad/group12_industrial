package com.group12.controllers;


import java.io.IOException;

import java.util.Calendar;
import java.util.Map;
import java.util.TreeMap;
import java.util.ArrayList;
import java.util.List;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


import com.group12.beans.GraphFilters;
import com.group12.models.GraphModel;
import com.group12.beans.YoyoTransaction;





@WebServlet(name = "BehaviourGraphController", urlPatterns = { "behaviourGraphs" })
public class BehaviourGraphController extends HttpServlet {
	

	private static final int GRAPH999 = 999;
	private static final int GRAPH2 = 2;
	
	
	
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
			else if(filtObj.getId() == GRAPH2){
				Map<String, Float> result = getGraph2Data(filtObj);
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
	
	// Graph 2 - convert data into weekdays
	private static Map<String, Float> getGraph2Data(GraphFilters filters) {
		
		List<YoyoTransaction> result = GraphModel.getGraph2Data(filters);
		if (result == null) return null;
		
		Map<String, Float> data = new TreeMap<String, Float>();
		
		data.put("Mon", new Float(0));
		data.put("Tue", new Float(0));
		data.put("Wed", new Float(0));
		data.put("Thu", new Float(0));
		data.put("Fri", new Float(0));
		data.put("Sat", new Float(0));
		data.put("Sun", new Float(0));

		int weekday = 0;
		float prev = 0.0f;

		Calendar c = Calendar.getInstance();

		for (int i = 0; i < result.size(); i++) {
			
			// set calender time to the current row from result
			c.setTime(result.get(i).getDateTime());
			
			// get day of week in an int. (1-7, MON-SUN)
			result.get(i).setId(c.get(Calendar.DAY_OF_WEEK));
			weekday = c.get(Calendar.DAY_OF_WEEK);
			
			// add weekday to the data
			if(weekday == 1){
				prev = data.get("Mon");
				data.put("Mon", prev + result.get(i).getTotal());
			}
			else if(weekday == 2){
				prev = data.get("Tue");
				data.put("Tue", prev + result.get(i).getTotal());
			}
			else if(weekday == 3){
				prev = data.get("Wed");
				data.put("Wed", prev + result.get(i).getTotal());
			}
			else if(weekday == 4){
				prev = data.get("Thu");
				data.put("Thu", prev + result.get(i).getTotal());
			}
			else if(weekday == 5){
				prev = data.get("Fri");
				data.put("Fri", prev + result.get(i).getTotal());
			}
			else if(weekday == 6){
				prev = data.get("Sat");
				data.put("Sat", prev + result.get(i).getTotal());
			}
			else if(weekday == 7){
				prev = data.get("Sun");
				data.put("Sun", prev + result.get(i).getTotal());
			}
		}
		return data;
	}
	
	
	
}
