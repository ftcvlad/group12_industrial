package com.group12.models;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.group12.beans.Graph12Data;
import com.group12.beans.Graph13Data;
import com.group12.beans.Graph2Data;
import com.group12.beans.GraphFilters;
import com.group12.beans.YoyoTransaction;
import com.group12.utils.DatabaseConnectionManager;

public class BehaviourGraphModel {

	
	
	@SuppressWarnings("unchecked")
	public static List<Graph13Data> getGraph13Data(GraphFilters filters) {
		SessionFactory sf = DatabaseConnectionManager.getSessionFactory();

		Session session = sf.openSession();
		Transaction tx = null;
		
		List<Graph13Data> res = new ArrayList<Graph13Data>();
		try {

			
			tx = session.beginTransaction();

			Date start  = filters.getStartDatetime();
			Date end  = filters.getEndDatetime();
			String betweenDates = "";
			if (end != null && start != null) {
				DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String startStr = df.format(start);
				String endStr = df.format(end);
				betweenDates = " AND (dateTime BETWEEN '"+startStr+"' AND '"+endStr+"') " ;
			}

			
			String rawSql = " select A.Customer, OutletRef, c, s " + 
							" from " + 
								" (select Customer, OutletRef" + 
								" from (select Customer, OutletRef, count(Total) as c, sum(Total) as s " + 
								"	from retail_data " + 
								"	group by Customer, OutletRef " + 
								"	order by Customer, c desc) x " + 
								" group by Customer) as A " + 
							" inner join " + 
								" (select sum(Total) as s, count(Total) as c, Customer " + 
								" from retail_data WHERE outletRef IN (:values) " + betweenDates+
								" group by Customer) as B " + 
							" on A.Customer=B.Customer; ";
	
			
			
			@SuppressWarnings("rawtypes")
			Query query = session.createNativeQuery(rawSql);
			
			query.setParameterList("values", filters.getLocations());

		
			List<Object[]> allObj = query.getResultList();
			
			for(Object[] nextO : allObj) {
				
				Graph13Data gd = new Graph13Data();
				gd.setCustomer( (short)  nextO[0]);
				gd.setOutletRef( (short) nextO[1]);
				gd.setCountTotal(((BigInteger) nextO[2]).intValue());
				gd.setSumTotal(((BigDecimal) nextO[3]).floatValue());
				
			    res.add(gd);
			   
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
				betweenDates = " AND (dateTime BETWEEN '"+startStr+"' AND '"+endStr+"') " ;
			}
			
			String rawSql = "SELECT sum(Total), DAYNAME((dateTime)) AS Day_Name1 "
					+ " FROM retail_data WHERE outletRef IN (:values) " + betweenDates
					+ " GROUP BY Day_Name1";

			@SuppressWarnings("rawtypes")
			Query query = session.createNativeQuery(rawSql);

			query.setParameterList("values", filters.getLocations());

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
	
	
	
	public static List<Graph12Data> getGraph12Data(GraphFilters filters) {
		SessionFactory sf = DatabaseConnectionManager.getSessionFactory();

		Session session = sf.openSession();
		Transaction tx = null;
		List<Object[]> list;
		List<Graph12Data> res = new ArrayList<Graph12Data>();
		try {

			tx = session.beginTransaction();

			
			CriteriaBuilder builder = session.getCriteriaBuilder();
			CriteriaQuery<Object[]> criteria = builder.createQuery( Object[].class );
			Root<YoyoTransaction> root = criteria.from( YoyoTransaction.class );
			
		
			criteria.multiselect( root.get("countTotal"), root.get("sumTotal"), root.get("hour") );
			
						
			//filter locations
			Predicate predicate = root.get("outletRef").in(filters.getLocations());
			criteria.where(predicate);
			
			//filter time
			Date start = filters.getStartDatetime();
			Date end = filters.getEndDatetime();
			if ( start != null && end != null) {
				 Predicate periodFilter = builder.between(root.get("dateTime"), start, end);
				 criteria.where(periodFilter);
			}
			
			
			criteria.groupBy(root.get("hour"));
			Order sortOrder = builder.asc(root.get("hour"));
			criteria.orderBy(sortOrder);

			list = session.createQuery(criteria).getResultList();

			for ( Object[] values : list ) {
				res.add(new Graph12Data((float) values[1], (int) values[0], (int) values[2]));
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
