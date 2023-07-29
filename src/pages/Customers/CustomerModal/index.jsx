import { requiredStar } from '@/utils/AppIons';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import VerifyOtp from '../../../components/VerifyOtp';
import PhoneNumber from '@/components/PhoneNumber';

const CustomerModal = ({
  visible,
  form,
  setVisible,
  handleCancel,
  dispatch,
  verifyOtp,
  setVerifyOtp,
  getUsers,
}) => {
  // const [form] = Form.useForm();
  // const [otp, setOtp] = useState(0);
  const [formValues, setFormValues] = useState({});

  const handleCancelVerify = () => {
    setVerifyOtp(false);
  };

  const onVerifyOtp = (otp) => {
    dispatch({
      type: 'feedbacks/verifyOtp',
      payload: {
        body: {
          email: form.getFieldValue('email'),
          otp: otp,
        },
      },
    }).then((res) => {
      if (res?.success) {
        dispatch({
          type: 'feedbacks/addPassenger',
          payload: {
            body: { ...formValues },
          },
        }).then((res) => {
          if (res?.message === 'User Registered successfully!') {
            message.success('User Registered successfully!');
            handleCancelVerify();
            getUsers();
          }
        });
      }
    });
  };

  const onFinish = (values) => {
    if (visible?.type === 'add') {
      setFormValues(values);
      dispatch({
        type: 'feedbacks/checkPassengerExistence',
        payload: {
          body: {
            email: values?.email,
          },
          query: { signUpRequest: true },
          // body: { ...values, signUpRequest: true },
        },
      })
        .then((res) => {
          if (!res?.userExist) {
            setVerifyOtp(true);
            setVisible(false);
          } else {
            message.error('User may already exists');
          }
        })
        .catch((err) => {
          message.error(err);
        });
    } else if (visible?.type === 'edit') {
      //   dispatch({
      //     type: 'airport/editAirport',
      //     payload: {
      //       body: values,
      //       // query: {
      //       //   priceId: editId,
      //       // },
      //     },
      //   })
      //     .then((res) => {
      //       if (res?.success) {
      //         setEditId('');
      //         message.success('Customer updated successfully');
      //         form.resetFields();
      //         getAllAirports();
      //         handleCancel();
      //       }
      //     })
      //     .catch((err) => {
      //       message.error(err);
      //     });
    }
  };

  return (
    <div>
      <Modal
        title={
          <span style={{ color: '#10181e' }} className="font-medium">
            {visible?.type === 'edit' ? 'Edit Customer' : 'Add Customer'}
          </span>
        }
        open={visible?.visible}
        //   closable={false}
        // maskClosable={false}
        // onOk={handleOk}
        onCancel={handleCancel}
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
                name="name"
                label={<span className="formLabel p-0 mb-0">Customer Name</span>}
                rules={[
                  {
                    required: true,
                    message: 'Please enter Customer name!',
                  },
                ]}
              >
                <Input placeholder="Customer name" size="large" />
              </Form.Item>
            </Col>
            <Col xs={18} sm={18} md={12} lg={12} xl={12}>
              <Form.Item
                label={
                  <div>
                    <span className="formLabel mr-1">Customer email</span>
                    <span>{requiredStar()}</span>
                  </div>
                }
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input customer email!',
                  },
                ]}
              >
                <Input placeholder="Enter customer email" size="large" autocomplete="off" />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <div>
                <Form.Item label={<span className="FormLabel font-medium">Phone Number</span>}>
                  <PhoneNumber
                    countryCode="countryCode"
                    rules={[
                      {
                        message: 'Please enter country code',
                      },
                      () => ({
                        validator(_, value) {
                          if (!value) {
                            return Promise.resolve();
                          }
                          if (value?.length === 0 || value.length === 10) return Promise.resolve();
                          return Promise.reject('Please enter 10 digits for phone number');
                        },
                      }),
                    ]}
                    form={form}
                    name="phone"
                  />
                </Form.Item>
                {/* <div
                  className="verify text-blue-500 font-semibold cursor-pointer "
                  onClick={() => {
                    handleVerifyPhone();
                  }}
                >
                  Verify
                </div> */}
              </div>
            </Col>

            <Col xs={18} sm={18} md={12} lg={12} xl={12}>
              <Form.Item
                label={
                  <div>
                    <span className="formLabel mr-1">Password</span>
                    <span>{requiredStar()}</span>
                  </div>
                }
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input password!',
                  },
                ]}
              >
                <Input size="large" autocomplete="off" placeholder="Input password" />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end">
            <Button type="primary" size="large" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
      <VerifyOtp
        visible={verifyOtp}
        setVisible={setVerifyOtp}
        handleCancel={handleCancelVerify}
        // setOtp={setOtp}
        onVerifyOtp={onVerifyOtp}
      />
    </div>
  );
};

export default connect(({ feedbacks }) => ({ passengerList: feedbacks?.passengerList }))(
  CustomerModal,
);
