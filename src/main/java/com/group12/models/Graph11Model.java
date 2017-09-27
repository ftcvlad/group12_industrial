package com.group12.models;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.hibernate.type.StandardBasicTypes;

import com.group12.beans.Graph11Data;
import com.group12.beans.GraphFilters;
import com.group12.utils.DatabaseConnectionManager;

public class Graph11Model {


	@SuppressWarnings("unchecked")
	public static List<Graph11Data> getGraph11Data(GraphFilters filters) {
		SessionFactory sf = DatabaseConnectionManager.getSessionFactory();

		Session session = sf.openSession();
		Transaction tx = null;
		
		List<Graph11Data> res = new ArrayList<Graph11Data>();
		try {

			
			tx = session.beginTransaction();

		
			
			
			String rawSql = "select count(customer), unix_timestamp(Date(dateTime)) " + 
					"from" + 
					"	(SELECT customer , dateTime FROM retail_data" + 
					"	GROUP BY customer) as T " + 
					"GROUP BY Date(dateTime) " + 
					"ORDER BY dateTime; ";
			
			/*String rawSql = "select count(customer), unix_timestamp(Date(dateTime)) " + 
					"from" + 
					"	(SELECT customer , dateTime FROM retail_data" + 
					"	GROUP BY customer) as T " + 
					"GROUP BY year(dateTime), month(dateTime) " + 
					"ORDER BY dateTime; ";*/
			
	
			
			
			@SuppressWarnings("rawtypes")
			Query query = session.createNativeQuery(rawSql);
		
			List<Object[]> allObj = query.getResultList();
			
			for(Object[] nextO : allObj) {
			    res.add(new Graph11Data( ((BigInteger) nextO[0]).intValue(), ((BigInteger) nextO[1]).longValue()));
			    System.out.println(res.get(res.size()-1));
			}
			
			//foking filters kill my life :(((((((( and hibernate
			

			
		
			
			
		
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			/*CriteriaBuilder builder = session.getCriteriaBuilder();
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

			res = new ArrayList<Graph11Data>();
			
			for ( Object[] values : list ) {
				//res.add(new Graph11Data((int) values[0], (float) values[1], (long) values[2]));
			} */
			
			

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
