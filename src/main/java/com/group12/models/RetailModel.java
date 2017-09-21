package com.group12.models;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import com.group12.utils.DatabaseConnectionManager;

public class RetailModel {

	/*
	 * mysql style public static void saveRetailData() {
	 * 
	 * // TRY connection out :( Connection conn =
	 * DatabaseConnectionManager.getConnection();
	 * 
	 * try { PreparedStatement stmt =
	 * conn.prepareStatement("SELECT * FROM data_uploads");
	 * 
	 * ResultSet rs = stmt.executeQuery();
	 * 
	 * while (rs.next()) { System.out.println(rs.getInt(1));
	 * System.out.println(rs.getString(2)); System.out.println(rs.getString(3));
	 * 
	 * } } catch (SQLException sqle) { System.out.println("sql exception!"); }
	 * 
	 * }
	 */

	public static DataUpload saveRetailData(List<YoyoTransaction> data, String fileName) {
		SessionFactory sf = DatabaseConnectionManager.getSessionFactory();

		Session session = sf.openSession();
		Transaction tx = null;
		DataUpload currentUpload = null;
		try {

			tx = session.beginTransaction();

			// upload data
			int i = 1;
			for (YoyoTransaction yt : data) {
				session.save(yt);
				if (i % 50 == 0) {
					session.flush();
					session.clear();
				}
			}

			// update upload stats
			currentUpload = new DataUpload();
			currentUpload.setPeriodStart(data.get(0).getDateTime());
			currentUpload.setPeriodEnd(data.get(data.size() - 1).getDateTime());
			currentUpload.setFileName(fileName);
			session.save(currentUpload);

			tx.commit();

		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
			return null;
		} finally {
			session.close();
		}

		return currentUpload;

	}

	@SuppressWarnings("unchecked")
	public static List<DataUpload> getAllDataUploads() {

		SessionFactory sf = DatabaseConnectionManager.getSessionFactory();

		Session session = sf.openSession();
		Transaction tx = null;// with hibernate transaction even for read :)
		List<DataUpload> list;
		try {

			tx = session.beginTransaction();

			list = session.createQuery("from DataUpload").list();
			
			Collections.sort(list, new Comparator<DataUpload>() {
				@Override
				public int compare(DataUpload first, DataUpload second) {
					
					return first.getPeriodEnd().after(second.getPeriodEnd()) ? -1 : 1;
					
				}
			});

			tx.commit();

		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
			return null;
		} finally {
			session.close();
		}

		for (DataUpload ul : list) {
			System.out.println(ul);
		}

		return list;

	}

	public static boolean checkFileAlreadyUploaded(List<YoyoTransaction> data) {

		List<DataUpload> allPreviousUploads = getAllDataUploads();
		Date middleTransactionTime = data.get(data.size() / 2).getDateTime();

		for (DataUpload du : allPreviousUploads) {
			if (du.getPeriodStart().before(middleTransactionTime) 
					&& du.getPeriodEnd().after(middleTransactionTime)) {
				return true;
			}
		}
		return false;
	}

}
