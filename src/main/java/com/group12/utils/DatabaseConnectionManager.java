package com.group12.utils;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.group12.ConfigurationLoader;
import com.group12.models.DataUpload;
import com.group12.models.YoyoTransaction;

//import com.mysql.jdbc.Driver;

public class DatabaseConnectionManager{
	
	private static String DB_URL;
	private static SessionFactory hiberSessionFactory = null;
	
	private static String getConnectionUrl() {
		 if (DB_URL != null) return DB_URL;
	     DB_URL = "jdbc:mysql://" + ConfigurationLoader.DATABASE_HOST + ":" + ConfigurationLoader.DATABASE_PORT + "/" + ConfigurationLoader.DATABASE_SCHEMA;
	     return DB_URL;
	}
	
	//this is to write sql
	public static Connection getConnection() {
	
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println("MySQL JDBC Driver not found!");
			
			return null;
		}

		Connection connection = null;

		try {
			
			connection = DriverManager.getConnection(getConnectionUrl(), ConfigurationLoader.DATABASE_USER, ConfigurationLoader.DATABASE_PASSWORD);

		} catch (SQLException e) {
			System.out.println("Connection Failed! Check output console");
			e.printStackTrace();
			return null;
		}

		return connection;
	}
	
	//this is to use Hibernate
	public static SessionFactory getSessionFactory() {
		
		if (hiberSessionFactory == null) {
			//add every hibernate @Entity here
			Configuration con = new Configuration().configure().addAnnotatedClass(YoyoTransaction.class)
																.addAnnotatedClass(DataUpload.class);
			
			con.setProperty("hibernate.connection.username", ConfigurationLoader.DATABASE_USER );
			con.setProperty("hibernate.connection.password", ConfigurationLoader.DATABASE_PASSWORD ); 
			con.setProperty("hibernate.connection.url", getConnectionUrl()); 
			
			
			hiberSessionFactory = con.buildSessionFactory();
		}
		
		return hiberSessionFactory;
	
	}
	
}