import React, { useState, useEffect } from 'react';
import {
  Button,
  Dropdown,
  Form,
  Menu,
  message,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  Pagination,
} from 'antd';
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { connect, history } from 'umi';

import {
  UsersIcon,
  TestIcon,
  BreatheIcon,
  HairIcon,
  EmployeesIcon,
} from '../../assets/DashboardIcons/index';
import Icon from '@ant-design/icons';
import moment from 'moment';
import { debounce } from 'lodash';
import AddNewClient from '@/components/AddNewClient';
import Search from 'antd/lib/transfer/search';
import { useAtom } from 'jotai';
import {
  addressJotai,
  driverClearingDetailsJotai,
  modalsJotai,
  newClientDetailsjotai,
} from '@/utils/globalStates/modals';
import AddDrivers from '@/components/AddDrivers';
import RandomService from '@/components/RandomServices';
import CompanyClearingHouse from '@/components/CompanyClearingHouse';
import DriverClearingHouses from '@/components/DriverClearingHouses';
import ConfirmModal from '@/components/ConfirnModal';
import { createCustomer, createLogin } from '@/services/quickBooks';
import quickBookUtils from '@/utils/quickBooksUtils';
import { PageLoading } from '@ant-design/pro-layout';
import { quickBooks_invoice_intent } from './quickBooksInvoiceIntent';
import { quickBooksRedirectUrl } from '@/utils/apiUtils';

const DemoBox = (props) => <p className={`height-${props.value}`}>{props.children}</p>;

