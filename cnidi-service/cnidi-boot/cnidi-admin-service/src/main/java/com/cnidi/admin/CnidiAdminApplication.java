package com.cnidi.admin;

import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableDubbo
@MapperScan(basePackages = {
        "com.cnidi.system.core.admin.mapper",
        "com.cnidi.system.core.audit.mapper"
})
@SpringBootApplication(scanBasePackages = {
        "com.cnidi.common",
        "com.cnidi.dependencies",
        "com.cnidi.system.core.admin",
        "com.cnidi.system.core.service",
        "com.cnidi.admin"
})
public class CnidiAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(CnidiAdminApplication.class, args);
    }
}
