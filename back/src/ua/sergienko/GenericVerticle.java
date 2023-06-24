package ua.sergienko;

import java.util.List;
import java.util.stream.StreamSupport;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;

import io.vertx.core.Context;
import io.vertx.core.Future;
import io.vertx.core.Promise;
import io.vertx.core.Verticle;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.jdbcclient.JDBCPool;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;
import io.vertx.sqlclient.Tuple;

public class GenericVerticle implements Verticle {

	protected Vertx vertx;
	protected JDBCPool pool;
	protected Context context;
	protected EventBus eventBus;
	private @Autowired DataSource dataSource;

	@Override
	public Vertx getVertx() {
		return vertx;
	}

	@Override
	public void init(Vertx vertx, Context context) {
		this.pool = JDBCPool.pool(vertx, dataSource);
		this.eventBus = vertx.eventBus();
		this.context = context;
		this.vertx = vertx;
	}

	public String deploymentID() {
		return context.deploymentID();
	}

	public JsonObject config() {
		return context.config();
	}

	public List<String> processArgs() {
		return context.processArgs();
	}

	@Override
	public void start(Promise<Void> startPromise) throws Exception {
		start();
		startPromise.complete();
	}

	@Override
	public void stop(Promise<Void> stopPromise) throws Exception {
		stop();
		stopPromise.complete();
	}

	public void start() throws Exception {
	}

	public void stop() throws Exception {
	}

	protected Future<JsonArray> preparedQuery(String sql, Object... values) {
		var tpl = Tuple.tuple(List.of(values));
		return preparedQuery(sql, tpl);
	}

	protected Future<JsonArray> preparedQuery(String sql, Tuple tpl) {
		return pool.withConnection(conn -> conn.preparedQuery(sql).execute(tpl)).map(this::convertToJson);
	}

	protected JsonArray convertToJson(RowSet<Row> rows) {
		return StreamSupport.stream(rows.spliterator(), false).map(Row::toJson)//
				.collect(JsonArray::new, JsonArray::add, JsonArray::addAll);
	}

	protected JsonObject onlyOne(JsonArray array) {
		return array.getJsonObject(0);
	}
}
