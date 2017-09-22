package com.group12.controllers;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.group12.models.GraphFilters;
import com.group12.models.GraphModel;
import com.group12.models.YoyoTransaction;



@WebServlet(name = "GraphController", urlPatterns = { "graphVlad" })
public class GraphController extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

/*		System.out.println("-------");
		Enumeration<String> parameterNames = request.getParameterNames();
	        while (parameterNames.hasMoreElements()) {
	            String paramName = parameterNames.nextElement();
	            System.out.println(paramName);
	        }*/
		
		
		String filters = request.getParameter("filters");
		System.out.println(filters);
		if ( filters != null) {
		
			Gson gson = new Gson();
			GraphFilters filtObj =  gson.fromJson(filters, GraphFilters.class);
			
			
			//switch here for type of graph
			//request.getParameter("graphType)..............
			
			List<Float> result = getGraph9Data(filtObj);
			
			String jsonResult = new Gson().toJson(result);
			
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsonResult);
		}
		else {
			
			request.setAttribute("page", "graphs1");
			request.getRequestDispatcher("graphs/graphVlad.jsp").forward(request, response);
		}
		
	}
	
	
	private static List<Float> getGraph9Data(GraphFilters filters) {
		List<YoyoTransaction> data = GraphModel.getGraph9Data(filters);
		
		for (YoyoTransaction y: data) {
			System.out.println(y);
		}
		//combine in buckets. there can be less people in the last bucket, or some people may be disregarded
		//max 5 people error
		List<Float> bucketTotals = new ArrayList<Float>();
		
		int bucketSizeInPercent = 10;
		int customersInBucket = Math.max((int) Math.round(data.size()*(bucketSizeInPercent/100.0)), 1);
		
		int numberOfBucketsToFill = 100/ bucketSizeInPercent;
		
		float nextBucketValue = 0;
		boolean hasNonEmptyBuckets = false;
		for (int i=0; i<data.size(); i++) {
			if (filters.getYAxisType() == GraphFilters.TOTAL_SPENDING) {
				nextBucketValue += data.get(i).getSumTotal();
			}
			else {
				nextBucketValue += data.get(i).getCountTotal();
			}
			
			hasNonEmptyBuckets = true;
			if ((i+1) % customersInBucket == 0 ) {
				bucketTotals.add(nextBucketValue);
				nextBucketValue = 0;
				numberOfBucketsToFill--;
				hasNonEmptyBuckets = false;
				if (numberOfBucketsToFill == 0) {//drop some people
					break;
				}
			}
			
		}
		
		if (hasNonEmptyBuckets) {
			bucketTotals.add(nextBucketValue);//last bucket smaller 
		}
		
		
		return bucketTotals;
/*		for (Float f: bucketTotals) {
			System.out.print(f+" ");
		}*/
	}
	
}