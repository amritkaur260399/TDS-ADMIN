/* eslint-disable prefer-promise-reject-errors */
import React, { useEffect } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, connect, history } from 'umi';
import { callApi } from '@/utils/apiUtils';
import UserAuthLayout from '../UserAuthLayout';
import truckLogo from '@/assets/images/truckLog.jpg';
const SignUp = ({ dispatch }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'common/getStateCodes',
      payload: {
        pathParams: {
          countryId: 'CAN',
        },
      },
    });
  }, []);

  const onFinish = (body) => {
    // console.log('body', body);
    dispatch({
      type: 'user/userRegister',
      payload: body,
      cb: (res) => {
        if (res) {
          history.replace('/user/login');
        }
      },
    });
  };
  return (
    <UserAuthLayout>
      <Col xs={24} sm={24} md={24} lg={24} xl={24} className="h-[500px] w-full p-24  ">
        <div className="shadow-md bg-white  mx-auto w-auto md:w-2/3   rounded-md border border-md p-8 mt-16 ">
          <div className=" ">
            <div className="flex justify-center items-center ">
              <img src={truckLogo} alt="Store illustration" className="h-10 md:h-20 self-center" />
              <div className="flex  mt-5 text-center flex-col " style={{ color: '#0B355F' }}>
                {/* <p style={{fontSize:"40px", fontWeight:900}}>TDS</p> */}
                <p style={{ fontSize: '20px', fontWeight: 700 }}>The Driver Services</p>
              </div>
            </div>
            <div className="my-4">
              <div className="font-bold text-3xl text-center " style={{ color: '#0B355F' }}>
                SignUp!
              </div>
              <div className=" text-base text-center text-sm">Enter your details to SignUp</div>
            </div>
            <div className="">
              <Form
                hideRequiredMark
                autoComplete="off"
                form={form}
                colon={false}
                layout="vertical"
                onFinish={onFinish}
                className=""
              >
                <div className=" grid grid-cols-2 gap-2">
                  <Form.Item
                    name="firstName"
                    label={<span className="formLabel "> First Name</span>}
                    rules={[
                      {
                        required: true,
                        message: "Name can't be blank!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    label={<span className="formLabel "> Last Name</span>}
                    rules={[
                      {
                        required: true,
                        message: "Name can't be blank!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                  {/* <Form.Item
                  name="userName"
                  label={<span className="formLabel ">User Name</span>}
                  rules={[
                    {
                      required: true,
                      message: "User Name can't be blank!",
                    },
                  ]}
                >
                  <Input size="large"  />
                </Form.Item> */}
                  <Form.Item
                    name="phoneNumber"
                    label={<span className="formLabel ">Phone no</span>}
                    rules={[
                      {
                        required: true,
                        message: "Number can't be blank!",
                      },
                    ]}
                  >
                    <Input size="large" type="number" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={<span className="formLabel ">Email</span>}
                    rules={[
                      {
                        type: 'email',
                        message: 'Please enter a valid email address!',
                      },
                      {
                        required: true,
                        message: "Email can't be blank!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </div>
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
                    style={{ width: '1000px' }}
                    // className='w-[1000px]'
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <Button type="primary" block size="large" htmlType="submit">
                  Sign Up
                </Button>
                {/* <div className="text-center mt-4 ">
                  <Link to="/user/forgotpassword" className="">
                    Forgot Password ?
                  </Link>
                </div> */}
                <div className="text-center mt-4 ">
                  <div>Already have an account?</div>
                  <Link to="/user/login" className="">
                    Log In
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Col>
    </UserAuthLayout>
  );
};

export default connect(({ common }) => ({}))(SignUp);
