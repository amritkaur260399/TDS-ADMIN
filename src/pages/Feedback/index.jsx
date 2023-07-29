import React from 'react';
import { Tabs } from 'antd';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import Tablecomponent from '@/pages/Feedback/Table';

const tabs = [
  {
    title: 'Feedback',
    tabs: 'Feedback',
  },

  {
    title: 'Complaint',
    tabs: 'Complaint',
  },
];

const tabs2 = [
  {
    title: 'All',
    tabs: 'All',
  },

  {
    title: 'Pending',
    tabs: 'Pending',
  },

  {
    title: 'Reject',
    tabs: 'Reject',
  },
];

const Feedback = () => {
  return (
    <>
      <Page
        title="Feedback"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Feedback',
                path: '#',
              },
            ]}
          />
        }
      >
        <div className="border bg-white">
          <Tabs defaultActiveKey="1">
            {tabs?.map((item) => (
              <Tabs.TabPane tab={item?.title} key={item?.tabs}>
                <Tabs>
                  {tabs2?.map((ite) => (
                    <Tabs.TabPane tab={ite?.title} key={ite?.tabs}>
                      <Tablecomponent />
                    </Tabs.TabPane>
                  ))}
                </Tabs>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </Page>
    </>
  );
};

export default Feedback;
