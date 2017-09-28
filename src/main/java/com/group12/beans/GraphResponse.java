package com.group12.beans;

import java.util.List;

public class GraphResponse {
	List<Graph10Data> result10;
	List<Graph11Data> result11;
	List<Graph12Data> result12;
	GraphFilters filters;
	
	
	
	public List<Graph12Data> getResult12() {
		return result12;
	}
	public void setResult12(List<Graph12Data> result12) {
		this.result12 = result12;
	}
	public List<Graph11Data> getResult11() {
		return result11;
	}
	public void setResult11(List<Graph11Data> result11) {
		this.result11 = result11;
	}
	public GraphFilters getFilters() {
		return filters;
	}
	public void setFilters(GraphFilters filters) {
		this.filters = filters;
	}
	public List<Graph10Data> getResult10() {
		return result10;
	}
	public void setResult10(List<Graph10Data> result10) {
		this.result10 = result10;
	}
	
	
	
	
}