import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React from 'react';
import { connect } from 'umi';

const VerifyPhoneNumber = ({ visible, setVisible, currentUser }) => {
  const [form] = Form.useForm();
  const onFinish = () => {};
  const handleSendOtp = () => {};
  return (
    <Modal
      //   className={classNames(styles.modalCloseStyles)}
      centered
      title="Verify Phone Number"
      open={visible}
      closable={false}
      onCancel={() => {
        setVisible(false);
      }}
      footer={
        <div className="flex justify-end">
          <div className="mx-6">
            <Button
              type=""
              onClick={() => {
                setVisible(false);
              }}
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                form.submit();
              }}
              type="primary"
              //   loading={updatePasswordLoading}
            >
              Verify
            </Button>
          </div>
        </div>
      }
    >
      <div className="mx-6 mt-4">
        <Form layout="vertical" hideRequiredMark form={form} onFinish={onFinish}>
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div>
                <Form.Item
                  name="currentPassword"
                  label={<span className="formLabel">Enter Email</span>}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your current Email!',
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
                <div
                  className="send text-light flex justify-end text-blue-500 cursor-pointer "
                  onClick={() => {
                    handleSendOtp();
                  }}
                >
                  Send OTP
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default connect(() => {})(VerifyPhoneNumber);
