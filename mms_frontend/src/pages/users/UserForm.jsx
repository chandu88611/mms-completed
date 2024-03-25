import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateUserMutation,
  useGetSingleUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/services/users";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();
  const [createUser, { isLoading: creating, isSuccess: userCreateSuccess }] =
    useCreateUserMutation();
  const [
    updateUser,
    { error, isLoading: updatingUser, isSuccess: userUpdateSuccess },
  ] = useUpdateUserMutation();

  const { data, isLoading } = useGetSingleUserQuery(id);

  const onFinish = (values) => {
    if (id) {
      updateUser({ id: id, ...values });
    } else {
      createUser({ ...values });
    }
  };

  useEffect(() => {
    if (userCreateSuccess || userUpdateSuccess) {
      navigate("/");
    }
  }, [userCreateSuccess, userUpdateSuccess, navigate]);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data });
    }
  }, [form, data]);

  return (
    <>
      <Row justify="center">
        <Col span={16}>
          {id ? (
            <Typography.Title level={3}>Update User</Typography.Title>
          ) : (
            <Typography.Title level={3}>Create User</Typography.Title>
          )}
        </Col>
      </Row>
      <Row justify="center">
        <Col span={16}>
          <Card loading={id && isLoading}>
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: error?.email[0],
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>
              {/* <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select
                  placeholder="Select the role"
                  optionFilterProp="children"
                  options={Roles}
                />
              </Form.Item> */}

              {!id && (
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: !id && true }]}
                >
                  <Input.Password
                    required
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
              )}
              <Row justify="space-between">
                <Button danger onClick={() => window.history.back()}>
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  loading={creating || updatingUser}
                  type="primary"
                >
                  {id ? "Update" : "Create"}
                </Button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserForm;
