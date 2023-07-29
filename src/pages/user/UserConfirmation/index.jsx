import { confirmPassordJotai, userCreateIDJotai } from '@/utils/globalStates/modals';
import { DribbbleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Form } from 'antd';
import { useAtom } from 'jotai';
import { history } from 'umi';
const { form } = Form;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'umi';

const UserConfirmation = () => {
  const dispatch = useDispatch();
  const [path, setPath] = useAtom(confirmPassordJotai);
  const [userCreateID, setUserCreateId] = useAtom(userCreateIDJotai);
  const { id } = useParams();

  useEffect(() => {
    console.log(id, 'id1');
  }, [id]);

  useEffect(() => {
    if (window.location.href.includes('confirmation')) {
      setPath(window.location.href);
    }
  }, []);
  console.log('path5465456', path);

  console.log(userCreateID, 'userCreateID5454rgfghghh', window.location.href.split('id=')[1]);

  const onFinish = (values) => {
    // form.resetFields();
    console.log(values, 'values');
    dispatch({
      type: 'addUser/confirmPassword',
      payload: {
        body: {
          ...values,
          user_id: window.location.href.split('id=')[1],
        },
      },
    }).then((res) => {
      if (res?.success) {
        history.push(`/user/login`);
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center  ">
      <div
        className=" bg-white p-4   border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        style={{ height: '550px', width: '500px' }}
      >
        <div className="flex justify-center items center  mt-12">
          <DribbbleOutlined style={{ fontSize: '80px' }} />
        </div>
        <div className="flex justify-center items-center p-4 text-3xl "> User Confirmation</div>

        <div className="flex justify-center items-center mt-4">
          <Form name="form" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password style={{ width: '300px' }} placeholder=" Password" />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The new password that you entered do not match!'),
                    );
                  },
                }),
              ]}
            >
              <Input.Password style={{ width: '300px' }} placeholder="Confirm Password" />
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
        </div>
      </div>
    </div>
  );
};

export default UserConfirmation;
