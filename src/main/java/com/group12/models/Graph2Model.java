package com.group12.models;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.group12.beans.Graph2Data;
import com.group12.beans.GraphFilters;
import com.group12.utils.DatabaseConnectionManager;


public class Graph2Model {


	@SuppressWarnings("unchecked")
	public static List<Graph2Data> getGraph2Data(GraphFilters filters) {
		SessionFactory sf = DatabaseConnectionManager.getSessionFactory();

		Session session = sf.openSession();
		Transaction tx = null;
		
		List<Graph2Data> res = new ArrayList<Graph2Data>();
		
		try {

			tx = session.beginTransaction();

			Date start  = filters.getStartDatetime();
			Date end  = filters.getEndDatetime();
			String betweenDates = "";
			if (end != null && start != null) {
				DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String startStr = df.format(start);
				String endStr = df.format(end);
				betweenDates = " AND (dateTime BETWEEN '"+startStr+"' AND '"+endStr+"')" ;
			}
			
			String rawSql = "SELECT sum(Total), DAYNAME((dateTime)) AS Day_Name1 FROM retail_data GROUP BY Day_Name1";

			@SuppressWarnings("rawtypes")
			Query query = session.createNativeQuery(rawSql);

			//query.setParameterList("values", filters.getLocations());

			List<Object[]> allObj = query.getResultList();

			for(Object[] obj : allObj) {
			    res.add(new Graph2Data(
					obj[1].toString() , 
					Float.parseFloat( ( obj[0].toString() ) )
				));
			}

			tx.commit();

		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
			return null;
		} finally {
			session.close();
		}

		return res;

	}
	
	
	
	
	

}
