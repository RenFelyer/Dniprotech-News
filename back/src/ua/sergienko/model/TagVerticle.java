package ua.sergienko.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import ua.sergienko.GenericVerticle;

@Component
public class TagVerticle extends GenericVerticle {

	private static final Logger log = LoggerFactory.getLogger(TagVerticle.class);

	@Override
	public void start() throws Exception {
		eventBus.consumer("jdbc.tags.all", this::allTag);
		eventBus.consumer("jdbc.tags.popular", this::popularTag);
		eventBus.consumer("jdbc.tags.attached", this::attachedTag);
		eventBus.consumer("jdbc.tag.create", this::createTag);
		eventBus.consumer("jdbc.tag.update", this::updateTag);
		eventBus.consumer("jdbc.tag.delete", this::deleteTag);
	}

	public void popularTag(Message<?> message) {
		var count = Integer.parseInt(message.body().toString());
		var sql = """
				SELECT
					tags.*,
					SUM(articles.viewed) AS 'viewed'
				FROM tags
				JOIN article_tag ON tags.id = article_tag.tag_id
				JOIN articles ON article_tag.article_id = articles.id
				GROUP BY tags.id, tags.content
				ORDER BY viewed DESC
				LIMIT ?
				""";
		preparedQuery(sql, count).onSuccess(message::reply).onFailure(err -> {
			log.warn("failed to retrieve popular tags");
			message.fail(404, err.getMessage());
		});
	}

	public void attachedTag(Message<?> message) {
		var id = message.body();
		var sql = """
				SELECT
					t.*
				FROM articles a
				JOIN article_tag j ON j.article_id = a.id
				JOIN tags t ON j.tag_id = t.id
				WHERE a.id = ?
				GROUP BY t.id, t.content
				ORDER BY t.id DESC
				""";
		preparedQuery(sql, id).onSuccess(message::reply).onFailure(err -> {
			log.warn("failed to retrieve popular tags");
			message.fail(404, err.getMessage());
		});
	}

	public void allTag(Message<?> message) {
		var sql = "SELECT * FROM tags ORDER BY id DESC";
		preparedQuery(sql).onSuccess(message::reply).onFailure(err -> {
			log.warn("failed to retrieve popular tags");
			message.fail(404, err.getMessage());
		});
	}

	public void createTag(Message<?> message) {
		var content = message.body();
		var sql = "INSERT INTO tags (content) VALUES (?)";
		preparedQuery(sql, content).onFailure(err -> {
			log.warn("failed to created tags");
			message.fail(404, err.getMessage());
		}).onSuccess(message::reply);
	}

	public void updateTag(Message<JsonObject> message) {
		var json = message.body();
		var id = json.getValue("id");
		var content = json.getValue("content");
		var sql = "UPDATE tags SET content = ? WHERE id = ?";
		preparedQuery(sql, content, id).onFailure(err -> {
			log.warn("failed to created tags");
			message.fail(404, err.getMessage());
		});
	}

	public void deleteTag(Message<?> message) {
		var id = message.body();
		preparedQuery("DELETE FROM article_tag WHERE tag_id = ?", id)
				.compose(v -> preparedQuery("DELETE FROM tags WHERE id = ?", id))//
				.onFailure(err -> {
					log.warn("Error during deletion of tag by id: {}", id);
					message.fail(404, err.getMessage());
				}).onSuccess(message::reply);

	}

}
