import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  ConfigProvider,
  Form,
  Input,
  Layout,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  adminUsersApi,
  AdminUserListItem,
  AdminUserQueryParams,
} from "../api/adminUsers";

const { Header, Content } = Layout;

interface SearchValues {
  username?: string;
  nickname?: string;
  mobile?: string;
  status?: string;
  userType?: string;
}

const statusOptions = [
  { label: "启用", value: "ENABLED" },
  { label: "禁用", value: "DISABLED" },
  { label: "锁定", value: "LOCKED" },
];

const userTypeOptions = [
  { label: "管理员", value: "ADMIN" },
  { label: "普通用户", value: "NORMAL" },
];

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm<SearchValues>();
  const [query, setQuery] = useState<AdminUserQueryParams>({ pageNum: 1, pageSize: 10 });
  const [records, setRecords] = useState<AdminUserListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    adminUsersApi
      .list(query)
      .then((page) => {
        if (!ignore) {
          setRecords(page.records);
          setTotal(page.total);
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          const msg =
            (err as { response?: { data?: { error?: { message?: string } } } })
              ?.response?.data?.error?.message ?? "用户列表加载失败";
          setError(msg);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, [query]);

  const columns = useMemo(
    () => [
      { title: "ID", dataIndex: "id", width: 110 },
      { title: "用户名", dataIndex: "username" },
      { title: "昵称", dataIndex: "nickname" },
      { title: "手机号", dataIndex: "mobile" },
      { title: "邮箱", dataIndex: "email" },
      {
        title: "类型",
        dataIndex: "userType",
        render: (value: AdminUserListItem["userType"]) => (
          <Tag color={value === "ADMIN" ? "blue" : "default"}>{value}</Tag>
        ),
      },
      {
        title: "状态",
        dataIndex: "status",
        render: (value: AdminUserListItem["status"]) => {
          const color = value === "ENABLED" ? "green" : value === "LOCKED" ? "orange" : "red";
          return <Tag color={color}>{value}</Tag>;
        },
      },
      {
        title: "角色",
        dataIndex: "roleCodes",
        render: (roles: string[]) => (roles.length ? roles.join(", ") : "-"),
      },
      { title: "创建时间", dataIndex: "createTime" },
    ],
    []
  );

  const handleSearch = (values: SearchValues) => {
    setQuery({
      pageNum: 1,
      pageSize: query.pageSize,
      ...values,
    });
  };

  const handleReset = () => {
    form.resetFields();
    setQuery({ pageNum: 1, pageSize: query.pageSize });
  };

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: "#fff",
            borderBottom: "1px solid #f0f0f0",
            padding: "0 24px",
          }}
        >
          <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => navigate("/")} />
          <Typography.Title level={4} style={{ margin: 0 }}>
            用户管理
          </Typography.Title>
        </Header>
        <Content style={{ padding: 24, background: "#f5f5f5" }}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Card>
              <Form form={form} layout="inline" onFinish={handleSearch}>
                <Form.Item name="username" label="用户名">
                  <Input allowClear placeholder="用户名前缀" />
                </Form.Item>
                <Form.Item name="nickname" label="昵称">
                  <Input allowClear placeholder="昵称" />
                </Form.Item>
                <Form.Item name="mobile" label="手机号">
                  <Input allowClear placeholder="手机号" />
                </Form.Item>
                <Form.Item name="status" label="状态">
                  <Select allowClear options={statusOptions} style={{ width: 120 }} />
                </Form.Item>
                <Form.Item name="userType" label="类型">
                  <Select allowClear options={userTypeOptions} style={{ width: 140 }} />
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                    <Button onClick={handleReset}>重置</Button>
                    <Button icon={<ReloadOutlined />} onClick={() => setQuery({ ...query })} />
                  </Space>
                </Form.Item>
              </Form>
            </Card>
            {error && <Alert type="error" showIcon message={error} />}
            <Table
              rowKey="id"
              columns={columns}
              dataSource={records}
              loading={loading}
              pagination={{
                current: query.pageNum,
                pageSize: query.pageSize,
                total,
                showSizeChanger: true,
                onChange: (pageNum, pageSize) => setQuery({ ...query, pageNum, pageSize }),
              }}
            />
          </Space>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
