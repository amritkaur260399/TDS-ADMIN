import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Modal, Form, Row, Col, Button, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';

const ResetPasswordModel = ({ dispatch, setVisible, visible, currentUser }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      emailAddress: currentUser?.personalDetails?.email,
    });
  }, [currentUser, form]);

  return (
    <Modal
      title="Reset Password"
      visible={visible}
      onCancel={() => setVisible(!visible)}
      footer={
        <Button type="primary" onClick={() => form?.submit()}>
          Update
        </Button>
      }
    >
      <Form
        form={form}
        hideRequiredMark
        onFinish={(values) => {
          const body = {
            ...values,
          };
          dispatch({
            type: 'user/resetUserPassword',
            payload: {
              body,
            },
          })
            .then((res) => {
              if (res) {
                message.success(res?.message);
                setVisible(!visible);
              }
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
              rules={[
                {
                  required: true,
                  message: "Old Password can't be blank!",
                },
              ]}
              name="oldPassword"
              label={<span className="formLabel">Old Password</span>}
            >
              <Input.Password
                size="large"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Password can't be blank!",
                },
              ]}
              name="password"
              label={<span className="formLabel">Password</span>}
            >
              <Input.Password
                size="large"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Confirm Password can't be blank!",
                },
                () => ({
                  validator(_, value) {
                    if (form?.getFieldsValue()?.password !== value) {
                      return Promise.reject(new Error(`Password can't matched`));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              name="confirmPassword"
              label={<span className="formLabel">Confirm Password</span>}
            >
              <Input.Password
                size="large"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>

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
              <Input disabled size="large" type="email" placeholder="Enter email" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(ResetPasswordModel);
