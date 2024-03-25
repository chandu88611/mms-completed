import { Menu } from "antd";
import React, { useCallback } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
  {
    label: "DashBoard",
    key: "/dashboard",
    icon: <AppstoreOutlined />,
  },
 
  {
    label: "Customers",
    key: "/customers",
    icon: <AppstoreOutlined />,
    children: [
      {
        label: "customers List",
        key: "/customers/list",
      },
      {
        label: "Add Customer",
        key: "/customers/add",
      },
    ],
  },
  {
    label: "Products",
    key: "/products",
    icon: <AppstoreOutlined />,
    children: [
      {
        label: "Products List",
        key: "/products/list",
      },
      {
        label: "Add Product",
        key: "/products/add",
      },
    ],
  },
  {
    label: "Users",
    key: "/users",
    icon: <AppstoreOutlined />,
  },
 

  {
    label: "Bills",
    key: "/Bills",
    icon: <AppstoreOutlined />,
  },
];
const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick = useCallback(
    (e) => {
      e.key !== null && navigate(e.key);
    },
    [navigate]
  );

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={onClick}
      items={items}
      selectable={false}
      // className="`"
    />
  );
};

export default SideBar;
