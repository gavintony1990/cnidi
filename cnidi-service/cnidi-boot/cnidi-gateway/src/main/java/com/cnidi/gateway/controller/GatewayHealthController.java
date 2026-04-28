package com.cnidi.gateway.controller;

import com.cnidi.common.api.ApiResponse;
import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GatewayHealthController {

    @GetMapping("/api/health")
    public ApiResponse<Map<String, Object>> health() {
        return ApiResponse.success(Map.of(
                "status", "UP",
                "application", "cnidi-gateway",
                "timestamp", LocalDateTime.now().toString()
        ));
    }
}
