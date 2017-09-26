package com.group12.controllers;


import java.io.IOException;
import java.util.ArrayList;
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
import com.group12.beans.GraphFilters;
import com.group12.models.GraphModel;
import com.group12.beans.YoyoTransaction;



@WebServlet(name = "GraphController", urlPatterns = { "graphVlad" })
public class GraphController extends HttpServlet {
	
	private static final int GRAPH1 = 1;
	private static final int GRAPH2 = 2;
	private static final int GRAPH5 = 5;
	private static final int GRAPH6 = 6;
	private static final int GRAPH9 = 9;
	
	
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		
		String filters = request.getParameter("filters");
	
		if ( filters != null) {
		
			
			
			Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy'  'HH:mm:ss").create();
			GraphFilters filtObj =  gson.fromJson(filters, GraphFilters.class);
			String jsonResult = null;
			
			
			if (filtObj.getId() == GRAPH9) {
				Map<String, List<Float>> result = getGraph9Data(filtObj);
				//check if map is null (if error and was rolled back)
				jsonResult = new Gson().toJson(result);
				
			}
			else if (filtObj.getId() == GRAPH6) {
				List<YoyoTransaction> result = getGraph6Data(filtObj);
				jsonResult = new Gson().toJson(result);
				
			}
			else if (filtObj.getId() == GRAPH2) {
				Map<String, Float> result = getGraph2Data(filtObj);
				jsonResult = new Gson().toJson(result);		
			}
			

			
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsonResult);
		}
		else {
			
			request.setAttribute("page", "graphs1");
			request.getRequestDispatcher("graphs/graphVlad.jsp").forward(request, response);
		}
		
	}
	
	
	private static List<YoyoTransaction> getGraph6Data(GraphFilters filters) {
		
		List<YoyoTransaction> result = GraphModel.getGraph6Data(filters);
		return result;
		
	}
	
	private static Map<String, List<Float>> getGraph9Data(GraphFilters filters) {
		List<YoyoTransaction> data = GraphModel.getGraph9Data(filters);
		if (data == null) return null;
		
		//combine in buckets. there can be less people in the last bucket, or some people may be disregarded
		//max 5 people error
		List<Float> bucketTotalSpendingTransaction = new ArrayList<Float>();
		List<Float> averageTotalSpendingTransaction = new ArrayList<Float>();
		
		List<Float> averageTransactionValue = new ArrayList<Float>();
		
		int bucketSizeInPercent = 10;
		int customersInBucket = Math.max((int) Math.round(data.size()*(bucketSizeInPercent/100.0)), 1);
		
		int numberOfBucketsToFill = 100/ bucketSizeInPercent;
		
		float nextBucketSpending = 0;
		int nextBucketTransactions = 0;
		float nextBucketValue = 0;
		float totalValue = 0;
		boolean hasNonEmptyBuckets = false;
		for (int i=0; i<data.size(); i++) {
		
			nextBucketSpending += data.get(i).getSumTotal();
			nextBucketTransactions+=  data.get(i).getCountTotal();
			
			if (filters.getYAxisType() == GraphFilters.TOTAL_SPENDING) {
				nextBucketValue += data.get(i).getSumTotal();
			}
			else {
				nextBucketValue += data.get(i).getCountTotal();
			}
			
			hasNonEmptyBuckets = true;
			if ((i+1) % customersInBucket == 0 ) {
				bucketTotalSpendingTransaction.add(nextBucketValue);
				averageTotalSpendingTransaction.add(nextBucketValue/customersInBucket);
				averageTransactionValue.add(nextBucketSpending/nextBucketTransactions);//+
				
				totalValue+= nextBucketValue;
				
				nextBucketValue = 0;
				nextBucketSpending = 0;
				nextBucketTransactions = 0;
				
				numberOfBucketsToFill--;
				hasNonEmptyBuckets = false;
				if (numberOfBucketsToFill == 0) {//drop some people
					break;
				}
			}
			
		}
		
		if (hasNonEmptyBuckets) {
			bucketTotalSpendingTransaction.add(nextBucketValue);//last bucket smaller 
			averageTotalSpendingTransaction.add(nextBucketValue/customersInBucket);
			averageTransactionValue.add(nextBucketSpending/nextBucketTransactions);
			totalValue+=nextBucketValue;
		}
		
		//turn bucketTotalSpendingTransaction into percentage
		for (int i=0; i<bucketTotalSpendingTransaction.size();i++) {
			bucketTotalSpendingTransaction.set(i, (bucketTotalSpendingTransaction.get(i)/totalValue)*100);
		}
		
		//System.out.println("totalSP: "+bucketTotalSpendingTransaction.get(0)+"; "+"transValue: "+averageTransactionValue.get(0));
		
		Map<String, List<Float>> map = new TreeMap<String, List<Float>>();
		map.put("bucketTotalSpendingTransaction", bucketTotalSpendingTransaction);
		map.put("averageTotalSpendingTransaction", averageTotalSpendingTransaction);
		map.put("averageTransactionValue", averageTransactionValue);
		
		List<Float> hack =  new ArrayList<Float>();
		hack.add((float) filters.getYAxisType());
		map.put("yAxisType",hack);
		
		return map;
		
		

	}
	
	private static Map<String, Float> getGraph2Data(GraphFilters filters) {
		
		List<YoyoTransaction> result = GraphModel.getGraph2Data(filters);
		Map<String, Float> data = new TreeMap<String, Float>();
		
		data.put("Mon", new Float(0));
		data.put("Tue", new Float(0));
		data.put("Wed", new Float(0));
		data.put("Thu", new Float(0));
		data.put("Fri", new Float(0));
		data.put("Sat", new Float(0));
		data.put("Sun", new Float(0));
		
		int weekday = 0;
		float prev = 0.0;
		
		Calendar c = Calendar.getInstance();
		
		for (int i = 0; i < result.size(); i++) {
			
			// set calender time to the current object from result
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
