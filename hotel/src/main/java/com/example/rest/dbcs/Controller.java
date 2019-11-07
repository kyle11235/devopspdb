
package com.example.rest.dbcs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

	@RequestMapping(value = "/hotel", method = RequestMethod.GET)
	public Hotel[] hotel() {
		List<Hotel> out = new ArrayList<Hotel>();
		
//		Hotel h = new Hotel();
//		h.setId("H001");
//		h.setName("深圳罗湖智选假日酒店");
//		h.setAddress("罗湖区桂园北路6号");
//		h.setStar("5星级");
//		h.setPrice(new Double("9999"));
//		out.add(h);
//		
//		return out.toArray(new Hotel[0]);

		Connection connection = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		Long start = System.currentTimeMillis();
		try {
			connection = ds.getConnection();
			stmt = connection.prepareStatement("select * from Hotel");
			rs = stmt.executeQuery();
			Long end = System.currentTimeMillis();
			System.out.println("db -> app:" + (end - start));
			while (rs.next()) {
				Hotel h = new Hotel();
				h.setId(rs.getString("ID"));
				h.setName(rs.getString("Name"));
				h.setAddress(rs.getString("Address"));
				h.setStar(rs.getString("Star"));
				h.setPrice(rs.getDouble("Price"));
				h.setComments(rs.getString("Comments"));
				out.add(h);
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

		return out.toArray(new Hotel[0]);
	}

	@RequestMapping(value = "/update/{value1}/{value2}", method = RequestMethod.GET)
	public String update(@PathVariable Double value1, @PathVariable Double value2) {
		
		System.out.println("value1=" + value1);
		System.out.println("value2=" + value2);

		return "success";
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
