package com.cnidi.system.biz;

import com.cnidi.system.api.SystemSummary;
import org.springframework.stereotype.Service;

@Service
public class SystemOverviewService {

    public SystemSummary getSummary() {
        return new SystemSummary(
                "cnidi-service",
                "skeleton-initialized",
                "spring-boot-maven-modular"
        );
    }
}
