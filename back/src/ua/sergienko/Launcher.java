package ua.sergienko;

import static java.lang.Long.MAX_VALUE;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;

import io.vertx.core.Verticle;
import io.vertx.core.Vertx;
import io.vertx.core.VertxOptions;
import io.vertx.core.logging.SLF4JLogDelegateFactory;

@ComponentScan
public class Launcher {

	public static void main(String[] args) {
		var logFactoryName = "org.vertx.logger-delegate-factory-class-name";
		System.setProperty(logFactoryName, SLF4JLogDelegateFactory.class.getName());

		var context = new AnnotationConfigApplicationContext(Launcher.class);
		var vertx = Vertx.vertx(new VertxOptions().setBlockedThreadCheckInterval(MAX_VALUE / 2));

		context.getBeanProvider(Verticle.class).forEach(vertx::deployVerticle);
		Runtime.getRuntime().addShutdownHook(new Thread(context::close));
		Runtime.getRuntime().addShutdownHook(new Thread(vertx::close));
	}



}
