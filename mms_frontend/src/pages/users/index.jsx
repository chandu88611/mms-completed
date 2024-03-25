import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Row, Space, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../redux/services/users";
import PrimaryWrapper from "../../components/PrimaryWrapper";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const UserList = () => {
  const navigate = useNavigate();

  const {
    data,
    isLoading: loadingUsers,
    error,
  } = useGetUsersQuery({ page: 1 });
  const [deleteUser, { isLoading: deletingUser }] = useDeleteUserMutation();
  console.log(data, error);
  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Action",
      key: "id",
      fixed: "right",
      width: 100,
      render: ({ id }) => (
        <Space>
          <Button
            icon={<EditTwoTone />}
            // disabled={me?.id === id || !me?.is_superuser}
            onClick={() => navigate(`/users/edit/${id}`)}
          />
          <Popconfirm
            title="Are you sure to delete this User?"
            // onConfirm={() => deleteUser(id)}
            okText="Yes"
            okButtonProps={{ loading: deletingUser }}
            placement="topLeft"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              // disabled={me?.id === id || !me?.is_superuser}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PrimaryWrapper>
      <Row justify={"space-between"} gutter={[0, 0]} align="middle">
        <Typography.Title level={2}>Users</Typography.Title>
        <Button
          size="middle"
          type="primary"
          onClick={() => navigate(`/users/create`)}
        >
          Create User
        </Button>
      </Row>
      <Table
        columns={columns}
        dataSource={data?.results || []}
        loading={loadingUsers}
        onChange={onChange}
      />
    </PrimaryWrapper>
  );
};
export default UserList;
