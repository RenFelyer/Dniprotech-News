package ua.sergienko.service;

import io.vertx.core.CompositeFuture;
import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;

public class FrontService {

	private final Vertx vertx;

	public FrontService(Vertx vertx) {
		this.vertx = vertx;
	}

	public Future<?> findArticle(RoutingContext ctx) {
		var id = ctx.pathParam("pathId");
		vertx.eventBus().send("jdbc.article.incViewed", id);
		return findSArticle(ctx);
	}

	public Future<?> findSArticle(RoutingContext ctx) {
		var id = ctx.pathParam("pathId");
		var article = vertx.eventBus().request("jdbc.article.find", id).map(Message::body);
		var tags = vertx.eventBus().request("jdbc.tags.attached", id).map(Message::body);
		return CompositeFuture.all(article, tags)
				.map(comp -> comp.<JsonObject>resultAt(0).put("tags", comp.<JsonArray>resultAt(1)));
	}

	public Future<?> findLocked(RoutingContext ctx) {
		return vertx.eventBus().request("jdbc.articles.locked", 1).map(Message::body);
	}

	public Future<?> popularTag(RoutingContext ctx) {
		return vertx.eventBus().request("jdbc.tags.popular", ctx.pathParam("count")).map(Message::body);
	}

	public Future<?> searchArticle(RoutingContext ctx) {
		var body = ctx.body().asJsonObject();
		var json = new JsonObject();
		json.put("content", body.getString("content"));
		json.put("page", body.getValue("page", "0"));
		json.put("tag", body.getValue("tag", ""));
		return vertx.eventBus().request("jdbc.articles.search", json).map(Message::body);
	}

}
