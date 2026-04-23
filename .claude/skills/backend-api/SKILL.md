---
name: backend-api
description: 用于新增或修改后端 API，强调契约优先、权限边界、事务边界和测试验证
---

# Backend API

## 输入约定

输入应尽量包含：

- 接口目标
- method / path
- request / response 要求
- 鉴权要求
- 是否涉及数据库、事务、幂等、审计
- 相关任务文档或契约文档

## 输出约定

输出必须尽量包含：

- 接口变更点
- 影响模块
- 数据影响
- 权限 / 事务 / 幂等影响
- 契约同步点
- 验证要求或验证结果
- 剩余风险

默认流程：

1. 阅读 `.claude/docs/api-contract.md`
2. 明确：
   - method / path
   - auth requirement
   - request / response
   - error responses
3. 判断是否涉及：
   - 数据库变更
   - 权限变更
   - 审计日志
   - 幂等 / 事务
4. 实现 controller / service / repository
5. 更新契约文档
6. 运行后端测试和构建

交付时必须说明：

- 接口变更点
- 数据影响
- 验证结果
- 剩余风险
