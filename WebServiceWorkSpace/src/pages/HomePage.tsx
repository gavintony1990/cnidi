import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Layout,
  Space,
  Tag,
  Typography,
} from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { authApi, CurrentUser } from "../api/auth";
import { tokenStorage } from "../utils/token";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function HomePage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    authApi
      .me()
      .then((user) => {
        if (!ignore) setCurrentUser(user);
      })
      .catch((err: unknown) => {
        if (!ignore) {
          const msg =
            (err as { response?: { data?: { error?: { message?: string } } } })
              ?.response?.data?.error?.message ?? "用户信息加载失败";
          setError(msg);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const handleLogout = async () => {
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      if (refreshToken) await authApi.logout(refreshToken);
    } finally {
      tokenStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
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
        <Title level={4} style={{ margin: 0, color: "#1677ff" }}>
          天工联
        </Title>
        <Button icon={<LogoutOutlined />} onClick={handleLogout} type="text">
          退出登录
        </Button>
      </Header>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "48px 24px",
          background: "#f5f7fa",
        }}
      >
        <Card
          style={{ width: 480, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
          loading={loading}
        >
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}
          {currentUser && (
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              <Space>
                <Avatar size={56} icon={<UserOutlined />} />
                <Space direction="vertical" size={2}>
                  <Text strong style={{ fontSize: 16 }}>
                    {currentUser.nickname || currentUser.username}
                  </Text>
                  <Text type="secondary">@{currentUser.username}</Text>
                </Space>
              </Space>
              <Space wrap>
                {currentUser.roles.map((role) => (
                  <Tag color="blue" key={role}>
                    {role}
                  </Tag>
                ))}
              </Space>
              <Text type="secondary">
                欢迎来到天工联，您的账号已成功登录。
              </Text>
            </Space>
          )}
        </Card>
      </Content>
    </Layout>
  );
}
