# MySQL DDL Scripts

本目录用于存放 `cnidi` 项目的 MySQL 建表与迁移脚本。

## 当前推荐：拆库模式

开发期默认按服务拆库，与各服务 `application.yml` 保持一致：

- `auth/V001__init_auth.sql`：创建 `cnidi_auth`，供 `cnidi-auth-service` 使用。
- `system-admin/V001__init_system_admin.sql`：创建 `cnidi_system_admin`，供 `cnidi-admin-service` 使用。
- `ai/V001__init_ai.sql`：创建 `cnidi_ai`，仅在启动 AI 服务持久化能力时需要。

执行示例：

```bash
mysql --socket=/tmp/mysql.sock -uroot < auth/V001__init_auth.sql
mysql --socket=/tmp/mysql.sock -uroot < system-admin/V001__init_system_admin.sql
mysql --socket=/tmp/mysql.sock -uroot < ai/V001__init_ai.sql
```

## 单库兼容脚本

- `V001__init_auth_rbac.sql`
  - 历史单库兼容脚本，默认数据库名为 `cnidi`
  - 初始化认证、注册、RBAC、菜单和审计所需基础表
  - 包含 10 张核心表：
    - `sys_user`
    - `sys_user_credential`
    - `sys_refresh_token`
    - `sys_role`
    - `sys_permission`
    - `sys_user_role`
    - `sys_role_permission`
    - `sys_menu`
    - `sys_login_log`
    - `sys_operation_log`

除非明确选择单库部署，不要和拆库脚本混用。

## 使用说明

执行前请确认：

- 本机或目标环境可访问 MySQL
- 当前账号具备创建数据库和建表权限
- Nacos 已启动，服务发现地址默认 `127.0.0.1:8848`
