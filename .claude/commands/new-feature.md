---
description: 把一句话需求转成 .claude/tasks/ 下的结构化任务文档（workflow 01）
---

# /new-feature

本命令触发 `.claude/workflows/01-requirement-to-task.md`，把用户口述的需求收敛成 `.claude/tasks/NNNN-xxx.md`，不写代码。

## 执行步骤

1. 按顺序读入上下文：
   - `CLAUDE.md`
   - `.claude/claude.md`
   - `.claude/rules/coding-rules.md`
   - `.claude/rules/README.md`
   - `.claude/docs/architecture.md`
   - `.claude/docs/api-contract.md`
2. 识别需求要素：用户角色、核心场景、业务目标、影响范围（`WebServiceWorkSpace` / `webAdminServiceWorkSpace` / `bootServiceWorkSpace` / `.claude`）。
3. 判断是否涉及：接口契约、数据库、权限、审计。
4. 扫描 `.claude/tasks/` 下已有编号，选择下一个可用的 `NNNN`。
5. 复制 `.claude/tasks/0000-task-template.md` 为新文件 `.claude/tasks/<NNNN>-<slug>.md`，按模板各节填写。
6. 对无法确定的部分，在"风险与待确认项"里明确列出，不要编造。

## 输入

`$ARGUMENTS` 为用户口述需求。为空时必须反问补齐，不凭空生成任务。

## 输出

- 新建的任务文档路径
- 影响范围摘要
- 是否涉及契约 / 数据库 / 权限
- 需要用户确认的问题清单

## 禁止行为

- 不在此步骤写代码
- 不修改 `api-contract.md`
- 不把"风险与待确认项"遗留当作验收通过的理由
