# API Contract

本文件是天工联项目跨工程接口契约的统一入口。当前内容仍是项目初始化阶段模板，后续所有跨端接口都必须在这里登记。

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
  "requestId": "req_123"
}
```

### Error

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Permission denied",
    "details": [],
    "requestId": "req_123"
  }
}
```

## 初始接口分组

### Auth

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

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
