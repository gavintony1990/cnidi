# MCP Security Guidelines

## 基本原则

- 不提交真实 token、client secret、数据库密码。
- 不把生产级高风险服务器默认接入项目共享配置。
- 团队共享只提交服务器定义和环境变量占位符。
- 高风险操作必须要求用户显式确认。

## 配置规则

- 项目共享服务器定义放 `.mcp.json`
- 项目共享 settings 放 `.claude/settings.json`
- 本地个人覆盖放 `.claude/settings.local.json`
- 真实凭据放本地环境变量、系统 keychain 或平台 OAuth，不放仓库

## 推荐权限策略

- 默认只批准必要的 MCP 服务器
- 不打开 “自动批准所有项目 MCP 服务器” 除非团队确认风险
- 高风险服务器采用 allowlist
- 敏感服务器优先只读

## 风险控制

以下场景默认视为高风险：

- 删除资源
- 修改 secret
- 触发部署
- 写生产数据库
- 变更权限、用户、计费、审计配置

这些能力不应放进默认共享配置。
