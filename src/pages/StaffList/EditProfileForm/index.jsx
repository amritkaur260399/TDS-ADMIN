import { requiredStar } from '@/utils/AppIons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'umi';
const EditProfileForm = ({ countryCode, dispatch, setEditProfileModal, form }) => {
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
  const handleCancel = () => {
    setEditProfileModal({ visible: false, data: [] });
  };

  const role = [
    {
      name: 'Admin',
      value: 'Admin',
    },
    {
      name: 'SuperAdmin',
      value: 'SuperAdmin',
    },
    {
      name: 'Manager',
      value: 'Manager',
    },
  ];
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="firstName"
            label={<span className="formLabel mr-1">Firstname</span>}
            rules={[
              {
                required: true,
                message: 'Please input FirstName!',
              },
            ]}
          >
            <Input size="large" placeholder="Firstname" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="lastName"
            label={<span className="formLabel mr-1">Lastname</span>}
            rules={[
              {
                required: true,
                message: 'Please input LastName!',
              },
            ]}
          >
            <Input size="large" placeholder="LastName" />
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
            <Input
              placeholder="Enter Your Email Id"
              size="large"
              autocomplete="off"
              disabled={true}
            />
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
              <Form.Item style={{ width: '35%' }} name="countryCode" initialValue={'+61'}>
                <Select size="large" getPopupContainer={(node) => node.parentNode}>
                  {countryCode?.result?.map((item) => (
                    <Select.Option key={item?._id}>
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
            name="role"
            label={<span className="formLabel mr-1">Role</span>}
            rules={[
              {
                required: true,
                message: 'Please input role!',
              },
            ]}
          >
            <Select size="large" placeholder="Select role">
              {role?.map((role) => (
                <Select.Option value={role?.value} key={role?.value}>
                  {role?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={48} sm={48} md={24} lg={24} xl={24}>
          <Form.Item
            name="address_line_1"
            label={<span className="formLabel mr-1 ">Address Line 1</span>}
            rules={[
              {
                required: true,
                message: 'Please input Address!',
              },
            ]}
          >
            <Input size="large" placeholder="Address" />
          </Form.Item>
        </Col>
        <Col xs={48} sm={48} md={24} lg={24} xl={24}>
          <Form.Item
            name="address_line_2"
            label={<span className="formLabel mr-1 ">Address Line 2</span>}
            rules={[
              {
                required: true,
                message: 'Please input Address!',
              },
            ]}
          >
            <Input size="large" placeholder="Address" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="city"
            label={<span className="formLabel mr-1 ">City</span>}
            rules={[
              {
                required: true,
                message: 'Please input City!',
              },
            ]}
          >
            <Input size="large" placeholder="City" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="state"
            label={<span className="formLabel mr-1 ">State</span>}
            rules={[
              {
                required: true,
                message: 'Please input State!',
              },
            ]}
          >
            <Input size="large" placeholder="State" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="country"
            label={<span className="formLabel mr-1 ">Country</span>}
            rules={[
              {
                required: true,
                message: 'Please input Country!',
              },
            ]}
          >
            <Input size="large" placeholder="Country" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="postal_code"
            label={<span className="formLabel mr-1 ">Postal Code</span>}
            rules={[
              {
                required: true,
                message: 'Please input Postal code!',
              },
            ]}
          >
            <Input size="large" placeholder="Postal Code" />
          </Form.Item>
        </Col>
      </Row>
      <div className="flex justify-end gap-4">
        <Button size="large" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button type="primary" size="large" htmlType="submit">
          Submit
        </Button>
      </div>
    </div>
  );
};
export default connect(({ common }) => ({
  countryCode: common?.countryCode,
}))(EditProfileForm);
