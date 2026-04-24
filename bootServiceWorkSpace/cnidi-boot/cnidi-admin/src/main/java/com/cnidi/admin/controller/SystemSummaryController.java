package com.cnidi.admin.controller;

import com.cnidi.common.api.ApiResponse;
import com.cnidi.system.core.model.SystemSummary;
import com.cnidi.system.core.service.SystemOverviewService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SystemSummaryController {

    private final SystemOverviewService systemOverviewService;

    public SystemSummaryController(SystemOverviewService systemOverviewService) {
        this.systemOverviewService = systemOverviewService;
    }

    @GetMapping("/api/system/summary")
    public ApiResponse<SystemSummary> summary() {
        return ApiResponse.success(systemOverviewService.getSummary());
    }
}
