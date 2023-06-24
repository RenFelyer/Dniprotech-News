package ua.sergienko.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import io.vertx.core.eventbus.Message;
import io.vertx.core.json.JsonObject;
import io.vertx.sqlclient.Tuple;
import ua.sergienko.GenericVerticle;

@Component
public class ArticleVerticle extends GenericVerticle {

	private static final Logger log = LoggerFactory.getLogger(ArticleVerticle.class);

	@Override
	public void start() throws Exception {
		eventBus.consumer("jdbc.article.find", this::findArticle);
		eventBus.consumer("jdbc.article.incViewed", this::incrementViewed);

		eventBus.consumer("jdbc.articles.all", this::allArticles);
		eventBus.consumer("jdbc.articles.locked", this::findLocked);
		eventBus.consumer("jdbc.articles.search", this::searchArticles);

		eventBus.consumer("jdbc.article.create", this::createArticle);
		eventBus.consumer("jdbc.article.update", this::updateArticle);
		eventBus.consumer("jdbc.article.picture", this::pictureArticle);

		eventBus.consumer("jdbc.article.locked", this::lockedArticle);
		eventBus.consumer("jdbc.article.delete", this::deleteArticle);
		eventBus.consumer("jdbc.article.tag.add", this::addTag);
		eventBus.consumer("jdbc.article.tag.del", this::delTag);
	}

	private void allArticles(Message<?> message) {
		var sql = "SELECT * FROM articles ORDER BY locked DESC, id DESC";
		preparedQuery(sql).onSuccess(message::reply).onFailure(err -> {
			log.warn("Unable to find the articles");
			message.fail(404, err.getMessage());
		});
	}

	private void findArticle(Message<?> message) {
		var id = message.body();
		var sql = "SELECT * FROM articles WHERE id = ?";
		preparedQuery(sql, id).map(this::onlyOne).onSuccess(message::reply).onFailure(err -> {
			log.warn("Unable to find the article using the id: {}", id);
			message.fail(404, err.getMessage());
		});
	}

	private void incrementViewed(Message<?> message) {
		var id = message.body();
		var sql = "UPDATE articles SET viewed = viewed + 1 WHERE id = ?";
		preparedQuery(sql, id).onFailure(err -> {
			log.warn("Failed to find an article while incrementing the 'viewed' counter by id: {}", id);
			message.fail(404, err.getMessage());
		});
	}

	private void findLocked(Message<?> message) {
		var locked = message.body();
		var sql = "SELECT * FROM articles WHERE locked = ?";
		preparedQuery(sql, locked).onSuccess(message::reply).onFailure(err -> {
			log.warn("Could not find a locked articles");
			message.fail(404, err.getMessage());
		});
	}

	private void searchArticles(Message<JsonObject> message) {
		var json = message.body();
		var content = json.getValue("content");
		var page = Integer.parseInt(json.getString("page"));
		var tag = json.getValue("tag");
		var sql = """
				SELECT
					*
				FROM articles a
				WHERE (
					LOWER(a.title) LIKE CONCAT('%', LOWER(?), '%') OR
					LOWER(a.description) LIKE CONCAT('%', LOWER(?), '%') OR
					LOWER(a.content) LIKE CONCAT('%', LOWER(?), '%')
				) AND (
					(
						SELECT COUNT(*)
						FROM tags t
						JOIN article_tag conn ON conn.article_id=a.id AND conn.tag_id = t.id
						WHERE t.content = ?
					) > 0 OR ? = ''
				)
				ORDER BY a.id DESC
				LIMIT ?, 6
				""";
		var tpl = Tuple.of(content, content, content, tag, tag, page * 6);
		preparedQuery(sql, tpl).onSuccess(message::reply).onFailure(err -> {
			log.warn("No articles could be found for the content: {} and tag: {} on page: {}", content, tag, page);
			message.fail(404, err.getMessage());
		});
	}

	private void lockedArticle(Message<?> message) {
		var id = message.body();
		var sql = "UPDATE articles SET locked = CASE WHEN locked = 1 THEN 0 ELSE 1 END WHERE id = ?";
		preparedQuery(sql, id).onSuccess(message::reply).onFailure(err -> {
			log.warn("Failed to locked the article at id: {}", id);
			message.fail(404, err.getMessage());
		}).onSuccess(message::reply);
	}

	private void createArticle(Message<JsonObject> message) {
		var json = message.body();
		var title = json.getValue("title");
		var content = json.getValue("content");
		var description = json.getValue("description");
		var sql = "INSERT INTO articles (title, content, description) VALUES (?, ?, ?) RETURNING id";
		preparedQuery(sql, title, content, description).onFailure(err -> {
			log.warn("Failed to create an article in the database");
			message.fail(404, err.getMessage());
		}).map(this::onlyOne).onSuccess(message::reply);
	}

	private void updateArticle(Message<JsonObject> message) {
		var json = message.body();
		var id = json.getValue("id");
		var title = json.getValue("title");
		var content = json.getValue("content");
		var description = json.getValue("description");
		var sql = "UPDATE articles SET title = ?, content = ?, description = ? WHERE id = ?";
		preparedQuery(sql, title, content, description, id).onFailure(err -> {
			log.warn("Failed to update the article at id: {}", id);
			message.fail(404, err.getMessage());
		}).onSuccess(message::reply);
	}

	private void pictureArticle(Message<JsonObject> message) {
		var json = message.body();
		var id = json.getValue("id");
		var picture = json.getValue("picture");
		var sql = "UPDATE articles SET picture = ? WHERE id = ?";
		preparedQuery(sql, picture, id).onFailure(err -> {
			log.warn("Failed to update the article at id: {}", id);
			message.fail(404, err.getMessage());
		}).onSuccess(message::reply);
	}

	private void deleteArticle(Message<?> message) {
		var id = message.body();
		var sql = "DELETE FROM articles WHERE id = ?";
		preparedQuery(sql, id).onFailure(err -> {
			log.warn("Failed to delete the article at id: {}", id);
			message.fail(404, err.getMessage());
		}).onSuccess(message::reply);
	}

	private void addTag(Message<JsonObject> message) {
		var json = message.body();
		var tagId = json.getValue("tagId");
		var articleId = json.getValue("articleId");
		var sql = "INSERT INTO article_tag (article_id, tag_id) VALUES (?,?)";
		preparedQuery(sql, articleId, tagId).onFailure(err -> {
			log.warn("The tag with id: {} could not be added to the article with id: {}", tagId, articleId);
			message.fail(404, err.getMessage());
		});
	}

	private void delTag(Message<JsonObject> message) {
		var json = message.body();
		var tagId = json.getValue("tagId");
		var articleId = json.getValue("articleId");
		var sql = "DELETE FROM article_tag WHERE article_id = ? AND tag_id = ?";
		preparedQuery(sql, articleId, tagId).onFailure(err -> {
			log.warn("The tag with id: {} could not be deleted to the article with id: {}", tagId, articleId);
			message.fail(404, err.getMessage());
		});
	}

}
