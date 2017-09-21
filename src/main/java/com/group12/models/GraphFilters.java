package com.group12.models;

import java.util.List;

import com.google.gson.annotations.SerializedName;

public class GraphFilters{
	
	public static final int TOTAL_SPENDING = 1;
	public static final int TOTAL_TRANSACTIONS = 2;
	
	@SerializedName("locations") List<Integer> locations = null;
	@SerializedName("graphType") int graphType; //# of transactions VS totalSpending
	//dates
	//???
	
	public List<Integer> getLocations() {
		return locations;
	}
	public void setLocations(List<Integer> locations) {
		this.locations = locations;
	}
	public int getGraphType() {
		return graphType;
	}
	public void setGraphType(int graphType) {
		this.graphType = graphType;
	}
	
	
	
	
}