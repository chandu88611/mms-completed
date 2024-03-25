import React, { useContext, useEffect } from "react";
import { Alert, Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/services/auth";
import { setAccessToken } from "../../redux/slices/authSlice";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, getSession } = useContext(AuthContext);
  const [login, { data: loginData, isLoading, isSuccess, isError }] =
    useLoginMutation();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    await login(values);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isSuccess && loginData?.data?.access_token) {
      dispatch(setAccessToken(loginData?.data?.access_token));
      getSession();
      navigate("/", { replace: true });
    }
  }, [isSuccess, loginData, dispatch, navigate, getSession]);

  return (
    <Row justify={"center"} align="middle" style={{ height: "100vh" }}>
      <Col span={8}>
        <Card>
          <Row
            justify={"center"}
            align={"middle"}
            gutter={[0, 30]}
            style={{ width: "100%" }}
          >
            <Col span={22}>
              <Form
                style={{ width: "100%" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Row
                  justify={"center"}
                  gutter={[0, 25]}
                  style={{ width: "100%" }}
                >
                  <Col span={24}>
                    <Typography.Title style={{ textAlign: "center" }} level={2}>
                      Login
                    </Typography.Title>
                  </Col>
                  <Col span={22}>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input placeholder="Email" size="large" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input.Password
                        type="password"
                        size="large"
                        placeholder="Password"
                      />
                    </Form.Item>

                    {isError && (
                      <Form.Item style={{ color: "red", marginTop: "-15px" }}>
                        <Alert
                          message="Invalidate Credentials"
                          type="error"
                          style={{ color: "red" }}
                        />
                      </Form.Item>
                    )}

                    <Form.Item>
                      <Button
                        size="large"
                        block
                        type="primary"
                        htmlType="submit"
                        className={`bg-[#4096ff]`}
                        loading={isLoading}
                      >
                        Log in
                      </Button>

                      <Link className="login-form-forgot" to="/forgot-password">
                        <Typography.Paragraph
                          style={{ textAlign: "center", marginTop: "10px" }}
                          type="secondary"
                        >
                          Forgot your password ?
                        </Typography.Paragraph>
                      </Link>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
