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
import com.group12.beans.GraphFilters;
import com.group12.models.GraphModel;
import com.group12.beans.YoyoTransaction;



@WebServlet(name = "GraphController", urlPatterns = { "graphVlad" })
public class GraphController extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		
		String filters = request.getParameter("filters");
	
		if ( filters != null) {
		
			Gson gson = new Gson();
			GraphFilters filtObj =  gson.fromJson(filters, GraphFilters.class);
			
			
			//switch here for type of graph
			//request.getParameter("graphType)..............
			
			Map<String, List<Float>> result = getGraph9Data(filtObj);
			
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
	
	
	private static Map<String, List<Float>> getGraph9Data(GraphFilters filters) {
		List<YoyoTransaction> data = GraphModel.getGraph9Data(filters);
		
		
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
		return map;
		
		

	}
	
}