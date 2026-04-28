import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button, Card, Form, Input, Typography, Alert, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { authApi } from "../api/auth";
import { tokenStorage } from "../utils/token";

const { Title, Text } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as { from?: string })?.from ?? "/home";

  useEffect(() => {
    if (tokenStorage.hasAccessToken()) {
      navigate(from, { replace: true });
    }
  }, [from, navigate]);

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login(values);
      tokenStorage.setTokens(response.accessToken, response.refreshToken);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: { message?: string } } } })
          ?.response?.data?.error?.message ?? "登录失败，请稍后重试";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)",
      }}
    >
      <Card style={{ width: 400, boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Title level={3} style={{ margin: 0 }}>
            天工联
          </Title>
          <Text type="secondary">欢迎回来，请登录您的账号</Text>
        </div>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: 16 }}
          />
        )}
        <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 12 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <Divider plain>
          <Text type="secondary" style={{ fontSize: 12 }}>
            还没有账号？
          </Text>
        </Divider>
        <Button block size="large" onClick={() => navigate("/register")}>
          立即注册
        </Button>
      </Card>
    </div>
  );
}
