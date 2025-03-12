package com.luv2code.ecomm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        // ✅ Expose entity IDs
        config.exposeIdsFor(
                com.luv2code.ecomm.Entity.Product.class,
                com.luv2code.ecomm.Entity.ProductCategory.class
        );

        // ✅ Configure CORS correctly
        cors.addMapping("/api/**")
                .allowedOrigins("http://localhost:60847") // Adjust based on frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true);
    }
}
