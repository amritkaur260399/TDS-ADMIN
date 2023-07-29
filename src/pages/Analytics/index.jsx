import { EarningsIcon } from '@/assets/DashboardIcons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { Earnings, Feedbacks, Payments, VehicleTyre } from '@/utils/AppIons';
import { ArrowRightOutlined, DatabaseOutlined, WarningOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import { Button, Spin } from 'antd';
import { last } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { connect } from 'umi';

const Analytics = ({ dispatch, analyticsList, loading }) => {
  // const [filterDate, setFilterDate] = useState('weekly');
  const [dataType, setDataType] = useState('week');
  const [apiRes, setApiRes] = useState([]);
  const [allData, setAllData] = useState();
  const getAnalytics = () => {
    dispatch({
      type: 'analytics/getAnalytics',
      payload: {
        query: {
          time: dataType,
        },
      },
    }).then((res) => {
      setApiRes(res?.data);
    });
  };
  useEffect(() => {
    getAnalytics();
  }, [dataType]);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const halfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', ' June'];
  const year = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  useEffect(() => {
    let data;
    if (dataType === 'month') {
      data = apiRes?.rides?.map((val) => {
        return [val.date, val.count];
      });
    } else if (dataType === 'week') {
      data = daysOfWeek.map((day) => {
        const rideCount = apiRes?.rides?.find(
          (ride) => new Date(ride.date).getDay() === daysOfWeek.indexOf(day),
        );

        if (rideCount) {
          return [day.slice(0, 3), rideCount.count];
        } else {
          return [day.slice(0, 3), 0];
        }
      });
    } else if (dataType === 'half-year') {
      data = halfYear.map((month) => {
        const rideCount = apiRes?.rides?.find(
          (ride) => new Date(ride.date).getMonth() === halfYear.indexOf(month),
        );

        if (rideCount) {
          return [month.slice(0, 3), rideCount.count];
        } else {
          return [month.slice(0, 3), 0];
        }
      });
    } else if (dataType === 'full-year') {
      data = year.map((month) => {
        const rideCount = apiRes?.rides?.find(
          (ride) => new Date(ride.date).getMonth() === year.indexOf(month),
        );

        if (rideCount) {
          return [month.slice(0, 3), rideCount.count];
        } else {
          return [month.slice(0, 3), 0];
        }
      });
    }
    setAllData([['Year', 'Sales'], ...data]);
  }, [apiRes]);

  const rideCountByDay = daysOfWeek.map((day) => {
    const rideCount = apiRes?.rides?.find(
      (ride) => new Date(ride.date).getDay() === daysOfWeek.indexOf(day),
    );
    if (rideCount) {
      return { day, count: rideCount.count };
    } else {
      return { day, count: 0 };
    }
  });

  const FilterDate = [
    {
      title: '07 Days',
      key: 'week',
    },
    {
      title: '30 Days',
      key: 'month',
    },
    {
      title: '06 Month',
      key: 'half-year',
    },
    {
      title: '12 Months',
      key: 'full-year',
    },
  ];

  const options = {
    title: 'Rides',
    curveType: 'function',
  };

  return (
    <div>
      <Page
        title="Analytics"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Analytics',
                path: '#',
              },
            ]}
          />
        }
        primaryAction={
          <div className="flex ">
            {FilterDate?.map((item) => (
              <div key={item?.key}>
                <Button
                  className="mx-2"
                  style={{ borderRadius: '999999px' }}
                  type={dataType === item?.key ? 'primary' : ''}
                  size="large"
                  onClick={() => setDataType(item?.key)}
                >
                  {item?.title}
                </Button>
              </div>
            ))}
          </div>
        }
      >
        <Spin size="large" spinning={loading}>
          <div
            className={`${
              dataType === 'month' || dataType === 'full-year'
                ? 'grid grid-cols-1 gap-4'
                : 'grid grid-cols-2 gap-4'
            }`}
          >
            <div className="w-full border overflow-hidden " style={{ borderRadius: '20px' }}>
              <Chart
                chartType="LineChart"
                width="100%"
                height="320px"
                data={allData}
                options={options}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border p-4  bg-white" style={{ borderRadius: '20px' }}>
                <div className="flex justify-between">
                  <div className="bg-red-300 p-1 rounded-lg text-red-700 "> {Earnings()}</div>
                </div>
                <div className="text-gray-600 py-4 text-sm">Earnings</div>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <p className="font-bold text-lg text-block" style={{ fontSize: '25px' }}>
                      {(apiRes?.earnings?.totalEarnings &&
                        apiRes?.earnings?.totalEarnings.toString()) ||
                        0}

                      {/* {apiRes?.earnings
                        ? apiRes?.earnings?.totalEarnings.toString().split('.')[0]
                        : 0 + '.' + apiRes?.earnings
                        ? apiRes?.earnings?.totalEarnings.toString().split('.')[1].slice(0, 2)
                        : 0} */}
                    </p>{' '}
                    <p className="text-xs  font-medium" style={{ padding: '2.7px' }}>
                      AUD
                    </p>
                  </div>
                </div>
              </div>
              <div className="border p-4  bg-white" style={{ borderRadius: '20px' }}>
                <div className="flex justify-between">
                  <div className="bg-green-300 p-1 rounded-lg ">
                    <div className="pt-1">
                      <VehicleTyre style={{ height: '20px', width: '20px' }} />
                    </div>
                  </div>
                </div>
                <div className="text-gray-600 py-4 text-sm">Vehicles</div>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <p className="font-bold text-lg text-block" style={{ fontSize: '25px' }}>
                      {apiRes?.vehicles?.vehicleCount || 0}
                    </p>{' '}
                  </div>
                </div>
              </div>
              <div className="border p-4  bg-white" style={{ borderRadius: '20px' }}>
                <div className="flex justify-between">
                  <div className="bg-teal-200 p-1 rounded-lg text-red-700">{Payments()}</div>
                </div>
                <div className="text-gray-600 py-4 text-sm">Payments</div>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <p className="font-bold text-lg text-block" style={{ fontSize: '25px' }}>
                      {apiRes?.earnings?.paymentsCount || 0}
                    </p>{' '}
                  </div>
                </div>
              </div>
              <div className="border p-4  bg-white" style={{ borderRadius: '20px' }}>
                <div className="flex justify-between">
                  <div className="bg-purple-300 p-1 rounded-lg text-red-700">{Feedbacks()}</div>
                </div>
                <div className="text-gray-600 py-4 text-sm">Feedback</div>
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <p className="font-bold text-lg text-block" style={{ fontSize: '25px' }}>
                      {apiRes?.feedbacks?.feedbackCount || 0}
                    </p>{' '}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </Page>
    </div>
  );
};

export default connect(({ analytics, loading }) => ({
  analyticsList: analytics?.analyticsList,
  loading: loading.effects['analytics/getAnalytics'],
}))(Analytics);
