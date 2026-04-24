# API Contract

本文件是天工联项目跨工程接口契约的统一入口。当前版本面向后端第一阶段实现，范围只覆盖：

- 认证接口
- admin 管理接口
- 基础健康检查接口

当前阶段不涉及前端实现，但所有后续接口变更仍需先更新本文件，再进入代码实现。

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

## 错误码约定

当前阶段统一使用以下错误码语义：

- `BAD_REQUEST`：请求参数不合法
- `UNAUTHORIZED`：未登录、token 无效或已过期
- `FORBIDDEN`：已登录但无权限
- `NOT_FOUND`：资源不存在
- `CONFLICT`：唯一约束冲突、状态冲突
- `VALIDATION_ERROR`：字段级校验失败
- `INTERNAL_ERROR`：未归类的服务端异常

## 鉴权约定

- 认证方式：`Authorization: Bearer <accessToken>`
- access token 用于接口访问
- refresh token 用于刷新 access token，默认放在请求体中提交
- 当前阶段所有 `/api/admin/**` 都需要登录
- 当前阶段 `/api/admin/**` 默认还需要对应权限点
- 当前阶段注册接口仅面向普通用户预留，但本阶段先定义契约，不要求立刻上线前端注册流程

## 接口分组

### 基础接口

#### `GET /api/health`

- auth requirement：无
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：否
- `bootServiceWorkSpace`：`cnidi-boot`

响应示例：

```json
{
  "data": {
    "status": "UP",
    "application": "cnidi-service",
    "timestamp": "2026-04-24T20:00:00"
  },
  "requestId": "req_123"
}
```

#### `GET /api/system/summary`

- auth requirement：无
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：否
- `bootServiceWorkSpace`：`cnidi-system-core`

响应示例：

```json
{
  "data": {
    "projectName": "cnidi",
    "projectTitle": "天工联项目",
    "backendStack": "Spring Boot + MyBatis-Plus + MySQL"
  },
  "requestId": "req_123"
}
```

### Auth

#### `POST /api/auth/register`

- auth requirement：无
- `WebServiceWorkSpace`：预留
- `webAdminServiceWorkSpace`：否
- `bootServiceWorkSpace`：`com.cnidi.system.core.auth`

请求体：

```json
{
  "username": "zhangsan",
  "nickname": "张三",
  "mobile": "13800000000",
  "email": "zhangsan@example.com",
  "password": "P@ssw0rd123"
}
```

响应体：

```json
{
  "data": {
    "userId": 10001,
    "username": "zhangsan",
    "status": "ENABLED"
  },
  "requestId": "req_123"
}
```

错误响应：

- `BAD_REQUEST`：缺少必要参数
- `VALIDATION_ERROR`：用户名、手机号、邮箱、密码格式不合法
- `CONFLICT`：用户名、手机号或邮箱已存在

兼容性说明：

- 当前阶段默认只允许创建 `NORMAL` 类型用户
- admin 用户不走该接口创建

#### `POST /api/auth/login`

- auth requirement：无
- `WebServiceWorkSpace`：预留
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.auth`

请求体：

```json
{
  "username": "admin",
  "password": "P@ssw0rd123",
  "clientType": "ADMIN"
}
```

响应体：

```json
{
  "data": {
    "accessToken": "jwt-access-token",
    "accessTokenExpiresAt": "2026-04-24T21:00:00",
    "refreshToken": "refresh-token",
    "refreshTokenExpiresAt": "2026-05-01T20:00:00",
    "user": {
      "id": 1,
      "username": "admin",
      "nickname": "系统管理员",
      "userType": "ADMIN",
      "status": "ENABLED"
    },
    "roles": ["SUPER_ADMIN"],
    "permissions": ["user:read", "user:create", "role:grant"],
    "menus": []
  },
  "requestId": "req_123"
}
```

错误响应：

- `BAD_REQUEST`：缺少账号或密码
- `UNAUTHORIZED`：账号不存在或密码错误
- `FORBIDDEN`：账号被禁用或锁定

兼容性说明：

- 当前阶段账号字段统一使用 `username`
- 后续如果支持手机号、邮箱登录，需要补充登录方式字段并更新本契约

#### `POST /api/auth/logout`

- auth requirement：已登录
- `WebServiceWorkSpace`：预留
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.auth`

请求体：

```json
{
  "refreshToken": "refresh-token"
}
```

响应体：

