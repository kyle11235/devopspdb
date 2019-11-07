
package com.example.rest.dbcs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class Controller {

	@Autowired
	private OracleDS ds;
	
	@Value("${db.hotelPDB}")
	private String hotelPDB;

	@RequestMapping(value = "/flight", method = RequestMethod.GET)
	public Flight[] flight() {
		List<Flight> out = new ArrayList<Flight>();
		
//		Flight f = new Flight();
//		f.setId("ID");
//		f.setAirline("SZ");
//		f.setDeparture("beijing");
//		f.setDestination("shenzhen");
//		f.setClazz("business");
//		f.setPrice(new Double("123"));
//		out.add(f);
//		
//		return out.toArray(new Flight[0]);

		Connection connection = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		Long start = System.currentTimeMillis();
		try {
			connection = ds.getConnection();
			stmt = connection.prepareStatement("select * from Flight");
			rs = stmt.executeQuery();
			Long end = System.currentTimeMillis();
			System.out.println("db -> app:" + (end - start));
			while (rs.next()) {
				Flight f = new Flight();
				f.setId(rs.getString("ID"));
				f.setAirline(rs.getString("Airline"));
				f.setDeparture(rs.getString("Departure"));
				f.setDestination(rs.getString("Destination"));
				f.setClazz(rs.getString("Clazz"));
				f.setPrice(rs.getDouble("Price"));
				out.add(f);
			}
		} catch (SQLException e) {
			System.out.println("SQL Query Error: " + e.getMessage());
			e.printStackTrace();
		} catch (Exception e) {
			System.out.println("Query Error: " + e.getMessage());
			e.printStackTrace();
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (stmt != null) {
					stmt.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException("cannot close resultset/statement/connection", e);
			}
		}

		return out.toArray(new Flight[0]);
	}

	@RequestMapping(value = "/update/{value1}/{value2}", method = RequestMethod.GET)
	public String update(@PathVariable Double value1, @PathVariable Double value2) {
		
		System.out.println("value1=" + value1);
		System.out.println("value2=" + value2);


		Connection connection = null;
		PreparedStatement stmt1 = null, stmt2 = null;
		ResultSet rs = null;
		Long start = System.currentTimeMillis();
		try {
			connection = ds.getConnection();
			
			connection.setAutoCommit(false);
			
			stmt1 = connection.prepareStatement("update Flight set Price = ? ");
			stmt1.setDouble(1, value1);

			stmt2 = connection.prepareStatement("update Hotel@" + hotelPDB  + " set Price = ? ");
			stmt2.setDouble(1, value2);
			
			stmt1.execute();
			stmt2.execute();
			
			connection.commit();
			connection.setAutoCommit(true);
			
			Long end = System.currentTimeMillis();
			System.out.println("db -> app:" + (end - start));
		} catch (SQLException e) {
			System.out.println("SQL Query Error: " + e.getMessage());
			e.printStackTrace();
			return "Failed";
		} catch (Exception e) {
			System.out.println("Query Error: " + e.getMessage());
			e.printStackTrace();
			return "Failed";
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (stmt1 != null) {
					stmt1.close();
				}
				if (stmt2 != null) {
					stmt2.close();
				}
				if (connection != null) {
					connection.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
				return "Failed";
			}
		}

		return "Success";
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
