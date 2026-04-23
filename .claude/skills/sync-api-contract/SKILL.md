---
name: sync-api-contract
description: 用于同步接口契约文档，确保前后端和任务文档中的接口描述一致
disable-model-invocation: true
---

# Sync API Contract

## 输入约定

输入应尽量包含：

- 当前接口名称或接口列表
- 已实现代码位置或变更点
- 当前契约文档状态
- 是否涉及兼容性或迁移影响

## 输出约定

输出必须尽量包含：

- 需要补充或修正的契约项
- 缺失项清单
- 兼容性影响
- 使用方影响

执行时必须检查：

- method 和 path
- auth requirement
- request params/body
- response body
- error responses
- `WebServiceWorkSpace` 是否使用
- `webAdminServiceWorkSpace` 是否使用
- `bootServiceWorkSpace` 实现说明
- 兼容性和迁移影响

如果接口已改但文档未改，优先补齐文档。
