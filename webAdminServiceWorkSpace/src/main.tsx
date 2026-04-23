import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, Layout, Space, Statistic, Table, Typography } from "antd";
import "antd/dist/reset.css";

const columns = [
  { title: "模块", dataIndex: "module", key: "module" },
  { title: "状态", dataIndex: "status", key: "status" },
  { title: "说明", dataIndex: "description", key: "description" }
];

const dataSource = [
  {
    key: "1",
    module: "用户管理",
    status: "待实现",
    description: "后续接入列表、检索、创建、编辑和角色分配"
  },
  {
    key: "2",
    module: "角色权限",
    status: "待实现",
    description: "后续接入菜单、权限点和授权流转"
  },
  {
    key: "3",
    module: "审计日志",
    status: "待实现",
    description: "后续接入查询、筛选和详情回放"
  }
];

function App() {
  return (
    <ConfigProvider>
      <Layout style={{ minHeight: "100vh", background: "#f5f5f5", padding: 24 }}>
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Typography.Title level={2} style={{ margin: 0 }}>
            cnidi-admin
          </Typography.Title>
          <Typography.Paragraph style={{ margin: 0 }}>
            天工联项目管理后台最小骨架已初始化，当前目标是提供可扩展的 React + Ant Design 起点。
          </Typography.Paragraph>
          <Space size={16} wrap>
            <Statistic title="当前阶段" value="骨架初始化" />
            <Statistic title="技术栈" value="React + AntD" />
          </Space>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </Space>
      </Layout>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
