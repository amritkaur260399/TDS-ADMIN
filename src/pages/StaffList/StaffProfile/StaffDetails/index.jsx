import React from 'react';
import { Avatar, Skeleton, Tag } from 'antd';

import dayjs from 'dayjs';
import { connect } from 'umi';

const StaffProfileDetails = ({ data, loading }) => {
  return (
    <>
      {!loading ? (
        <div className="main bg-white  shadow-md">
          <div className="flex justify-between">
            <div className="flex pt-3">
              <div className="mt-4 ml-4 mb-4">
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  size={64}
                  style={{ background: '#34bdeb' }}
                />
              </div>
              <div className="ml-4 ">
                <span className="ml-4 mb-4 text-xl font-medium text-gray-600 capitalize">
                  {`${data?.firstName} ${data?.lastName}` || 'N/A'}
                </span>
                <div className="mb-2 ml-4 mt-1">
                  <Tag color="orange" style={{ borderRadius: '10px' }}>
                    {data?.invitedRole}
                  </Tag>
                </div>
                <div>
                  <p className="pl-4 mt-2 font-medium">
                    <span className="text-gray-700 mr-2"> Role since</span>
                    <span>{dayjs(data?.created_at).format('MM-DD-YYYY ')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex  border-t pt-2 justify-between">
            <div className="flex">
              <p className=" pl-4 pt-2 ml-1 text-sm font-semibold text-gray-600">Email</p>
            </div>

            <div className="flex ">
              <p className="mt-2 mr-4 " style={{ fontWeight: '500' }}>
                {data?.email}
              </p>
            </div>
          </div>
          <div className="flex border-t pt-4 justify-between border-b">
            <div className="flex">
              <p className="pl-4 ml-1 text-sm font-medium text-gray-600 font-semibold">Phone</p>
            </div>
            <div className=" editphone  flex">
              <p className="mr-4 mt-1" style={{ fontWeight: '500' }}>
                {`${data?.phone?.countryCode} ${data?.phone?.number}` || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded mb-4  p-8">
          <Skeleton avatar paragraph={{ rows: 3 }} />
        </div>
      )}
    </>
  );
};

export default connect(({ staff, loading }) => ({
  data: staff?.staffDetails?.data,
  loading: loading?.effects['staff/getStaffDetails'],
}))(StaffProfileDetails);
