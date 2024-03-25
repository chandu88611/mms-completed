import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Layout, theme } from "antd";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
const { Header, Content, Sider } = Layout;

const ProtectedLayout = () => {
  let navigate = useNavigate();
  const { authState, isAuthenticated } = useContext(AuthContext);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: 64,
          width: "100%",
          borderBottom: "1px solid #E5E8E8",
          background: colorBgContainer,
        }}
      >
        <TopBar />
      </Header>

      <Layout
        // hasSider
        style={{
          paddingTop: 64,
        }}
      >
        <Sider
          width={240}
          theme="light"
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            bottom: 0,
            zIndex: 2,
            minHeight: `calc(100vh - 64px)`,
            // boxShadow:
            //   "0px 12px 24px 0px rgba(0, 0, 0, 0.16), 0px 1px 2px 0px rgba(0, 0, 0, 0.08)",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <SideBar />
        </Sider>

        <Content
          style={{
            padding: "10px 10px 0px 250px ",
            margin: 0,
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

export default ProtectedLayout;
