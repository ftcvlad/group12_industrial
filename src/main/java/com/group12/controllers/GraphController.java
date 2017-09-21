package com.group12.controllers;


import java.io.IOException;

import com.group12.models.YoyoTransaction;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import com.group12.models.GraphModel;



@WebServlet(name = "ServletExample", urlPatterns = { "graphVlad" })
public class GraphController extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		
		
		List<YoyoTransaction> data = GraphModel.getGraph9Data();
		
		//combine in buckets. there can be less people in the last bucket, or some people may be disregarded
		//max 5 people error
		List<Float> bucketTotals = new ArrayList<Float>();
		
		int bucketSizeInPercent = 25;
		int customersInBucket = (int) Math.round(data.size()*(bucketSizeInPercent/100.0));
		int numberOfBucketsToFill = 100/ bucketSizeInPercent;
		
		float nextBucketValue = 0;
		boolean hasNonEmptyBuckets = false;
		for (int i=0; i<data.size(); i++) {
			nextBucketValue += data.get(i).getSumTotal();
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
			//System.out.println(data.get(i));
		}
		
		if (hasNonEmptyBuckets) {
			bucketTotals.add(nextBucketValue);//last bucket smaller 
		}
		
/*		for (Float f: bucketTotals) {
			System.out.print(f+" ");
		}*/

		request.setAttribute("page", "graphs1");
		request.setAttribute("gra", allUploads);
		request.getRequestDispatcher("graphs/graphVlad.jsp").forward(request, response);
	}
}