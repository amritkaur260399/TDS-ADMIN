import React from 'react';
import { connect } from 'dva';
import { Row, Card } from 'antd';

const FixedFooter = ({ children, collapsed, classes }) => (
  <>
    <div style={{ paddingTop: 80 }} />
    <div
      className="fixedFooter"
      style={{
        width: collapsed ? 'calc(100% - 0px)' : 'calc(100% - 160px)',
      }}
    >
      <Row type="flex" justify="end">
        <Card className={`w-full ${classes}`}>{children}</Card>
      </Row>
    </div>
  </>
);

export default connect(({ global }) => ({ collapsed: global.collapsed }))(FixedFooter);
