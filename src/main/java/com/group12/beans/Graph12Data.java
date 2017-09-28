package com.group12.beans;


public class Graph12Data{
	

	float sumTotal;
	int countTotal;
	int hour;
	
	public Graph12Data(float sum, int count, int hour) {
		
		this.sumTotal = sum;
		this.countTotal = count;
		this.hour = hour;
	}
	

	public float getSumTotal() {
		return sumTotal;
	}


	public void setSumTotal(float sumTotal) {
		this.sumTotal = sumTotal;
	}


	public int getCountTotal() {
		return countTotal;
	}


	public void setCountTotal(int countTotal) {
		this.countTotal = countTotal;
	}


	public int getHour() {
		return hour;
	}


	public void setHour(int hour) {
		this.hour = hour;
	}


	@Override 
	public String toString() {
		return sumTotal +" "+ countTotal+ " "+hour;
	}
}