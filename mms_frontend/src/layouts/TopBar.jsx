import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Image,
  Row,
  Space,
  Typography,
} from "antd";
import { capitalize } from "lodash";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../redux/services/users";

import { AuthContext } from "../providers/AuthProvider";

const TopBar = () => {
  const { handleLogout } = useContext(AuthContext);
  const { data: loggedInUser } = useGetMeQuery();
  const items = [
    {
      key: "1",
      label: (
        <Button block type="ghost" onClick={handleLogout}>
          Logout
        </Button>
      ),
    },
  ];
  return (
    <Row justify={"center"} align={"middle"} style={{zIndex:22232333}} className="!relative">
      <Col span={23}>
        <Row justify={"space-between"}>
          <Link to={"/"} className="!text-lg"  style={{textShadow:"1px 1px 2px blue",fontSize:"20px"}}>
            {/* <Image src={"logo"} alt="logo" preview={false} /> */}
            RANGANATHA MEDICALS
          </Link>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
          >
            <Space size={"middle"} direction="horizontal">
              <Avatar
                style={{
                  backgroundColor: "#00984A",
                  verticalAlign: "middle",
                }}
                size="default"
              >
                {capitalize(loggedInUser?.full_name?.charAt(0))}
              </Avatar>
              <Space.Compact size={"small"} direction="vertical" block>
                <Typography.Text
                  strong
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {loggedInUser?.company}
                </Typography.Text>
                <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
                  {loggedInUser?.full_name}
                </Typography.Text>
              </Space.Compact>
            </Space>
          </Dropdown>
        </Row>
      </Col>
    </Row>
  );
};

export default TopBar;
