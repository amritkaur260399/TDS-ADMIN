import UserAuthLayout from '@/pages/user/UserAuthLayout';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Modal, Form, Row, Col, Button, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import bgChauffeurLogo from '@/assets/bgChauffeurLogo.png';
import NewPassword from './NewPassword';
const ForgotPasswordModal = ({ dispatch, setVisible, visible, currentUser }) => {
  const [form] = Form.useForm();
  const [userExists, setUserExists] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const [email, setEmail] = useState('');
  // const [seconds, setSeconds] = useState(30);
  const [newPassModal, setNewPassModal] = useState(false);
  // useEffect(() => {}, []);
  // const getCurrentUser = () => {
  //   dispatch({
  //     type: 'user/fetchCurrent',
  //   });
  // };
  // getCurrentUser();
  return (
    <Modal
      title="Confirm Email Address"
      visible={visible}
      afterClose={() => {
        setEmail('');
      }}
      onCancel={() => setVisible(!visible)}
      footer={
        userExists ? (
          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            Confirm OTP
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            Send OTP
          </Button>
        )
      }
    >
      <Form
        form={form}
        hideRequiredMark
        onFinish={(values) => {
          setResendOtp(false);

          userExists
            ? dispatch({
                type: 'user/verifyOtp',
                payload: {
                  body: {
                    email: form.getFieldValue('emailAddress'),
                    otp: form.getFieldValue('otp'),
                  },
                },
              })
                .then((res) => {
                  if (res?.success) {
                    setNewPassModal(true);
                    setVisible(false);
                  } else if (res?.success === false) {
                    message.error('Invalid OTP!');
                  }
                })
                .catch((err) => {
                  return Promise.reject(err);
                })
            : dispatch({
                type: 'user/checkExistingUser',
                payload: {
                  body: { email: form.getFieldValue('emailAddress') },
                  query: {
                    status: 'forgotPass',
                  },
                },
              })
                .then((res) => {
                  if (!res?.userExist) {
                    message.error("User doesn't Exist!");
                  } else if (res?.userExist) {
                    setUserExists(res?.userExist);
                  }
                  setTimeout(() => {
                    setResendOtp(true);
                  }, 30000);
                })
                .catch((err) => {
                  return Promise.reject(err);
                });
        }}
        layout="vertical"
      >
        <Row gutter="16">
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label={<span className="formLabel">Email</span>}
              name="emailAddress"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Email can't be blank!",
                },
                {
                  message: 'Please enter a valid email address!',
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                },
              ]}
            >
              <Input
                size="large"
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            {userExists && (
              <div className="flex justify-center items-end flex-col">
                <Button
                  type="secondary"
                  size="small"
                  disabled={!resendOtp}
                  style={{ width: '20%' }}
                  onClick={() => {
                    !userExists && form.submit();
                  }}
                >
                  Resend OTP
                </Button>
                <div className="text-xs text-gray-500 mt-2">30 sec to resend</div>
              </div>
            )}
          </Col>
          {userExists && (
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label={<span className="formLabel">Enter OTP</span>}
                name="otp"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "OTP can't be blank!",
                  },
                  {
                    message: 'OTP must be of 6 digits!',
                    max: 6,
                    min: 6,
                  },
                ]}
              >
                <Input size="large" type="number" placeholder="Enter OTP" />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
      <NewPassword visiblePass={newPassModal} email={email} setVisiblePass={setNewPassModal} />
    </Modal>
  );
};

export default connect(({ user }) => ({ currentUser: user?.currentUser }))(ForgotPasswordModal);
