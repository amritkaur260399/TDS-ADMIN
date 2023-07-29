import { createCustomer } from '@/services/quickBooks';
import quickBookUtils from '@/utils/quickBooksUtils';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';

const QuickBooksForm = () => {
  const onFinish = (values) => {
    quickBookUtils(
      createCustomer,
      { DisplayName: values?.DisplayName },
      // {
      //   FullyQualifiedName: 'Kinsasdfaxg Grocxadsfseries',
      //   PrimaryEmailAddr: {
      //     Address: 'jdrsaasdfxsw@mysxasdfsemail.com',
      //   },
      //   DisplayName: "Kinasdfsxsxg's GrsasdfxSoceries",
      //   Suffix: 'JSr',
      //   Title: 'Mr',
      //   MiddleName: 'XSB',
      //   Notes: 'Here are otheasdfSXXSr details.',
      //   FamilyName: 'KSXasdfasSing',
      //   PrimaryPhone: {
      //     FreeFormNumber: '(456) 234-4575',
      //   },
      //   CompanyName: 'Ksdsasdfsddsing AADDasdfS',
      //   GivenName: 'Jasddsasdfdseewmes',
      // },
    );
  };

  const people = [
    {
      name: 'Jane Cooper',
      title: 'Regional ',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image: 'https://bit.ly/33HnjK0',
    },
    {
      name: 'John Doe',
      title: 'Regional ',
      department: 'Optimization',
      role: 'Tester',
      email: 'john.doe@example.com',
      image: 'https://bit.ly/3I9nL2D',
    },
    {
      name: 'Veronica Lodge',
      title: 'Regional ',
      department: 'Optimization',
      role: ' Software Engineer',
      email: 'veronica.lodge@example.com',
      image: 'https://bit.ly/3vaOTe1',
    },
    // More people...
  ];

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Company Name"
          name="companyName"
          // rules={[
          //   {
          //     required: true,
          //     message: 'Please input your username!',
          //   },
          // ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Display Name"
          name="DisplayName"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Primary Phone"
          name="PrimaryPhone"
          // rules={[
          //   {
          //     required: true,
          //     message: 'Please input your username!',
          //   },
          // ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Primary Email Address"
          name="PrimaryEmailAddr"
          // rules={[
          //   {
          //     required: true,
          //     message: 'Please input your password!',
          //   },
          // ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div style={{ width: '50%' }}>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{person.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{person.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800"
                          >
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.role}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuickBooksForm;
