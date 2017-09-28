package com.group12.beans;


public class Graph2Data{

	String 	weekDay;
	float 	spent;
	
	public Graph2Data(String weekDay, float spent) {
		this.weekDay = weekDay;
		this.spent = spent;
	}
	
	public void setWeekDay(String weekDay){
		this.weekDay = weekDay;
	}
	
	public void setSpent(float spent){
		this.spent = spent;
	}
	
	public String getWeekDay(){
		return this.weekDay;
	}
	
	public float getSpent(){
		return this.spent;
	}

	@Override
	public String toString() {
		return weekDay +" "+ spent;
	}
}