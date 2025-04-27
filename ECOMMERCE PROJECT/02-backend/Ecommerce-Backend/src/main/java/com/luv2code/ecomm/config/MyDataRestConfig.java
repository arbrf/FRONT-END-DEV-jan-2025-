package com.luv2code.ecomm.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
     @Value("${allowed.origins}")
    private String allowedOrigins[];
    @Value("${spring.data.rest.data-path}")
    private  String basePath;
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(
                com.luv2code.ecomm.Entity.Product.class,
                com.luv2code.ecomm.Entity.ProductCategory.class,
                com.luv2code.ecomm.Entity.Order.class
        );

        // ✅ Configure CORS correctly


        cors.addMapping(basePath + "**")
                .allowedOrigins(allowedOrigins) // Adjust based on frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH")
                .allowCredentials(true);
    }
}
