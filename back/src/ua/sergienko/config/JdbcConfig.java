package ua.sergienko.config;

import javax.sql.DataSource;

import org.mariadb.jdbc.Driver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
public class JdbcConfig {

	@Bean
	DataSource dataSource() {
		var urlJdbc = "jdbc:mariadb://localhost:3306/news?createDatabaseIfNotExist=true";
		var config = new HikariConfig();
		config.setDriverClassName(Driver.class.getName());
		config.setJdbcUrl(urlJdbc);
		config.setUsername(System.getProperty("PROJECT_JDBC_NAME", "root"));
		config.setPassword(System.getProperty("PROJECT_JDBC_PASS", "1945"));
		return new HikariDataSource(config);
	}

}
