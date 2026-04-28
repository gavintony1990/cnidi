package com.cnidi.gateway.filter;

import com.cnidi.common.api.ErrorResponse;
import com.cnidi.common.security.AuthenticatedUser;
import com.cnidi.common.security.JwtTokenProvider;
import com.cnidi.common.util.RequestIdUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import reactor.core.publisher.Mono;

@Component
public class JwtRelayGlobalFilter implements GlobalFilter, Ordered {

    private static final List<String> PUBLIC_PATH_PREFIXES = List.of(
            "/api/health",
            "/api/auth/login",
            "/api/auth/refresh",
            "/api/system/summary",
            "/actuator"
    );

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

    public JwtRelayGlobalFilter(JwtTokenProvider jwtTokenProvider, ObjectMapper objectMapper) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.objectMapper = objectMapper;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getPath().value();
        String authorization = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (isPublicPath(path) || authorization == null || !authorization.startsWith("Bearer ")) {
            return chain.filter(exchange);
        }

        String token = authorization.substring(7);
        try {
            AuthenticatedUser user = jwtTokenProvider.parseAccessToken(token);
            ServerWebExchange mutated = exchange.mutate()
                    .request(request -> request.headers(headers -> {
                        headers.set("X-User-Id", String.valueOf(user.userId()));
                        headers.set("X-Username", user.username());
                        headers.set("X-User-Type", user.userType());
                    }))
                    .build();
            return chain.filter(mutated);
        } catch (Exception ex) {
            return unauthorized(exchange.getResponse(), "Unauthorized");
        }
    }

    @Override
    public int getOrder() {
        return -100;
    }

    private boolean isPublicPath(String path) {
        return PUBLIC_PATH_PREFIXES.stream().anyMatch(path::startsWith);
    }

    private Mono<Void> unauthorized(ServerHttpResponse response, String message) {
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        try {
            byte[] payload = objectMapper.writeValueAsString(
                    ErrorResponse.of("UNAUTHORIZED", message, List.of(), RequestIdUtils.newRequestId())
            ).getBytes(StandardCharsets.UTF_8);
            return response.writeWith(Mono.just(response.bufferFactory().wrap(payload)));
        } catch (JsonProcessingException ex) {
            return response.setComplete();
        }
    }
}
