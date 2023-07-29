import React, { useState } from 'react';
import { Alert, Form, Input, Button, Row, Col } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { connect, Link } from 'umi';
import { Select } from 'antd';

import truckLogo from '@/assets/images/TruckLogo.png';
import ForgotPassword from '@/components/GlobalHeader/ForgotPassword/ForgotPassword';
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const Login = ({ dispatch, loading }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  return (
    <div className="flex items-center justify-center h-screen overflow-y-auto">
      <Row className="h-full w-full ">
        <Col xs={0} sm={0} md={12} lg={12} xl={12} className="w-full ">
          <div className=" h-full flex justify-center items-center ml-22 bg-blue-100">
            <img
              src={truckLogo}
              alt="City Taxi"
              className="  rounded-lg "
              height={'300px'}
              width={'600px'}
            />
            {/* <div>Truck Driving System</div> */}
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="h-full w-full ">
          <div className=" h-full flex justify-center items-center">
            <div className="">
              <div>
                <div className="shadow-md rounded-md border border-md p-8 bg-white">
                  <div className="max-w-sm ">
                    <div className="">
                      <div className="flex justify-center items-center ">
                        <img
                          src={truckLogo}
                          alt="Store illustration"
                          className="h-10 md:h-20 self-center"
                        />
                        <div
                          className="flex  mt-5 text-center flex-col "
                          style={{ color: '#0B355F' }}
                        >
                          {/* <p style={{fontSize:"40px", fontWeight:900}}>TDS</p> */}
                          <p style={{ fontSize: '20px', fontWeight: 700 }}>The Driver Services</p>
                        </div>
                      </div>
                      <div className="my-2">
                        <div
                          className="font-bold text-4xl text-center "
                          style={{ color: '#0B355F' }}
                        >
                          Welcome back!
                        </div>
                        <div className=" text-base text-center text-sm">
                          Enter your email address and password to log in
                        </div>
                      </div>
                      <div className="">
                        {error && (
                          <div className="my-2">
                            <Alert
                              message="Invalid email address or password!"
                              type="error"
                              showIcon
                              closable
                            />
                          </div>
                        )}
                        <Form
                          hideRequiredMark
                          autoComplete="off"
                          form={form}
                          onFieldsChange={() => setError(false)}
                          colon={false}
                          layout="vertical"
                          onFinish={(val) => {
                            console.log('credentials', val);
                            const apiToken = btoa(`${val.email_address}:${val.password}`);
                            dispatch({
                              type: 'login/login',
                              payload: {
                                body: {
                                  email: val?.email_address.trim(),
                                  password: val?.password,
                                },
                              },
                              cb: (res) => {
                                if (res?.status === 'notok') {
                                  setError(true);
                                }
                              },
                            });
                          }}
                        >
                          <Form.Item
                            name="email_address"
                            label={<span className="formLabel ">Email</span>}
                            rules={[
                              // {
                              //   type: 'email',
                              //   message: 'Please enter a valid email address!',
                              // },
                              {
                                required: true,
                                message: "Email can't be blank!",
                              },
                            ]}
                          >
                            <Input size="large" />
                          </Form.Item>

                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: "Password can't be blank!",
                              },
                            ]}
                            name="password"
                            label={<span className="formLabel ">Password</span>}
                          >
                            <Input.Password
                              size="small"
                              iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                              }
                            />
                          </Form.Item>
                          <Button
                            type="primary"
                            loading={loading}
                            block
                            size="large"
                            htmlType="submit"
                          >
                            Login
                          </Button>
                          <div
                            className="text-center mt-4 "
                            onClick={() => {
                              setForgotModal(true);
                            }}
                          >
                            {/* <Link to="/user/forgotpassword" className=""> */}
                            Forgot Password ?{/* </Link> */}
                          </div>
                          <div className="text-center mt-4 ">
                            <div>Don&apos;t have an account?</div>
                            <Link to="/user/signup" className="">
                              Sign Up
                            </Link>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <ForgotPassword visible={forgotModal} setVisible={setForgotModal} />
    </div>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['login/login'],
}))(Login);
