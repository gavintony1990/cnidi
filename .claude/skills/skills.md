# Agent Skills Memory

本文件记录 Agent 可执行能力清单。具体流程以 `.claude/rules`（工作流规则）和 `.claude/skills/*/SKILL.md`（skill 模板）为准。角色型 Agent 提示见 `.claude/agents/`。

## Product Engineering

- `fullstack-slice`：实现前后端垂直切片。
- `web-feature`：实现用户端前端功能。
- `admin-feature`：实现管理后台功能。
- `backend-api`：实现后端 API。
- `sync-api-contract`：同步接口契约。
- `language-port`：跨语言迁移或适配。

## Agent Runtime Engineering

- `agent-runtime-feature`：实现 Agent Runtime 功能。
- `agent-runtime-review`：评估 Agent Runtime 架构、安全和可测试性。

## Operations

- `harness-diagnose`：诊断 Harness pipeline 或部署失败。
- `harness-deploy`：受控触发 Harness 部署。

## Default Safety

- 默认 read-only。
- 写操作前说明影响范围。
- 高风险操作需要用户显式确认。

## 当前项目级 Skills

- `fullstack-slice`
- `web-feature`
- `admin-feature`
- `backend-api`
- `sync-api-contract`
- `agent-runtime-feature`
- `agent-runtime-review`
- `harness-diagnose`
- `harness-deploy`
