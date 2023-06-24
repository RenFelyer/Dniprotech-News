package ua.sergienko.verticle;

import java.util.LinkedList;
import java.util.regex.Pattern;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import io.vertx.core.Promise;
import io.vertx.jdbcclient.JDBCPool;
import ua.sergienko.GenericVerticle;

@Component
public class JdbcVerticle extends GenericVerticle {

	private static final Logger log = LoggerFactory.getLogger(JdbcVerticle.class);
	private Pattern pattern = Pattern.compile("create table (?:if not exists )?([^\\s(]+)");

	@Override
	public void start(Promise<Void> promise) throws Exception {
		var list = Stream.of(vertx.fileSystem()//
				.readFileBlocking("db.sql").toString().replaceAll("\\s+", " ").trim().split(";"))
				.collect(LinkedList<String>::new, LinkedList::add, LinkedList::addAll);
		createTable(pool, list, promise);
	}

	public void createTable(JDBCPool pool, LinkedList<String> list, Promise<Void> promise) {
		var sql = list.removeFirst();

		pool.query(sql).execute().onSuccess(rows -> {
			var matcher = pattern.matcher(sql);

			while (matcher.find())
				log.info("Table '{}' is present in the database", matcher.group(1));

			if (list.size() == 0) {
				promise.complete();
				return;
			}

			createTable(pool, list, promise);
		}).onFailure(err -> {
			log.error("Fails to create a table in the database", err);
			promise.fail(err);
		});
	}
}
