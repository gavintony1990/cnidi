import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  Alert,
  Divider,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { authApi } from "../api/auth";

const { Title, Text } = Typography;

interface RegisterFormValues {
  username: string;
  nickname?: string;
  mobile?: string;
  email?: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm<RegisterFormValues>();

  const handleRegister = async (values: RegisterFormValues) => {
    setLoading(true);
    setError(null);
    try {
      await authApi.register({
        username: values.username,
        nickname: values.nickname,
        mobile: values.mobile,
        email: values.email,
        password: values.password,
      });
      message.success("注册成功，请登录");
      navigate("/login");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: { message?: string } } } })
          ?.response?.data?.error?.message ?? "注册失败，请稍后重试";
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
        padding: "24px 0",
      }}
    >
      <Card style={{ width: 440, boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Title level={3} style={{ margin: 0 }}>
            创建账号
          </Title>
          <Text type="secondary">加入天工联，开启新的体验</Text>
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
        <Form
          form={form}
          layout="vertical"
          onFinish={handleRegister}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              { min: 3, message: "用户名至少 3 个字符" },
              { max: 32, message: "用户名最多 32 个字符" },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: "用户名只允许字母、数字和下划线",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名（字母、数字、下划线）"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="nickname"
            rules={[{ max: 64, message: "昵称最多 64 个字符" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="昵称（选填）"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="mobile"
            rules={[
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号格式",
              },
            ]}
          >
            <Input
              prefix={<MobileOutlined />}
              placeholder="手机号（选填）"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ type: "email", message: "请输入正确的邮箱格式" }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="邮箱（选填）"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "请输入密码" },
              { min: 8, message: "密码至少 8 个字符" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码（至少 8 位）"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请再次输入密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一致"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
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
              注册
            </Button>
          </Form.Item>
        </Form>
        <Divider plain>
          <Text type="secondary" style={{ fontSize: 12 }}>
            已有账号？
          </Text>
        </Divider>
        <Button block size="large" onClick={() => navigate("/login")}>
          返回登录
        </Button>
      </Card>
    </div>
  );
}
