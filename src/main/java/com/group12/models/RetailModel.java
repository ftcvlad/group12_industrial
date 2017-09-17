package com.group12.models;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class RetailModel {

/*	mysql style
 * public static void saveRetailData() {

		// TRY connection out :(
		Connection conn = DatabaseConnectionManager.getConnection();

		try {
			PreparedStatement stmt = conn.prepareStatement("SELECT * FROM data_uploads");

			ResultSet rs = stmt.executeQuery();

			while (rs.next()) {
				System.out.println(rs.getInt(1));
				System.out.println(rs.getString(2));
				System.out.println(rs.getString(3));

			}
		} catch (SQLException sqle) {
			System.out.println("sql exception!");
		}

	}*/

	
	public static void saveRetailData(List<YoyoTransaction> data) {
		Configuration con = new Configuration().configure().addAnnotatedClass(YoyoTransaction.class);
		SessionFactory sf = con.buildSessionFactory();
		Session session = sf.openSession();
		Transaction tx = null;
		try {
			
			tx = session.beginTransaction();
			int i=1;
			for (YoyoTransaction yt : data) {
			    session.save(yt);
			    if ( i % 50 == 0 ) {
			        session.flush();
			        session.clear();
			    }
			}
			
			//TODO: update upload stats
			
			
			tx.commit();

		} catch (HibernateException e) {
			if (tx!=null) tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		
		
		
		
		
	}
	
	
	public static void saveUploadHistory() {

		DataUpload du = new DataUpload();

		du.setPeriodEnd("end");
		du.setPeriodStart("start");
		

		
		Configuration con = new Configuration().configure().addAnnotatedClass(DataUpload.class);
		SessionFactory sf = con.buildSessionFactory();
		Session session = sf.openSession();
		Transaction tx = null;
		try {
			//with hibernate always use transactions
			tx = session.beginTransaction();
			session.save(du);
			tx.commit();

		} catch (HibernateException e) {
			if (tx!=null) tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}

	}




}
