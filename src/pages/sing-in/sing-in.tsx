import React from "react";
import { Form, Input, Button, Typography, Row, Col, Space, message } from "antd";
import { PhoneOutlined, LockOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { usLoginPost } from "./mutation/usLoginGet";
import { Userdata } from "./mutation/type";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const { Title } = Typography;

export const SingIn: React.FC = () => {
  const { control, handleSubmit } = useForm<Userdata>();
  const navigate = useNavigate();
  const { mutate } = usLoginPost()

  const onSubmit = (data: any) => {
    
    mutate(data, {
      onSuccess: (res) => {
        Cookies.set("accessToken", res?.token)
        console.log(res);
        
        message.success("Login successfully")
        navigate("/app")
      },
      onError: (error) => {
        message.error(error.message)
      }
    })

  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={18} md={12} lg={8}>
        <Row
          style={{
            padding: "32px",
            border: "1px solid #f0f0f0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Space direction="vertical" style={{ width: "100%" }} size="large">
            <Title level={3} style={{ textAlign: "center" }}>
              Welcome Back
            </Title>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
              <Form.Item label="Phone Number" required>
                <Controller
                  name="phone_number"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[0-9]{10,15}$/,
                      message: "Please enter a valid phone number",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      prefix={<PhoneOutlined />}
                      placeholder="Enter your phone number"
                      status={fieldState.error ? "error" : ""}
                    />
                  )}
                />
              </Form.Item>

              <Form.Item label="Password" required>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Input.Password
                      {...field}
                      prefix={<LockOutlined />}
                      placeholder="Enter your password"
                      status={fieldState.error ? "error" : ""}
                    />
                  )}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

