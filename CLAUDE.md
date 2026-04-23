# cnidi（天工联项目）

本文件是天工联项目的项目级 AI 工程宪法。目标是让 Claude/Codex 在实现真实业务需求时，仍然遵守工程边界、接口契约、验证流程和交付标准。

## 工程结构

当前项目默认包含三个业务工程：

- `WebServiceWorkSpace`：用户端前端工程
- `webAdminServiceWorkSpace`：管理后台前端工程
- `bootServiceWorkSpace`：后端服务工程

辅助目录：

- `.claude/docs`：架构、接口、开发说明
- `.claude/agents`：角色型 Agent 提示词
- `.claude/rules`：编码、数据库、前端和后端规则
- `.claude/skills`：可复用技能模板
- `.claude/tasks`：需求定义目录，所有需求入口层
- `.claude/workflows`：从需求拆解到测试、提交的工作流定义
- `.claude/claude.md`：项目长期记忆
- `.claude/shared`：共享 schema、DTO、类型、OpenAPI 生成物

## AI 工作原则

每次实现需求时，先判断影响范围：

- 只影响 `WebServiceWorkSpace`
- 只影响 `webAdminServiceWorkSpace`
- 只影响 `bootServiceWorkSpace`
- 同时影响前端和后端
- 影响接口契约、权限、数据模型或部署

默认按垂直切片交付：

1. 明确需求边界和验收标准
2. 更新或确认 `.claude/docs/api-contract.md`
3. 实现 `bootServiceWorkSpace` API、权限、校验和测试
4. 实现受影响的前端页面、状态和 API 调用
5. 运行相关 lint、test、typecheck、build
6. 输出改动摘要、验证结果和剩余风险

## 职责边界

`WebServiceWorkSpace` 负责普通用户体验，不承担后台管理职责。

`webAdminServiceWorkSpace` 负责管理、运营、审核、配置和权限化操作。前端权限只用于 UI 展示，不作为安全边界。

`bootServiceWorkSpace` 是最终可信边界，负责 API、鉴权、授权、输入校验、业务逻辑、数据访问、审计日志和外部系统集成。

## 接口契约

所有跨工程通信必须以 `.claude/docs/api-contract.md` 为准。接口变更必须同步说明：

- method 和 path
- auth requirement
- request params/body
- response body
- error responses
- 使用方
- 兼容性和迁移影响

## 安全规则

- 后端必须校验所有输入
- 后端必须执行最终权限判断
- 不提交 secret、token、数据库密码
- 不在前端硬编码真实敏感信息
- 不直接暴露数据库错误、堆栈或内部异常
- 管理后台敏感操作必须记录审计日志

## 完成标准

任务完成必须满足：

- 功能可运行
- 接口契约已同步
- 前端处理 loading、empty、error、success
- 后端具备输入校验、权限校验、结构化错误
- 相关检查已运行，或明确说明无法运行原因
- 没有无关重构
