package com.cnidi.authservice;

import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableDubbo
@MapperScan(basePackages = {
        "com.cnidi.system.core.auth.mapper",
        "com.cnidi.system.core.audit.mapper"
})
@SpringBootApplication(scanBasePackages = {
        "com.cnidi.common",
        "com.cnidi.dependencies",
        "com.cnidi.system.core.auth",
        "com.cnidi.authservice"
})
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }
}
