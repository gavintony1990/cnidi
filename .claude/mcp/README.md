# MCP Guide

本目录用于沉淀本项目的 MCP 使用规范、服务器选择建议和配置模板。

## 结论

结合 Claude Code 官方文档与 MCP 官方规范，当前项目推荐采用以下方式：

- **项目共享 MCP 服务器**：放在项目根目录 `.mcp.json`
- **团队共享 Claude Code 设置**：放在 `.claude/settings.json`
- **个人本地覆盖**：放在 `.claude/settings.local.json`
- **不要把真实 token、client secret、数据库密码提交到仓库**

## 为什么这样设计

根据 Claude Code 官方设置文档：

- 项目级 MCP 服务器应存放在根目录 `.mcp.json`
- 项目共享设置应存放在 `.claude/settings.json`
- 本地个人设置应放在 `.claude/settings.local.json`
- MCP 服务器支持 `stdio` 和 `http` 两类接入方式
- `.mcp.json` 支持环境变量展开，适合团队共享配置而不提交密钥

根据 MCP 官方规范：

- MCP 服务器核心能力分为 `tools`、`resources`、`prompts`
- `prompts` 适合做用户显式触发的结构化工作流
- `resources` 适合暴露文档、配置、schema、任务上下文等可读内容

## 当前项目建议的 MCP 分类

### P0：建议优先接入

- `github`
  - 读取 issue / PR / 提交记录
  - 作为需求来源和代码协作入口
- `filesystem` 或等价本地文件类服务器
  - 读取额外工作目录、共享资料、规范文件

### P1：有明确使用场景再接入

- `notion`
  - 用于 PRD、会议纪要、需求文档
- `figma`
  - 用于设计稿、组件映射、设计系统
- `sentry` / `monitoring`
  - 用于问题定位和线上故障分析

### P2：谨慎接入

- 直连生产数据库
- 可执行高风险变更的内部运维服务器
- 可修改 secret、资源删除、发布的基础设施服务器

这些服务器必须结合严格权限策略和显式确认。

## 项目内推荐文件

- `.mcp.json.example`
  - 项目级 MCP 服务器示例
- `.claude/settings.example.json`
  - 项目级 Claude Code 设置示例
- `.claude/mcp/server-catalog.md`
  - 项目推荐 MCP 服务器目录
- `.claude/mcp/security-guidelines.md`
  - 项目级安全约束

## 使用建议

- 团队共享 MCP 时，优先共享“服务器定义”，不要共享真实凭据。
- 使用环境变量展开保存 URL、token 和 header。
- 项目级 `.mcp.json` 只保留团队共用服务器。
- 实验性、个人专用或带本机路径依赖的服务器，放本地作用域，不提交仓库。

## 参考来源

- Claude Code settings: https://code.claude.com/docs/en/settings
- Claude Code MCP: https://code.claude.com/docs/en/mcp
- MCP prompts: https://modelcontextprotocol.io/specification/2025-06-18/server/prompts
- MCP resources: https://modelcontextprotocol.io/specification/2025-11-25/server/resources