const DashBoard = ({ dispatch, loading, loadingForRides, allClientList }) => {
  const [isopenModal, setIsopenModal] = useAtom(modalsJotai);
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState();
  const [form] = Form.useForm();

  const [openModal, setOpenModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [apiRes, setApiRes] = useState([]);
  // const [sortIndex, setSortIndex] = useState('1');
  const [dataType, setDataType] = useState('week');
  const [ridesCount, setRidesCount] = useState(0);
  const [buttonStatus, setButtonStatus] = useState('');
  const [titleStatus, setTitlestatus] = useState();
  const [foundAddress, setFoundAddress] = useAtom(addressJotai);
  const [selectedCountry, setSelectedCountry] = useState('United States (USA)');
  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [clientId, setClientId] = useState();
  const [serviceId, setServiceId] = useState();
  const [count, setCount] = useState('');
  const [driverClearingDetails, setDriverClearingDetails] = useAtom(driverClearingDetailsJotai);
  const [newClientDetails, setNewClientDetails] = useAtom(newClientDetailsjotai);
  const [isQuickBookLoading, setIsQuickBookLoading] = useState(false);

  // const createCustomerCall = useQuickBooksCreateCustomer();
  const createCustomers = () => {
    setNewClientDetails((oldItem) => {
      return {
        PrimaryPhone: {
          FreeFormNumber: oldItem?.billingContact,
        },
        PrimaryEmailAddr: {
          Address: oldItem?.billingEmail,
        },
        BillAddr: {
          CountrySubDivisionCode: 'CA',
          City: oldItem?.physicalCity,
          PostalCode: oldItem?.physicalZip,
          Line1: oldItem?.physicalAddress,
          Country: 'USA',
        },
        CompanyName: oldItem?.motorCarrierName,
        GivenName: oldItem?.motorCarrierName,
      };
    });
    dispatch({
      type: 'quickBooks/createCustomers',
      payload: {
        body: newClientDetails,
      },
    })?.then((res) => {
      createCustomers();
    });
  };

  useEffect(() => {
    if (window.location.href.includes('code')) {
      createLogin({
        body: {
          url: window.location.href,
          user_id: JSON.parse(localStorage.getItem('currentUser_details'))._id,
        },
      })
        ?.then((res) => {
          localStorage.setItem('quickBook_Token', JSON.stringify(res.responseToken));
        })
        ?.catch((error) => {
          console.log('error', error);
        });
    }
  }, [window?.location?.href]);

  useEffect(() => {
    getAllClients();
    getAllCompanyClearingHouse();
    getAllDriverClearingHouse();
    getCounts();
  }, [searchText, dataType, startIndex, currentPage]);
  const getCounts = () => {
    dispatch({
      type: 'count/getCounts',
      payload: {},
    }).then((res) => setCount(res?.data));
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
    });
  };
  const getAllClients = () => {
    dispatch({
      type: 'client/getAllClients',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword: searchText,
        },
      },
    });
  };

  const onEditClientModal = (id) => {
    dispatch({
      type: 'client/getSingleClientDetails',
      payload: {
        pathParams: { id: id },
        // query: {
        //  id: id,
        // },
      },
    }).then((res) => {
      setUrl(res?.data?.signatureImage);
      setButtonStatus(res?.data);
      setOpenModal(true);
      const arr = res?.data?.services.map((item) => item.name);
      const arrdesignated = res?.data?.designated?.map((item) => item);
      form?.setFieldsValue({
        ...res?.data,
        designatedRepresentative: arrdesignated,
        services: arr,
      });
    });
  };
  const onDeleteClient = (id) => {
    dispatch({
      type: 'client/deleteClientDetails',
      payload: {
        pathParams: { id: id },
      },
    }).then((res) => {
      getAllClients();
      if (res) {
        message.success('Client deleted!');
      } else {
        message.error('An error occured!');
      }
    });
  };

  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const debounceSearch = debounce(action, 500);
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
    });
  };

  // Calculate the center position for pop-up
  const width = 1200;
  const height = 900;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const leftPosition = screenWidth / 2 - width / 2;
  const topPosition = screenHeight / 2 - height / 2;

  const options = (records) => (
    <Menu>
      <Menu.Item onClick={() => onEditClientModal(records?._id)}>
        <EditOutlined className="mr-2" />
        Edit Client
      </Menu.Item>
      <Menu.Item onClick={() => handleQuickBooks(records)}>
        <PlusCircleOutlined className="mr-2" />
        Add to QuickBooks
      </Menu.Item>
      {records?.qbInvoiceID && (
        <Menu.Item
          onClick={() =>
            window.open(
              `${quickBooksRedirectUrl}/app/invoice?txnId=${records?.qbInvoiceID}`,
              '_blank',
              `toolbar=yes,scrollbars=yes,resizable=yes, width=${width},height=${height}, left=${leftPosition}, top=${topPosition}`,
            )
          }
        >
          <PlusCircleOutlined className="mr-2" />
          View Invoice
        </Menu.Item>
      )}
      <Menu.Item>
        <Popconfirm
          title="Are you sure you want to delete Client details?"
          okText="Yes"
          okType="primary"
          cancelText="No"
          onConfirm={() => {
            onDeleteClient(records?._id);
          }}
          className="w-full"
        >
          <a type="primary">
            <span className="text-red-700">
              <DeleteOutlined /> Delete
            </span>
          </a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Client ID',
      key: 'clientID',
      align: 'center',
      width: 70,
      // dataIndex: 'clientId',

      render: (_, __, index) => (
        <span className="text-center"> {index + 1 + viewSize * (currentPage - 1)}</span>
      ),
    },
    {
      title: 'Date',
      key: 'date',
      // dataIndex: 'date',
      render: (records) => (
        <div className="text-center">
          <span className="">{moment(records?.updatedAt).format('ll')}</span>
        </div>
      ),
    },
    {
      title: 'Motor Carrier Name',
      key: 'motorCarrierName',
      // dataIndex: 'motorCarrierName',
      render: (__, records) => (
        <a
          className="text-center"
          onClick={() => onEditClientModal(records?._id)}
          href={`/clientDetails/${records?._id}`}
        >
          {records?.motorCarrierName}
        </a>
      ),
      sorter: (a, b) => a.motorCarrierName.localeCompare(b.motorCarrierName),
    },

    {
      title: 'DOT Number',
      key: 'dotNumber',
      // dataIndex: 'dotNumber',
      render: (__, records) => {
        return (
          <a
            className="text-center"
            style={{ fontWeight: 500 }}
            onClick={(event) => event.stopPropagation()}
            href={'https://saferwebapi.com/index'}
            target="_blank"
            rel="noreferrer"
          >
            {records?.dotNumber}
          </a>
        );
      },
      // render: (__, records) => <div className="text-center">{records?.dotNumber}</div>,
    },

    {
      title: 'MC Number',
      key: 'MCNumber',
      // dataIndex: 'MCNumber',
      render: (__, records) => <div className="text-center">{records?.MCNumber}</div>,
    },
    {
      title: 'Billing Contact',
      key: 'billingContact',
      // dataIndex: 'MCNumber',
      render: (__, records) => <div className="text-center">{records?.billingContact}</div>,
    },
    {
      title: 'DER Employee Name',
      key: 'employeName',
      // dataIndex: 'employeName',

      render: (__, records) => (
        <div className="text-center">
          {records?.designated?.map((item) => {
            return (
              <span className="flex" key={item}>
                {item?.designatedRepresentativeFirstName
                  ? item?.designatedRepresentativeFirstName + item?.designatedRepresentativeLastName
                  : 'NA'}
              </span>
            );
          })}
        </div>
      ),
    },
    {
      title: 'DER Email',
      key: 'email',
      // dataIndex: 'email',
      render: (__, record) => (
        <div className="text-center">
          {record?.designated?.map((item) => {
            return (
              <span className="flex" key={item}>
                {item?.designatedRepresentativeEmail ? item?.designatedRepresentativeEmail : 'NA'}
              </span>
            );
          })}

          {/* {record?.designatedRepresentativeEmail || 'N/A'} */}
        </div>
      ),
    },
    {
      title: 'DER Phone Number',
      key: 'email',
      // dataIndex: 'email',
      render: (__, record) => (
        <div className="text-center">
          {record?.designated?.map((item) => {
            return (
              <span className="flex" key={item}>
                {item?.designatedRepresentativePhone ? item?.designatedRepresentativePhone : 'NA'}
              </span>
            );
          })}
        </div>
      ),
    },
    {
      title: 'Services',
      key: 'services',

      render: (__, record) => (
        <>
          {record?.services?.map((tag) => (
            <Tag
              style={{ margin: '4px' }}
              onClick={() => {
                handleClick(tag, record), setClientId(record?._id);
              }}
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
      width: 70,
      render: (records) => (
        <>
          <div className="flex justify-center items-center">
            <Dropdown
              overlay={options(records)}
              placement="bottomLeft"
              overlayStyle={{ border: '1px solid #1111' }}
            >
              <Button icon={<UnorderedListOutlined />} />
            </Dropdown>
          </div>
        </>
      ),
    },
  ];

  const handleClick = (tag, record) => {
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
        userData: record,
      });
    } else if (tag?.name == 'DQ File' && tag.status === 'pending') {
      <Tag color="magenta">DQ File</Tag>;
    } else if (tag?.name == 'Driver Education') {
      <Tag color="magenta">Driver Education</Tag>;
    } else {
      message.warning('This service is already saved in Quickbooks');
    }
  };
  const itemsFilter = () => (
    <Menu>
      <Menu.Item
        key={1}
        onClick={() => {
          setDataType('Client');
        }}
      >
        Client
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => {
          setDataType('Employee');
        }}
      >
        Employee
      </Menu.Item>
    </Menu>
  );
  const itemsDate = () => (
    <Menu>
      <Menu.Item
        key={1}
        onClick={() => {
          // setDataType('Client');
        }}
      >
        Daily
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => {
          // setDataType('Employee');
        }}
      >
        Monthly
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => {
          // setDataType('Employee');
        }}
      >
        Yearly
      </Menu.Item>
    </Menu>
  );
  const itemsSort = () => (
    <Menu>
      <Menu.Item
        key={1}
        onClick={() => {
          setDataType('Client');
        }}
      >
        Newest
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => {
          setDataType('Employee');
        }}
      >
        Alphabettically
      </Menu.Item>
    </Menu>
  );
  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  // create customer in quickbooks
  const handleQuickBooks = async (records) => {
    setIsQuickBookLoading(true);

    const filteredServices = quickBooks_invoice_intent.filter((obj1) =>
      records?.services.some((obj2) => obj1.name === obj2.name),
    );

    try {
      const createCustomerInQuickBooks = await createCustomer({
        body: {
          qb_admin: JSON.parse(localStorage.getItem('currentUser_details'))._id,
          db_id: records?._id,
          qb: {
            DisplayName: records?.motorCarrierName,
            PrimaryEmailAddr: {
              Address: records?.billingEmail,
            },
            PrimaryPhone: {
              FreeFormNumber: records?.billingContact,
            },
          },
          qb_invoice: {
            Line: filteredServices.map((item) => {
              return {
                DetailType: 'SalesItemLineDetail',
                Amount: 20,
                SalesItemLineDetail: {
                  ItemRef: {
                    value: item.id,
                  },
                  Qty: 1,
                },
              };
            }),
          },
        },
      });
      setIsQuickBookLoading(false);
      if (createCustomerInQuickBooks?.success) {
        message.success('Redirecting...');
        window.open(createCustomerInQuickBooks?.redirect_url, '_blank');
      }
    } catch (error) {
      setIsQuickBookLoading(false);
      if (error?.data?.error?.status === 401) {
        window.location.replace(error.data.error.message.authURL);
      } else {
        message.error('This client is already registered in the quickBooks');
      }
    }
  };

  return (
    <>
      {!isQuickBookLoading ? (
        <>
          <div className=" flex justify-end items-center gap-30 my-3">
            <div>
              <Button
                type="primary"
                style={{ margin: '5px', height: '40px' }}
                onClick={() => {
                  setOpenModal(true);
                  setButtonStatus('');
                }}
              >
                Add New Client
              </Button>

              <Button type="primary" style={{ margin: '5px', height: '40px' }}>
                Add Test Result
              </Button>
              <Dropdown overlay={itemsDate} trigger={'click'} className="mr-5 ml-5">
                <Button style={{ margin: '5px', height: '40px' }}>
                  <Space>
                    Monthly
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 mt-5">
            <div
              className="flex items-center flex-col rounded-md shadow-lg dash_card cursor-pointer "
              style={{
                padding: 10,
                background: '#FFFFFF',
              }}
              onClick={() => {
                history.push('/clients');
              }}
            >
              <Icon component={UsersIcon} className="mb-2" />
              <p
                style={{
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '32px',
                  marginTop: '15px',
                  color: '#262626',
                }}
              >
                {count?.clientCount}
              </p>
              <p
                style={{
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '20px',
                  color: '#727272',
                }}
              >
                Clients
              </p>
            </div>
            <div
              className="flex items-center flex-col rounded-md shadow-lg dash_card cursor-pointer"
              style={{
                padding: 10,
                background: '#FFFFFF',
              }}
            >
              <Icon component={EmployeesIcon} className="mb-2" />
              <p
                style={{
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '32px',
                  marginTop: '15px',
                  color: '#262626',
                }}
              >
                {count?.employeeCount}
              </p>
              <p
                style={{
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '20px',
                  color: '#727272',
                }}
              >
                Employees
              </p>
            </div>
            <div
              className="flex items-center flex-col rounded-lg shadow-lg dash_card cursor-pointer"
              style={{
                padding: 10,
                background: '#FFFFFF',
              }}
            >
              <Icon component={TestIcon} className="mb-2" />
              <p
                style={{
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '32px',
                  marginTop: '15px',
                  color: '#262626',
                }}
              >
                {count?.urineTest}
              </p>
              <p
                style={{
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '20px',
                  color: '#727272',
                }}
              >
                Urine Test
              </p>
            </div>
            <div
              className="flex items-center flex-col rounded-md shadow-lg dash_card cursor-pointer"
              style={{
                padding: 10,
                background: '#FFFFFF',
              }}
            >
              <Icon component={BreatheIcon} className="mb-2" />
              <p
                style={{
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '32px',
                  marginTop: '15px',
                  color: '#262626',
                }}
              >
                {count?.urineTest}
              </p>
              <p
                style={{
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '20px',
                  color: '#727272',
                }}
              >
                Breath Test
              </p>
            </div>
            <div
              className="flex items-center flex-col rounded-md shadow-lg dash_card cursor-pointer"
              style={{
                padding: 10,
                background: '#FFFFFF',
              }}
            >
              <Icon component={HairIcon} className="mb-2" />
              <p
                style={{
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '32px',
                  marginTop: '15px',
                  color: '#262626',
                }}
              >
                {count?.hairTest}
              </p>
              <p
                style={{
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '20px',
                  color: '#727272',
                }}
              >
                Hair Test
              </p>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'white',
              marginTop: 25,
              padding: 15,
              borderRadius: 5,
            }}
          >
            <div className="flex items-center py-2">
              <Search
                size="large"
                style={{ height: '40px' }}
                placeholder="Enter keyword here to search..."
                enterButton
                className="rounded-md"
                onChange={(e) => {
                  debounceSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="pt-3 pb-5 mx-3">
              <Table
                columns={columns}
                dataSource={allClientList?.data || []}
                size="small"
                type="primary"
                scroll={{ x: 400 }}
                rowClassName={() => 'rowClassName1 cursor-pointer'}
                pagination={false}
                locale={{
                  emptyText: (
                    <Spin />
                    // <div className="text-center flex justify-center items-center py-10">
                    //   <div>
                    //     <p className="text-lg">No data found!</p>
                    //     <img
                    //       className=""
                    //       src={SearchNotFound}
                    //       style={{ height: '100px' }}
                    //     />
                    //   </div>
                    // </div>
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
                      total={allClientList?.totalCount || 0}
                      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                      onChange={handleChangePagination}
                    />
                  </Row>
                )}
              />
            </div>
          </div>
        </>
      ) : (
        <PageLoading />
      )}
      <AddDrivers />
      {openModal && (
        <AddNewClient
          setUrl={setUrl}
          url={url}
          setOpenModal={setOpenModal}
          openModal={openModal}
          getAllClients={getAllClients}
          onEditClientModal={onEditClientModal}
          form={form}
          setButtonStatus={setButtonStatus}
          buttonStatus={buttonStatus}
          isQuickBookLoading={isQuickBookLoading}
          setIsQuickBookLoading={setIsQuickBookLoading}
        />
      )}
      {isopenModal?.randomServicesAgreement?.name === 'Random Services Agreement' && (
        <RandomService />
      )}
      {isopenModal?.CompanyClearingHouses?.name === 'Company Clearing House' && (
        <CompanyClearingHouse
          form={form}
          setClientId={setClientId}
          clientId={clientId}
          setServiceId={setServiceId}
          serviceId={serviceId}
          getAllClients={getAllClients}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          suggestedAddress={suggestedAddress}
          provinces={provinces}
          setProvinces={setProvinces}
          setSuggestedAddress={setSuggestedAddress}
          getAllCompanyClearingHouse={getAllCompanyClearingHouse}
        />
      )}
      {isopenModal?.DriverClearingHouses?.name === 'Driver Clearing House' && (
        <DriverClearingHouses
          setClientId={setClientId}
          clientId={clientId}
          setServiceId={setServiceId}
          serviceId={serviceId}
          selectedCountry={selectedCountry}
          form={form}
          getAllClients={getAllClients}
          setSelectedCountry={setSelectedCountry}
          suggestedAddress={suggestedAddress}
          provinces={provinces}
          setProvinces={setProvinces}
          setSuggestedAddress={setSuggestedAddress}
          getAllDriverClearingHouse={getAllDriverClearingHouse}
        />
      )}
      {isopenModal?.ConfirmModal?.name === 'Confirm Modal' && <ConfirmModal />}
    </>
  );
};

export default connect(({ rides, loading, loadingForRides, client, count }) => ({
  ridesList: rides?.ridesList,
  allClientList: client?.allClientList,
  countList: count?.countList,
  singleClientDetails: client?.singleClientDetails,
}))(DashBoard);
