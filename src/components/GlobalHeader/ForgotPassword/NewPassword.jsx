import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { connect, history } from 'umi';

const NewPassword = ({ visiblePass, setVisiblePass, dispatch, currentUser, email }) => {
  //   useEffect(() => {
  //     console.log('currentUser', currentUser);
  //   }, []);

  const [form] = Form.useForm();
  return (
    <Modal
      title="Set New Password"
      open={visiblePass}
      onCancel={() => setVisiblePass(false)}
      maskClosable={true}
      cancelButtonProps={{ size: 'large' }}
      footer={
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          Confirm
        </Button>
      }
    >
      <Form
        form={form}
        // hideRequiredMark
        onFinish={(values) => {
          if (values?.confirmPassword !== values?.newPassword) {
            message.error('Confirm password must match new password!');
          } else {
            dispatch({
              type: 'user/resetUserPassword',
              payload: {
                body: {
                  newPassword: values?.newPassword,
                },
                query: {
                  type: 'forgotPass',
                  email: email,
                },
              },
            })
              .then((res) => {
                if (res?.message) {
                  history.push('/user/login');
                  message.success('Password changed successfully!');
                  setVisiblePass(false);
                }
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }
        }}
        layout="vertical"
      >
        <Row gutter="16">
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label={<span className="formLabel">New Password</span>}
              rules={[
                {
                  required: true,
                  message: 'Field is required',
                },
                {
                  min: 8,
                  message: 'Password must be of 8 letters!',
                },
              ]}
              name="newPassword"
            >
              <Input.Password size="large" placeholder="New password" />
            </Form.Item>
          </Col>

          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label={<span className="formLabel">Confirm Password</span>}
              rules={[
                {
                  required: true,
                  message: 'Field is required',
                },
              ]}
              name="confirmPassword"
            >
              <Input.Password size="large" placeholder="Confirm password" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default connect(({ user }) => ({ currentUser: user?.currentUser }))(NewPassword);
