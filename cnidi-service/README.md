# cnidi-service

天工联项目 Spring Cloud + Dubbo 微服务后端基线。

## 模块结构

```txt
cnidi-service
├── pom.xml
├── cnidi-system
│   ├── cnidi-common
│   ├── cnidi-dependencies
│   └── cnidi-system-core
└── cnidi-boot
    ├── cnidi-api-service
    ├── cnidi-gateway
    ├── cnidi-auth-service
    ├── cnidi-admin-service
    ├── cnidi-ai-service
    ├── cnidi-file-service
    └── cnidi-user-service
```

## 模块职责

- `cnidi-common`：统一响应、异常、安全和通用基础能力
- `cnidi-dependencies`：MyBatis-Plus / MySQL 持久层基础设施
- `cnidi-system-core`：认证、系统管理、RBAC 等领域核心代码
- `cnidi-api-service`：Dubbo RPC 接口与 DTO 契约，作为 `cnidi-boot` 下的独立契约模块
- `cnidi-gateway`：统一 API 网关与路由转发
- `cnidi-auth-service`：认证服务启动模块
- `cnidi-admin-service`：后台管理服务启动模块
- `cnidi-ai-service`：AI 服务启动模块
- `cnidi-file`：文件服务启动模块
- `cnidi-user`：用户服务启动模块

## 启动

```bash
mvn -pl cnidi-boot/cnidi-gateway -am spring-boot:run
mvn -pl cnidi-boot/cnidi-auth-service -am spring-boot:run
mvn -pl cnidi-boot/cnidi-admin-service -am spring-boot:run
mvn -pl cnidi-boot/cnidi-ai-service -am spring-boot:run
mvn -pl cnidi-boot/cnidi-file-service -am spring-boot:run
mvn -pl cnidi-boot/cnidi-user-service -am spring-boot:run
```

开发期默认入口：

- 网关：`8080`
- 认证服务：`8081`
- 后台管理服务：`8082`
- 管理后台前端只代理 `/api` 到 `http://localhost:8080`
- 数据库默认采用拆库脚本：`cnidi_auth`、`cnidi_system_admin`、`cnidi_ai`

## 架构约定

- `cnidi-system` 只承载通用基础设施与系统领域核心代码，不再聚合 `cnidi-dubbo-api`。
- `cnidi-boot` 同时承载可启动服务和启动层共享契约模块；`cnidi-api-service` 归属 `cnidi-boot` 聚合。
- 当前不保留独立 `cnidi-ai` 基础模块，AI 能力先收敛在 `cnidi-ai-service` 启动服务内。
- 启动服务通过 Maven reactor 依赖当前工程内模块，避免依赖本地 Maven 仓库缓存中的历史 artifact。
