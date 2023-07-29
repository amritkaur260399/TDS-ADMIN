// import { Button } from 'antd';
// import { useAtom } from 'jotai';
// import React from 'react';
// import { modalsJotai } from '@/utils/globalStates/modals';
// import AddClearingHouse from '@/components/AddClearingHouses';
// import Driver from '../Driver';
// import DriverClearingHouses from '@/components/DriverClearingHouses';

// const ClearingHouse = () => {
//   const [isopenModal, setIsopenModal] = useAtom(modalsJotai);

//   return (
//     <div  className=''>
//       <Button
//         type="primary"
//         style={{ margin: '5px', height: '40px' }}
//         className=""
//         onClick={() => {
//           setIsopenModal({
//             ...isopenModal,
//             clearingHouse: { name: 'Add Clearing House', open: true },
//           });
//         }}
//       >
//         Add Clearing House
//       </Button>
//       <AddClearingHouse />

//     </div>
//   );
// };

// export default ClearingHouse;

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
  Spin,
  Table,
  Tabs,
} from 'antd';
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { connect, useParams, history } from 'umi';
import moment from 'moment';
import { useAtom } from 'jotai';
import { requiredStar } from '@/utils/AppIons';
import { addressJotai, modalsJotai } from '@/utils/globalStates/modals';
import AddDrivers from '@/components/AddDrivers';
import AddClearingHouse from '@/components/AddClearingHouses';
import TabPane from 'antd/lib/tabs/TabPane';
import DriverClearingHouses from '@/components/DriverClearingHouses';
import CompanyClearingHouse from '@/components/CompanyClearingHouse';

