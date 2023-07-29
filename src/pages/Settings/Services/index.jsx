import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { SaveOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Spin, Table, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';

const Services = ({ dispatch }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [loading, setLoading] = useState(false);

  const getAllServices = () => {
    dispatch({
      type: 'service/getAllServices',
    }).then((res) => {
      if (res?.success) {
        setAllServices(res?.response);
      }
    });
  };

  const columns = [
    {
      title: <span className="py-3">Sr no.</span>,
      key: 'srNo',
      render: (_, record, idx) => <div>{idx + 1}</div>,
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record, idx) => <div className="">{record?.name}</div>,
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (__, record) => <div className="">{record?.quantity}</div>,
    },
    {
      title: 'Rate',
      key: 'rate',
      render: (__, record) => <div className="">{record?.rate}</div>,
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (record) => <div>{record?.amount}</div>,
    },
    {
      title: 'Description',
      key: 'description',
      render: (record) => <div>{record?.description}</div>,
    },
    {
      title: 'Action',
      align: 'center',
      render: (__, records) => (
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setLoading(true);
            handleEditService(records?._id);
            setServiceId(records?._id);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const onFinish = (values) => {
    setLoading(true);

    const serviceData = {
      ...values,
    };

    dispatch({
      type: 'service/updateService',
      payload: {
        body: serviceData,
        pathParams: {
          id: serviceId,
        },
      },
    })
      .then((res) => {
        if (res?.success) {
          message.success('Service edited successfully');
          setIsModalOpen(false);
          form.resetFields();
          setServiceId('');
          setLoading(false);
          getAllServices();
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleEditService = (id) => {
    dispatch({
      type: 'service/getSingleService',
      payload: {
        pathParams: { id: id },
      },
    })
      .then((res) => {
        if (res?.success) {
          form.setFieldsValue({
            ...res?.response,
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <>
      <Page
        title="Services"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Services',
                path: '#',
              },
            ]}
          />
        }
      >
        <>
          <div className="bg-white" style={{ height: '70vh', padding: '20px' }}>
            <div className="mt-5">
              <Table
                className="serviceTable border border-t-0"
                rowClassName="cursor-pointer"
                pagination={false}
                dataSource={allServices}
                columns={columns}
              />
            </div>
          </div>
        </>
      </Page>
      <Modal
        title={<span>Edit Service</span>}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={false}
        loading={loading}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Spin size="large" spinning={loading}>
            <div>
              <Row gutter={16}>
                <Col lg={12} sm={20} xs={24}>
                  <Form.Item
                    name="name"
                    label={<div className="text-secondaryColor font-bold">Name</div>}
                    rules={[{ required: true }]}
                    className="mb-2"
                  >
                    <Input placeholder="Enter Service Name" className="w-full font-semibold" />
                  </Form.Item>
                </Col>
                <Col lg={12} sm={20} xs={24}>
                  <Form.Item
                    name="quantity"
                    label={<div className="text-secondaryColor font-bold">Quantity</div>}
                    className="mb-2"
                  >
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      className="w-full font-semibold"
                      defaultValue={1}
                    />
                  </Form.Item>
                </Col>
                <Col lg={12} sm={20} xs={24}>
                  <Form.Item
                    name="rate"
                    label={<div className="text-secondaryColor font-bold">Rate</div>}
                    className="mb-2"
                  >
                    <Input placeholder="Enter rate" className="w-full font-semibold" />
                  </Form.Item>
                </Col>
                <Col lg={12} sm={20} xs={24}>
                  <Form.Item
                    name="amount"
                    label={<div className="text-secondaryColor font-bold">Amount ($)</div>}
                    rules={[{ required: true }]}
                    className="mb-2"
                  >
                    <InputNumber
                      step={0.1}
                      parser={(value) => value.replace(',', '.')}
                      style={{ width: '100%' }}
                      placeholder="Enter amount"
                    />
                  </Form.Item>
                </Col>
                <Col lg={24} sm={24} xs={24}>
                  <Form.Item
                    name="description"
                    label={<div className="text-secondaryColor font-bold">Description</div>}
                    className="mb-1"
                  >
                    <TextArea rows={4} placeholder="Enter description" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end mt-2 items-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <SaveOutlined />
                  <span>Edit Service</span>
                </Button>
              </div>
            </div>
          </Spin>
        </Form>
      </Modal>
    </>
  );
};

export default connect(({ service }) => ({
  allServicesList: service?.getAllServices,
  singleServiceDetails: service?.singleServiceDetails,
}))(Services);
