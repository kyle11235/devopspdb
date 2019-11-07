
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class Controller {

	@Autowired
	private OracleDS ds;
	
	@Value("${db.flightPDB}")
	private String flightPDB;

	@Value("${db.hotelPDB}")
	private String hotelPDB;

	@RequestMapping(value = "/booking", method = RequestMethod.GET)
	public Booking[] booking() {
		List<Booking> out = new ArrayList<Booking>();

		Connection connection = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		Long start = System.currentTimeMillis();
		try {
			connection = ds.getConnection();
			stmt = connection.prepareStatement("select booking.*, flight.Airline, hotel.name from Booking booking, flight@"+flightPDB+" flight, hotel@"+hotelPDB+" hotel where booking.FlightID = flight.ID and booking.HotelID = hotel.ID");
			rs = stmt.executeQuery();
			Long end = System.currentTimeMillis();
			System.out.println("db -> app:" + (end - start));
			while (rs.next()) {
				Booking f = new Booking();
				f.setId(rs.getString("ID"));
				f.setBookingDate(rs.getString("BookingDate"));
				f.setCustomerID(rs.getString("CustomerID"));
				f.setCustomerName(rs.getString("CustomerName"));
				f.setFlightName(rs.getString("Airline"));
				f.setHotelName(rs.getString("Name"));
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

		return out.toArray(new Booking[0]);
	}
	
}
