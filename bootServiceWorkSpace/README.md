# cnidi-service

天工联项目 Spring Cloud + Dubbo 微服务后端基线。

## 模块结构

```txt
bootServiceWorkSpace
├── pom.xml
├── cnidi-system
│   ├── cnidi-common
│   ├── cnidi-dependencies
│   ├── cnidi-dubbo-api
│   ├── cnidi-system-core
│   ├── cnidi-file
│   └── cnidi-ai
└── cnidi-boot
    ├── cnidi-gateway
    ├── cnidi-auth-service
    ├── cnidi-admin
    └── cnidi-ai-service
```

## 模块职责

- `cnidi-common`：统一响应、异常、安全和通用基础能力
- `cnidi-dependencies`：MyBatis-Plus / MySQL 持久层基础设施
- `cnidi-dubbo-api`：Dubbo RPC 接口与 DTO 契约
- `cnidi-system-core`：认证与系统管理领域代码
- `cnidi-boot`：Gateway 与微服务启动层

## 启动

```bash
mvn -pl cnidi-boot/cnidi-gateway spring-boot:run
mvn -pl cnidi-boot/cnidi-auth-service spring-boot:run
mvn -pl cnidi-boot/cnidi-admin spring-boot:run
mvn -pl cnidi-boot/cnidi-ai-service spring-boot:run
```
