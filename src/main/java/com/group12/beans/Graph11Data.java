package com.group12.beans;


public class Graph11Data{
	

	int nOfNewCustomers;
	long day;
	
	public Graph11Data(int nOfNewCustomers, long day) {
		
		this.nOfNewCustomers = nOfNewCustomers;
		this.day = day;
	}
	

	
	
	public int getnOfNewCustomers() {
		return nOfNewCustomers;
	}

	public void setnOfNewCustomers(int nOfNewCustomers) {
		this.nOfNewCustomers = nOfNewCustomers;
	}



	public long getDay() {
		return day;
	}

	public void setDay(long day) {
		this.day = day;
	}



	@Override 
	public String toString() {
		return nOfNewCustomers +" "+ day;
	}
}