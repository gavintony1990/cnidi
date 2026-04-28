package com.cnidi.aiservice.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiHealthController {

    @GetMapping("/internal/ai/ping")
    public Map<String, Object> ping() {
        return Map.of("service", "cnidi-ai-service", "status", "UP");
    }
}
