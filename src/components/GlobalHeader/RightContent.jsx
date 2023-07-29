import { Tag } from 'antd';
import React from 'react';
import { connect } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div
      className="flex items-center"
      style={{
        width: '10%',
      }}
    >
      <img
        src={notificationIcon}
        style={{
          width: 30,
          height: 30,
        }}
      />

      <div className="flex">
        <img src={notificationIcon} />
        <div>
          <p>Aman Sangha</p>
          <p>Admin</p>
        </div>
      </div>
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
