import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
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
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { connect, Link } from 'umi';

import { SmileOutlined } from '@ant-design/icons';

import {
  IncrementIcon,
  DecrementIcon,
  RoadIcon,
  EarningsIcon,
  UsersIcon,
  CarsIcon,
  SimpleRoad,
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
import { addressJotai, modalsJotai } from '@/utils/globalStates/modals';
import AddDrivers from '@/components/AddDrivers';
import RandomService from '@/components/RandomServices';
import AddClearingHouse from '@/components/AddClearingHouses';
import CompanyClearingHouse from '@/components/CompanyClearingHouse';
import DriverClearingHouses from '@/components/DriverClearingHouses';
import ConfirmModal from '@/components/ConfirnModal';
import ProfileDetails from '../ProfileDetails';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';

// const DemoBox = (props) => <p className={`height-${props.value}`}>{props.children}</p>;

const Clients = ({ dispatch, loading, loadingForRides, allClientList }) => {
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

  useEffect(() => {
    getAllClients();
    getAllCompanyClearingHouse();
    getAllDriverClearingHouse();
  }, [searchText, dataType, startIndex, currentPage]);

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
    }).then((res) => console.log('res21321321321', res));
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
    // console.log('id', id);

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

      form?.setFieldsValue({
        ...res?.data,
        services: arr,
      });
    });
  };
  // console.log('Amrit');

  const onDeleteClient = (id) => {
    console.log('id', id);
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
    }).then((res) => console.log('res21321321321', res));
  };

  const columns = [
    {
      title: 'Client ID',
      key: 'clientID',
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
          {/* {console.log('records545465', records?.designated?.map((item)=>item?.designatedRepresentativeFirstName))} */}
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
      // dataIndex: 'email',
      // width: 250,

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
      // width: 100,
      render: (records) => (
        <>
          <div className="flex justify-center items-center">
            <div
              className="mr-4"
              onClick={() => {
                onEditClientModal(records?._id);
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
                title="Are you sure you want to delete Client details?"
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={() => {
                  onDeleteClient(records?._id);
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

  return (
    <Page
      title="Clients"
      PrevNextNeeded="N"
      breadcrumbs={
        <Breadcrumbs
          path={[
            {
              name: 'Dashboard',
              path: '/dashboard',
            },
            {
              name: 'Clients',
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
            setOpenModal(true);
            setButtonStatus('');
          }}
        >
          Add New Client
        </Button>
      }
    >
      <div
        style={{
          width: '100%',
        }}
      >
        {/* </Spin> */}

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
                // onSearchChange(e.target.value);
              }}
            />
            <Dropdown overlay={itemsFilter} trigger={'click'} className="mr-5 ml-5">
              <Button>
                <Space>
                  Filters
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            {/* <Dropdown overlay={itemsSort} trigger={'click'}>
            <Button>
              <Space>
                Sort
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown> */}
            {/* <Dropdown.Button trigger={'click'} overlay={itemsFilter} className="rounded-md border-3 ">
              <a>
                Filters<DownOutlined />
              </a>
            </Dropdown.Button> */}

            {/* <div className=''>
            <Dropdown.Button trigger={'click'} overlay={itemsSort} className="rounded-md border-3 ">
              <a>
                Sort by <DownOutlined />
              </a>
            </Dropdown.Button>
          </div> */}
          </div>

          <div className="pt-3 pb-5 mx-5">
            <Table
              columns={columns}
              dataSource={allClientList?.data || []}
              size="small"
              type="primary"
              rowClassName={() => 'rowClassName1 cursor-pointer'}
              // style={{border:"80px"}}
              pagination={false}
              // rowClassName="cursor-pointer"
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
        <AddDrivers />
        {openModal && (
          <AddNewClient
            // setImage={setImage}
            // image={image}
            setUrl={setUrl}
            url={url}
            setOpenModal={setOpenModal}
            openModal={openModal}
            getAllClients={getAllClients}
            onEditClientModal={onEditClientModal}
            form={form}
            setButtonStatus={setButtonStatus}
            buttonStatus={buttonStatus}
            // setTitlestatus={setTitlestatus}
            // titleStatus={titleStatus}
          />
        )}
        {/* {isopenModal?.randomServicesAgreement?.name === 'Random Services Agreement' && (
        <RandomService />
      )}
      {isopenModal?.CompanyClearingHouses?.name === 'Company Clearing House' && (
        <CompanyClearingHouse
          form={form}
          // buttonStatus={buttonStatus}
          // getAllCompanyClearingHouse={getAllCompanyClearingHouse}
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
          // buttonStatus={buttonStatus}
          setSelectedCountry={setSelectedCountry}
          suggestedAddress={suggestedAddress}
          provinces={provinces}
          setProvinces={setProvinces}
          setSuggestedAddress={setSuggestedAddress}
          getAllDriverClearingHouse={getAllDriverClearingHouse}
        />
      )} */}
        {/* {
        // <ProfileDetails onEditClientModal={ onEditClientModal}/>
      } */}
      </div>
    </Page>
  );
};

export default connect(({ client, count }) => ({
  allClientList: client?.allClientList,
  countList: count?.countList,
  singleClientDetails: client?.singleClientDetails,
}))(Clients);
