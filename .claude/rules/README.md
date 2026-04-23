# Rules Index

本文件用于索引 `.claude/rules` 下的规则，帮助 Agent 和开发者快速判断当前任务该先读哪些规则。

## 通用入口

所有实现类任务先读：

1. `CLAUDE.md`
2. `.claude/claude.md`
3. `.claude/rules/coding-rules.md`
4. 当前任务文档
5. `.claude/docs/api-contract.md`（如涉及接口）

## 前端任务

涉及 `WebServiceWorkSpace` 或 `webAdminServiceWorkSpace` 时，先读：

- `.claude/rules/frontend/frontend-coding-rules.md`
- `.claude/rules/frontend/frontend-component-encapsulation.md`

然后按具体技术栈继续读：

### React

- `.claude/rules/react/react-coding-rules.md`
- `.claude/rules/react/react-component-encapsulation.md`

### Vue

- `.claude/rules/vue/vue-coding-rules.md`
- `.claude/rules/vue/vue-component-encapsulation.md`

## Java 后端任务

涉及 `bootServiceWorkSpace` 且后端为 Java 时，继续读：

- `.claude/rules/java/java-coding-rules.md`
- `.claude/rules/java/java-springboot-rules.md`
- `.claude/rules/java/java-maven-modular-rules.md`

## Go 后端任务

涉及 Go 后端时，继续读：

- `.claude/rules/go/go.md`

## C++ 后端任务

涉及 C++ 服务或性能敏感原生模块时，继续读：

- `.claude/rules/cpp/cpp-coding-rules.md`

## Python 后端任务

涉及 Python 后端、脚本服务或任务调度实现时，继续读：

- `.claude/rules/python/python-backend-rules.md`

## 数据库相关任务

涉及建表、索引、SQL 或迁移时，先读：

- `.claude/rules/database/sql-general-rules.md`

然后根据数据库类型继续读：

- MySQL：`.claude/rules/database/mysql/mysql-rules.md`
- PostgreSQL：`.claude/rules/database/postgresql/postgresql-rules.md`
- SQL Server：`.claude/rules/database/sqlserver/sqlserver-rules.md`
- Oracle：`.claude/rules/database/oracle/oracle-rules.md`

## 使用顺序

一个后端需求通常按以下顺序选规则：

1. 先读 `CLAUDE.md`
2. 再读 `.claude/claude.md`
3. 再读 `.claude/rules/coding-rules.md`
4. 再读当前需求文档 `.claude/tasks/*.md`
5. 最后按实际语言和数据库继续读专项规则
