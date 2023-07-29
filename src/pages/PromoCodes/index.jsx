import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Table,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { connect } from 'umi';
import moment from 'moment';
import { requiredStar } from '@/utils/AppIons';

const PromoCodes = ({ loading, dispatch, promoCodesList }) => {
  const [searchText, setSearchText] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tab, setTab] = useState('ALL');
  const [promoCodeModal, setPromoCodeModal] = useState({ visible: false, id: '' });

  const [form] = Form.useForm();
  const [durationtype, setDurationType] = useState('');
  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }
  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const getAllPromoCodes = () => {
    dispatch({
      type: 'payments/getAllPromoCodes',
      payload: {},
    });
  };
  const onFinish = (values) => {
    dispatch({
      type: 'payments/createPromoCode',
      payload: {
        body: { ...values, redeem_by: moment(values?.redeem_by).unix() },
      },
    }).then((res) => {
      message.success('Promo code added!');
      setPromoCodeModal({ visible: false, id: '' });
    });
  };
  const duration = [
    {
      name: 'Forever',
      value: 'forever',
    },
    {
      name: 'Once',
      value: 'once',
    },
    {
      name: 'Repeating',
      value: 'repeating',
    },
  ];
  useEffect(() => {
    getAllPromoCodes();
  }, [searchText]);

  const onDeleteCoupon = (id) => {
    dispatch({
      type: 'payments/deletePromoCode',
      payload: {
        query: {
          id,
        },
      },
    }).then((res) => {
      if (res?.status === 200) {
        message.success('Coupon deleted!');
      } else {
        message.error('An error occured!');
      }
    });
  };

  const debounceSearch = debounce(action, 500);
  const columns = [
    {
      title: 'Sr no.',
      key: 'srNo',
      dataIndex: 'srNo',
      render: (_, record, idx) => <div>{idx + 1}</div>,
    },
    {
      title: 'Promo Code',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'Coupon',
      key: 'coupon',
      dataIndex: 'coupon',
      render: (__, record) => <div>{record?.coupon?.name || 'N/A'}</div>,
    },
    {
      title: 'Promo Code Status',
      key: 'active',
      dataIndex: 'active',
      render: (__, record) => <div>{record?.active === true ? 'Active' : 'Inactive'}</div>,
    },
    {
      title: 'Expiry',
      key: 'expiry',
      dataIndex: 'expires_at',
      render: (record) => <div>{moment.unix(record).format('DD-MM-YYYY, h:mm:ss A')}</div>,
    },

    {
      title: 'Action',
      align: 'center',
      width: 160,

      render: (__, records) => (
        <>
          <div className="flex justify-center items-center">
            <div className="">
              <Popconfirm
                title="Are you sure you want to delete this Ride?"
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={() => {
                  onDeleteCoupon(records?.coupon?.id);
                }}
              >
                <a type="primary">
                  <span className="text-red-700">
                    <DeleteOutlined />
                  </span>
                </a>
              </Popconfirm>
            </div>
            <div className="ml-3">
              <Popconfirm
                title="Are you sure you want to change Ride status?"
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={() => {}}
              >
                {tab !== 'ALL' && (
                  <div>
                    {/* {record?.isActive ? ( */}(
                    <svg
                      className="fill-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      height={18}
                      width={18}
                    >
                      <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L381.9 274c48.5-23.2 82.1-72.7 82.1-130C464 64.5 399.5 0 320 0C250.4 0 192.4 49.3 178.9 114.9L38.8 5.1zM284.3 320h-59C136.2 320 64 392.2 64 481.3c0 17 13.8 30.7 30.7 30.7H528L284.3 320z" />
                    </svg>
                    ) : (
                    <svg
                      className="fill-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      width={18}
                      height={18}
                    >
                      <path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                    ){/* )} */}
                  </div>
                )}
              </Popconfirm>
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      {/* <Page
        title="Promo Codes"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'PromoCodes',
                path: '#',
              },
            ]}
          />
        }
        // primaryAction={
        //   <Button
        //     type="primary"
        //     size="large"
        //     onClick={() => setPromoCodeModal({ visible: true, id: '' })}
        //   >
        //     Add Promo Code
        //   </Button>
        // }
      >
        <div className="bg-white ">
          <div>
            <div className="px-5 pt-5 flex gap-5 ">
              <Input
                size="large"
                prefix={<SearchOutlined />}
                placeholder="Enter keyword here to search..."
                onChange={(e) => debounceSearch(e.target.value)}
              />
            </div>
            <Divider />
            <Table
              className="no-shadow zcp-fixed-w-table"
              rowClassName="cursor-pointer"
              pagination={false}
              loading={Boolean(loading)}
              dataSource={promoCodesList}
              scroll={{ x: 1000 }}
              columns={columns}
              locale={{
                emptyText: (
                  <div className="text-center flex justify-center items-center py-10">
                    <div>
                      <p className="text-lg">No Promo codes found!</p>
                      <img
                        className=""
                        src={SearchNotFound}
                        alt="No rides found!"
                        style={{ height: '100px' }}
                      />
                    </div>
                  </div>
                ),
              }}
              footer={() => (
                <Row className="mt-2" type="flex" justify="end">
                  <Pagination
                    key={`page-${currentPage}`}
                    showSizeChanger
                    pageSizeOptions={['10', '25', '50', '100']}
                    onShowSizeChange={(e, p) => {
                      setViewSize(p);
                      setCurrentPage(1);
                      setStartIndex(0);
                    }}
                    defaultCurrent={1}
                    current={currentPage}
                    pageSize={viewSize}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    onChange={handleChangePagination}
                  />
                </Row>
              )}
            />
          </div>
        </div>
        <Modal
          title={
            <span style={{ color: '#10181e' }} className="font-medium">
              Add a new Promo Code
            </span>
          }
          closable={false}
          footer={null}
          width={800}
          open={promoCodeModal.visible}
        >
          <Form
            requiredMark={false}
            layout="vertical"
            form={form}
            onFinish={onFinish}
            name="addPromoCode"
          >
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  label={
                    <div>
                      <span className="formLabel mr-1">Promo code name</span>
                      <span>{requiredStar()}</span>
                    </div>
                  }
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: 'Please fill!',
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      form.setFieldsValue({
                        code: e.target.value.toUpperCase(),
                      });
                    }}
                    size="large"
                    placeholder="Promo code"
                    autoCapitalize={true}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  label={
                    <div>
                      <span className="formLabel mr-1">Redeem by</span>
                      <span>{requiredStar()}</span>
                    </div>
                  }
                  name="redeem_by"
                  rules={[
                    {
                      required: true,
                      message: 'Please fill!',
                    },
                  ]}
                >
                  <DatePicker size="large" className="w-full" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  label={
                    <div>
                      <span className="formLabel mr-1">Max Redemptions</span>
                      <span>{requiredStar()}</span>
                    </div>
                  }
                  name="max_redemptions"
                  rules={[
                    {
                      required: true,
                      message: 'Please fill!',
                    },
                  ]}
                >
                  <Input size="large" placeholder="Max Redemptions" type="number" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  label={
                    <div>
                      <span className="formLabel mr-1">Percent off</span>
                      <span>{requiredStar()}</span>
                    </div>
                  }
                  name="percent_off"
                  rules={[
                    {
                      required: true,
                      message: 'Please fill!',
                    },
                  ]}
                >
                  <Input size="large" placeholder="Percent off" type="number" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  label={
                    <div>
                      <span className="formLabel mr-1">Duration</span>
                      <span>{requiredStar()}</span>
                    </div>
                  }
                  name="duration"
                  rules={[
                    {
                      required: true,
                      message: 'Please fill!',
                    },
                  ]}
                >
                  <Select
                    placeholder="Select duration"
                    size="large"
                    onChange={(e) => {
                      setDurationType(e);
                    }}
                  >
                    {duration?.map((element) => (
                      <Select.Option value={element?.value} key={element?.value}>
                        {element?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              {durationtype === 'repeating' && (
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    label={
                      <div>
                        <span className="formLabel mr-1">Duration (In months)</span>
                        <span>{requiredStar()}</span>
                      </div>
                    }
                    name="duration_in_months"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill!',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Select duration in months" type="number" />
                  </Form.Item>
                </Col>
              )}
            </Row>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                size="large"
                onClick={() => {
                  setPromoCodeModal({ visible: false, id: '' });
                }}
              >
                Back
              </Button>
              <Button type="primary" size="large" htmlType="submit" loading={loading}>
                Add
              </Button>
            </div>
          </Form>
        </Modal>
      </Page> */}
    </>
  );
};

export default connect(({ loading, payments }) => ({
  loading: loading?.effects['payments/createPromoCode'],
  promoCodesList: payments?.promoCodesList,
}))(PromoCodes);
