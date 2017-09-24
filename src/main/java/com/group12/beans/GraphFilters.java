package com.group12.beans;

import java.util.Date;
import java.util.List;


import com.google.gson.annotations.SerializedName;

public class GraphFilters{
	
	public static final int TOTAL_SPENDING = 1;
	public static final int TOTAL_TRANSACTIONS = 2;
	
	@SerializedName("locations") List<Integer> locations = null;
	@SerializedName("yAxisType") int yAxisType; //# of transactions VS totalSpending
	@SerializedName("startDatetime") private Date startDatetime;
	@SerializedName("endDatetime") private Date endDatetime;
	
	
	
	//other ???
	
	public List<Integer> getLocations() {
		return locations;
	}
	public Date getStartDatetime() {
		return startDatetime;
	}
	public void setStartDatetime(Date startDatetime) {
		this.startDatetime = startDatetime;
	}
	public Date getEndDatetime() {
		return endDatetime;
	}
	public void setEndDatetime(Date endDatetime) {
		this.endDatetime = endDatetime;
	}
	public void setLocations(List<Integer> locations) {
		this.locations = locations;
	}
	public int getYAxisType() {
		return yAxisType;
	}
	public void setYAxisType(int yAxisType) {
		this.yAxisType = yAxisType;
	}
	
	
	
	
}