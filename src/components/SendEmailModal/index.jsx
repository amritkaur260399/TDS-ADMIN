/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Form, Modal, Row, message } from 'antd';
import { connect } from 'umi';
import Email from '../Email';
import Breadcrumbs from '../BreadCrumbs';
import Page from '../Page';

const SendEmailModal = (props) => {
  const { title, visible, form, setVisible, loading, partyId } = props;
  const [body, setBody] = useState('');
  const [fieldValue, storeFieldValue] = useState('');

  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    // props.dispatch({
    //   type: 'globalcustomer/sendEmail',
    //   payload: {
    //     ...values,
    //   },
    //   cb: (res) => {
    //     if (res) {
    //       message.success('Email sent successfully!');
    //       setVisible(false);
    //     }
    //   },
    // });
  };
  return (
    <div className="container mx-auto">
      <Page
        title="Staff"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'All Staff',
                path: '/staff/list',
              },
            ]}
          />
        }
      >
        <div className="bg-white shadow rounded">
          <Modal
            width="800px"
            title={title}
            open={visible}
            maskClosable={false}
            destroyOnClose
            footer={
              <>
                <Button loading={loading} type="primary" onClick={handleSubmit}>
                  Send
                </Button>
              </>
            }
            onCancel={() => {
              setVisible(false);
            }}
          >
            <Row gutter={24}>
              <Email {...{ fieldValue, storeFieldValue, form, body, setBody }} data={[]} />
            </Row>
          </Modal>
        </div>
      </Page>
    </div>
  );
};

export default connect(({ loading }) => ({
  loading: loading.effects['globalcustomer/sendEmail'],
}))(SendEmailModal);
