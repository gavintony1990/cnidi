# cnidi-service

天工联项目 Spring Boot + Maven 多模块最小后端骨架。

## 模块

- `common-core`：通用响应和基础抽象
- `system-api`：系统模块对外契约对象
- `system-biz`：系统模块业务实现
- `boot-start`：Spring Boot 启动模块

## 启动

```bash
mvn -pl boot-start spring-boot:run
```
