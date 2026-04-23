# Frontend Shared Rules

本文件只保留前端跨框架共享规则。具体实现必须继续选择对应技术栈规则：

- React：读取 `.claude/rules/react/*`
- Vue：读取 `.claude/rules/vue/*`

## 工作前检查

开始实现前必须确认：

- 已明确需求归属 `WebServiceWorkSpace` 或 `webAdminServiceWorkSpace`
- 已明确当前项目使用 React 还是 Vue
- 已阅读当前任务文档
- 如涉及接口，已阅读 `.claude/docs/api-contract.md`
- 已查看现有路由、布局、组件、请求封装和状态管理方式

## 共享原则

- 页面先处理结构，再接入数据，再补齐交互和状态
- 前端权限只控制展示，不作为最终安全边界
- 接口变更必须同步 `.claude/docs/api-contract.md`
- 优先复用现有组件库、样式体系、请求封装和目录结构
- 优先最小改动完成目标，不重写无关页面和组件

## 页面级最低要求

所有页面至少要考虑：

- loading
- empty
- error
- success
- 未登录 / 无权限（如适用）
- 分页 / 筛选 / 排序（如适用）
- 表单校验、禁用态、提交中态（如适用）

## API 与安全

- API 定义、鉴权处理、错误处理必须集中管理
- 页面和纯展示组件不要直接拼接请求地址
- 不渲染不可信 HTML；必须渲染时要有净化策略
- 不硬编码真实 token、secret 或敏感地址

## 验证要求

至少按改动范围执行：

- lint
- typecheck
- build

如无法运行，必须说明未验证部分和剩余风险
