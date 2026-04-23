# Vue Frontend Rules

本文件定义 Vue 项目的实现规则，适用于 `WebServiceWorkSpace` 或 `webAdminServiceWorkSpace` 使用 Vue 技术栈的场景。

## 组件与页面组织

- 页面组件使用 `XxxPage.vue`
- 页面区块组件使用 `XxxPanel.vue`、`XxxSection.vue`、`XxxToolbar.vue`、`XxxDrawer.vue`
- composables 使用 `useXxx`
- 服务端请求封装放在 `services` / `api` / `composables`，不散落在纯展示组件

## 状态管理规则

- 页面级状态优先放页面层
- 服务端状态优先放 composables 或统一请求层
- 不把页面临时状态滥放到全局 store
- watch / watchEffect 必须明确依赖和触发边界，避免重复请求和循环更新

## Props、Events 与 Slots

- Props 命名反映业务语义
- 事件命名清晰，符合现有项目约定
- 优先使用 slots 组合稳定结构，不制造难以追踪的隐式布局
- 避免通过单个大对象 props 传递大量隐式配置

## 组件封装规则

推荐分层：

1. 基础组件
2. 业务组件
3. 页面区块组件
4. 页面组件

禁止：

- 单个 `.vue` 文件承载过多页面级请求、状态和渲染逻辑而不拆分
- 深层展示组件直接发起多个与页面强耦合的请求
- 把 composable 当成“全能 service + store + controller”使用

## 管理后台重点

对于 `webAdminServiceWorkSpace`：

- 列表页建议拆分筛选区、工具栏、数据表格、分页区和编辑弹窗/抽屉
- 权限区分页面级、按钮级、字段只读级
- 复杂表单拆分为业务区块，而不是单个超长模板

## 用户端重点

对于 `WebServiceWorkSpace`：

- 优先围绕业务流程和内容区块拆分组件
- 公共组件不携带后台管理语义
- 内容展示型页面围绕信息区块拆分，而不是纯模板切片

## 样式与验证

- 优先沿用现有组件库和 token
- 避免无意义的嵌套容器和重复样式
- 至少执行：
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
