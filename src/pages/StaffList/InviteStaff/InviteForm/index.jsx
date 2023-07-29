import React from 'react';
import { Input, Row, Col, Form, Radio, message } from 'antd';
import PhoneNumber from '@/components/PhoneNumber';
import { checkUniqueness } from '@/services/user';

const InviteForm = ({ form }) => {
  return (
    <div className="bg-white shadow rounded">
      <div className="p-4 border-b">
        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              name="firstName"
              label={<span className="formLabel">First name</span>}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Firstname can't be blank!",
                },
                { pattern: /^[a-zA-Z ]*$/, message: 'Accept only alphabetic characters only' },
              ]}
            >
              <Input size="large" autoFocus placeholder="Enter first name" />
            </Form.Item>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              name="lastName"
              label={<span className="formLabel">Last name</span>}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Lastname can't be blank!",
                },
                { pattern: /^[a-zA-Z ]*$/, message: 'Accept only alphabetic characters only' },
              ]}
            >
              <Input size="large" autoFocus placeholder="Enter last name" />
            </Form.Item>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label={<span className="formLabel">Email</span>}
              name="email"
              initialValue=""
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
                name="staff-email"
                id="staff-email"
                placeholder="Enter staff email address"
                // onChange={() => {
                //   form
                //     .validateFields(['email'])
                //     .then(({ email }) => {
                //       checkUniqueness({ pathParams: { email: email.toLowerCase() } }).then(
                //         ({ isUnique }) => {
                //           if (!isUnique) {
                //             form.setFields([
                //               {
                //                 name: 'email',
                //                 errors: ['This email already exist'],
                //               },
                //             ]);
                //           }
                //         },
                //       );
                //     })
                //     .catch(() => {});
                // }}
              />
            </Form.Item>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item required label={<span className="FormLabel font-medium">Phone Number</span>}>
              <PhoneNumber
                countryCode="countryCode"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the contact number of service user',
                  },
                  {
                    pattern: /^\d{9}$/,
                    message: 'Please enter a valid phone number',
                  },
                ]}
                form={form}
                name="phone"
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <div className="bg-gray-100 p-4 border-b">
        <div className="mb-4">
          <div className="font-semibold">What role would you like to give your staff?</div>
          <div>
            After your staff accepts their invitation they will be able to manage your organization
            in the role selected below.
          </div>
        </div>
        <Form.Item
          name="role"
          initialValue="Admin"
          rules={[
            {
              required: true,
              message: 'Please select staff role',
            },
          ]}
        >
          <Radio.Group className="w-full ">
            <div className="rounded border bg-white rounded">
              <div className="hover:bg-gray-100 border-b rounded rounded-b-none px-4 ">
                <Radio
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                  value="Admin"
                >
                  <div className="flex-auto whitespace-normal cursor-pointer leading-normal py-2">
                    <div className="">
                      <div className="font-semibold">Admin</div>
                      <span>
                        Has access to all organization manager functions plus manage organization
                        level settings.
                      </span>
                    </div>
                  </div>
                </Radio>
              </div>
              <div className="flex items-center hover:bg-gray-100 border-b rounded rounded-b-none px-4 ">
                <Radio
                  value="Manager"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="whitespace-normal cursor-pointer leading-normal py-2">
                    <div className="font-semibold">Manager</div>
                    <div className="flex-1 w-full">
                      Has access to all employee functions plus can manage organization.
                    </div>
                  </div>
                </Radio>
              </div>
            </div>
          </Radio.Group>
        </Form.Item>
      </div>
    </div>
  );
};
export default InviteForm;
