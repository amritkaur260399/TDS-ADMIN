/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/**
 *@BaseView - The Purpose of this component is that user can update its general  account information here
 *
 */
import React, { useEffect } from 'react';
import { connect, useParams, useHistory } from 'umi';
import { Form, message, Button } from 'antd';
import CardSection from '@/components/CardSection';
import Address from '@/components/Address';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import BasicDetailsForm from './BasicDetailsForm';

const UserProfile = ({ dispatch, currentUser, updateProfileLoading }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  useEffect(() => {
    form?.setFieldsValue({
      ...currentUser,
      firstName: currentUser?.data?.name.split(' ')[0] && currentUser?.data?.name.split(' ')[0],
      lastName: currentUser?.data?.name.split(' ')[1] && currentUser?.data?.name.split(' ')[1],
      email: currentUser?.data?.email,
      designation: currentUser?.data?.designation,
      address_line_1: currentUser?.data?.address?.address_line_1,
      address_line_2: currentUser?.data?.address?.address_line_2,
      phone: currentUser?.data?.phoneNumber,
      country: currentUser?.data?.address?.country,
      state: currentUser?.data?.address?.state,
      city: currentUser?.data?.address?.city,
      postal_code: currentUser?.data?.address?.postal_code,
      // mobile: currentUser?.data?.phoneNo?.slice(3, currentUser.data.phoneNo.length)
      // postal_code: currentUser?.zipCode,
      // address: {
      //   ...currentUser?.address,
      // },
    });
  }, [currentUser]);

  // useEffect(() => {
  //   if (staffId) {
  //     form?.setFieldsValue({
  //       ...getStaffMember,
  //       mobile: getStaffMember?.mobile?.slice(3, getStaffMember?.mobile?.length),
  //       address: {
  //         ...getStaffMember?.address,
  //       },
  //     });
  //   }
  // }, [staffId, getStaffMember]);

  // const staffPathArray = [
  //   {
  //     name: 'Dashboard',
  //     path: '/dashboard',
  //   },
  //   {
  //     name: 'All Staff',
  //     path: '/staff/list',
  //   },
  //   {
  //     name: <div className="capitalize">{getStaffMember?.name}</div>,
  //     path: '#',
  //   },
  // ];
  const pathArray = [
    {
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      name: 'Your profile',
      path: '/user-profile',
    },
  ];

  return (
    <div className="container mx-auto">
      <Form
        form={form}
        layout="vertical"
        onFinish={(value) => {
          const data = {
            adminId: currentUser?.data?._id,
            firstName: value.firstName,
            lastName: value?.lastName,
            email: value?.email,
            // country_code:value?.country_code,
            phone: value?.phone,
            designation: value?.designation,
            address: {
              address_line_1: value?.address_line_1,
              address_line_2: value?.address_line_2,
              country: value?.country,
              state: value?.state,
              city: value?.city,
              postal_code: value?.postal_code,
            },
          };
          try {
            dispatch({
              type: 'user/updateUserProfile',
              payload: {
                pathParams: {
                  id: currentUser?._id,
                },
                body: data,
              },
            }).then((res) => {
              console.log('res', res);
              if (res) {
                message.success('Profile updated successfully!');
              }
            });
          } catch (error) {
            message.error(error);
          }
        }}
        hideRequiredMark
        colon={false}
      >
        <Page
          title={'Your profile'}
          breadcrumbs={<Breadcrumbs path={pathArray} />}
          primaryAction={
            <Button
              type="primary"
              size="large"
              className="Button"
              htmlType="submit"
              block
              loading={updateProfileLoading}
            >
              Update
            </Button>
          }
        >
          <CardSection
            noPadding
            className="mt-4"
            leftContent={
              <div className="pr-8 ">
                <div className="text-blue-900 font-semibold text-xl">Your details</div>
                <div className="text-gray-600">
                  <p className="mt-3" style={{ lineHeight: '1.2rem' }}>
                    Fill your details like name and designation.
                  </p>
                </div>
              </div>
            }
            rightContent={<BasicDetailsForm form={form} />}
          />
          <CardSection
            noPadding
            className="mt-4"
            leftContent={
              <div className="pr-8 ">
                <div className="text-blue-900 font-semibold text-xl">Your address</div>
                <div className="text-gray-600">
                  <p className="mt-3" style={{ lineHeight: '1.2rem' }}>
                    Fill your address details like country and city.
                  </p>
                </div>
              </div>
            }
            rightContent={
              <div className="bg-white rounded shadow p-4">
                <Address form={form} currentUser={currentUser} />
              </div>
            }
          />
        </Page>
      </Form>
    </div>
  );
};

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,

  updateProfileLoading: loading.effects['user/updateUserProfile'],
}))(UserProfile);
