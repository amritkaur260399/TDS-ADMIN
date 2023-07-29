import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import {
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Tabs,
  Modal,
  Pagination,
  Row,
  Spin,
  Table,
  Popconfirm,
  message,
} from 'antd';
import Search from 'antd/lib/transfer/search';
import React, { useEffect, useState } from 'react';
import { Link, useParams, history, connect } from 'umi';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import CustomerModal from './CustomerModal';
import VerifyOtp from '../../components/VerifyOtp';

const Customers = ({ dispatch, passengerList }) => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  //   const { tabName } = useParams();
  const [tab, setTab] = useState('ALL');
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [addNewModal, setAddNewModal] = useState({ visible: false, type: 'add' });
  const [editId, setEditId] = useState('');
  const [verifyOtp, setVerifyOtp] = useState(false);

  const { TabPane } = Tabs;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    dispatch({
      type: 'feedbacks/getPassengers',
    });
  };

  //   const onEditAirport = (record) => {
  //     setEditId(record?._id);
  //     setAddNewModal({ visible: true, type: 'edit' });
  //     form.setFieldsValue({
  //       ...record,
  //     });
  //   };

  const onDeleteCustomer = (id) => {
    dispatch({
      type: 'feedbacks/deletePassenger',
      payload: {
        pathParams: { id },
      },
    }).then((res) => {
      if (res?.success) {
        message?.success('User deleted successfully!');
        getUsers();
      }
    });
  };

  const tabs = [
    {
      title: 'Sr No.',
      key: 'srNo',
    },
    {
      title: 'Customer Name',
      key: 'customerName',
    },
    {
      title: 'City',
      key: 'city',
    },
  ];

  const columns = [
    {
      title: 'Sr no.',
      dataIndex: 'srNo',
      key: 'srNo',
      render: (_, __, idx) => <div>{idx + 1}</div>,
    },

    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'customerName',
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    // {
    //   title: 'No. of Terminals',
    //   dataIndex: 'numberOfTerminals',
    //   key: 'numberOfTerminals',
    // },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <>
          <div className="flex ">
            {/* <div
              className="mr-4"
              onClick={() => {
                // onEditAirport(record);
                // onEditPrice(record);
              }}
            >
              <a type="primary">
                <span className="text-blue-700">
                  <EditOutlined />
                </span>
              </a>
            </div> */}

            <div className="">
              <Popconfirm
                title="Are you sure you want to delete this customer?"
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={() => {
                  onDeleteCustomer(record?._id);
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
                title="Are you sure you want to delete customer?"
                okText="Yes"
                okType="primary"
                cancelText="No"
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

  const handleCancel = () => {
    setAddNewModal({ visible: false, type: 'add' });
    form.resetFields();
    // setEditId('');
  };

  return (
    <>
      <Page
        title="Customers"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Customers',
                path: '#',
              },
            ]}
          />
        }
        primaryAction={
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setAddNewModal({
                visible: true,
                type: 'add',
              });
            }}
          >
            Add Customer
          </Button>
        }
      >
        {' '}
        <div className="bg-white ">
          {/* <Tabs
          // activeKey={tabName}
          // onTabClick={(key) => {
          //   history.push(`/managePrices/${key}`);
          //   setStartIndex(0);
          //   setCurrentPage(1);
          //   setKeyword('');
          // }}
          >
            {tabs?.map((tab) => (
              <TabPane tab={<span className="px-4">{tab?.title}</span>} key={tab?.key}>
                {tab?.key === tabName && (
                  <div key={tab?.key}>
                    <div className=" pb-4 mr-16 ml-2 ">
                      <Search
                        size="large"
                        prefix={<SearchOutlined />}
                        placeholder="Enter keyword here to search..."
                        enterButton
                        onChange={(e) => {}}
                      />
                    </div>
                    <Divider /> */}
          <Table
            className="no-shadow zcp-fixed-w-table"
            rowClassName="cursor-pointer"
            pagination={false}
            dataSource={passengerList?.data}
            scroll={{ x: 1000 }}
            columns={columns}
            locale={{
              emptyText: (
                <div className="text-center flex justify-center items-center py-10">
                  <div>
                    <p className="text-lg">No Customers found!</p>
                    <img
                      className=""
                      src={SearchNotFound}
                      alt="No customers found!"
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
                />
              </Row>
            )}
          />
          {/* </div>
                )}
              </TabPane>
            ))} */}
          {/* </Tabs> */}
        </div>
        <CustomerModal
          visible={addNewModal}
          setVisible={setAddNewModal}
          handleCancel={handleCancel}
          form={form}
          editId={editId}
          verifyOtp={verifyOtp}
          setVerifyOtp={setVerifyOtp}
          getUsers={getUsers}
        />
      </Page>
    </>
  );
};

export default connect(({ feedbacks }) => ({
  passengerList: feedbacks?.passengerList,
}))(Customers);
