import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Typography,
} from "antd";
import {
  HomeOutlined,
  ApartmentOutlined,
  InfoCircleOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { authApi, CurrentUser } from "../api/auth";
import { tokenStorage } from "../utils/token";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const NAV_ITEMS = [
  { key: "/home", label: "首页", icon: <HomeOutlined /> },
  { key: "/industry", label: "产业服务", icon: <ApartmentOutlined /> },
  { key: "/about", label: "关于我们", icon: <InfoCircleOutlined /> },
];

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    let ignore = false;
    authApi.me().then((u) => { if (!ignore) setCurrentUser(u); }).catch(() => {});
    return () => { ignore = true; };
  }, []);

  const handleLogout = async () => {
    const rt = tokenStorage.getRefreshToken();
    try { if (rt) await authApi.logout(rt); } finally {
      tokenStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  const userMenu = {
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "退出登录",
        danger: true,
        onClick: handleLogout,
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          padding: "0 40px",
          gap: 40,
        }}
      >
        {/* Logo */}
        <div
          style={{ cursor: "pointer", flexShrink: 0 }}
          onClick={() => navigate("/home")}
        >
          <Text strong style={{ fontSize: 20, color: "#1677ff", letterSpacing: 2 }}>
            天工联
          </Text>
        </div>

        {/* Nav */}
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={NAV_ITEMS}
          onClick={({ key }) => navigate(key)}
          style={{ flex: 1, borderBottom: "none", minWidth: 0 }}
        />

        {/* User */}
        {currentUser && (
          <Dropdown menu={userMenu} placement="bottomRight">
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <Avatar size={32} icon={<UserOutlined />} style={{ background: "#1677ff" }} />
              <Text style={{ fontSize: 14 }}>
                {currentUser.nickname || currentUser.username}
              </Text>
            </div>
          </Dropdown>
        )}
      </Header>

      <Content style={{ background: "#f5f7fa" }}>
        {children}
      </Content>

      <Footer style={{ textAlign: "center", background: "#f5f7fa", color: "#888" }}>
        © 2026 天工联 · 赋能产业 · 连接未来
      </Footer>
    </Layout>
  );
}
