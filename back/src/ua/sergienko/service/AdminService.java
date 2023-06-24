package ua.sergienko.service;

import java.util.UUID;

import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;

public class AdminService {

	private final Vertx vertx;

	public AdminService(Vertx vertx) {
		this.vertx = vertx;
	}

	public Future<?> createTag(RoutingContext ctx) {
		var content = ctx.body().asString();
		return vertx.eventBus().request("jdbc.tag.create", content).map(Message::body);
	}

	public Future<?> createArticle(RoutingContext ctx) {
		return workingArticle(ctx, "jdbc.article.create");
	}

	public Future<?> updateArticle(RoutingContext ctx) {
		return workingArticle(ctx, "jdbc.article.update");
	}

	public Future<?> lockedArticle(RoutingContext ctx) {
		var id = ctx.pathParam("pathId");
		return vertx.eventBus().request("jdbc.article.locked", id).map(Message::body);
	}

	public Future<?> deleteArticle(RoutingContext ctx) {
		var id = ctx.pathParam("pathId");
		return vertx.eventBus().request("jdbc.article.delete", id).map(Message::body);
	}

	public Future<?> allArticles(RoutingContext ctx) {
		return vertx.eventBus().request("jdbc.articles.all", "").map(Message::body);
	}

	public Future<?> allTags(RoutingContext ctx) {
		return vertx.eventBus().request("jdbc.tags.all", "").map(Message::body);
	}

	public Future<?> deleteTag(RoutingContext ctx) {
		var id = ctx.pathParam("pathId");
		return vertx.eventBus().request("jdbc.tag.delete", id).map(Message::body);
	}

	public void addTag(RoutingContext ctx) {
		var json = new JsonObject();
		json.put("tagId", ctx.pathParam("tagId"));
		json.put("articleId", ctx.pathParam("articleId"));
		vertx.eventBus().send("jdbc.article.tag.add", json);
		ctx.end();
	}

	public void delTag(RoutingContext ctx) {
		var json = new JsonObject();
		json.put("tagId", ctx.pathParam("tagId"));
		json.put("articleId", ctx.pathParam("articleId"));
		vertx.eventBus().send("jdbc.article.tag.del", json);
		ctx.end();
	}

	private Future<?> workingArticle(RoutingContext ctx, String adress) {
		var prot = System.getProperty("PROJECT_PROT", "http");
		var host = System.getProperty("PROJECT_HOST", "localhost");
		var port = System.getProperty("PROJECT_PORT", "8393");
		var url = "%s://%s:%s".formatted(prot, host, port);
		var req = ctx.request();
		var json = new JsonObject();
		json.put("id", ctx.pathParam("pathId"));
		json.put("title", req.getParam("title"));
		json.put("content", req.getParam("content"));
		json.put("description", req.getParam("description"));
		var ret = vertx.eventBus().<JsonObject>request(adress, json).map(Message::body);
		for (var upload : ctx.fileUploads()) {
			final var filename = upload.fileName();
			final var extension = filename.substring(filename.lastIndexOf("."));
			final var picture = UUID.randomUUID().toString() + extension;
			json.put("picture", url + "/img/" + picture);
			System.out.println(json);
			vertx.fileSystem().moveBlocking(upload.uploadedFileName(), "images/" + picture);
			ret = ret.compose(value -> {
				json.put("id", value.getString("id", ctx.pathParam("pathId")));
				return vertx.eventBus().request("jdbc.article.picture", json);
			}).map(mess -> json);
		}
		return ret;
	}
}
