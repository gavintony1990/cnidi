---
description: 把通过验证的改动整理为可入库成果（workflow 04）
---

# /ship

本命令触发 `.claude/workflows/04-verification-to-commit.md`，把 `/implement` 完成的改动整理成提交与 PR 物料。

## 执行步骤

1. 汇总改动：
   - 改动内容（按工程分组：`WebServiceWorkSpace` / `webAdminServiceWorkSpace` / `bootServiceWorkSpace` / `.claude`）
   - 涉及文件或模块
   - 契约影响
   - 数据影响
   - 验证命令与结果
2. 风险审查：
   - 是否有未验证项
   - 是否有残留 TODO / mock / debug
   - 是否有无关重构
   - 是否有 secret / token 被带入
3. 若有高风险未审项，停止提交，回到 `/implement`。
4. 生成提交说明：
   - 标题采用项目现行风格（如 `feat(admin): 新增用户列表分页查询`）
   - 正文分节：改动摘要、契约影响、数据影响、验证结果、剩余风险
5. 给出 `git add` 建议路径，但不自动执行 `git commit`，等用户确认。

## 输入

`$ARGUMENTS` 为任务文档路径或改动范围说明。为空时读取最近一次 `/implement` 的上下文。

## 输出

- 变更摘要（可直接复制到 PR 描述）
- 提交说明草稿
- 建议的 `git add` 路径清单
- 仍需用户关注的风险

## 禁止行为

- 不自动执行 `git commit` 或 `git push`
- 不在此阶段继续改代码
- 不把"验证未跑"包装成"验证通过"
