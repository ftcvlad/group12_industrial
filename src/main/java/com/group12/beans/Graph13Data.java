package com.group12.beans;

public class Graph13Data {

	
	short outletRef;
	short customer;
	float sumTotal;
	int countTotal;
	
	
	
	
	public short getOutletRef() {
		return outletRef;
	}
	public void setOutletRef(short outletRef) {
		this.outletRef = outletRef;
	}
	public short getCustomer() {
		return customer;
	}
	public void setCustomer(short customer) {
		this.customer = customer;
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
	
	@Override 
	public String toString() {
		return sumTotal +" "+ countTotal+ " "+customer+" "+outletRef;
	}
}
