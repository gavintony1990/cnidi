# cnidi（天工联项目）

cnidi（天工联项目）是一个基于 `claude-vibe-framework` 脚手架初始化的多端业务项目代码库。

当前仓库保留了脚手架中的治理层能力：

- `CLAUDE.md` 和 `.claude/claude.md` 作为项目级规则与长期记忆
- `.claude/rules/*` 作为多语言编码、数据库和前端规则
- `.claude/tasks/*` 作为需求入口
- `.claude/workflows/*` 作为从需求到测试、提交的工作流定义

同时，当前仓库已经具备三端最小骨架：

- `WebServiceWorkSpace`：用户端前端
- `webAdminServiceWorkSpace`：管理后台前端
- `bootServiceWorkSpace`：Spring Boot + Maven 多模块后端

## 当前目标

- 将天工联项目作为真实业务项目继续开发
- 以当前三端骨架为起点，逐步补齐认证、RBAC、业务模块和数据库实现
- 保持项目治理层与业务代码同步演进

## 文档入口

优先阅读：

- `CLAUDE.md`
- `.claude/claude.md`
- `.claude/docs/architecture.md`
- `.claude/docs/api-contract.md`
- `.claude/tasks/0001-项目初始化.md`
- `.claude/rules/README.md`
- `.claude/workflows/README.md`
