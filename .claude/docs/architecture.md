# Architecture

## 项目定位

cnidi（天工联项目）是一个基于 `claude-vibe-framework` 脚手架初始化的多端业务项目。当前目标不是继续建设脚手架，而是在既有治理层基础上推进真实业务开发。

## 四层结构

### 1. Project Governance Layer

用于定义规则和慢变化上下文：

- `CLAUDE.md`
- `.claude/claude.md`
- `.claude/docs/*`
- `.claude/tasks/*`
- `.claude/workflows/*`
- `.claude/agents/*`
- `.claude/rules/*`
- `.claude/styles/style.md`

### 2. Product Delivery Layer

用于交付业务代码：

- `WebServiceWorkSpace`
- `webAdminServiceWorkSpace`
- `bootServiceWorkSpace`

当前状态：

- 用户端为 React + Vite 最小骨架
- 管理后台为 React + Vite + Ant Design 最小骨架
- 后端已重构为 Spring Boot + Maven 多模块基础架构

### 3. Agent Runtime Layer

当前项目默认不实现独立 `agent-runtime` 代码，仅复用治理层和工作流规则。

### 4. Tool Integration Layer

用于受控集成 Git、Shell、MCP、Build、Infra 等工具。

## 三端职责

### `WebServiceWorkSpace`

- 面向普通用户
- 负责用户体验和前台业务流程
- 不承担后台管理职责

### `webAdminServiceWorkSpace`

- 面向运营、审核、配置、管理类角色
- 负责高信息密度的后台交互
- 前端权限只控制 UI 展示

### `bootServiceWorkSpace`

- 作为最终可信边界
- 负责 API、鉴权、授权、输入校验、业务逻辑、数据访问和审计能力

## 当前后端路线

当前默认路线：

- Spring Boot + Maven 多模块
- 模块化单体优先
- 数据库使用 MySQL
- 持久层使用 MyBatis-Plus
- 预留未来演进到 Spring Cloud 的边界

当前模块结构：

```txt
bootServiceWorkSpace
├── cnidi-system
│   ├── cnidi-common
│   ├── cnidi-dependencies
│   └── cnidi-system-core
└── cnidi-boot
```

模块职责：

- `cnidi-common`：纯公共层
- `cnidi-dependencies`：依赖聚合 + 持久层基础设施
- `cnidi-system-core`：系统层运行时代码
- `cnidi-boot`：启动和 Web 装配层

### 依赖方向

```txt
cnidi-boot -> cnidi-system-core
cnidi-system-core -> cnidi-common + cnidi-dependencies
cnidi-dependencies -> cnidi-common
```

## 当前规则结构

### 通用规则

- `.claude/rules/coding-rules.md`

### 前端规则

- `.claude/rules/frontend/frontend-coding-rules.md`
- `.claude/rules/frontend/frontend-component-encapsulation.md`
- React 项目继续读取 `.claude/rules/react/*`
- Vue 项目继续读取 `.claude/rules/vue/*`

### 后端规则

- `.claude/rules/java/*`
- `.claude/rules/go/go.md`
- `.claude/rules/python/*`
- `.claude/rules/cpp/*`

### 数据库规则

- `.claude/rules/database/sql-general-rules.md`
- `.claude/rules/database/mysql/mysql-rules.md`
