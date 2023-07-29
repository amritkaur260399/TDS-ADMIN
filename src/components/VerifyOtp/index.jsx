import { requiredStar } from '@/utils/AppIons';
import { modalsJotai, otpJotai, userJotai } from '@/utils/globalStates/modals';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { useAtom } from 'jotai';
import React from 'react';
import { connect } from 'umi';
import { useDispatch } from 'umi';
import Verifypassword from '../Verifypassword';

const VerifyOtp = ({ visible, setVisible, handleCancel, setOtp, onVerifyOtp }) => {
  const [form] = Form.useForm();
  const [isopen, setIsopen] = useAtom(otpJotai);
  const [formValues, setFormValues] = useAtom(userJotai);
  const dispatch = useDispatch();
  const onFinish = (otp) => {
    console.log('first12222', otp);
    // setOtp(values?.otp);
    dispatch({
      type: 'addUser/verifyOtp',
      payload: {
        body: {
          email: formValues?.email,
          otp: otp?.otp,
        },
      },
    }).then((res) => {
      if (res?.success) {
        setIsopen({
          ...isopen,
          verifyPasswordModal: { name: 'verifyPassword', open: true },
          verifyModal: { name: '', open: false },
        });
      } else {
        message.error('Wrong otp please try again');

        // setIsopen({
        //       ...isopen,
        //       verifyModal: { name: '', open: false },
        //     })
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
    <div>
      <Modal
        title={
          <span style={{ color: '#10181e' }} className="font-medium">
            Verify OTP
          </span>
        }
        open={isopen?.verifyModal?.name === 'verifyOtp'}
        onCancel={() =>
          setIsopen({
            ...isopen,
            verifyModal: { name: '', open: false },
          })
        }
        onOk={() =>
          setIsopen({
            ...isopen,
            verifyModal: { name: '', open: false },
          })
        }
        okText="Submit"
        okButtonProps={{ type: 'primary', size: 'large' }}
        cancelButtonProps={{ size: 'large' }}
        okType=""
        footer={null}
      >
        <Form
          requiredMark={false}
          layout="vertical"
          form={form}
          onFinish={onFinish}
          name="Customer"
        >
          <Row gutter={16}>
            <Col xs={18} sm={18} md={12} lg={12} xl={12}>
              <Form.Item
                name="otp"
                label={<span className="formLabel p-0 mb-0">Enter OTP</span>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter otp!',
                  },
                ]}
              >
                <Input placeholder="OTP" size="large" type="number" />
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
      <Verifypassword />
    </div>
  );
};

export default connect(({ loading }) => ({}))(VerifyOtp);
