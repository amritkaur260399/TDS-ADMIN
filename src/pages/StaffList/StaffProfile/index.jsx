import React, { useEffect } from 'react';
import { Row, Col, Spin, Tabs } from 'antd';
import StaffProfileDetails from './StaffDetails/index';
import { connect, useParams, history } from 'umi';
import Page from '@/components/Page';
import Breadcrumbs from '@/components/BreadCrumbs';

const ProfileStaff = ({ children, dispatch }) => {
  const { staffId, tabName } = useParams();
  const tabs = [
    {
      title: 'Tasks',
      key: 'TASKS',
    },
  ];
  const getStaffDetails = () => {
    dispatch({
      type: 'staff/getStaffDetails',
      payload: {
        pathParams: { staffId },
      },
    });
  };
  useEffect(() => {
    getStaffDetails();
  }, []);

  return (
    <div>
      <Page
        title="Staff Profile"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'All Staff ',
                path: '/staff/type/active',
              },
              {
                name: 'Staff Profile',
                path: '#',
              },
            ]}
          />
        }
      >
        <Spin spinning={Boolean(false)}>
          <Row gutter={24}>
            <Col xl={9} lg={9} md={12} sm={18} xs={24}>
              <div>
                <StaffProfileDetails staffId={staffId} />
              </div>
            </Col>
            <Col xl={15} lg={15} md={12} sm={18} xs={24}>
              <div className="bg-white">
                <Tabs
                  activeKey={tabName?.toUpperCase()}
                  onTabClick={(key) => {
                    history.push(`/staff/${staffId}/profile/${key}`);
                  }}
                >
                  {tabs?.map((tab) => (
                    <Tabs.TabPane tab={<span className="px-4">{tab?.title}</span>} key={tab?.key}>
                      {tab?.key === tabName?.toUpperCase() && children}
                    </Tabs.TabPane>
                  ))}
                </Tabs>
              </div>
            </Col>
          </Row>
        </Spin>
      </Page>
    </div>
  );
};

export default connect(() => ({}))(ProfileStaff);
