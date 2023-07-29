import {
  Button,
  Divider,
  Form,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Spin,
  Table,
  message,
} from 'antd';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { useAtom } from 'jotai';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { useEffect, useState } from 'react';
import React from 'react';
import { connect } from 'umi';
import { debounce } from 'lodash';
import { modalsJotai } from '@/utils/globalStates/modals';
import AddUsers from '@/components/AddUsers';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import Verifypassword from '@/components/Verifypassword';
// import { addUser } from '@/utils/endpoints/addUser';
// import { getSingleUser } from '@/services/addUser';

const AddUser = ({ dispatch, usersList, singleUser }) => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [editUser, setEditUser] = useState();
  const [tab, setTab] = useState('ALL');
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [isopenModal, setIsopenModal] = useAtom(modalsJotai);
  const [data, setData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState('');

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }
  const getAllUsers = () => {
    dispatch({
      type: 'addUser/getAllUsers',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword: searchText,
        },
      },
    }).then((res) => console.log('res', res));
  };
  console.log('data111', data?._id);

  useEffect(() => {
    getAllUsers();
  }, [searchText, startIndex, currentPage]);

  console.log('getSingleUser123456', getSingleUser);
  const getSingleUser = (id) => {
    dispatch({
      type: 'addUser/getSingleUser',
      payload: {
        pathParams: { id },
      },
    }).then((res) => {
      setButtonStatus(res?.data);
      console.log(res, 'res');
      form?.setFieldsValue({
        ...res?.data,
      });
      // setEditUser(id);
    });
  };

  const onDeleteUser = (id) => {
    console.log('id', id);
    dispatch({
      type: 'addUser/deleteUser',
      payload: {
        pathParams: { id: id },
      },
    }).then((res) => {
      getAllUsers();
      console.log('res', res);
      // message.success('Driver deleted!');
      if (res) {
        message.success('User deleted successfully!');
      } else {
        message.error('An error occured!');
      }
    });
  };

  const columns = [
    {
      title: 'SNo',
      key: 'sno',
      // dataIndex: 'sno',
      width: 40,
      render: (_, __, index) => <div> {index + 1 + viewSize * (currentPage - 1)}</div>,
    },
    // {
    //   title: 'User Name',
    //   key: 'userName',
    //   dataIndex: 'userName',
    //   width: 70,
    //   // render: (record) => <div className="">{record}</div>,
    //   // width:120,
    // },
    {
      title: 'First Name',
      key: 'firstName',
      dataIndex: 'firstName',
      width: 70,
      // render: (record) => <div className="">{record}</div>,
      // width:120,
    },
    {
      title: 'Last Name',
      key: 'lastName',
      dataIndex: 'lastName',
      width: 100,
      // render: (record) => <div className="">{record}</div>,
      // width:120,
    },
    {
      title: 'Phone Number',
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
      width: 70,
      // render: (records) => <div>{records}</div>,
    },

    {
      title: 'Email Address',
      key: 'email',
      dataIndex: 'email',
      width: 70,
    },

    {
      title: 'Action',
      align: 'center',
      width: 60,

      render: (record) => (
        <>
          <div className="flex justify-center items-center">
            {/* <div
              className="mr-4"
              onClick={() => {
                setIsopenModal({
                  ...isopenModal,
                  addUser: { name: 'Add User', open: true },
                });
                getSingleUser(record?._id);
              }}
              // onClick={() => {
              //   getSingleUser(records?._id);
              // }}
            >
              <a type="primary">
                <span className="text-blue-700">
                  <EditOutlined />
                </span>
              </a>
            </div> */}
            <div className="">
              <Popconfirm
                title="Are you sure you want to delete User details?"
                okText="Yes"
                okType="primary"
                cancelText="No"
                onConfirm={() => {
                  onDeleteUser(record?._id);
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
  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const debounceSearch = debounce(action, 500);

  return (
    <div>
      <Page
        title="Add User"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Add User',
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
                addUser: { name: 'Add User', open: true },
              });
              setButtonStatus('');
            }}
          >
            Add User
          </Button>
        }
      >
        <div className="bg-white ">
          <div>
            <div className="px-5 pt-5 flex gap-5 ">
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
            <Divider />
            <Spin size="large" spinning={''}>
              {' '}
              <div className="mx-10">
                <Table
                  className="no-shadow zcp-fixed-w-table"
                  rowClassName="cursor-pointer"
                  pagination={false}
                  // loading={Boolean(loading)}
                  dataSource={usersList?.data}
                  scroll={{ x: 800 }}
                  columns={columns}
                  onRow={(e) => ({
                    onClick: () => setData(e),
                  })}
                  locale={{
                    emptyText: (
                      <div className="text-center flex justify-center items-center py-10">
                        <div>
                          <p className="text-lg">No data found!</p>
                          <img className="" src={SearchNotFound} style={{ height: '100px' }} />
                        </div>
                      </div>
                    ),
                  }}
                  footer={() => (
                    // <CheckValidation show={vehiclesList?.count > 5}>
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
                        total={usersList?.totalCount || 0}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        onChange={handleChangePagination}
                      />
                    </Row>
                    // </CheckValidation>
                  )}
                />
              </div>
            </Spin>
          </div>
        </div>
        <AddUsers
          form={form}
          data={data}
          getAllUsers={getAllUsers}
          buttonStatus={buttonStatus}
          setButtonStatus={setButtonStatus}

          // setEditUser={setEditUser}
          // // editUser={editUser}
          // getSingleUser={getSingleUser}
        />
        <Verifypassword getAllUsers={getAllUsers} />
      </Page>
    </div>
  );
};
export default connect(({ loading, addUser }) => ({
  usersList: addUser?.usersList,
  // loading: loading.effects['vehicles/getAllVehicles'],
  singleUser: addUser?.singleUser,
  deleteUser: addUser?.deleteUser,
}))(AddUser);
