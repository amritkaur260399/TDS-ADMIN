import { Button, Col, Divider, Form, Input, Modal, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  confirmPassordJotai,
  modalsJotai,
  otpJotai,
  userCreateIDJotai,
  userJotai,
} from '@/utils/globalStates/modals';
import { useAtom } from 'jotai';
import { CloseOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useDispatch } from 'umi';
import { getAllUsers, getSingleUser, updateUser } from '@/services/addUser';
import VerifyOtp from '@/components/VerifyOtp';
import ReactInputMask from 'react-input-mask';

const AddUsers = ({
  form,
  singleUser,
  getAllUsers,
  buttonStatus,
  visible,
  setVisible,
  handleCancel,
  verifyOtp,
  setVerifyOtp,
  getUsers,
}) => {
  const dispatch = useDispatch();
  const [isopenModal, setIsopenModal] = useAtom(modalsJotai);
  const [isopen, setIsopen] = useAtom(otpJotai);
  const [formValues, setFormValues] = useAtom(userJotai);
  const [path, setPath] = useAtom(confirmPassordJotai);
  const [userCreateID, setUserCreateId] = useAtom(userCreateIDJotai);
  // console.log('userCreateID', userCreateID);
  // console.log('formValues', formValues);
  // console.log('patvbnvh', `${window.location.origin}/user/user-confirmation`);

  const onFinish = (values) => {
    setFormValues(values);
    dispatch({
      type: 'addUser/verifyPassword',
      payload: {
        body: {
          ...values,
          confirmation_url: `${window.location.origin}/user/user-confirmation`,
        },
      },
    }).then((res) => {
      if (res) {
        setUserCreateId(res?.addUser?._id);
        getAllUsers();
        message?.success('URL sent successfully');
      }
    });

    setIsopenModal(false);
    // form.resetFields();
    setIsopenModal({
      ...isopenModal,
      addUser: { name: '', open: false },
    });
  };

  useEffect(() => {
    if (isopenModal?.addUser?.open === false) {
      form.resetFields();
    }
  }, [isopenModal, form]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinishedFailed = (errorInfo) => {
    console.log('Failed', errorInfo);
  };

  const updateUser = (values) => {
    console.log('values2345', values);
    const formData = new FormData();
    // formData.append('userName', values?.userName);
    formData.append('firstName', values?.firstName);
    formData.append('lastName', values?.lastName);
    formData.append('phoneNumber', values?.phoneNumber);
    formData.append('email', values?.email);
    dispatch({
      type: 'addUser/updateUser',
      payload: {
        body: formData,
        pathParams: {
          id: singleUser?.data?._id,
        },
      },
    }).then((res) => {
      if (res) {
        message.success('User Updated Successfully');
        form.resetFields();
        setIsopenModal(false),
          {
            ...isopenModal,
            addUser: { name: '', open: false },
          },
          getAllUsers();
      } else {
        message.error('An error occured!');
      }
    });
  };

  // const onFinish = (values) => {
  //   if (editLocation) {
  //     dispatch({
  //       type: 'location/updateLocation',
  //       payload: {
  //         body: { ...values, postalCode: Number(values?.postalCode) },
  //         pathParams: { id: editLocation },
  //       },
  //     }).then((res) => {
  //       setAddModalVisible(false);
  //       // getAllLocation();
  //       form.resetFields('');
  //       message.success('Location Updated Succesfully!');
  //     });
  //   } else {
  //     dispatch({
  //       type: 'location/addLocation',
  //       payload: {
  //         body: { ...values, postalCode: Number(values?.postalCode) },
  //       },
  //     }).then((res) => {
  //       setAddModalVisible(false);
  //       form.resetFields('');

  //       message.success('Location Added Succesfully!');
  //     });
  //   }
  // };
  const regexPhone = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return (
    <div className="">
      <Modal
        title={
          <span style={{ color: '#10181e' }} className="font-medium">
            {buttonStatus?._id ? 'Update User' : 'Add User'}
          </span>
        }
        // title="Add User"
        width={700}
        height={600}
        centered
        footer={null}
        closeIcon={<CloseOutlined style={{ color: 'black' }} />}
        className="modalStyle"
        open={isopenModal?.addUser?.name === 'Add User' && isopenModal?.addUser?.open}
        onOk={() => {
          setIsopenModal(false);
          form.resetFields();
        }}
        onCancel={() => {
          setIsopenModal({
            ...isopenModal,
            addUser: { name: ' ', open: false },
          });
          form.resetFields('');
        }}
      >
        <div>
          {/* --------Add User Model------------- */}
          <Form form={form} name="addUser" onFinish={onFinish}>
            <Row gutter={24} style={{ padding: '15px' }}>
              {/* <Col xs={24} sm={24} md={12} xl={12}>
                <h4>User name</h4>
                <Form.Item
                  name="userName"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Enter User Name" style={{ borderRadius: '5px' }} />
                </Form.Item>
              </Col> */}
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>First name</h4>
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your first name',
                    },
                    {
                      pattern: /^[A-Za-z]+$/,
                      message: 'Only alphabets are allowed',
                    },
                  ]}
                >
                  <Input placeholder="Enter First Name" style={{ borderRadius: '5px' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>Last name</h4>
                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your last name',
                    },
                    {
                      pattern: /^[A-Za-z]+$/,
                      message: 'Only alphabets are allowed',
                    },
                  ]}
                >
                  <Input placeholder="Enter Last Name" style={{ borderRadius: '5px' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>Email Address</h4>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your email address',
                    },
                    {
                      pattern:
                        /^[^@!#$%^&*()_+=\[\]{};':"\\|,<>\/?][^!#$%^&*()_+=\[\]{};':"\\|,<>\/?]*$/,
                      message: 'Please enter valid email address',
                    },
                  ]}
                >
                  <Input placeholder="Enter Email" style={{ borderRadius: '5px' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>Phone Number</h4>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Phone Number',
                    },
                    {
                      pattern: regexPhone,
                      message: 'Please enter valid Phone Number',
                    },
                  ]}
                >
                  {/* <Input placeholder="Enter Phone Number" style={{ borderRadius: '5px' }} />*/}
                  <ReactInputMask mask="(999) 999-9999" maskChar="_">
                    {() => (
                      <Input
                        placeholder="Billing Contact Name"
                        style={{ borderRadius: '5px' }}
                        type="text"
                        className="inputNumber"
                      />
                    )}
                  </ReactInputMask>
                </Form.Item>
              </Col>
              {/* <Col xs={24} sm={24} md={12} xl={12}>
                <h4>Password</h4>
                <Form.Item
                  name="password"
                  rules={
                    [
                      {
                        // required: true,
                      },
                    ]
                  }
                >
                  <Input.Password
                    // size="large"
                    size="small"
                    style={{ borderRadius: '5px' }}
                    placeholder="Enter Password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />{' '}
                </Form.Item>
              </Col> */}
            </Row>
            <div className="gap-3 flex justify-end mr-5">
              <Button
                style={{ height: '30px', borderRadius: '5px' }}
                onClick={() => {
                  setIsopenModal(false);
                  form.resetFields();
                }}
              >
                <span className="text-black px-2">Cancel</span>
              </Button>
              {buttonStatus?._id ? (
                <Button
                  type="primary"
                  style={{ height: '30px', borderRadius: '5px' }}
                  // htmlType="submit"
                  onClick={() =>
                    updateUser(form.getFieldsValue('clientForm'), setIsopenModal(false))
                  }
                >
                  <span className="text-white px-2">Update</span>
                </Button>
              ) : (
                <Button
                  type="primary"
                  style={{ height: '30px', borderRadius: '5px' }}
                  htmlType="submit"
                  // onClick={()=>   setIsopen({
                  //   ...isopen,
                  //   verifyModal: { name: 'verifyOtp', open: true },
                  // })}
                >
                  <span className="text-white px-2">Continue</span>
                </Button>
              )}

              {/* <Button
                type="primary"
                style={{ height: '30px', borderRadius: '5px' }}
                htmlType="submit"

                onClick={() =>
                        updateUser(form.getFieldsValue('clientForm'), setIsopenModal(false))
                      }
              >
                <span className="text-white px-2">Submit</span>

              </Button> */}
            </div>
          </Form>
        </div>
      </Modal>

      <VerifyOtp
      // visible={verifyOtp}
      // setVisible={setVerifyOtp}
      // handleCancel={handleCancelVerify}
      // // setOtp={setOtp}
      // onVerifyOtp={onVerifyOtp}
      />
    </div>
  );
};

export default AddUsers;
