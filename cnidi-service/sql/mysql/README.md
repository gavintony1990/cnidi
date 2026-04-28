# MySQL DDL Scripts

本目录用于存放 `cnidi` 项目的 MySQL 建表与迁移脚本。

## 当前脚本

- `V001__init_auth_rbac.sql`
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

## 使用说明

执行前请确认：

- 本机或目标环境可访问 MySQL
- 当前账号具备创建数据库和建表权限
- 默认数据库名为 `cnidi`

执行示例：

```bash
mysql --socket=/tmp/mysql.sock -uroot < V001__init_auth_rbac.sql
```
