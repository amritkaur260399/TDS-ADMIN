import Breadcrumbs from '@/components/BreadCrumbs';
import CardSection from '@/components/CardSection';
import Page from '@/components/Page';

import { Button, Form, message } from 'antd';
import React from 'react';
import { connect, history } from 'umi';
import InviteForm from './InviteForm';

const InviteStaff = ({ dispatch, inviteLoading }) => {
  const [form] = Form.useForm();
  const button = (
    <Button
      loading={Boolean(inviteLoading)}
      onClick={() => {
        form.submit();
      }}
      type="primary"
    >
      Send Invite
    </Button>
  );
  return (
    <>
      <div className="container mx-auto ">
        <Page
          title="Add staff"
          primaryAction={button}
          breadcrumbs={
            <Breadcrumbs
              path={[
                {
                  name: 'Dashboard',
                  path: '/dashboard',
                },
                {
                  name: 'Staff',
                  path: '/staff/type/active',
                },
                {
                  name: 'Add staff',
                  path: '#',
                },
              ]}
            />
          }
        >
          <CardSection
            noPadding
            leftContent={
              <div className="pr-8">
                <div className="text-blue-900 font-semibold text-xl">Staff information</div>
                <div className="text-gray-600">
                  <p className="mt-4" style={{ lineHeight: '14px' }}>
                    Give staff access to your store by sending them an invitation.
                  </p>
                </div>
              </div>
            }
            rightContent={
              <Form
                layout="vertical"
                hideRequiredMark
                autoComplete="off"
                colon={false}
                form={form}
                onFinish={(values) => {
                  const body = { ...values };
                  delete body.phone;
                  delete body.countryCode;
                  body.phoneNumber = {
                    countryCode: values?.countryCode,
                    number: values?.phone,
                  };

                  dispatch({
                    type: 'staff/inviteStaff',
                    payload: {
                      body,
                    },
                  })
                    .then((res) => {
                      if (res?.success) {
                        message.success('Staff invited successfully');
                        history.push('/staff/type/awaiting');
                      } else {
                        message.error('An Error Occured!');
                      }
                    })
                    .catch((err) => {
                      message.error('Error creating staff');
                    });
                }}
              >
                <InviteForm form={form} />
              </Form>
            }
          />
        </Page>
      </div>
    </>
  );
};

export default connect(({ loading }) => ({
  inviteLoading: loading.effects['staff/createStaff'],
}))(InviteStaff);
