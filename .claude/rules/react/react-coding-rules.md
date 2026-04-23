# React Frontend Rules

本文件定义 React 项目的实现规则，适用于 `WebServiceWorkSpace` 或 `webAdminServiceWorkSpace` 使用 React 技术栈的场景。

## 组件与页面组织

- 页面组件使用 `XxxPage` 命名
- 页面区块组件使用 `XxxPanel`、`XxxSection`、`XxxToolbar`、`XxxDrawer`
- hooks 使用 `useXxx`
- 服务端请求封装放在 `services` / `api` / `hooks`，不散落在纯展示组件

## 状态管理规则

- 页面级状态优先放页面层
- 服务端状态优先放 query hooks 或统一请求层
- 不复制 props 到 state，除非明确需要受控转非受控
- 避免多个 `useEffect` 围绕同一份数据互相打架
- 副作用必须有清晰依赖，避免无界重复请求

## Props 与回调

- Props 命名反映业务语义，不传大而模糊的 `config`
- 回调统一使用 `onXxx`
- 纯展示组件应尽量保持受控、可预测
- 避免层层透传过多 props，必要时拆分页面区块

## 组件封装规则

推荐分层：

1. 基础组件
2. 业务组件
3. 页面区块组件
4. 页面组件

禁止：

- 页面组件单文件堆积所有状态、请求和渲染逻辑而不拆分
- 深层展示组件内部直接发起多个与页面强耦合的请求
- 为少量 JSX 重复而过度抽象 render helper

## 管理后台重点

对于 `webAdminServiceWorkSpace`：

- 列表页建议拆分为：
  - SearchPanel
  - Toolbar
  - TableArea
  - PaginationArea
  - EditDrawer / EditModal
- 权限要区分页面级、按钮级、字段只读级
- 大表单应拆分区块，不把全部字段塞进一个组件

## 用户端重点

对于 `WebServiceWorkSpace`：

- 优先围绕业务流程和内容区块拆分组件
- 公共组件不携带后台管理语义
- 内容展示型页面按信息块拆分，而不是按 DOM 机械拆片

## 样式与验证

- 优先沿用现有组件库和 token
- 避免大段内联样式和无意义 wrapper
- 至少执行：
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
