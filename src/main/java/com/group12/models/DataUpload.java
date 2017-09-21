package com.group12.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
@Table(name = "data_uploads")
public class DataUpload {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	
	@Temporal(TemporalType.TIMESTAMP) private Date periodStart;
	@Temporal(TemporalType.TIMESTAMP) private Date periodEnd;
	String fileName;
	
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getPeriodStart() {
		return periodStart;
	}
	public void setPeriodStart(Date periodStart) {
		this.periodStart = periodStart;
	}
	public Date getPeriodEnd() {
		return periodEnd;
	}
	public void setPeriodEnd(Date periodEnd) {
		this.periodEnd = periodEnd;
	}
	
	
	@Override 
	public String toString() {
		return periodStart+" "+periodEnd;
	
	}
	
}