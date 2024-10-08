package kr.co.sas;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;

@Configuration
@EnableWebSocket
public class WebConfig implements WebMvcConfigurer{
	
	@Value("${file.root}")
	private String root;
	
	@Bean
	public BCryptPasswordEncoder bcrypt() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry
			.addResourceHandler("/editor/**")
			.addResourceLocations("file:///"+root+"/editor/");
		registry
			.addResourceHandler("/board/thumb/**")
			.addResourceLocations("file:///"+root+"/board/thumb/");
		registry
			.addResourceHandler("/userProfile/**")
			.addResourceLocations("file:///"+root+"/userProfile/");
		registry
			.addResourceHandler("/store/**")
			.addResourceLocations("file:///"+root+"/store/");
		registry
			.addResourceHandler("/store/storeMenu/**")
			.addResourceLocations("file:///"+root+"/store/storeMenu/");
	}
	
}
