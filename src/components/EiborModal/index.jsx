import React, { useEffect } from 'react';
import { Button, Modal, Form, Row, Col, InputNumber, message } from 'antd';
import { connect } from 'umi';

const EiborModal = ({
  eiborVisible,
  setEiborVisible,
  dispatch,
  editEibor,
  latestEiborRate,
  recordId,
  singleEiborRate,
  editLoading,
  updateLoading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (singleEiborRate) {
      form?.setFieldsValue({
        oneWeek: singleEiborRate?.oneWeek,
        oneMonth: singleEiborRate?.oneMonth,
        twoMonth: singleEiborRate?.twoMonth,
        threeMonth: singleEiborRate?.threeMonth,
        sixMonth: singleEiborRate?.sixMonth,
        oneYear: singleEiborRate?.oneYear,
        overnight: singleEiborRate?.overnight,
      });
    }
  }, [singleEiborRate, form]);

  useEffect(() => {
    if (latestEiborRate && editEibor) {
      form?.setFieldsValue({
        oneWeek: latestEiborRate?.oneWeek,
        oneMonth: latestEiborRate?.oneMonth,
        twoMonth: latestEiborRate?.twoMonth,
        threeMonth: latestEiborRate?.threeMonth,
        sixMonth: latestEiborRate?.sixMonth,
        oneYear: latestEiborRate?.oneYear,
        overnight: latestEiborRate?.overnight,
      });
    }
  }, [latestEiborRate, editEibor, form]);
  return (
    <div>
      <Modal
        title="Edit today eibor rate"
        visible={eiborVisible}
        onCancel={() => setEiborVisible(false)}
        footer={
          <Button type="primary" onClick={() => form?.submit()}>
            Update
          </Button>
        }
      >
        <Form
          form={form}
          hideRequiredMark
          onFinish={(values) => {
            const data = {};
            if (editEibor) {
              data.pathParams = {
                eiborId: recordId ? recordId.id : latestEiborRate?.id,
              };
            }
            dispatch({
              type: editEibor ? 'eibor/editedEiborRates' : 'eibor/updateEiborRates',
              payload: {
                ...data,
                body: {
                  ...values,
                },
              },
            })
              .then((res) => {
                if (res) {
                  message.success('EIBOR rates for today successfully added');
                  setEiborVisible(false);
                  dispatch({
                    type: 'user/fetchCurrent',
                  });
                }
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }}
          layout="vertical"
        >
          <div className="font-semibold text-gray-800 mb-4 text-lg">
            Enter EIBOR rates for today
          </div>
          <Row gutter="16">
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="overnight"
                initialValue={0}
                label={<span className="font-semibold text-gray-700 text-sm">Over night</span>}
                rules={[
                  {
                    required: true,
                    message: "Over night can't be blank!",
                  },
                  () => ({
                    validator(_, value) {
                      if (value === 0) {
                        return Promise.reject(new Error('It should be greater than 0'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  placeholder="5%"
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="oneWeek"
                initialValue={0}
                label={<span className="font-semibold text-gray-700 text-sm">1 Week</span>}
                rules={[
                  {
                    required: true,
                    message: "1 Week can't be blank!",
                  },
                  () => ({
                    validator(_, value) {
                      if (value === 0) {
                        return Promise.reject(new Error('It should be greater than 0'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  placeholder="5%"
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="oneMonth"
                initialValue={0}
                label={<span className="font-semibold text-gray-700 text-sm">1 Month</span>}
                rules={[
                  {
                    required: true,
                    message: "1 Month can't be blank!",
                  },
                  () => ({
                    validator(_, value) {
                      if (value === 0) {
                        return Promise.reject(new Error('It should be greater than 0'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  placeholder="5%"
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="twoMonth"
                initialValue={0}
                label={<span className="font-semibold text-gray-700 text-sm">2 Month</span>}
                rules={[
                  {
                    required: true,
                    message: " 2 Month can't be blank!",
                  },
                  () => ({
                    validator(_, value) {
                      if (value === 0) {
                        return Promise.reject(new Error('It should be greater than 0'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  placeholder="5%"
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="threeMonth"
                initialValue={0}
                label={<span className="font-semibold text-gray-700 text-sm">3 Months</span>}
                rules={[
                  {
                    required: true,
                    message: "3 Months can't be blank!",
                  },
                  () => ({
                    validator(_, value) {
                      if (value === 0) {
                        return Promise.reject(new Error('It should be greater than 0'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  placeholder="5%"
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="sixMonth"
                initialValue={0}
                label={<span className="font-semibold text-gray-700 text-sm">6 Months</span>}
                rules={[
                  {
                    required: true,
                    message: " 6 Months can't be blank!",
                  },
                  () => ({
                    validator(_, value) {
                      if (value === 0) {
                        return Promise.reject(new Error('It should be greater than 0'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  placeholder="5%"
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="oneYear"
                initialValue={0}
                label={<span className="font-semibold text-gray-700 text-sm">1 Year</span>}
                rules={[
                  {
                    required: true,
                    message: " 1 Year can't be blank!",
                  },
                  () => ({
                    validator(_, value) {
                      if (value === 0) {
                        return Promise.reject(new Error('It should be greater than 0'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  placeholder="5%"
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default connect(({ eibor, loading }) => ({
  latestEiborRate: eibor?.latestEiborRate,
  singleEiborRate: eibor?.singleEiborRate,
  editLoading: loading?.effects['eibor/editedEiborRates'],
  updateLoading: loading?.effects['eibor/updateEiborRates'],
}))(EiborModal);
