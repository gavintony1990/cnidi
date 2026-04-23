---
name: agent-runtime-feature
description: 用于设计或实现 agent-runtime 能力，强调计划、权限、审计、工具编排和安全边界
---

# Agent Runtime Feature

## 输入约定

输入应尽量包含：

- Runtime 目标能力
- 用户触发方式（CLI / Web / 其他）
- 需要接入的工具或平台（GitHub / MCP / Shell / Build）
- 权限、安全和审计约束
- 是否需要计划确认后执行

## 输出约定

输出必须尽量包含：

- 能力边界
- 执行流程
- 权限模型
- 审计模型
- 工具编排方式
- 风险点
- 落地步骤

默认关注：

- 需求分析
- 计划生成
- 执行控制
- 权限模型
- 审计日志
- MCP / Git / Shell 编排
- 风险分级

默认原则：

- agent-runtime 不能绕过项目规则
- 默认 read-only，写入和高风险操作必须显式确认
- rollback 只能作用于本次会话产生的 diff
