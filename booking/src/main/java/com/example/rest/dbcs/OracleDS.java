package com.example.rest.dbcs;

import java.sql.Connection;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import oracle.jdbc.pool.OracleDataSource;

@Component
public class OracleDS {

	// a pool
	private static OracleDataSource ds = null;

	@Value("${db.url}")
	private String url;

	@Value("${db.username}")
	private String username;

	@Value("${db.password}")
	private String password;

	@Value("${db.initSize}")
	private String initSize;

	@Value("${db.minSize}")
	private String minSize;

	@Value("${db.maxSize}")
	private String maxSize;

	public synchronized void init() throws SQLException {
		if (ds == null) {
			ds = new OracleDataSource();
			ds.setURL(url);
			ds.setUser(username);
			ds.setPassword(password);

			java.util.Properties pps = new java.util.Properties();
			pps.setProperty("InitialLimit", initSize);
			pps.setProperty("MinLimit", minSize);
			pps.setProperty("MaxLimit", maxSize);
			ds.setConnectionCacheProperties(pps);
			ds.setConnectionCachingEnabled(true);
			// warm up
			ds.getConnection();

		}
	}

	public Connection getConnection() throws SQLException {
		if (ds == null) {
			init();
		}
		return ds.getConnection();
	}

}
