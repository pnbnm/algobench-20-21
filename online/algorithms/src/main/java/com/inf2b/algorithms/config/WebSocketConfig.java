package com.inf2b.algorithms.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

/**
 * Using @ServerEndpoint to create websocket endpoint
 * First, ServerEndpointExporter is injected.
 * This bean will automatically register to use @ServerEndpoint.
 * The annotated statement is Web Socket endpoint.
 */
@Configuration
public class WebSocketConfig {
    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }
}
