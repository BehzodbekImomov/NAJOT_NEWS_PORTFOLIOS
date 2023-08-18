import { useContext, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContex } from "../../context/AuthContex";
import Cookies from "js-cookie";
import { EXPIRE_DATE, ROLE, TOKEN } from "../../constants";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useContext(AuthContex);
  const [collapsed, setCollapsed] = useState(false);
  const [key, setKey] = useState(location.pathname);
  useEffect(() => {
    setKey(location.pathname);
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    Cookies.remove(TOKEN);
    Cookies.remove(EXPIRE_DATE);
    Cookies.remove(ROLE);
    navigate("/");
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h3>Logo</h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[key]}
          onClick={({ key }) => {
            setKey(key);
          }}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/categories",
              icon: <VideoCameraOutlined />,
              label: <Link to="/categories">Categories</Link>,
            },
            {
              key: "/user",
              icon: <UploadOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              icon: <UploadOutlined />,
              label: (
                <Button type="primary" danger onClick={logout}>
                  Logout
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <div className="container">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Link to="/admin-account">
              <Avatar
                className="mx-4 "
                size={36}
                shape="square"
                icon={<UserOutlined />}
              />
            </Link>
          </Header>
        </div>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
