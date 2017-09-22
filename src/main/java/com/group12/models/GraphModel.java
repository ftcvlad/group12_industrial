package com.group12.models;

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

import com.group12.utils.DatabaseConnectionManager;
import com.group12.beans.YoyoTransaction;
import com.group12.beans.GraphFilters;

public class GraphModel {



	public static List<YoyoTransaction> getGraph9Data(GraphFilters filters) {
		SessionFactory sf = DatabaseConnectionManager.getSessionFactory();

		Session session = sf.openSession();
		Transaction tx = null;
		List<YoyoTransaction> list;
		try {

			tx = session.beginTransaction();

			
			CriteriaBuilder builder = session.getCriteriaBuilder();
			CriteriaQuery<YoyoTransaction> cQuery = builder.createQuery(YoyoTransaction.class);
			
			Root<YoyoTransaction> root = cQuery.from(YoyoTransaction.class); 
			
			Order sortOrder = null;
			
			if (filters.getYAxisType() == GraphFilters.TOTAL_TRANSACTIONS) {
				
				sortOrder = builder.desc(root.get("countTotal"));
			}
			else if (filters.getYAxisType() == GraphFilters.TOTAL_SPENDING) {
				
				sortOrder = builder.desc(root.get("sumTotal"));
			}
			else {
				//other?
			}
			
			cQuery.multiselect(root.get("countTotal"), root.get("sumTotal") );
			
			Predicate predicate = root.get("outletRef").in(filters.getLocations());
			cQuery.where(predicate);
			cQuery.groupBy(root.get("customer"));
			cQuery.orderBy(sortOrder);
		
			
			

			list = session.createQuery(cQuery).getResultList();

			
			
			//cQuery.select(root.get("shippingAddress").<String>get("state"));
			//List<YoyoTransaction> list = session.createCriteria(YoyoTransaction.class).list();

			tx.commit();

		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
			return null;
		} finally {
			session.close();
		}

		return list;

	}

	

}
