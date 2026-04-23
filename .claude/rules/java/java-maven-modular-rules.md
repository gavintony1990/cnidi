# Java Maven Multi-Module Rules

本文件定义 Maven 多模块工程的模块边界和依赖方向，适用于当前阶段的 Spring Boot 模块化单体方案。

## 目标

多模块设计必须服务于以下目标：

- 业务边界清晰
- 公共能力可复用
- 依赖方向稳定
- 便于未来演进为更细粒度服务
- 避免循环依赖和跨层穿透

## 推荐模块方向

当前阶段推荐类似结构：

```txt
boot-start
common-core
common-security
common-mybatis
system-api
system-biz
```

可根据实际项目调整命名，但边界要保持一致。

## 模块职责

- `boot-start`
  - Spring Boot 启动入口
  - 自动装配整合
  - 运行时配置组装
- `common-core`
  - 通用响应、异常、工具、基础模型
- `common-security`
  - 认证授权、用户上下文、权限表达式、鉴权配置
- `common-mybatis`
  - MyBatis Plus、分页、审计字段、通用数据库配置
- `system-api`
  - 对外稳定 DTO、VO、枚举、查询对象、命令对象
- `system-biz`
  - 业务实现、controller、service、repository、mapper

## 依赖方向

允许的总体方向：

```txt
boot-start -> common-* / system-*
system-biz -> system-api / common-*
system-api -> common-core（必要时）
common-* -> 尽量不依赖业务模块
```

禁止：

- `common-*` 依赖 `system-*`
- `system-api` 依赖 `system-biz`
- 模块之间互相循环依赖
- 上层模块跨过 service 直接依赖下层实现细节

## API 与业务实现分离

- `system-api` 用于沉淀稳定契约对象。
- `system-biz` 负责实现，不向外暴露内部 entity / mapper。
- 如果未来拆分服务，优先从 `api` 与 `biz` 的边界演进，而不是重写契约。

## 控制复杂度的规则

- 不要为了“模块化”把很小的能力拆成大量单文件模块。
- 只有当边界稳定、复用明确或演进价值明显时，才拆新模块。
- 公共模块只放真正公共的能力，不把一切都塞进 `common`。
- `common` 过大时，应按能力再拆分，但不能形成相互耦合的“伪公共层”。

## 数据与事务边界

- 事务边界优先放在业务模块的 service 层。
- 不同业务模块共享数据库时，也要保持逻辑边界，不相互直接操作对方内部实现。
- 跨模块状态流转应通过稳定 service 接口或应用层编排完成。

## 测试规则

- 模块改动应优先运行受影响模块测试，再跑整体构建。
- 对公共模块改动要额外关注回归影响。
- 多模块间公共契约变更时，要同步更新调用方和接口文档。

## 禁止行为

- 不允许模块循环依赖。
- 不允许 Controller 放到公共模块。
- 不允许把业务常量、业务枚举、业务 DTO 无边界丢进 `common-core`。
- 不允许为了少写代码跨模块直接引用内部实现类。
