# Project Memory

本文件是天工联项目的长期记忆，记录慢变化上下文，不记录单次任务细节。

## 项目定位

cnidi（天工联项目）是一个基于 `claude-vibe-framework` 启动的真实业务项目，当前采用三端结构：

- 用户端前端 `WebServiceWorkSpace`
- 管理后台前端 `webAdminServiceWorkSpace`
- 后端服务 `bootServiceWorkSpace`

## 架构原则

- 业务代码和治理层规则分离
- 接口契约优先
- 后端是权限和数据的最终边界
- 默认采用 Spring Boot + Maven 多模块后端路线
- 前端保持用户端与管理后台职责分离

## 命名约定

- 英文项目名：`cnidi`
- 中文项目名：`天工联项目`
- 单次需求：`.claude/tasks/*.md`
- 接口契约：`.claude/docs/api-contract.md`

## 当前项目状态

- 三端最小骨架已初始化
- 当前仍处于业务项目起步阶段
- 后续优先补齐认证、统一响应、权限模型和首个业务模块

## 当前长期风险

- 如果需求不统一落到 `.claude/tasks/`，后续规则和代码会漂移
- 如果接口契约不先同步，前后端联调成本会快速上升
- 如果首个业务闭环铺得过大，会拖慢项目收口速度
