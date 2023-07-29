import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Pagination, Popconfirm, Row, Table, Tabs, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { connect, useParams } from 'umi';
import moment from 'moment';
import { useAtom } from 'jotai';
import { driverImageGlobal, modalsJotai } from '@/utils/globalStates/modals';
import AddDrivers from '@/components/AddDrivers';
import TabPane from 'antd/lib/tabs/TabPane';

const Driver = ({ loading, dispatch, allDriversList }) => {
  const [searchText, setSearchText] = useState('');
  const [, setDriverGlobalImage] = useAtom(driverImageGlobal);
  const [isopenModal, setIsopenModal] = useAtom(modalsJotai);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tab, setTab] = useState('ALL');
  const { tabName } = useParams();
  const [buttonStatus, setButtonStatus] = useState('');
  const [data, setData] = useState([]);
  const [clientId, setClientId] = useState();
  const [form] = Form.useForm();
  const [status, setStatus] = useState();
  const [serviceId, setServiceId] = useState();
  const [driverId, setDriverId] = useState();
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [driverLoading, setDriverLoading] = useState(false);
  const [loadingDriversList, setLoadingDriversList] = useState(false);

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  const getAllDrivers = () => {
    setLoadingDriversList(true);
    dispatch({
      type: 'driver/getAllDrivers',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword: searchText,
        },
      },
    }).then((res) => setLoadingDriversList(false));
  };

  useEffect(() => {
    getAllDrivers();
  }, [searchText, startIndex, currentPage]);
  const tabs = [
    {
      title: 'Active',
      key: 'active',
    },
    {
      title: 'Inactive',

      key: 'inactive',
    },
  ];
  const onEditDiverModal = (id) => {
    setDriverLoading(true);
    setDriverId(id);
    if (id) {
      setIsopenModal({
        ...isopenModal,
        addDriver: { name: 'Add drivers', open: true },
      });

      dispatch({
        type: 'driver/getSingleDriverDetails',
        payload: {
          pathParams: { id: id },
        },
      }).then((res) => {
        if (res?.success) {
          setButtonStatus(res?.data);
          setDriverGlobalImage(res?.data?.media);
          const arr = res?.data?.services.map((item) => item.name);

          form?.setFieldsValue({
            driverCollection: [
              {
                ...res?.data,
                DOB: res?.data?.DOB ? moment(res?.data?.DOB) : '',
                startDate: res?.data?.startDate ? moment(res?.data?.startDate) : '',
                services: arr,
              },
            ],
          });
          setDriverLoading(false);
        }
      });
    }
  };
  const onChangeStatus = (id) => {
    dispatch({
      type: 'driver/updateDriverStatus',
      payload: {
        pathParams: { id: id },
        body: { status: status },
      },
    }).then((res) => {
      if (res) {
        getAllDrivers();
        message.success('Status updated successfully');
      }
      // getAllDrivers();
    });
  };

  const onDeleteDriver = (id) => {
    dispatch({
      type: 'driver/deleteDriverDetails',
      payload: {
        pathParams: { id: id },
      },
    }).then((res) => {
      getAllDrivers();
      if (res) {
        message.success('Driver deleted!');
      } else {
        message.error('An error occured!');
      }
    });
  };

  const handleClick = (tag) => {
    setServiceId(tag?._id);
    if (tag?.name == 'Random' && tag.status === 'pending') {
      setIsopenModal({
        ...isopenModal,
        randomServicesAgreement: { name: 'Random Services Agreement', open: true },
      });
      // <Tag >Random</Tag>;
    } else if (tag?.name == 'Drug Test' && tag.status === 'pending') {
      <Tag color="magenta">Drug Test</Tag>;
    } else if (tag?.name == 'Company Clearinghouse' && tag.status === 'pending') {
      setIsopenModal({
        ...isopenModal,
        CompanyClearingHouses: { name: 'Company Clearing House', open: true },
      });
    } else if (tag?.name == 'Driver Clearinghouse' && tag.status === 'pending') {
      setIsopenModal({
        ...isopenModal,
        DriverClearingHouses: { name: 'Driver Clearing House', open: true },
      });
    } else if (tag?.name == 'DQ File' && tag.status === 'pending') {
      <Tag color="magenta">DQ File</Tag>;
    } else if (tag?.name == 'Driver Education') {
      <Tag color="magenta">Driver Education</Tag>;
    } else {
      message.warning('This service is already saved in Quickbooks');
    }
  };
  const columns = [
    {
      title: 'Sr no.',
      key: 'srNo',
      // dataIndex: 'srNo',
      render: (_, record, idx) => <div>{idx + 1}</div>,
    },
    {
      title: 'Name',
      key: 'name',
      // dataIndex: 'name',
      // width:40,
      render: (_, record, idx) => (
        <div className="">
          {record?.firstName ? record?.firstName + ' ' + record?.lastName : 'N/A'}
        </div>
      ),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'DOB',
      key: 'dob',
      // dataIndex: 'dob',
      render: (__, record) => <div>{moment(record?.DOB).format('ll')}</div>,
    },
    {
      title: 'Licence Number',
      key: 'licenceNumber',
      // dataIndex: 'licenceNumber',
      render: (__, record) => <div>{record?.licenceNumber}</div>,
    },
    {
      title: 'Issue State',
      key: 'issueState',
      // dataIndex: 'issueState',
      render: (record) => <div>{record?.issueState}</div>,
    },
    {
      title: 'Licence Type',
      key: 'licenceType',
      // dataIndex: 'licenceType',
      // width:60,
      render: (record) => <div>{record?.licenceType}</div>,
    },

    {
      title: 'Services',
      key: 'services',
      // dataIndex: 'email',
      width: 250,

      render: (__, record) => (
        // <div>{record?.services || 'N/A'}</div>,

        <>
          {record?.services?.map((tag) => (
            // console.log('tag123456', tag?.status)

            <Tag
              style={{ margin: '4px' }}
              onClick={() => {
                handleClick(tag), setClientId(record?._id);
              }}
              // color={'red'}
              color={`${
                tag?.status == 'completed' ? 'green' : tag?.status == 'pending' ? 'red' : 'red'
              }`}
              key={tag?.name}
              checked={`${tag?.status == 'completed'}`}
            >
              {tag?.name}
            </Tag>
          ))}
        </>
      ),
    },

    {
      title: 'Action',
      align: 'center',
      width: 160,

      render: (__, records) => (
        <>
          <div className="flex justify-center items-center">
            <div className="ml-3">
              <Popconfirm
                title="Are you sure you want to Inactive driver?"
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={() => {
                  onChangeStatus(records?._id);
                }}
              >
                <div
                  onClick={() => {
                    setStatus('Inactive');
                  }}
                  className=" px-5 rounded-md text-white mr-3"
                  style={{ backgroundColor: '#EF3435' }}
                >
                  Inactive
                </div>
              </Popconfirm>
            </div>

            <div
              className="mr-4 p-1"
              onClick={() => {
                onEditDiverModal(records?._id);
                setIsUpdateModal(true);
              }}
            >
              <EditOutlined className="hover:text-blue-500" />
            </div>
            <div className="">
              <Popconfirm
                title="Are you sure you want to delete driver details?"
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={() => {
                  onDeleteDriver(records?._id);
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
  const columnss = [
    {
      title: 'Sr no.',
      key: 'srNo',
      render: (_, record, idx) => <div>{idx + 1}</div>,
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record, idx) => (
        <div className="">
          {record?.firstName ? record?.firstName + ' ' + record?.lastName : 'N/A'}
        </div>
      ),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'DOB',
      key: 'dob',
      render: (__, record) => <div>{moment(record?.DOB).format('ll')}</div>,
    },
    {
      title: 'Licence Number',
      key: 'licenceNumber',
      render: (__, record) => <div>{record?.licenceNumber}</div>,
    },
    {
      title: 'Issue State',
      key: 'issueState',
      render: (record) => <div>{record?.issueState}</div>,
    },
    {
      title: 'Licence Type',
      key: 'licenceType',
      render: (record) => <div>{record?.licenceType}</div>,
    },

    {
      title: 'Action',
      align: 'center',
      width: 160,

      render: (__, records) => (
        <>
          <div className="flex justify-center items-center">
            <div className="ml-3">
              <Popconfirm
                title="Are you sure you want to Activate driver?"
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={() => {
                  onChangeStatus(records?._id);
                }}
              >
                <div
                  onClick={() => setStatus('Active')}
                  className="bg-red-900 px-5 rounded-md text-white mr-3"
                  style={{ backgroundColor: '#32CD32' }}
                >
                  Active
                </div>
              </Popconfirm>
            </div>
            <div
              className="mr-4"
              onClick={() => {
                onEditDiverModal(records?._id);
                setIsUpdateModal(false);
              }}
            >
              <a type="primary">
                <span className="text-blue-700">
                  <EditOutlined />
                </span>
              </a>
            </div>
            <div className="">
              <Popconfirm
                title="Are you sure you want to delete driver details?"
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={() => {
                  onDeleteDriver(records?._id);
                }}
              >
                <a type="primary">
                  <span className="text-red-700">
                    <DeleteOutlined />
                  </span>
                </a>
              </Popconfirm>
            </div>
          </div>
        </>
      ),
    },
  ];
  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const debounceSearch = debounce(action, 500);

  let arr = [];
  arr = allDriversList;
  const newActiveArr = arr?.data?.filter((item) => item?.status == 'Active');
  const newInActiveArr = arr?.data?.filter((item) => item?.status !== 'Active');

  return (
    <>
      <Page
        title="Driver"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Driver',
                path: '#',
              },
            ]}
          />
        }
        primaryAction={
          <Button
            type="primary"
            style={{ margin: '5px', height: '40px' }}
            onClick={() => {
              setIsopenModal({
                ...isopenModal,
                addDriver: { name: 'Add drivers', open: true },
              });
              setButtonStatus('');
              form.resetFields();
              setDriverGlobalImage('');
            }}
          >
            Add driver
          </Button>
        }
      >
        <>
          <div className="bg-white mx-5">
            <Tabs activeKey={tabName}>
              {tabs?.map((tab) => (
                <TabPane tab={<span className="px-4">{tab?.title}</span>} key={tab?.key}>
                  {tab?.key === 'active' && (
                    <div key={tab?.key}>
                      <div className="px-5 mb-5 flex gap-5 ">
                        <Input
                          size="large"
                          prefix={<SearchOutlined />}
                          placeholder="Enter keyword here to search..."
                          onChange={(e) => {
                            debounceSearch(e.target.value), currentPage;
                            setCurrentPage(1);
                          }}
                        />
                      </div>

                      <div className="mx-5">
                        <Table
                          className="active-table"
                          loading={loadingDriversList}
                          rowClassName="cursor-pointer"
                          pagination={false}
                          dataSource={newActiveArr || ''}
                          scroll={{ x: 1000 }}
                          columns={columns}
                          onRow={(e) => ({
                            onClick: () => setData(e),
                          })}
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
                                total={allDriversList?.totalCount || 0}
                                showTotal={(total, range) =>
                                  `${range[0]}-${range[1]} of ${total} items`
                                }
                                onChange={handleChangePagination}
                              />
                            </Row>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  {tab?.key === 'inactive' && (
                    <div key={tab?.key}>
                      <div className="px-5 mb-5 flex gap-5 ">
                        <Input
                          size="large"
                          prefix={<SearchOutlined />}
                          placeholder="Enter keyword here to search..."
                          onChange={(e) => {
                            debounceSearch(e.target.value), currentPage;
                          }}
                        />
                      </div>
                      <div className="pt-5 px-5">
                        <Table
                          className="inactive-table"
                          rowClassName="cursor-pointer"
                          pagination={false}
                          loading={loadingDriversList}
                          dataSource={newInActiveArr || ''}
                          scroll={{ x: 1000 }}
                          columns={columnss}
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
                                total={allDriversList?.totalCount || 0}
                                showTotal={(total, range) =>
                                  `${range[0]}-${range[1]} of ${total} items`
                                }
                                onChange={handleChangePagination}
                              />
                            </Row>
                          )}
                        />
                      </div>
                    </div>
                  )}
                </TabPane>
              ))}
            </Tabs>
          </div>
        </>

        <AddDrivers
          getAllDrivers={getAllDrivers}
          form={form}
          onEditDiverModal={onEditDiverModal}
          setButtonStatus={setButtonStatus}
          buttonStatus={buttonStatus}
          setDriverId={setDriverId}
          driverId={driverId}
          isUpdateModal={isUpdateModal}
          setIsUpdateModal={setIsUpdateModal}
          driverLoading={driverLoading}
        />
      </Page>
    </>
  );
};

export default connect(({ driver }) => ({
  allDriversList: driver?.allDriversList,
  singleDriverDetails: driver?.singleDriverDetails,
}))(Driver);
