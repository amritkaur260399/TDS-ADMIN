import React from 'react';
import { Form, Input, Row, Col, Button, Select } from 'antd';
import { connect } from 'umi';
import PhoneNumber from '@/components/PhoneNumber';
import { useEffect } from 'react';
import { requiredStar } from '@/utils/AppIons';
const PersonalDetails = ({
  handleCancel,
  loadingForUpload,
  dispatch,
  form,
  handleOk,
  isFormEdit,
  countryCode,
  loading,
}) => {
  useEffect(() => {
    dispatch({
      type: 'common/getCountryCode',
    })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Firstname</span>
                <span>{requiredStar()}</span>
              </div>
            }
            rules={[
              {
                required: true,
                message: 'Please input your firstName!',
                whitespace: false,
              },
              {
                pattern: new RegExp(/^[^ ]/),
                message: 'Spaces not allowed',
              },
            ]}
            name="firstName"
          >
            <Input placeholder="Enter Your FirstName" size="large" autocomplete="off" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Lastname</span>
              </div>
            }
            rules={[
              {
                pattern: new RegExp(/^[^ ]/),
                message: 'Spaces not allowed',
              },
            ]}
            name="lastName"
          >
            <Input placeholder="Enter Your Lastname" size="large" autocomplete="off" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Phone Number</span>
                <span>{requiredStar()}</span>
              </div>
            }
          >
            <Input.Group size="large" className="flex w-[100%]">
              <Form.Item style={{ width: '20%' }} name="countryCode" initialValue={'+61'}>
                <Select size="large" getPopupContainer={(node) => node.parentNode}>
                  {countryCode?.result?.map((item) => (
                    <Select.Option value={item?.dialCode} key={item?._id}>
                      <div className=" ">{item?.dialCode}</div>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                style={{ width: '80%' }}
                name="phoneNo"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your contact',
                  },
                  {
                    pattern: /^\d{9}$/,
                    message: 'Please enter a valid phone number',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Phone" type="number" />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Email</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input email address!',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                pattern: new RegExp(/^[^ ]/),
                message: 'Spaces not allowed',
              },
            ]}
          >
            <Input placeholder="Enter Your Email Id" size="large" autocomplete="off" />
          </Form.Item>
        </Col>
      </Row>
      <div className="flex justify-end gap-4">
        <Button size="large" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button type="primary" size="large" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default connect(({ rides, loading, common }) => ({
  loading: loading?.effects['rides/updateRide'] || loading?.effects['rides/createRide'],

  ridesList: rides?.ridesList,
  countryCode: common?.countryCode,
}))(PersonalDetails);
