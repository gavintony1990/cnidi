# 0002-admin-user-list

## 任务标题

管理后台用户列表页首个端到端闭环：后端实现 `GET /api/admin/users` 分页查询接口，管理后台实现用户列表页接入。

## 背景

- 天工联项目治理层与三端骨架就绪，但尚未有任何业务闭环真实跑通。
- `.claude/docs/api-contract.md` 已经定义 `GET /api/admin/users` 契约，当前没有后端实现，也没有前端接入。
- 需要以最小代价验证 `.claude/workflows/01~04` + `.claude/skills/fullstack-slice` 的真实可执行性。

## 目标

- 以"管理员用户列表查询"作为首个端到端样例。
- 后端按 `cnidi-system-core` 分层落地 Controller / Service / Mapper / DTO / VO。
- 管理后台实现对应列表页并接入真实接口。
- 打通"需求 → 契约 → 后端 → 前端 → 验证 → 入库"链路。

## 影响范围

- `.claude`：仅新增本任务文档，不改规则与契约
- `bootServiceWorkSpace`：在 `cnidi-system-core` 内新增 admin 用户查询相关代码
- `webAdminServiceWorkSpace`：新增用户列表页与 API 客户端
- `WebServiceWorkSpace`：不影响

## 需求说明

### 用户角色

- 管理后台已登录且具备 `user:read` 权限的运营 / 管理员

### 核心场景

- 进入"用户管理 - 用户列表"页
- 默认按创建时间倒序展示第一页
- 支持按 `username`、`nickname`、`mobile`、`status`、`userType` 筛选
- 支持翻页和每页条数切换
- 表格展示：ID、用户名、昵称、手机号、邮箱、用户类型、状态、角色、创建时间
- 列表仅做"查询"，本任务不包含新建 / 编辑 / 角色分配

### 异常场景

- 未登录：前端跳登录页，后端返回 `UNAUTHORIZED`
- 无权限：前端提示无权限并回退，后端返回 `FORBIDDEN`
- 后端 5xx：前端展示错误态，不崩页
- 查询参数非法：后端返回 `BAD_REQUEST` 或 `VALIDATION_ERROR`

### 权限要求

- 后端：`user:read`，由 `SecurityFilter` / 权限注解在 Service 入口强制判断
- 前端：菜单与按钮级隐藏仅作为 UI 提示，不作为安全边界

## 接口契约变更

- 不新增接口，使用已在 `.claude/docs/api-contract.md` 中定义的 `GET /api/admin/users`
- 如实现过程中发现字段或参数需要调整，必须先更新 `api-contract.md`，再改代码
- 响应字段 `records[].roleCodes` 本阶段可先返回空数组，但必须在字段中出现，契约行为不变

## 数据变更

- 本任务假设 `sys_user` 表（或当前阶段等价表）已存在
- 若尚未创建，新增建表脚本到 `bootServiceWorkSpace/sql/`，字段至少覆盖：
  - `id`（主键）
  - `username`（唯一）
  - `nickname`
  - `mobile`
  - `email`
  - `user_type`（枚举：`ADMIN` / `NORMAL`）
  - `status`（枚举：`ENABLED` / `DISABLED` / `LOCKED`）
  - `password_hash`
  - `created_at` / `updated_at`
  - 逻辑删除字段统一命名为 `is_deleted`
- 索引：`idx_username_unique`（UNIQUE）、`idx_mobile`、`idx_status`、`idx_user_type`
- 迁移方式：追加 `V*__init_sys_user.sql`，保持幂等；回滚方式：提供 `DROP TABLE` 说明

## 前端任务

### 用户端

不涉及。

### 管理后台

- 新增页面 `src/pages/admin/users/UserListPage.tsx`
- 拆分：
  - `SearchPanel`：搜索条件表单
  - `Toolbar`：（本任务暂不含操作按钮，可保留占位）
  - `TableArea`：列表表格
  - `PaginationArea`：分页
- 新增 API 客户端 `src/api/admin/users.ts`，封装 `getAdminUsers(params)`，使用统一响应结构
- 统一请求层处理 401 / 403 / 5xx 错误，页面只处理业务态
- 路由接入 `/admin/users`，受登录与菜单权限保护
- 页面必须覆盖 loading / empty / error / success

## 后端任务

### 模块落点

- `cnidi-system-core`：`com.cnidi.system.core.admin.user` 下新增：
  - `AdminUserController`
  - `AdminUserService` / `AdminUserServiceImpl`
  - `SysUserMapper`（MyBatis-Plus）
  - `SysUser` 实体
  - `AdminUserQuery`（查询 DTO，参数校验）
  - `AdminUserListItemVO`

### 接口实现

- `GET /api/admin/users`
- 参数绑定：`pageNum` / `pageSize` / `username` / `nickname` / `mobile` / `status` / `userType`
- 校验：`pageNum >= 1`，`pageSize in [1, 100]`，状态与用户类型为合法枚举
- 权限：`user:read`，未登录返回 `UNAUTHORIZED`，无权限返回 `FORBIDDEN`
- 响应：按契约返回分页结构，使用统一响应包装器

### Service 规则

- Service 负责查询条件构造与结果组装，不在 Controller 做条件拼接
- 当前阶段 `roleCodes` 可返回空数组，留后续任务补齐
- 不做无界扫描，分页必须稳定排序（按 `id DESC` 或 `created_at DESC, id DESC`）

### Mapper 规则

- 使用 MyBatis-Plus `Page<SysUser>` + `QueryWrapper`
- 条件拼接避免 N+1，避免模糊查询导致索引失效（`username`、`mobile` 使用前缀匹配或等值匹配）

### 异常与日志

- 业务异常使用项目统一异常体系
- 日志记录 `requestId`、`userId`、`query 摘要`、`返回条数`
- 不输出明文敏感字段

## 测试点

- 主流程：已登录且具备 `user:read` 的用户，返回第一页 10 条
- 分页：`pageNum=2&pageSize=20` 正常返回
- 筛选：按 `username` / `status` / `userType` 过滤结果正确
- 异常：`pageSize=500` 返回 `VALIDATION_ERROR`
- 权限：未登录返回 `UNAUTHORIZED`，已登录但无权限返回 `FORBIDDEN`
- 回归：健康检查 `/api/health` 不受影响
- 前端：loading / empty / error / success 四态均可复现

## 验收标准

- `mvn -pl cnidi-system-core -am test` 通过
- `mvn package` 通过
- `webAdminServiceWorkSpace`：`npm run lint && npm run typecheck && npm run build` 通过
- 联调：管理后台登录后进入 `/admin/users`，能看到真实后端返回的数据
- 契约：`api-contract.md` 无不一致改动；若有改动必须先于代码同步
- 无残留 TODO / mock / debug

## 风险与待确认项

- `cnidi-system-core` 当前是否已经具备 MyBatis-Plus 分页插件与统一响应包装器；若未具备，应在本任务中一并补齐，但只补到支撑本接口的最小集，不做全局通用化重构。
- 登录 / 权限体系尚未落地的情况下，本任务是否先以"假登录"模式（固定用户 + 硬编码权限集合）跑通；该选择须由用户确认，不在代码中默默兜底。
- `sys_user` 表若尚未创建，本任务是否同时承担建表职责；如承担，迁移脚本命名与执行入口需与既有 `sql/` 目录约定对齐。
- 角色 `roleCodes` 字段在本任务中返回空数组是否可接受；如需真实角色数据，应拆成独立任务 `0003-admin-user-roles`。
