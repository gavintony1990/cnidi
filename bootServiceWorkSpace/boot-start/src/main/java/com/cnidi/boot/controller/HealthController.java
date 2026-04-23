package com.cnidi.boot.controller;

import com.cnidi.common.api.ApiResponse;
import com.cnidi.system.api.SystemSummary;
import com.cnidi.system.biz.SystemOverviewService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {

    private final SystemOverviewService systemOverviewService;

    public HealthController(SystemOverviewService systemOverviewService) {
        this.systemOverviewService = systemOverviewService;
    }

    @GetMapping("/health")
    public ApiResponse<String> health() {
        return ApiResponse.success("ok");
    }

    @GetMapping("/system/summary")
    public ApiResponse<SystemSummary> summary() {
        return ApiResponse.success(systemOverviewService.getSummary());
    }
}