```json
{
  "data": {
    "success": true
  },
  "requestId": "req_123"
}
```

错误响应：

- `UNAUTHORIZED`：未登录或 token 无效

#### `POST /api/auth/refresh`

- auth requirement：无
- `WebServiceWorkSpace`：预留
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.auth`

请求体：

```json
{
  "refreshToken": "refresh-token"
}
```

响应体：

```json
{
  "data": {
    "accessToken": "new-jwt-access-token",
    "accessTokenExpiresAt": "2026-04-24T22:00:00",
    "refreshToken": "new-refresh-token",
    "refreshTokenExpiresAt": "2026-05-01T21:00:00"
  },
  "requestId": "req_123"
}
```

错误响应：

- `UNAUTHORIZED`：refresh token 无效、已撤销或已过期

#### `GET /api/auth/me`

- auth requirement：已登录
- `WebServiceWorkSpace`：预留
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.auth`

响应体：

```json
{
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "nickname": "系统管理员",
      "mobile": "13800000000",
      "email": "admin@cnidi.com",
      "userType": "ADMIN",
      "status": "ENABLED"
    },
    "roles": ["SUPER_ADMIN"],
    "permissions": ["user:read", "user:create", "role:grant"],
    "menus": []
  },
  "requestId": "req_123"
}
```

错误响应：

- `UNAUTHORIZED`：未登录或 token 无效

#### `POST /api/auth/change-password`

