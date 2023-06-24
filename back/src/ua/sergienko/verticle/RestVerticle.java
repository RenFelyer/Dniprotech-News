package ua.sergienko.verticle;

import java.util.Set;

import org.springframework.stereotype.Component;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpHeaders;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.core.impl.logging.Logger;
import io.vertx.core.impl.logging.LoggerFactory;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;
import ua.sergienko.service.AdminService;
import ua.sergienko.service.FrontService;

@Component
public class RestVerticle extends AbstractVerticle {

	private static final Logger log = LoggerFactory.getLogger(RestVerticle.class);

	@Override
	public void start() throws Exception {
		var option = new HttpServerOptions().setCompressionSupported(true).setUseAlpn(true);
		var router = Router.router(vertx);
		router.route().handler(disableCors());

		var front = new FrontService(vertx);
		var admin = new AdminService(vertx);

		router.get("/img/:filename").respond(this::loadImage);

		router.get("/article/all").respond(admin::allArticles);
		router.get("/article/:pathId").respond(front::findArticle);
		router.get("/article/s/:pathId").respond(front::findSArticle);
		router.get("/articles/locked").respond(front::findLocked);
		router.post("/articles/search").handler(BodyHandler.create()).respond(front::searchArticle);

		router.put("/article/create").handler(BodyHandler.create("images")).respond(admin::createArticle);
		router.post("/article/update/:pathId").handler(BodyHandler.create("images")).respond(admin::updateArticle);
		router.post("/article/locked/:pathId").respond(admin::lockedArticle);
		router.delete("/article/delete/:pathId").respond(admin::deleteArticle);
		router.post("/article/tags/add/:articleId/:tagId").handler(admin::addTag);
		router.post("/article/tags/del/:articleId/:tagId").handler(admin::delTag);

		router.get("/tag/popular/:count").respond(front::popularTag);
		router.get("/tag/all").respond(admin::allTags);

		router.put("/tag/create").handler(BodyHandler.create(false)).respond(admin::createTag);
		router.delete("/tag/delete/:pathId").respond(admin::deleteTag);

		vertx.createHttpServer(option).requestHandler(router)//
				.exceptionHandler(log::warn)//
				.listen(8393)//
				.map(HttpServer::actualPort)//
				.map("Rest server successfully started on port %d"::formatted)//
				.onSuccess(log::info).onFailure(log::error);
	}

	public CorsHandler disableCors() {
		return CorsHandler.create().allowedMethods(Set.copyOf(HttpMethod.values())).addRelativeOrigin(".*")
				.allowCredentials(true);
	}

	public Future<?> loadImage(RoutingContext ctx) {
		ctx.response().putHeader(HttpHeaders.CONTENT_TYPE, "image/*");
		return vertx.fileSystem().readFile("images/" + ctx.pathParam("filename"));
	}

}
