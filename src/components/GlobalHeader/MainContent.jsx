import { Dropdown, Input, Space } from 'antd';
import React from 'react';

import notificationIcon from '../../assets/headerIcons/notifications.svg';
// import profileDemo from '../../assets/headerIcons/profileDemo.svg';
import profileDemo from '../../assets/headerIcons/demoimage.png';

import { ArrowDownOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import AvatarDropdown from './AvatarDropdown';

const MainContent = () => {
  // const items = [
  //   {
  //     label: <a href="">My Profile</a>,
  //     key: '0',
  //   },
  //   {
  //     label: <a href="">Logout</a>,
  //     key: '1',
  //   },
  // ];
  return (
    <div
      className="flex  w-full items-center"
      style={{
        height: '100%',
      }}
    >
      <div
        style={{
          width: '70%',
          //   borderWidth: 0,
          //   borderRadius: 5,
          //   backgroundColor: '#F5F5F5',
          //   height: 35,
        }}
      >
        <Input
          placeholder="Search.."
          prefix={<SearchOutlined />}
          size="large"
          style={{
            // backgroundColor: '#F5F5F5',
            // borderWidth: 0,
            borderRadius: 5,
          }}
        />
      </div>
      <div
        className="flex justify-end"
        style={{
          width: '30%',
        }}
      >
        <AvatarDropdown />
        {/* <img
          src={notificationIcon}
          //   style={{
          //     height: 35,
          //     width: 35,
          //   }}
        />
        <div className="flex gap-2 items-center ">
          <div className="h-12 w-12 flex justify-end items-center ">
            <img
              src={profileDemo}
              style={{
                height: 35,
                width: 35,
              }}
            />
          </div>
          <div className="">
            {/* <h1 className="text-sm font-medium mt-6" style={{ lineHeight: '0rem' }}>
              Navpreet Singh
            </h1> */}

        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default MainContent;

{
  /* // <div className="flex items-center justify-between w-full">
    //   <div>
    //     <Input placeholder="Search.." />
    //   </div>
    //   <div className="flex items-center">
    //     <img 
    //       src={notificationIcon}
    //       style={{
    //         width: 30,
    //         height: 30,
    //       }}
    //     />

    //     <div className="flex w-[30%]" style={{}}>
    //       <img
    //         src={notificationIcon}
    //         style={{
    //           width: 30,
    //           height: 30,
    //           //   backgroundColor: 'red',
    //         }}
    //       />
    //       <div style={{}}>
    //         <div
    //           style={{
    //             padding: 0,
    //           }}
    //         >
    //           Aman Sangha
    //         </div>
    //         <div>Admin</div>
    //       </div>
    //     </div>
    //   </div>
    // </div>*/
}
