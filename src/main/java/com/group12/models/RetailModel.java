package com.group12.models;

import java.sql.ResultSet;

import com.group12.utils.DatabaseConnectionManager;

import java.sql.PreparedStatement;
import java.sql.Connection;
import java.sql.SQLException;

public class RetailModel {

	    
	
	
	public static void saveRetailData() {
		
		//TRY connection out :(
		Connection conn = DatabaseConnectionManager.getConnection();
		
		try {
			PreparedStatement stmt = conn.prepareStatement("SELECT * FROM data_uploads");

			ResultSet rs = stmt.executeQuery();   


			while (rs.next()){
				System.out.println(rs.getInt(1));
				System.out.println(rs.getString(2));
				System.out.println(rs.getString(3));
			
	    
			}
		}
		catch (SQLException sqle) {
			System.out.println("sql exception!");
		}
		
		
		
		
		
	}
}
