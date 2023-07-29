// import ForgotPassword from '@/pages/user/ForgotPassword';
import { getIntials } from '@/utils/utils';
import { DownOutlined, LogoutOutlined, RedoOutlined } from '@ant-design/icons';
import { Avatar, Menu, message, Spin } from 'antd';
import React, { useState } from 'react';
import { history, connect, Link } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import styles from './index.less';
import ResetPasswordModel from './ResetPasswordModel';

const AvatarDropdown = ({ dispatch, currentUser }) => {
  const [visible, setVisible] = useState(false);
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]}>
      <Menu.Item key="user-profile">
        <Link to="/user-profile">
          <div className="flex justify-center">
            <Avatar size={80} className="text-center uppercase" style={{ background: '#e78200' }}>
              {currentUser?.data?.firstName && getIntials(currentUser?.data?.firstName)}
            </Avatar>
          </div>
        </Link>
        <div className="mt-2 text-center">
          <div className="font-medium text-blue-900 text-lg capitalize">
            {currentUser?.data?.firstName}
          </div>
          <div className="text-xs text-gray-700">{currentUser?.data?.email}</div>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={() => setVisible(!visible)}>
        <RedoOutlined />
        Forgot Password
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        // key="logout"
        onClick={() => {
          dispatch({
            type: 'login/logout',
          }).then(() => {
            message.success('Logged out successfully!');
            window.location.reload();
          });
        }}
      >
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );
  localStorage.setItem('currentUser_details', JSON.stringify(currentUser?.data));
  return (
    <>
      {currentUser && currentUser?.data ? (
        <HeaderDropdown trigger="click" overlay={menuHeaderDropdown}>
          <div className="flex items-center cursor-pointer uppercase">
            <Avatar
              src={currentUser?.personalDetails?.avatar_url}
              style={{ background: '#e78200' }}
            >
              {/* {currentUser?.data?.name} */}
              {currentUser && getIntials(currentUser?.data?.firstName)}
            </Avatar>
            <div className="ml-2">
              <div className="font-medium text-blue-900 text-base capitalize">
                {currentUser?.data?.firstName + currentUser?.data?.lastName} <DownOutlined />
              </div>
            </div>
          </div>
        </HeaderDropdown>
      ) : (
        <span className={`${styles.action} ${styles.account}`}>
          <Spin
            size="small"
            style={{
              marginLeft: 8,
              marginRight: 8,
            }}
          />
        </span>
      )}
      <ForgotPassword visible={visible} setVisible={setVisible} />
    </>
  );
};

export default connect(({ user }) => ({
  currentUser: user?.currentUser,
}))(AvatarDropdown);
