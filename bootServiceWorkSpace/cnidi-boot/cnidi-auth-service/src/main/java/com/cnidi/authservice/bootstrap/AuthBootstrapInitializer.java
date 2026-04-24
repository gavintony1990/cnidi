package com.cnidi.authservice.bootstrap;

import com.cnidi.system.core.auth.service.AuthBootstrapService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AuthBootstrapInitializer implements CommandLineRunner {

    private final AuthBootstrapService authBootstrapService;

    public AuthBootstrapInitializer(AuthBootstrapService authBootstrapService) {
        this.authBootstrapService = authBootstrapService;
    }

    @Override
    public void run(String... args) {
        authBootstrapService.initializeAdminData();
    }
}
