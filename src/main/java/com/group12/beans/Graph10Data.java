package com.group12.beans;

import java.util.Date;

public class Graph10Data{
	
	int countPerDay;
	float sumPerDay;
	long day;
	
	public Graph10Data(int count, float sum, long day) {
		countPerDay = count;
		sumPerDay = sum;
		this.day = day;
	}
	
	public int getCountPerDay() {
		return countPerDay;
	}
	public void setCountPerDay(int countPerDay) {
		this.countPerDay = countPerDay;
	}
	public float getSumPerDay() {
		return sumPerDay;
	}
	public void setSumPerDay(float sumPerDay) {
		this.sumPerDay = sumPerDay;
	}
	public long getDay() {
		return day;
	}
	public void setDay(long day) {
		this.day = day;
	}
	
	@Override 
	public String toString() {
		return countPerDay +" "+sumPerDay+" "+ day;
	}
}