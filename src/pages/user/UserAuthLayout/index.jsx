import React from 'react';

import { Col, Row } from 'antd';
import bgImg from '@/assets/background-image.svg';

import truckLogo from '@/assets/images/TruckLogo.png';
const UserAuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen overflow-y-auto  ">
      <Row className="h-full w-full">
        <Col xs={0} sm={0} md={0} lg={12} xl={12} className="h-full ">
          <div className="bg-white h-full flex flex-col items-center justify-center mx-auto bg-blue-100">
            <img src={truckLogo} alt="City Taxis Sunraysia" height={'300px'} width={'600px'} />
            <div className="text-center">
              <div style={{ color: '#126E32' }} className="text-4xl pb-6 font-bold "></div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} className="h-full self-center">
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default UserAuthLayout;
