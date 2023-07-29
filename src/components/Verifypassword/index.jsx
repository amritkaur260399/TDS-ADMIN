import { requiredStar } from '@/utils/AppIons';
import { confirmPassordJotai, modalsJotai, otpJotai, userJotai } from '@/utils/globalStates/modals';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import Password from 'antd/lib/input/Password';
import { useAtom } from 'jotai';
import React from 'react';
import { connect } from 'umi';
import { useDispatch } from 'umi';

const VerifyPassword = ({ getAllUsers }) => {
  const [form] = Form.useForm();
  const [isopen, setIsopen] = useAtom(otpJotai);
  const [formValues, setFormValues] = useAtom(userJotai);
  const dispatch = useDispatch();
  const [path, setPath] = useAtom(confirmPassordJotai);
  const onFinish = (values) => {
    console.log('first12222', formValues);
    // setOtp(values?.otp);
    dispatch({
      type: 'addUser/verifyPassword',
      payload: {
        body: {
          ...formValues,
          ...values,
          url: path,
        },
      },
    }).then((res) => {
      console.log('res132132132', res);
      if (res?.success) {
        setIsopen({
          ...isopen,
          verifyPasswordModal: { name: '', open: false },
        });
        message.success('User Added successfully!');
        getAllUsers();
      } else {
        message.error('Password and Confirm Password must match');
      }

      // if (res?.success) {
      //   dispatch({
      //     type: 'addUser/createUser',
      //     payload: {
      //       body: { ...formValues },
      //     },
      //   }).then((res) => {
      //     if (res?.message === 'User Registered successfully!') {
      //       message.success('User Registered successfully!');
      //       handleCancelVerify();
      //       getUsers();
      //     }
      //   });
      // }
    });
    // onVerifyOtp(values?.otp);
  };
  return (
    <Modal
      title={
        <span style={{ color: '#10181e' }} className="font-medium">
          Verify OTP
        </span>
      }
      open={isopen?.verifyPasswordModal?.name === 'verifyPassword'}
      onCancel={() =>
        setIsopen({
          ...isopen,
          verifyPasswordModal: { name: '', open: false },
        })
      }
      onOk={() =>
        setIsopen({
          ...isopen,
          verifyPasswordModal: { name: '', open: false },
        })
      }
      okText="Submit"
      okButtonProps={{ type: 'primary', size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
      okType=""
      footer={null}
    >
      <Form requiredMark={false} layout="vertical" form={form} onFinish={onFinish} name="Customer">
        <Row gutter={16}>
          <Col xs={18} sm={18} md={12} lg={12} xl={12}>
            <Form.Item
              name="password"
              label={<span className="formLabel p-0 mb-0">Password</span>}
              rules={[
                {
                  required: true,
                  message: 'Please enter otp!',
                },
              ]}
            >
              <Input.Password
                // size="large"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>
          <Col xs={18} sm={18} md={12} lg={12} xl={12}>
            <Form.Item
              name="confirmPassword"
              label={<span className="formLabel p-0 mb-0">Confirm Password</span>}
              rules={[
                {
                  required: true,
                  message: 'Please enter otp!',
                },
              ]}
            >
              <Input.Password
                // size="large"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            // onClick={() =>
            //   setIsopen({
            //     ...isopen,
            //     verifyModal: { name: '', open: false },
            //   })
            // }
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default connect(({ loading }) => ({}))(VerifyPassword);
