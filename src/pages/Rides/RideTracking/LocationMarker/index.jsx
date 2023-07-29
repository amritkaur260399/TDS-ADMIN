import React from 'react';
import { Popover } from 'antd';
import styles from './index.less';

const LocationMarker = ({ info }) => {
  const getAlarmColor = () => {
    if (info?.isExpired) {
      return '#6b7280';
    }
    if (info?.isAlarm) {
      return '#ff3737';
    }
    return 'rgb(0 96 165)';
  };
  const previewStyle = {
    color: getAlarmColor(),
  };
  return (
    <div style={{ position: 'absolute', top: 0 }}>
      <Popover
        overlayClassName={styles.popoverStyle}
        placement="top"
        title={false}
        content={
          <div className="text-center">
            <div className="font-semibold ">{info?.deviceName}</div>
            <span className={`${info?.battery ? '' : 'hidden'}`}>
              <span className={`text-blue-600 text-lg font-bold `}>{`${info?.battery}%`}</span>{' '}
              Battery
            </span>
          </div>
        }
        trigger="hover"
      >
        <div style={previewStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="36"
            fill="currentColor"
            className="bi bi-geo-alt-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
        </div>
      </Popover>
    </div>
  );
};

export default LocationMarker;
