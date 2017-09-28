
package com.group12.beans;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Formula;

import com.google.gson.annotations.SerializedName;

@Entity
@Table(name = "retail_data")
public class YoyoTransaction{
	
	public YoyoTransaction() {}
	
	public YoyoTransaction(int countTotal, float sumTotal) {
		this.countTotal = countTotal;
		this.sumTotal = sumTotal;
	}
	
	public YoyoTransaction(int countTotal, float sumTotal, int outletRef, int uniqueCustomers ) {
		this.countTotal = countTotal;
		this.sumTotal = sumTotal;
		this.outletRef = outletRef;
		this.uniqueCustomers = uniqueCustomers;
	}	
	
	// Graph 2 - constructor
	public YoyoTransaction(Date dateTime, float total) {
		this.dateTime = dateTime;
		this.total = total;
	}
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
	int id;
	
	
	@SerializedName("A") @Column(name = "DateTime") @Temporal(TemporalType.TIMESTAMP) private Date dateTime;
	@SerializedName("C") @Column(name = "OutletRef") int outletRef;
	@SerializedName("F") @Column(name = "Customer") int customer;
	@SerializedName("G") @Column(name = "TransactionType") int transactionType;
	@SerializedName("H") @Column(name = "Spent") float spent;
	@SerializedName("I") @Column(name = "Discount") float discount;
	@SerializedName("J") @Column(name = "Total") float total;
	
	@Formula(value = "SUM(total)")
	float sumTotal;
	
	@Formula(value = "COUNT(total)")
	int countTotal;
	
	@Formula(value = "COUNT(Distinct customer)")
	int uniqueCustomers;
	
	@Formula(value = "UNIX_TIMESTAMP(Date(dateTime))")
	long date;
	
	@Formula(value = "Hour(dateTime)")
	int hour;
	
	
	public int getHour() {
		return hour;
	}

	public void setHour(int hour) {
		this.hour = hour;
	}

	public int getUniqueCustomers() {
		return uniqueCustomers;
	}

	public void setUniqueCustomers(int uniqueCustomers) {
		this.uniqueCustomers = uniqueCustomers;
	}

	public int getCountTotal() {
		return countTotal;
	}
	public void setCountTotal(int countTotal) {
		this.countTotal = countTotal;
	}
	public float getSumTotal() {
		return sumTotal;
	}
	public void setSumTotal(float sumTotal) {
		this.sumTotal = sumTotal;
	}
	public Date getDateTime() {
		return dateTime;
	}
	public void setDateTime(Date dateTime) {
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
	public int getCustomer() {
		return customer;
	}
	public void setCustomer(int customer) {
		this.customer = customer;
	}
	public int getTransactionType() {
		return transactionType;
	}
	public void setTransactionType(int transactionType) {
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
		
		String str = "";
		if (dateTime != null) {
			str+= dateTime.toString()+" ";
		}
		
		
		return str+outletRef+" "+ customer+" "+transactionType+" "+spent+" "+discount+
				" "+total+ " "+id+" "+sumTotal+" "+countTotal+ " "+uniqueCustomers;
	
	}
	
	
	
}