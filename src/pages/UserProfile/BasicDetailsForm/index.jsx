/* eslint-disable prefer-promise-reject-errors */
import { Button, Input, Form, Col, Row, Avatar, Tooltip, Tag, Select } from 'antd';
import { getIntials } from '@/utils/utils';
import React, { useState } from 'react';
import { connect, useParams } from 'umi';
import UpdatePassword from '@/components/UpdatePassword';
import PhoneNumber from '@/components/PhoneNumber';
import classNames from 'classnames';
import styles from './index.less';
import { Option } from 'antd/lib/mentions';
import VerifyPhoneNumber from '@/components/VerifyPhoneNumber';

const BasicDetailsForm = ({ form, currentUser }) => {
  const [visible, setVisible] = useState(false);
  const [verifyPhoneModal, setVerifyPhoneModal] = useState(false);

  const designation = [
    { label: 'Admin', value: 'Admin' },
    { label: 'SuperAdmin', value: 'SuperAdmin' },
    { label: 'Manager', value: 'Manager' },
  ];
  const handleVerifyPhone = () => {
    setVerifyPhoneModal(true);
  };

  return (
    <div className="bg-white rounded shadow">
      <div className="w-full pb-4">
        <div className=" mb-4 p-4 px-4 border-b">
          <Row gutter={[24, 12]}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <div className="flex items-center ">
                <Avatar
                  className="bg-blue-800 w-8 uppercase"
                  style={{ backgroundColor: '#126E32' }}
                  size="large"
                >
                  <div className="text-lg">
                    {currentUser?.data?.name && getIntials(currentUser?.data?.name)}
                  </div>
                </Avatar>
                <div className={classNames('ml-6', styles?.btnSyles)}>
                  <Button
                    type="primary"
                    ghost
                    size="medium"
                    onClick={() => {
                      setVisible(true);
                    }}
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <div className="xl:text-right">
                <div className="text-gray-600 uppercase font-medium text-sm">Email</div>
                <Tooltip title={currentUser?.data?.email}>
                  <div className="text-blue-900 text-lg truncate w-full font-semibold">
                    {currentUser?.data?.email}
                  </div>
                </Tooltip>
              </div>
            </Col>
          </Row>
        </div>
        <div className="px-4">
          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: `Firstname can't be blank`,
                  },
                ]}
                label={<span className="formLabel">Firstname</span>}
              >
                <Input size="large" autoFocus />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: `Lastname can't be blank`,
                  },
                ]}
                label={<span className="formLabel">Lastname</span>}
              >
                <Input size="large" autoFocus />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item name="designation" label={<span className="formLabel">Designation</span>}>
                <Select size="large">
                  {designation?.map((val) => (
                    <Option key={val.value} value={val.value}>
                      {val.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <div>
                <Form.Item label={<span className="FormLabel font-medium">Phone Number</span>}>
                  <PhoneNumber
                    countryCode="country_code"
                    rules={[
                      {
                        message: 'Please enter contact number',
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
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item name="email" label={<span className="FormLabel font-medium">Email</span>}>
                <Input
                  size="large"
                  disabled={true}
                  rules={[
                    {
                      required: true,
                      message: `Email can't be blank`,
                    },
                  ]}
                  name="email"
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
      <UpdatePassword visible={visible} setVisible={setVisible} currentUser={currentUser} />
      <VerifyPhoneNumber
        visible={verifyPhoneModal}
        setVisible={setVerifyPhoneModal}
        currentUser={currentUser}
      />
    </div>
  );
};

export default connect(({ common, user, loading }) => ({
  stateCodes: common.stateCodes,
  currentUser: user.currentUser,

  updateProfileLoading: loading.effects['user/updateCurrent'],
}))(BasicDetailsForm);
