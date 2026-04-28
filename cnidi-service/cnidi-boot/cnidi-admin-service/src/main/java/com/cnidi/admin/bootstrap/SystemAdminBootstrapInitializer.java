package com.cnidi.admin.bootstrap;

import com.cnidi.system.core.admin.service.SystemAdminBootstrapService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SystemAdminBootstrapInitializer implements CommandLineRunner {

    private final SystemAdminBootstrapService systemAdminBootstrapService;

    public SystemAdminBootstrapInitializer(SystemAdminBootstrapService systemAdminBootstrapService) {
        this.systemAdminBootstrapService = systemAdminBootstrapService;
    }

    @Override
    public void run(String... args) {
        systemAdminBootstrapService.initializeAdminData();
    }
}
