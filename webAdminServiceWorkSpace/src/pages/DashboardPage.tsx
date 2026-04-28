import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Card,
  ConfigProvider,
  Layout,
  Space,
  Statistic,
  Table,
  Typography,
  Button,
  Tag,
} from "antd";
import { LogoutOutlined, TeamOutlined } from "@ant-design/icons";
import { authApi, CurrentUser } from "../api/auth";
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
    status: "列表已接入",
    description: "已接入用户列表、检索和分页；创建、编辑和角色分配后续补齐",
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
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoadingUser(true);
    authApi
      .me()
      .then((user) => {
        if (!ignore) {
          setCurrentUser(user);
          setUserError(null);
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          const msg =
            (err as { response?: { data?: { error?: { message?: string } } } })
              ?.response?.data?.error?.message ?? "当前用户信息加载失败";
          setUserError(msg);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoadingUser(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  const handleLogout = async () => {
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
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
              <Statistic title="当前阶段" value="认证闭环" />
              <Statistic title="技术栈" value="React + AntD" />
              <Statistic title="用户" value={currentUser?.username ?? "-"} loading={loadingUser} />
            </Space>
            {userError && <Alert type="error" showIcon message={userError} />}
            <Card
              title="当前用户"
              loading={loadingUser}
              extra={
                <Button icon={<TeamOutlined />} onClick={() => navigate("/admin/users")}>
                  用户管理
                </Button>
              }
            >
              {currentUser ? (
                <Space direction="vertical" size={12}>
                  <Typography.Text>
                    {currentUser.nickname || currentUser.username} / {currentUser.userType}
                  </Typography.Text>
                  <Space wrap>
                    {currentUser.roles.map((role) => (
                      <Tag color="blue" key={role}>
                        {role}
                      </Tag>
                    ))}
                  </Space>
                  <Typography.Text type="secondary">
                    权限：{currentUser.permissions.length ? currentUser.permissions.join(", ") : "暂无权限"}
                  </Typography.Text>
                </Space>
              ) : (
                <Typography.Text type="secondary">暂无当前用户信息</Typography.Text>
              )}
            </Card>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
          </Space>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
