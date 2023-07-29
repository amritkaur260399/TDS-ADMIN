import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  Input,
  Tabs,
  Divider,
  Form,
  Popconfirm,
  Row,
  Pagination,
  Modal,
  message,
  Tag,
  Switch,
  Spin,
} from 'antd';
import { connect, useParams, history } from 'umi';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import {
  DownOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import AddRide from './AddRide';
import moment from 'moment';
import { chauffeur } from '@/utils/endpoints/chauffeur';
import { debounce } from 'lodash';
import { socketDetail } from '@/utils/globalStates/socket';
import { useAtom } from 'jotai';

const { TabPane } = Tabs;

const Rides = ({
  loading,
  ridesList,
  dispatch,
  singleRideDetail,
  chauffeurList,
  loadingForPayment,
}) => {
  const [socketID] = useAtom(socketDetail);

  const { tabName } = useParams();

  const [chauffeurId, setChauffeurId] = useState('');
  const [isFormEdit, setIsFormEdit] = useState('');
  const [tab, setTab] = useState('ALL');
  const [isAddModalVisible, setAddModalVisible] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({ visible: false, id: '' });
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [pickupLocation, setpickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [addStop, setAddStop] = useState('');
  const [form] = Form.useForm();
  const getAllRides = () => {
    dispatch({
      type: 'rides/getRides',
      payload: {
        query: {
          type: tabName === 'all' ? '' : tabName,
          keyword: searchText,
          startIndex,
          viewSize,
        },
      },
    });
  };
  useEffect(() => {
    getAllRides();
  }, [tabName, searchText, currentPage, viewSize, startIndex]);

  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const debounceSearch = debounce(action, 500);
  const onEditRide = (id) => {
    setAddModalVisible(true);

    dispatch({
      type: 'rides/getSingleRideDetails',
      payload: {
        query: {
          rideID: id,
        },
      },
    }).then((res) => {
      setIsFormEdit(res?.data?._id);
      if (res) {
        form.setFieldsValue({
          ...res.data,
          date: moment(res?.data?.date),
          chauffeurID: chauffeurList?.data?._id,
          rideTime: moment(res?.data?.time),

          infant: res?.data?.childSeats ? res?.data?.childSeats[0]?.infant : 0,
          toddler: res?.data?.childSeats ? res?.data?.childSeats[1]?.toddler : 0,
          booster: res?.data?.childSeats ? res?.data?.childSeats[2]?.booster : 0,
          chauffeurID: res?.data?.chauffeurID,
          numberOfHours: res?.data?.numberOfHours,
        });
        const aa = res?.data?.addStop?.map((name) => ({
          stopName: name?.name,
          stopPlaceId: name?.placeId,
        }));
        setAddStop(aa);
        setpickupLocation({
          pickupLocation: res?.data?.pickupLocation?.name,
          pickupPlaceId: res?.data?.pickupLocation?.placeId,
        });
        setDropLocation({
          dropLocation: res?.data?.dropLocation?.name,
          dropPlaceId: res?.data?.dropLocation?.placeId,
        });
        setChauffeurId(res?.data?.chauffeurID);
      }
    });
  };
  const handleConfirmation = (record) => {
    dispatch({
      type: 'payments/createPaymentLink',
      payload: {
        body: {
          name: 'Ride',
          rideId: record?._id,
          email: record?.email,
          price: record?.price * 100,
        },
      },
    }).then((res) => {
      setConfirmationModal({ visible: true, id: record?._id });
    });
  };

  const onDeleteRide = (id) => {
    dispatch({
      type: 'rides/deleteRide',
      payload: {
        pathParams: {
          id,
        },
      },
    })
      .then((res) => {
        message.success('Ride deleted successfully!');
        getAllRides();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getColor = (val) => {
    switch (val) {
      case 'Started':
        return 'green';
      case 'Cancelled':
        return 'red';
      case 'Pending':
        return 'orange';
      default:
        return 'orange';
    }
  };
  const tabs = [
    {
      title: 'All',
      key: 'all',
    },
    {
      title: 'Upcoming',
      key: 'upcoming',
    },
    {
      title: 'Pending',
      key: 'pending',
    },
    {
      title: 'Completed',
      key: 'completed',
    },
    {
      title: 'Cancelled',
      key: 'cancelled',
    },
  ];
  const columns = [
    {
      title: 'Booking no.',
      key: 'bookingNo',
      dataIndex: 'bookingNo',
      width: 120,
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
      width: 130,
      render: (records) => (
        <div className="">
          <span className="">{moment(records).format('ll')}</span>
        </div>
      ),
    },
    {
      title: 'Client',
      key: 'client',
      width: 140,
      dataIndex: 'firstName',
      render: (__, records) => (
        <div className="">
          <span className="">
            {' '}
            {records?.firstName ? records?.firstName + ' ' + records?.lastName : 'N/A'}
          </span>
        </div>
      ),
    },
    {
      title: 'Model',
      key: 'model',
      dataIndex: 'carModel',
      width: 170,
      render: (__, record) => (
        <div className="flex">
          {record?.ChauffeurDetails?.vehicleDetails?.vehicleLogo ? (
            <div className="mr-1">
              {' '}
              <img
                src={record?.ChauffeurDetails?.vehicleDetails?.vehicleLogo?.url}
                width="20px"
                height="20px"
                alt=""
              />{' '}
            </div>
          ) : (
            <div></div>
          )}

          {record?.ChauffeurDetails?.vehicleDetails?.vehicleName || 'N/A'}
        </div>
      ),
    },
    {
      title: 'Chauffeurs',
      key: 'chauffeurs',
      dataIndex: 'chauffeur',
      width: 140,
      render: (__, record) => <div>{record?.ChauffeurDetails?.name || 'N/A'}</div>,
    },
    {
      title: 'Drop location',
      key: 'dropLocation',
      dataIndex: 'dropLocation',
      render: (__, record) => <div>{record?.dropLocation?.name || 'Hourly ride'}</div>,
    },
    {
      title: 'Chauffeur Approval',
      key: 'chauffeurApproval',
      dataIndex: 'chauffeurApproval',
      render: (__, record) => <Tag color={getColor(record?.status)}>{record?.status}</Tag>,
    },
    {
      title: 'Track Ride',
      key: 'trackRide',
      render: (_, record) =>
        record?.status === 'Started' ? (
          <Button
            type="primary"
            onClick={async () => {
              await socketID?.emit(`join-admin`, { rideId: record?._id });
              // await socketID?.emit(`leave-admin`, { rideId: record?._id });

              history?.push(`/rides/track/${record?._id}`);
            }}
          >
            Track
          </Button>
        ) : (
          <div>Not Started</div>
        ),
    },
    {
      title: 'Action',
      align: 'center',
      width: 160,

      render: (records) => (
        <>
          <div className="flex justify-center items-center">
            <div className="mr-4" onClick={() => onEditRide(records?._id)}>
              <a type="primary">
                <span className="text-blue-700">
                  <EditOutlined />
                </span>
              </a>
            </div>

            <div className="">
              <Popconfirm
                title="Are you sure you want to delete this Ride?"
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={() => {
                  onDeleteRide(records?._id);
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
    {
      title: 'Send confirmation',
      key: 'sendConfirmation',
      dataIndex: 'sendConfirmation',
      render: (__, record, idx) => (
        <div className="flex justify-center">
          <Button
            type="primary"
            // disabled={!record?.price}
            loading={record?._id && record?._id === ridesList?.data?._id}
            onClick={() => {
              handleConfirmation(record);
            }}
          >
            Send
          </Button>
        </div>
      ),
    },
  ];
  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  return (
    <>
      <Page
        title="Rides"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Rides',
                path: '#',
              },
            ]}
          />
        }
        primaryAction={
          <div>
            <Switch
              defaultChecked={false}
              onChange={(checked) => {
                console.log('checked', checked);
              }}
            />
            <Button
              type="primary"
              className="ml-4"
              size="large"
              onClick={() => {
                setAddModalVisible(true);
              }}
            >
              Create Ride
            </Button>
          </div>
        }
      >
        {' '}
        <div className="bg-white ">
          <Tabs
            activeKey={tabName}
            onTabClick={(key) => {
              history.push(`/rides/${key}`);
            }}
          >
            {tabs?.map((tab) => (
              <TabPane tab={<span className="px-4">{tab?.title}</span>} key={tab?.key}>
                {tab?.key === tabName && (
                  <div key={tab?.key}>
                    <div className="px-5 flex gap-5 ">
                      <Input
                        size="large"
                        prefix={<SearchOutlined />}
                        placeholder="Enter keyword here to search..."
                        onChange={(e) => debounceSearch(e.target.value)}
                      />
                    </div>
                    <Divider />
                    <Spin size="large" spinning={loading}>
                      <Table
                        className="no-shadow zcp-fixed-w-table"
                        rowClassName="cursor-pointer"
                        loading={Boolean(loading)}
                        dataSource={ridesList?.data || []}
                        scroll={{ x: 1350 }}
                        columns={columns}
                        locale={{
                          emptyText: (
                            <div className="text-center flex justify-center items-center py-10">
                              <div>
                                <p className="text-lg">No rides found!</p>
                                <img
                                  className=""
                                  src={SearchNotFound}
                                  alt=""
                                  style={{ height: '100px' }}
                                />
                              </div>
                            </div>
                          ),
                        }}
                        footer={() => (
                          <Row className="mt-2 " type="flex" justify="end">
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
                              total={ridesList?.totalCount}
                              showTotal={(total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`
                              }
                              onChange={handleChangePagination}
                            />
                          </Row>
                        )}
                      />
                    </Spin>
                  </div>
                )}
              </TabPane>
            ))}
          </Tabs>
        </div>
        <AddRide
          getAllRides={getAllRides}
          setVisible={setAddModalVisible}
          visible={isAddModalVisible}
          form={form}
          isFormEdit={isFormEdit}
          setIsFormEdit={setIsFormEdit}
          setpickupLocation={setpickupLocation}
          setDropLocation={setDropLocation}
          setAddStop={setAddStop}
          addStop={addStop}
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          chauffeurId={chauffeurId}
        />
        <Modal
          open={confirmationModal?.visible}
          onCancel={() => {
            setConfirmationModal({ visible: false, id: '' });
          }}
          footer={null}
        >
          <div className="outer flex flex-col justify-center items-center">
            <div className="icon mt-8">
              <ExclamationCircleOutlined
                className="text-6xl"
                style={{ color: 'white', backgroundColor: '#FFCC00', borderRadius: '34px' }}
              />
            </div>
            <div className="title text-3xl font-semibold mt-4">Confirmation Sent</div>
            <div className="text-gray-500 text-2xl mt-3 text-center">
              A payment link has been sent to the customer
            </div>
            <div className="button mt-6 ">
              <Button
                type="primary"
                color="blue"
                size="large"
                width="full"
                onClick={() => {
                  setConfirmationModal({ visible: false, id: '' });
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </Modal>
      </Page>
    </>
  );
};
export default connect(({ rides, chauffeur, loading }) => ({
  ridesList: rides?.ridesList,
  singleRideDetail: rides?.singleRideDetail,
  chauffeurList: chauffeur?.chauffeurList,
  loading: loading.effects['rides/getRides'],
  // loading: loading?.effects['rides/getRides'] || loading?.effects['payments/createPaymentLink'],
  loadingForPayment: loading.effects['payments/createPaymentLink'],
}))(Rides);
