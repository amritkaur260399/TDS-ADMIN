import { requiredStar } from '@/utils/AppIons';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import React from 'react';
import { connect } from 'umi';

const EditPrice = ({
  form,
  visible,
  editId,
  setEditId,
  handleCancelPrice,
  dispatch,
  getAllPrices,
}) => {
  // const [form] = Form.useForm();
  const { Option } = Select;
  const vehicleTypes = [
    { name: 'Executive Sedan (SEDAN)', value: 'SEDAN' },
    { name: 'First Class Sedan (SED)', value: 'SED' },
    { name: 'Luxury SUV (SUV)', value: 'SUV' },
    { name: 'Luxury Van (VAN)', value: 'VAN' },
    { name: 'People Mover (BUS)', value: 'BUS' },
    { name: 'Super Stretch (STR)', value: 'STR' },
    { name: 'Bus (ROSA BUS)', value: 'ROSA_BUS' },
  ];

  const onFinish = (values) => {
    if (visible?.type === 'add') {
      dispatch({
        type: 'prices/addVehiclePrices',
        payload: {
          body: { ...values, title: vehicleTypes?.find((e) => e.value === values.category).name },
        },
      })
        .then((res) => {
          if (res?.success) {
            message.success('Category added successfully');
            form.resetFields();
            getAllPrices();
            handleCancelPrice();
          } else {
            message.error('Category may already exists!');
          }
        })
        .catch((err) => {
          message.error(err);
        });
    } else if (visible?.type === 'edit') {
      dispatch({
        type: 'prices/updateVehiclePrices',
        payload: {
          body: values,
          query: {
            priceId: editId,
          },
        },
      })
        .then((res) => {
          if (res?.success) {
            setEditId('');
            message.success('Category updated successfully');
            form.resetFields();
            getAllPrices();
            handleCancelPrice();
          } else {
            message.error('Category may already exists!');
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
      //   closable={false}
      // maskClosable={false}
      // onOk={handleOk}
      onCancel={handleCancelPrice}
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
              name="category"
              label={<span className="formLabel p-0 mb-0">Select vehicle Type</span>}
              rules={[
                {
                  required: true,
                  message: 'Please select vehicle type!',
                },
              ]}
            >
              <Select placeholder="Select vehicle category" size="large">
                {vehicleTypes?.map((element) => (
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
                  <span className="formLabel mr-1">Fixed Km (Initial)</span>
                  <span>{requiredStar()}</span>
                </div>
              }
              name="fixedKm"
              rules={[
                {
                  required: true,
                  message: 'Please input fixed Km!',
                },
              ]}
            >
              <Input placeholder="Enter fixed Km" size="large" autocomplete="off" type="number" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label={
                <div>
                  <span className="formLabel mr-1">Fixed Price (Initial Km)</span>
                  <span>{requiredStar()}</span>
                </div>
              }
              name="fixedPrice"
              rules={[
                {
                  required: true,
                  message: 'Please input fixed price!',
                },
              ]}
            >
              <Input
                placeholder="Enter fixed price"
                size="large"
                autocomplete="off"
                type="number"
                prefix="$"
                suffix="AUD"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label={
                <div>
                  <span className="formLabel mr-1">Price(per KM)</span>
                  <span>{requiredStar()}</span>
                </div>
              }
              name="pricePerKm"
              rules={[
                {
                  required: true,
                  message: 'Please input price!',
                },
              ]}
            >
              <Input
                prefix="$"
                suffix="AUD"
                size="large"
                autocomplete="off"
                type="number"
                placeholder="Input price perKm"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label={
                <div>
                  <span className="formLabel mr-1">Price(per Hour)</span>
                  <span>{requiredStar()}</span>
                </div>
              }
              rules={[
                {
                  required: true,
                  message: 'Please input price!',
                },
              ]}
              name="pricePerHour"
            >
              <Input
                prefix="$"
                suffix="AUD"
                size="large"
                autocomplete="off"
                type="number"
                placeholder="Input price perHour"
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

export default connect(({}) => ({}))(EditPrice);
