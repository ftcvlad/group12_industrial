package com.group12.models;

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

import com.group12.beans.Graph10Data;
import com.group12.beans.GraphFilters;
import com.group12.beans.YoyoTransaction;
import com.group12.utils.DatabaseConnectionManager;

public class Graph10Model {



	public static List<Graph10Data> getGraph10Data(GraphFilters filters) {
		SessionFactory sf = DatabaseConnectionManager.getSessionFactory();

		Session session = sf.openSession();
		Transaction tx = null;
		List<Object[]> list;
		List<Graph10Data> res;
		try {

			tx = session.beginTransaction();

			
			CriteriaBuilder builder = session.getCriteriaBuilder();
			CriteriaQuery<Object[]> criteria = builder.createQuery( Object[].class );
			Root<YoyoTransaction> root = criteria.from( YoyoTransaction.class );
			
		
			criteria.multiselect( root.get("countTotal"), root.get("sumTotal"), root.get("date") );
			
						
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
			
			
			criteria.groupBy(root.get("date"));
			Order sortOrder = builder.asc(root.get("date"));
			criteria.orderBy(sortOrder);

			list = session.createQuery(criteria).getResultList();

			res = new ArrayList<Graph10Data>();
			
			for ( Object[] values : list ) {
				res.add(new Graph10Data((int) values[0], (float) values[1], (long) values[2]));
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
