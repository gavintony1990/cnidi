# API Contract

本文件是天工联项目跨工程接口契约的统一入口。所有跨端接口必须在这里登记。

## 契约规则

每次接口变更都必须同步说明：

- method
- path
- auth requirement
- request params/body
- response body
- error responses
- `WebServiceWorkSpace` 是否使用
- `webAdminServiceWorkSpace` 是否使用
- `bootServiceWorkSpace` 实现说明
- 兼容性和迁移影响

## 统一响应结构

### Success

```json
{
  "data": {},
  "requestId": "uuid"
}
```

### Error

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "账号或密码错误",
    "details": [],
    "requestId": "uuid"
  },
  "requestId": "uuid"
}
```

---

## Auth 模块（已实现）

### POST /api/auth/login

- **Auth**：无
- **Request Body**：
  ```json
  { "username": "admin", "password": "Admin@123456" }
  ```
- **Response 200**：
  ```json
  { "data": { "token": "eyJ...", "expiresIn": 86400 }, "requestId": "uuid" }
  ```
- **Error**：
  - `401 UNAUTHORIZED` — 账号或密码错误（账号不存在/密码错误统一返回，防止枚举）
  - `401 UNAUTHORIZED` — 账号已被禁用
  - `400 VALIDATION_ERROR` — username 或 password 为空
- **使用方**：`webAdminServiceWorkSpace`
- **实现**：`AuthController.login` → `AuthService.login` → `SysUserMapper` + BCrypt 校验 + JWT 签发
- **兼容性**：新增接口，无影响

---

### POST /api/auth/logout

- **Auth**：Bearer token（有效 token 才调，无 token 也可通过）
- **Request Body**：无
- **Response 200**：
  ```json
  { "data": null, "requestId": "uuid" }
  ```
- **使用方**：`webAdminServiceWorkSpace`
- **实现**：JWT 无状态，后端无操作，前端清除 localStorage token
- **兼容性**：新增接口，无影响

---

### GET /api/auth/me

- **Auth**：Bearer token（必须）
- **Response 200**：
  ```json
  { "data": { "id": 1, "username": "admin", "roles": ["ADMIN"] }, "requestId": "uuid" }
  ```
- **Error**：
  - `401 UNAUTHORIZED` — token 无效、过期或未携带
- **使用方**：`webAdminServiceWorkSpace`
- **实现**：`AuthController.me` → `AuthService.getCurrentUser`，从 JWT 上下文中解析用户信息
- **兼容性**：新增接口，无影响

---

## 初始接口分组（待实现）

### Admin - Users

- `GET /api/admin/users`
- `POST /api/admin/users`
- `PUT /api/admin/users/{id}`
- `DELETE /api/admin/users/{id}`

### Admin - Roles

- `GET /api/admin/roles`
- `POST /api/admin/roles`
- `PUT /api/admin/roles/{id}`
- `DELETE /api/admin/roles/{id}`

### Admin - Menus

- `GET /api/admin/menus`
- `POST /api/admin/menus`
- `PUT /api/admin/menus/{id}`
- `DELETE /api/admin/menus/{id}`
