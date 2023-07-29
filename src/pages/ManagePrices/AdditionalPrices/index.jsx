import { requiredStar } from '@/utils/AppIons';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import React from 'react';
import { connect } from 'umi';
const EditAdditionalPrice = ({
  form,
  visible,
  handleCancelAddPrice,
  dispatch,
  getAdditionalPrices,
  addPriceEditId,
  setAddPriceEditId,
}) => {
  const chargesType = [
    {
      title: 'GST',
      value: 'GST',
    },
    {
      title: 'Admin Fee',
      value: 'ADMIN-FEE',
    },
    {
      title: 'Extra Fee',
      value: 'EXTRA-FEE',
    },
    {
      title: 'Event Fee',
      value: 'EVENT-FEE',
    },
    {
      title: 'Airport Toll',
      value: 'AIRPORT-TOLL',
    },
  ];

  const mode = [
    {
      name: 'Custom',
      value: 'Custom',
    },
    {
      name: 'Always',
      value: 'Always',
    },
  ];
  const { Option } = Select;

  const onFinish = (values) => {
    if (visible?.type === 'add') {
      dispatch({
        type: 'additionalPrices/addAdditionalPrices',
        payload: {
          body: values,
        },
      })
        .then((res) => {
          console.log('res', res);
          if (res?.success) {
            message.success('Price added successfully');
            form.resetFields();
            getAdditionalPrices();
            handleCancelAddPrice();
          } else {
            message.error('An Error Occured!');
          }
        })
        .catch((err) => {
          message.error(err);
        });
    } else if (visible?.type === 'edit') {
      dispatch({
        type: 'additionalPrices/updateAdditionalPrices',
        payload: {
          body: values,
          query: {
            priceId: addPriceEditId,
          },
        },
      })
        .then((res) => {
          if (res?.success) {
            message.success('Price updated successfully');
            setAddPriceEditId('');
            form.resetFields();
            getAdditionalPrices();
            handleCancelAddPrice();
          } else if (res?.data?.error) {
            message.error('An Error Occured!');
          }
        })
        .catch((err) => {
          message.error(err);
        });
    }
  };
  return (
    <Modal
      title={
        <span style={{ color: '#10181e' }} className="font-medium">
          {visible?.type === 'edit' ? 'Edit Category' : 'Add Category'}
        </span>
      }
      open={visible?.visible}
      onCancel={handleCancelAddPrice}
      okText="Submit"
      okButtonProps={{ type: 'primary', size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
      okType=""
      footer={null}
    >
      <Form
        requiredMark={false}
        layout="vertical"
        form={form}
        onFinish={onFinish}
        name="Edit Price"
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="rateName"
              label={<span className="formLabel p-0 mb-0">Select category Type</span>}
            >
              <Select placeholder="Select category" size="large">
                {chargesType?.map((element) => (
                  <Select.Option value={element?.value} key={element?.value}>
                    {element?.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item name="mode" label={<span className="formLabel p-0 mb-0">Select Mode</span>}>
              <Select placeholder="Select mode" size="large">
                {mode?.map((element) => (
                  <Select.Option value={element?.value} key={element?.value}>
                    {element?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label={
                <div>
                  <span className="formLabel mr-1">Amount</span>
                  <span>{requiredStar()}</span>
                </div>
              }
              name="amount"
              rules={[
                {
                  required: true,
                  message: 'Please input amount!',
                },
              ]}
            >
              <Input
                placeholder="Enter amount"
                size="large"
                autocomplete="off"
                type="number"
                suffix="%"
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default connect(({}) => ({}))(EditAdditionalPrice);
