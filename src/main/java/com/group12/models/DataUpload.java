package com.group12.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "data_uploads")
public class DataUpload {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	String periodStart;
	String periodEnd;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPeriodStart() {
		return periodStart;
	}
	public void setPeriodStart(String periodStart) {
		this.periodStart = periodStart;
	}
	public String getPeriodEnd() {
		return periodEnd;
	}
	public void setPeriodEnd(String periodEnd) {
		this.periodEnd = periodEnd;
	}
	
	
	@Override 
	public String toString() {
		return periodStart+" "+periodEnd;
	
	}
	
}