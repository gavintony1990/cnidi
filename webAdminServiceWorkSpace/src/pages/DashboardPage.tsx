import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ConfigProvider,
  Layout,
  Space,
  Statistic,
  Table,
  Typography,
  Button,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { authApi } from "../api/auth";
import { tokenStorage } from "../utils/token";

const { Header, Content } = Layout;

const columns = [
  { title: "模块", dataIndex: "module", key: "module" },
  { title: "状态", dataIndex: "status", key: "status" },
  { title: "说明", dataIndex: "description", key: "description" },
];

const dataSource = [
  {
    key: "1",
    module: "用户管理",
    status: "待实现",
    description: "后续接入列表、检索、创建、编辑和角色分配",
  },
  {
    key: "2",
    module: "角色权限",
    status: "待实现",
    description: "后续接入菜单、权限点和授权流转",
  },
  {
    key: "3",
    module: "审计日志",
    status: "待实现",
    description: "后续接入查询、筛选和详情回放",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      tokenStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            padding: "0 24px",
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            天工联管理后台
          </Typography.Title>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            type="text"
          >
            退出登录
          </Button>
        </Header>
        <Content style={{ padding: 24, background: "#f5f5f5" }}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Space size={16} wrap>
              <Statistic title="当前阶段" value="认证已就绪" />
              <Statistic title="技术栈" value="React + AntD" />
            </Space>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
          </Space>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