const ClearingHouse = ({
  loading,
  dispatch,
  allCompanyClearingHouseList,
  allDriverClearingHouseList,
}) => {
  const [searchText, setSearchText] = useState('');
  const [isopenModal, setIsopenModal] = useAtom(modalsJotai);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tab, setTab] = useState('ALL');
  const [buttonStatus, setButtonStatus] = useState('');
  const { tabName } = useParams();
  const [form] = Form.useForm();
  const [durationtype, setDurationType] = useState('');
  const [foundAddress, setFoundAddress] = useAtom(addressJotai);
  const [selectedCountry, setSelectedCountry] = useState('United States (USA)');
  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [driverId, setDriverId] = useState();
  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const getAllCompanyClearingHouse = () => {
    dispatch({
      type: 'clearingHouse/getAllCompanyClearingHouse',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword: searchText,
        },
      },
    }).then((res) => console.log('res21321321321444444', res?.data?._id));
  };
  const getAllDriverClearingHouse = () => {
    dispatch({
      type: 'clearingHouse/getAllDriverClearingHouse',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword: searchText,
        },
      },
    }).then((res) => console.log('res24', res?.data));
  };

  useEffect(() => {
    getAllCompanyClearingHouse();
    getAllDriverClearingHouse();
  }, [searchText, startIndex, currentPage]);

  const onEditCompanyClearingHouseDetails = (id) => {
    dispatch({
      type: 'clearingHouse/getSingleCompanyClearingHouse',
      payload: {
        pathParams: { id: id },
      },
    }).then((res) => {
      setButtonStatus(res?.data);
      setIsopenModal({
        ...isopenModal,
        CompanyClearingHouses: { name: 'Company Clearing House', open: true },
      });

      // console.log('res412', moment(res?.data?.DOB).format('ll'));
      form?.setFieldsValue({
        ...res?.data,
        // firstName: res?.data?.firstName,
        // lastName: res?.data?.lastName,
        dob: res?.data?.dob ? moment(res?.data?.dob) : '',
        // ownersDriverLicenseNumber: res?.data?.ownersDriverLicenseNumber,
        // email: res?.data?.email,
        // address: res?.data?.address,
        // FMCSAPassword: res?.data?.FMCSAPassword,
        // FMCSAEmail: res?.data?.FMCSAEmail,
        // clearingHouseLogin: res?.data?.clearingHouseLogin,
        // clearingHousePassword: res?.data?.clearingHousePassword,
      });
      // console.log('res?.data?.address', res?.data?.address);
      // setFoundAddress({ fulladdress: res?.data?.address });
    });
  };

  const onEditDriverClearingHouseDetails = (id) => {
    dispatch({
      type: 'clearingHouse/getSingleDriverClearingHouse',
      payload: {
        pathParams: { id: id },
        // query: {
        //  id: id,
        // },
      },
    }).then((res) => {
      console.log('res11215212', res);
      setButtonStatus(res?.data);
      setIsopenModal({
        ...isopenModal,
        DriverClearingHouses: { name: 'Driver Clearing House', open: true },
      });

      form?.setFieldsValue({
        ...res?.data,
        DOB: res?.data?.DOB ? moment(res?.data?.DOB) : '',
        // firstName: res?.data?.firstName,
        // lastName: res?.data?.lastName,
        // driverLicenseNumber: res?.data?.driverLicenseNumber,
        // email: res?.data?.email,
        // mailingAddress: res?.data?.mailingAddress,
        // onlineDriverEducation: res?.data?.onlineDriverEducation,
      });
    });
  };

  const onDeleteCompanyClearingDetails = (id) => {
    console.log('id', id);
    dispatch({
      type: 'clearingHouse/deleteCompanyClearingHouse',
      payload: {
        pathParams: { id: id },
      },
    }).then((res) => {
      getAllCompanyClearingHouse();
      console.log('res', res);
      // message.success('Driver deleted!');
      if (res) {
        message.success('Company Clearing House Details deleted');
      } else {
        message.error('An error occured!');
      }
    });
  };
  const onDeleteDriverClearingDetails = (id) => {
    console.log('id', id);
    dispatch({
      type: 'clearingHouse/deleteDriverClearingHouse',
      payload: {
        pathParams: { id: id },
      },
    }).then((res) => {
      getAllDriverClearingHouse();
      console.log('res', res);
      // message.success('Driver deleted!');
      if (res) {
        message.success('Driver Clearing House Details deleted!');
      } else {
        message.error('An error occured!');
      }
    });
  };

  const debounceSearch = debounce(action, 500);
  const tabs = [
    {
      title: 'Company Clearing House',
      key: 'Company Clearing House',
    },
    {
      title: 'Driver Clearing House',
      key: 'Driver Clearing House',
    },
  ];
  const columns = [
    {
      title: 'Sr no.',
      key: 'srNo',
      // dataIndex: 'srNo',
      // render: (_, record, idx) => <div>{idx + 1}</div>,
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },
    // {
    //   title: 'Name',
    //   key: 'name',
    //   // dataIndex: 'name',
    //   render: (_, record, idx) => (
    //     <div className="">
    //       {record?.firstName ? record?.firstName + ' ' + record?.lastName : 'N/A'}
    //     </div>
    //   ),
    //   sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    // },
    // {
    //   title: 'DOB',
    //   key: 'dob',
    //   // dataIndex: 'dob',
    //   render: (__, record) => <div>{moment(record?.DOB).format('ll')}</div>,
    // },
    // {
    //   title: 'Owners driver licence number',
    //   key: 'ownersDriverLicenseNumber',
    //   // dataIndex: 'licenceNumber',
    //   render: (__, record) => <div>{record?.ownersDriverLicenseNumber}</div>,
    // },
    {
      title: 'Email address',
      key: 'email',
      // dataIndex: 'issueState',
      render: (record) => <div>{record?.email}</div>,
    },
    {
      title: 'Address',
      key: 'address',
      // dataIndex: 'licenceType',
      render: (record) => <div>{record?.address}</div>,
    },
    {
      title: 'Company Name',
      key: 'companyName',
      // dataIndex: 'licenceType',
      render: (record) => <div>{record?.companyName}</div>,
    },
    {
      title: 'Pnone Number',
      key: 'phoneNumber',
      // dataIndex: 'licenceType',
      render: (record) => <div>{record?.phoneNumber}</div>,
    },
    {
      title: 'FMCSA portal login (email)',
      key: 'FMCSAEmail',
      // dataIndex: 'licenceType',
      render: (record) => <div>{record?.FMCSAEmail}</div>,
    },
    {
      title: 'Clearinghouse login',
      key: 'clearingHouseLogin',
      // dataIndex: 'licenceType',
      render: (record) => <div>{record?.clearingHouseLogin}</div>,
    },

    {
      title: 'Action',
      align: 'center',
      width: 160,

      render: (__, records) => (
        <>
          <div className="flex justify-center items-center">
            <div
              className="mr-4"
              onClick={() => {
                onEditCompanyClearingHouseDetails(records?._id);
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
                title="Are you sure you want to delete Company clearing house  details?"
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={() => {
                  onDeleteCompanyClearingDetails(records?._id);
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
  const columnsDriver = [
    {
      title: 'Sr no.',
      key: 'srNo',
      // dataIndex: 'srNo',
      // render: (_, record, idx) => <div>{idx + 1}</div>,
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },
    {
      title: 'Name',
      key: 'name',
      // dataIndex: 'name',
      render: (_, record, idx) => (
        <div className="">
          {record?.firstName ? record?.firstName + ' ' + record?.lastName : 'N/A'}
        </div>
      ),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },

    {
      title: 'Driver license number',
      key: 'driverLicenseNumber',
      // dataIndex: 'licenceNumber',
      render: (__, record) => <div>{record?.driverLicenseNumber}</div>,
    },
    {
      title: 'Email address',
      key: 'email',
      // dataIndex: 'issueState',
      render: (record) => <div>{record?.email}</div>,
    },
    {
      title: 'Mailing Address',
      key: 'mailingAddress',
      // dataIndex: 'licenceType',

      render: (record) => <div>{record?.mailingAddress}</div>,
    },
    {
      title: 'Online Driver Education',
      key: 'onlineDriverEducation',
      // dataIndex: 'licenceType',
      // width: 100,
      render: (record) => (
        <div
          style={{ width: '40px', textAlign: 'center' }}
          className={`${
            record?.onlineDriverEducation === true ? ' bg-green-500' : 'bg-red-500 '
          } object-contain text-white text-center  rounded-full `}
        >{`${record?.onlineDriverEducation === true ? 'YES' : 'NO'}`}</div>
      ),
    },
    {
      title: 'DOB',
      key: 'dob',
      // dataIndex: 'dob',
      render: (__, record) => <div>{moment(record?.DOB).format('ll') || ''}</div>,
    },

    {
      title: 'Action',
      align: 'center',
      width: 160,

      render: (__, records) => (
        <>
          <div className="flex justify-center items-center">
            <div
              className="mr-4"
              onClick={() => {
                onEditDriverClearingHouseDetails(records?._id);
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
                title="Are you sure you want to delete driver clearing house details?"
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={() => {
                  onDeleteDriverClearingDetails(records?._id);
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
  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  return (
    <>
      <Page
        title="Clearing House"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Clearing House',
                path: '#',
              },
            ]}
          />
        }
        // primaryAction={
        //   <div className="flex">
        //     <Button
        //       type="primary"
        //       style={{ margin: '5px', height: '40px' }}
        //       className=""
        //       onClick={() => {
        //         setButtonStatus('');
        //         setIsopenModal({
        //           ...isopenModal,
        //           CompanyClearingHouses: { name: 'Company Clearing House', open: true },
        //         });
        //       }}
        //     >
        //       Add Company Clearing House
        //     </Button>
        //     <Button
        //       type="primary"
        //       style={{ margin: '5px', height: '40px' }}
        //       className=""
        //       onClick={() => {
        //         setButtonStatus('');
        //         setIsopenModal({
        //           ...isopenModal,
        //           DriverClearingHouses: { name: 'Driver Clearing House', open: true },
        //         });
        //       }}
        //     >
        //       Add Driver Clearing House
        //     </Button>
        //   </div>
        // }
      >
        <div className="bg-white ">
          <div>
            <div className="bg-white ">
              <Tabs
                activeKey={tabName}
                // onTabClick={(key) => {
                //   history.push(`/rides/${key}`);
                // }}
              >
                {tabs?.map((tab) => (
                  <TabPane tab={<span className="px-4">{tab?.title}</span>} key={tab?.key}>
                    {tab?.key === 'Company Clearing House' && (
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
                        {/* <Divider /> */}
                        <div className=" px-5">
                          <Table
                            className="no-shadow zcp-fixed-w-table"
                            rowClassName="cursor-pointer"
                            pagination={false}
                            loading={Boolean(loading)}
                            dataSource={allCompanyClearingHouseList?.data}
                            scroll={{ x: 1000 }}
                            columns={columns}
                            locale={{
                              emptyText: (
                                <div className="text-center flex justify-center items-center py-10">
                                  <div>
                                    <p className="text-lg">No data found!</p>
                                    <img
                                      className=""
                                      src={SearchNotFound}
                                      // alt="No rides found!"
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
                                  total={allCompanyClearingHouseList?.count || 0}
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
                    {tab?.key === 'Driver Clearing House' && (
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
                        {/* <Divider /> */}
                        <div className=" px-5">
                          <Table
                            className="no-shadow zcp-fixed-w-table"
                            rowClassName="cursor-pointer"
                            pagination={false}
                            loading={Boolean(loading)}
                            dataSource={allDriverClearingHouseList?.data}
                            scroll={{ x: 1000 }}
                            columns={columnsDriver}
                            locale={{
                              emptyText: (
                                <div className="text-center flex justify-center items-center py-10">
                                  <div>
                                    <p className="text-lg">No data found!</p>
                                    <img
                                      className=""
                                      src={SearchNotFound}
                                      // alt="No rides found!"
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
                                  total={allDriverClearingHouseList?.count || 0}
                                  showTotal={(total, range) =>
                                    `${range[0]}-${range[1]} of ${total} items`
                                  }
                                  onChange={handleChangePagination}
                                />
                              </Row>
                            )}
                          />
                        </div>
                        {/* <Spin size="large" spinning={loading}>
                      <Table
                        className="no-shadow zcp-fixed-w-table"
                        rowClassName="cursor-pointer"
                        loading={Boolean(loading)}
                        dataSource={allCompanyClearingHouseList?.data || []}
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
                    </Spin> */}
                      </div>
                    )}
                  </TabPane>
                ))}
              </Tabs>
            </div>
            {/* <div className="pt-5 px-5">
              <Table
                className="no-shadow zcp-fixed-w-table"
                rowClassName="cursor-pointer"
                pagination={false}
                loading={Boolean(loading)}
                dataSource={allCompanyClearingHouseList?.data}
                scroll={{ x: 1000 }}
                columns={columns}
                locale={{
                  emptyText: (
                    <div className="text-center flex justify-center items-center py-10">
                      <div>
                        <p className="text-lg">No data found!</p>
                        <img
                          className=""
                          src={SearchNotFound}
                          // alt="No rides found!"
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
            </div> */}
          </div>
        </div>
        <DriverClearingHouses
          form={form}
          buttonStatus={buttonStatus}
          setButtonStatus={setButtonStatus}
          getAllDriverClearingHouse={getAllDriverClearingHouse}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          suggestedAddress={suggestedAddress}
          provinces={provinces}
          setProvinces={setProvinces}
          setSuggestedAddress={setSuggestedAddress}

          // onEditDriverClearingHouseDetails={onEditDriverClearingHouseDetails}
        />
        <CompanyClearingHouse
          form={form}
          buttonStatus={buttonStatus}
          getAllCompanyClearingHouse={getAllCompanyClearingHouse}
          // setFoundAddress={setFoundAddress}
          // foundAddress={foundAddress}
          setButtonStatus={setButtonStatus}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          suggestedAddress={suggestedAddress}
          provinces={provinces}
          setProvinces={setProvinces}
          setSuggestedAddress={setSuggestedAddress}
          // onEditCompanyClearingHouseDetails={onEditCompanyClearingHouseDetails}
        />
        {/* <AddClearingHouse form={form} buttonStatus={buttonStatus} getAllDriverClearingHouse={getAllDriverClearingHouse} getAllCompanyClearingHouse={getAllCompanyClearingHouse}/> */}
      </Page>
    </>
  );
};

export default connect(({ clearingHouse }) => ({
  allCompanyClearingHouseList: clearingHouse?.allCompanyClearingHouseList,
  allDriverClearingHouseList: clearingHouse?.allDriverClearingHouseList,
  // singleDriverDetails: driver?.singleDriverDetails,
}))(ClearingHouse);
