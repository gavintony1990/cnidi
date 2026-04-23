# Skills Guide

本目录用于存放项目级 Skills。根据 Claude Code 官方最佳实践，Skill 应采用“目录 + `SKILL.md`”的形式，而不是把所有内容堆进一个长文件。

## 设计原则

基于官方最佳实践，Skill 应该：

- 只承载“按需加载”的领域知识或可复用工作流
- 保持聚焦，不做大而全万能技能
- 让 Claude 在需要时自动命中，或由用户显式调用
- 不把所有规则重复写进 Skill；项目通用约束仍以 `CLAUDE.md` 和 `rules` 为准

## 推荐结构

```txt
.claude/skills/
  README.md
  skills.md
  fullstack-slice/
    SKILL.md
  backend-api/
    SKILL.md
  admin-feature/
    SKILL.md
  web-feature/
    SKILL.md
  sync-api-contract/
    SKILL.md
  agent-runtime-feature/
    SKILL.md
  agent-runtime-review/
    SKILL.md
  harness-diagnose/
    SKILL.md
  harness-deploy/
    SKILL.md
```

## 什么时候用 Skill

适合做成 Skill 的内容：

- 反复出现的工作流
- 特定领域知识
- 某一类任务的固定交付结构

不适合做成 Skill 的内容：

- 所有任务都必须遵守的通用约束
- 经常变化的临时上下文
- 长篇教程和背景说明

## 输入 / 输出约定

所有项目级 Skill 都应尽量包含明确的输入 / 输出约定，便于 Agent 在调用时保持统一。

推荐格式：

### 输入至少说明

- 任务目标
- 影响范围
- 已知约束
- 依赖文档
- 是否涉及接口、数据库、权限、测试

### 输出至少说明

- 改动建议或执行结果
- 影响范围
- 契约 / 数据 / 权限影响
- 验证要求或验证结果
- 风险与未完成项

如果 Skill 只负责分析，不负责执行，也应明确说明输出是“方案 / 清单 / 诊断结论”，而不是代码结果。

## 参考来源

- Claude Code best practices: https://code.claude.com/docs/en/best-practices
- Claude Code subagents: https://code.claude.com/docs/en/sub-agents
