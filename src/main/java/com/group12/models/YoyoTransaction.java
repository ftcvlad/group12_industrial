
package com.group12.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.annotations.SerializedName;

@Entity
@Table(name = "retail_data")
public class YoyoTransaction{
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
	int id;
	
	@SerializedName("A") @Column(name = "DateTime") String dateTime;
	@SerializedName("C") @Column(name = "OutletRef") int outletRef;
	@SerializedName("F") @Column(name = "Customer") String customer;
	@SerializedName("G") @Column(name = "TransactionType") String transactionType;
	@SerializedName("H") @Column(name = "Spent") float spent;
	@SerializedName("I") @Column(name = "Discount") float discount;
	@SerializedName("J") @Column(name = "Total") float total;
	
	
	public String getDateTime() {
		return dateTime;
	}
	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getOutletRef() {
		return outletRef;
	}
	public void setOutletRef(int outletRef) {
		this.outletRef = outletRef;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public String getTransactionType() {
		return transactionType;
	}
	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}
	public float getSpent() {
		return spent;
	}
	public void setSpent(float spent) {
		this.spent = spent;
	}
	public float getDiscount() {
		return discount;
	}
	public void setDiscount(float discount) {
		this.discount = discount;
	}
	public float getTotal() {
		return total;
	}
	public void setTotal(float total) {
		this.total = total;
	}
	@Override 
	public String toString() {
		return dateTime+ " "+outletRef+" "+ customer+" "+transactionType+" "+spent+" "+discount+" "+total+ " "+id;
	
	}
	
	
	
}