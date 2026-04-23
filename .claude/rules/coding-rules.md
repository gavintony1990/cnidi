# Coding Rules

本文件定义跨语言的通用编码规则，用于约束 Claude/Codex 在本项目中的实现方式。

## 全局原则

- 先读现有代码，再决定改法。
- 先看任务文档和接口契约，再改前后端。
- 优先最小改动完成目标，不做无关重构。
- 优先复用现有工具、组件、模块、目录结构和命名方式。
- 如果需求与现有实现冲突，先指出冲突，再决定修改路径。

## 工程边界

实现前必须先判断影响范围：

- `WebServiceWorkSpace`
- `webAdminServiceWorkSpace`
- `bootServiceWorkSpace`
- `.claude`

如果影响跨工程，必须同步考虑：

- 接口契约
- 权限边界
- 错误响应
- loading / empty / error / success 状态
- 联调验证

## 代码质量

- 不删除测试来让测试通过。
- 不绕过类型系统、校验器或权限控制。
- 不把临时代码、临时 mock、debug 逻辑或 TODO 当最终交付。
- 不为了“封装”制造难以理解的中间层。
- 不在一个改动中顺手重写无关模块。

## 契约优先

涉及跨工程通信时，必须以 `.claude/docs/api-contract.md` 为准。

接口变更至少要确认：

- method 和 path
- auth requirement
- request params/body
- response body
- error responses
- 兼容性和迁移影响

## 验证要求

任务完成前，至少要运行与改动范围匹配的校验：

- 前端：`lint`、`typecheck`、`build`
- 后端：单测、编译、必要时集成测试
- 联调：关键主流程手动验证

如果无法运行，必须明确说明原因、影响和剩余风险。

## 交付格式

最终说明至少包含：

- 改动内容
- 涉及文件或模块
- 契约影响
- 验证结果
- 剩余风险或未完成项
