package com.springproject.jobapplication.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.springproject.jobapplication.jwt.AuthEntryPointJwt;
import com.springproject.jobapplication.jwt.AuthTokenFilter;
import com.springproject.jobapplication.user.CustomUserDetailsService;
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173"); // React frontend
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public AuthTokenFilter authenticationJwAuthTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.cors(); // Enable CORS

        http.authorizeHttpRequests((requests) -> requests
                // API endpoints that don't require authentication
                .requestMatchers("/register").permitAll()
                .requestMatchers("/signin").permitAll()
                .requestMatchers("/users").permitAll()
                .requestMatchers("/api").permitAll()
                .requestMatchers("/health").permitAll()
                // Static resources
                .requestMatchers("/assets/**").permitAll()
                .requestMatchers("/static/**").permitAll()
                .requestMatchers("/*.js").permitAll()
                .requestMatchers("/*.css").permitAll()
                .requestMatchers("/*.jpg", "/*.png", "/*.svg", "/*.ico").permitAll()
                .requestMatchers("/favicon.ico").permitAll()
                .requestMatchers("/vacancy.jpg").permitAll()
                .requestMatchers("/index.html").permitAll()
                // Frontend routes
                .requestMatchers("/", "/jobs/**", "/companies/**", "/login",
                        "/register", "/dashboard/**", "/profile/**",
                        "/admin/**", "/about", "/contact", "/help")
                .permitAll()
                // API endpoints that require JWT authentication
                .requestMatchers("/api/companies/**").authenticated()
                .requestMatchers("/api/jobs/**").authenticated()
                .requestMatchers("/admin/users/**").authenticated()
                // All other requests require authentication
                .anyRequest().authenticated());

        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler));
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));
        http.csrf(csrf -> csrf.disable());
        http.addFilterBefore(authenticationJwAuthTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }
}
