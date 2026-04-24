---
description: 按任务文档实现代码并跑验证（workflow 02 + 03）
---

# /implement

本命令把 `.claude/tasks/<file>.md` 的任务交付成可验证的代码改动。

## 执行步骤

### 1. 阅读任务上下文

- 任务文档：`$ARGUMENTS`
- `CLAUDE.md`、`.claude/claude.md`
- `.claude/rules/coding-rules.md`
- `.claude/rules/README.md`（按技术栈继续读对应专项规则）
- `.claude/docs/api-contract.md`（若涉及接口）

### 2. 选 skill

按影响范围命中一个主 skill，其他为辅：

- 同时动前后端且涉及契约 → `fullstack-slice`
- 只动后端 API → `backend-api`
- 只动管理后台 → `admin-feature`
- 只动用户端 → `web-feature`
- 只同步契约 → `sync-api-contract`

### 3. 选 agent 提示参考

- 后端 Java：`SeniorJavaDeveloperAgent` / `SeniorJavaServerArchitectAgent`
- 后端 Go：`SeniorGoDeveloperAgent`
- 后端 Python：`SeniorPythonDeveloperAgent`
- 后端 C++：`SeniorCppDeveloperAgent`
- 管理后台：`SeniorUIArchitectAgent` / `SeniorWebDeveloperAgent`
- 用户端：`SeniorWebArchitectAgent` / `SeniorWebDeveloperAgent`
- 测试：`SeniorTestDevelopmentEngineer`

### 4. 按垂直切片顺序实现

1. 若涉及契约：先补 / 确认 `.claude/docs/api-contract.md`。
2. 若涉及 DB：先写迁移脚本并放到 `bootServiceWorkSpace/sql/` 或对应位置。
3. 实现后端：controller → service → repository/mapper → 校验 → 权限 → 事务 → 审计。
4. 实现前端：页面骨架 → 数据接入 → loading / empty / error / success → 权限隐藏。
5. 不动的模块绝对不改。

### 5. 跑验证（workflow 03）

按改动范围最少执行：

- 改 `bootServiceWorkSpace`：`mvn -pl <改动模块> -am test`，必要时 `mvn package`
- 改前端：对应工程目录下 `npm run lint && npm run typecheck && npm run build`
- 改 `.claude/docs/api-contract.md`：人工比对 Controller 注解与契约字段

### 6. 输出交付说明

- 改动内容
- 涉及文件 / 模块
- 契约影响
- 数据影响
- 验证命令与结果
- 未验证项与剩余风险

## 禁止行为

- 不做任务文档以外的重构
- 不删测试来让测试通过
- 不把 TODO / mock / debug 当最终交付
- 不跳过 workflow 03 的验证步骤