- auth requirement：已登录
- `WebServiceWorkSpace`：预留
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.auth`

请求体：

```json
{
  "oldPassword": "P@ssw0rd123",
  "newPassword": "NewP@ssw0rd123"
}
```

响应体：

```json
{
  "data": {
    "success": true
  },
  "requestId": "req_123"
}
```

错误响应：

- `BAD_REQUEST`：参数缺失
- `VALIDATION_ERROR`：新密码不符合强度要求
- `UNAUTHORIZED`：旧密码错误

### Admin - Users

#### `GET /api/admin/users`

- auth requirement：已登录 + `user:read`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

查询参数：

- `pageNum`：默认 `1`
- `pageSize`：默认 `10`
- `username`：可选
- `nickname`：可选
- `mobile`：可选
- `status`：可选
- `userType`：可选

响应体：

```json
{
  "data": {
    "pageNum": 1,
    "pageSize": 10,
    "total": 1,
    "records": [
      {
        "id": 1,
        "username": "admin",
        "nickname": "系统管理员",
        "mobile": "13800000000",
        "email": "admin@cnidi.com",
        "userType": "ADMIN",
        "status": "ENABLED",
        "roleCodes": ["SUPER_ADMIN"],
        "createTime": "2026-04-24T20:00:00"
      }
    ]
  },
  "requestId": "req_123"
}
```

错误响应：

- `UNAUTHORIZED`
- `FORBIDDEN`

#### `POST /api/admin/users`

- auth requirement：已登录 + `user:create`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

请求体：

```json
{
  "username": "operator01",
  "nickname": "运营一号",
  "mobile": "13900000000",
  "email": "operator01@cnidi.com",
  "userType": "ADMIN",
  "status": "ENABLED",
  "password": "InitP@ssw0rd123",
  "roleIds": [1]
}
```

响应体：

```json
{
  "data": {
    "id": 10002
  },
  "requestId": "req_123"
}
```

错误响应：

- `VALIDATION_ERROR`
- `CONFLICT`

#### `PUT /api/admin/users/{id}`

- auth requirement：已登录 + `user:update`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

请求体：

```json
{
  "nickname": "运营主管",
  "mobile": "13900000000",
  "email": "operator01@cnidi.com",
  "status": "ENABLED",
  "remark": "负责运营配置"
}
```

响应体：

```json
{
  "data": {
    "success": true
  },
  "requestId": "req_123"
}
```

错误响应：

- `NOT_FOUND`
- `VALIDATION_ERROR`
- `CONFLICT`

#### `PUT /api/admin/users/{id}/status`

- auth requirement：已登录 + `user:update`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

请求体：

```json
{
  "status": "DISABLED"
}
```

响应体：

```json
{
  "data": {
    "success": true
  },
  "requestId": "req_123"
}
```

#### `PUT /api/admin/users/{id}/roles`

- auth requirement：已登录 + `user:grant`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

请求体：

```json
{
  "roleIds": [1, 2]
}
```

响应体：

```json
{
  "data": {
    "success": true
  },
  "requestId": "req_123"
}
```

### Admin - Roles

#### `GET /api/admin/roles`

- auth requirement：已登录 + `role:read`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

响应体：

```json
{
  "data": [
    {
      "id": 1,
      "roleCode": "SUPER_ADMIN",
      "roleName": "超级管理员",
      "status": "ENABLED",
      "remark": "系统最高权限角色"
    }
  ],
  "requestId": "req_123"
}
```

#### `POST /api/admin/roles`

- auth requirement：已登录 + `role:create`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

请求体：

```json
{
  "roleCode": "OPS_ADMIN",
  "roleName": "运营管理员",
  "status": "ENABLED",
  "remark": "运营管理角色"
}
```

响应体：

```json
{
  "data": {
    "id": 2
  },
  "requestId": "req_123"
}
```

#### `PUT /api/admin/roles/{id}`

- auth requirement：已登录 + `role:update`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

请求体：

```json
{
  "roleName": "运营主管",
  "status": "ENABLED",
  "remark": "更新后的角色描述"
}
```

响应体：

```json
{
  "data": {
    "success": true
  },
  "requestId": "req_123"
}
```

#### `PUT /api/admin/roles/{id}/permissions`

- auth requirement：已登录 + `role:grant`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

请求体：

```json
{
  "permissionIds": [1, 2, 3]
}
```

响应体：

```json
{
  "data": {
    "success": true
  },
  "requestId": "req_123"
}
```

### Admin - Permissions

#### `GET /api/admin/permissions`

- auth requirement：已登录 + `permission:read`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

响应体：

```json
{
  "data": [
    {
      "id": 1,
      "permissionCode": "user:read",
      "permissionName": "查看用户",
      "resourceType": "API",
      "remark": "允许查看用户列表"
    }
  ],
  "requestId": "req_123"
}
```

### Admin - Menus

#### `GET /api/admin/menus`

- auth requirement：已登录 + `menu:read`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

响应体：

```json
{
  "data": [
    {
      "id": 1,
      "parentId": 0,
      "menuName": "系统管理",
      "menuType": "DIRECTORY",
      "routePath": "/system",
      "component": null,
      "icon": "setting",
      "permissionCode": null,
      "sortNo": 1,
      "visible": true,
      "status": "ENABLED"
    }
  ],
  "requestId": "req_123"
}
```

#### `POST /api/admin/menus`

- auth requirement：已登录 + `menu:create`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

请求体：

```json
{
  "parentId": 0,
  "menuName": "系统管理",
  "menuType": "DIRECTORY",
  "routePath": "/system",
  "component": null,
  "icon": "setting",
  "permissionCode": null,
  "sortNo": 1,
  "visible": true,
  "status": "ENABLED"
}
```

响应体：

```json
{
  "data": {
    "id": 1
  },
  "requestId": "req_123"
}
```

#### `PUT /api/admin/menus/{id}`

- auth requirement：已登录 + `menu:update`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

请求体：

```json
{
  "menuName": "系统设置",
  "routePath": "/system/settings",
  "component": "system/settings/index",
  "icon": "setting",
  "permissionCode": "menu:update",
  "sortNo": 2,
  "visible": true,
  "status": "ENABLED"
}
```

响应体：

```json
{
  "data": {
    "success": true
  },
  "requestId": "req_123"
}
```

### Admin - Audit

#### `GET /api/admin/login-logs`

- auth requirement：已登录 + `audit:login:read`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

查询参数：

- `pageNum`
- `pageSize`
- `username`
- `success`
- `startTime`
- `endTime`

#### `GET /api/admin/operation-logs`

- auth requirement：已登录 + `audit:operation:read`
- `WebServiceWorkSpace`：否
- `webAdminServiceWorkSpace`：预留
- `bootServiceWorkSpace`：`com.cnidi.system.core.admin`

查询参数：

- `pageNum`
- `pageSize`
- `username`
- `resourceType`
- `success`
- `startTime`
- `endTime`

## 兼容性说明

- 当前契约面向后端第一阶段，不承诺前端字段已全部接入。
- 当前 admin 管理接口默认服务于管理后台，但当前阶段前端尚未开发。
- 当前注册接口只保留普通用户注册能力的契约定义，是否开放由后端配置控制。
- 后续如果新增 `/api/app/**` 或普通用户侧业务接口，需要新增分组，不直接挤压 admin 契约。
