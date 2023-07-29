import React, { useState } from 'react';
import {
  Button,
  Table,
  Input,
  Tabs,
  Divider,
  Row,
  Pagination,
  Popconfirm,
  message,
  Modal,
  Form,
  Spin,
} from 'antd';
import { connect } from 'umi';
import { Link, useParams, history } from 'umi';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { columns, tabs } from './StaffStaticData';

import { useEffect } from 'react';
import { debounce } from 'lodash';
import CheckValidation from '@/components/CheckValidation';
import EditProfileForm from './EditProfileForm';
import { getAllStaff } from '@/services/staff';

const { Search } = Input;

const StaffList = ({ dispatch, staffList, loading }) => {
  const [form] = Form.useForm();
  const { tabName } = useParams();
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const { TabPane } = Tabs;
  const [editProfileModal, setEditProfileModal] = useState({ visible: false, data: [] });

  const getStaffList = () => {
    const query = {
      viewSize,
      startIndex,
      keyword,
    };
    if (tabName !== 'all') {
      query.status = tabName;
    }

    dispatch({
      type: 'staff/getAllStaff',
      payload: { query },
    });
  };
  useEffect(() => {
    getStaffList();
  }, [viewSize, startIndex, keyword, tabName]);
  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }
  const action = (value) => {
    setCurrentPage(1);
    setKeyword(value);
    setStartIndex(0);
  };
  const onSearchChange = debounce(action, 600);
  const handleEdit = (record) => {
    setEditProfileModal({ visible: true, data: record });
    if (editProfileModal?.data) {
      form.setFieldsValue({
        firstName: record?.firstName,
        lastName: record?.lastName,
        email: record?.email,
        countryCode: record?.phoneNumber?.countryCode,
        phoneNo: record?.phoneNumber?.number,
        role: record?.role,
        address_line_1: record?.address?.address_line_1,
        address_line_2: record?.address?.address_line_2,
        city: record?.address?.city,
        country: record?.address?.country,
        state: record?.address?.state,
        postal_code: record?.address?.postal_code,
      });
    }
  };
  const srno = {
    title: 'Sr.no.',
    dataIndex: 'srno',
    align: 'center',
    width: 50,
    render: (_, __, index) => (
      <div className="font-medium">{index + 1 + viewSize * (currentPage - 1)}</div>
    ),
  };
  const onFinish = (values) => {
    const body = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      phoneNumber: {
        countryCode: values?.countryCode,
        number: values?.phoneNo,
      },
      address: {
        address_line_1: values?.address_line_1,
        address_line_2: values?.address_line_2,
        country: values?.country,
        state: values?.state,
        city: values?.state,
        postal_code: values?.postal_code,
      },
      role: values?.role,
    };

    dispatch({
      type: 'staff/updateStaffProfile',
      payload: {
        body: body,
        pathParams: { id: editProfileModal?.data?._id },
      },
    })
      .then((res) => {
        message.success('Profile updated successfully');
        form.resetFields();
        setEditProfileModal({ visible: false, id: '' });
        getStaffList();
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  const Edit = {
    title: 'Edit',
    dataIndex: 'edit',
    key: 'edit',
    render: (__, record) =>
      record?.isActive === true ? (
        <span
          className="ml-2"
          onClick={() => {
            handleEdit(record);
          }}
        >
          <EditOutlined style={{ color: 'blue' }} />
        </span>
      ) : (
        <div>N/A</div>
      ),
  };
  const actions = {
    title: 'Actions',
    render: (_, record) => (
      <div onClick={(e) => e.stopPropagation()}>
        {record?.isActive ? (
          <Popconfirm
            title="Are you sure you want to disable this staff?"
            okText="Disable"
            onConfirm={() =>
              dispatch({
                type: 'staff/changeStatus',
                payload: {
                  pathParams: { id: record?._id },
                  body: {
                    isActive: false,
                  },
                },
              }).then((res) => {
                if (res?.data?._id) {
                  message.success('Staff has been disabled');
                  history.push('/staff/type/active');
                }
              })
            }
          >
            <Button size="small" type="primary">
              Disable
            </Button>
          </Popconfirm>
        ) : (
          record?.status !== 'awaiting' && (
            <Popconfirm
              title="Are you sure you want to enable this staff?"
              okText="Enable"
              onConfirm={() =>
                dispatch({
                  type: 'staff/changeStatus',
                  payload: {
                    pathParams: { id: record?._id },
                    body: {
                      isActive: true,
                    },
                  },
                }).then((res) => {
                  if (res?.data?._id) {
                    message.success('Staff has been enabled successfully');
                    history.push('/staff/type/active');
                  }
                })
              }
            >
              <Button size="small" type="danger">
                Enable
              </Button>
            </Popconfirm>
          )
        )}
        {record?.status === 'awaiting' && (
          <span className="text-blue-600 font-medium">Invited</span>
        )}
      </div>
    ),
  };

  return (
    <>
      <Page
        title="Staff"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Staff',
                path: '#',
              },
            ]}
          />
        }
        primaryAction={
          <Link
            to={{
              pathname: '/staff/invite',
            }}
          >
            <Button type="primary" style={{ display: 'flex', alignItems: 'center' }} id="open">
              Invite staff <ArrowRightOutlined />
            </Button>
          </Link>
        }
      >
        {' '}
        <div className="bg-white ">
          <Tabs
            activeKey={tabName?.toUpperCase()}
            onTabClick={(key) => {
              history.push(`/staff/${key?.toLowerCase()}`);
              setStartIndex(0);
              setCurrentPage(1);
              setKeyword('');
            }}
          >
            {tabs?.map((tab) => (
              <TabPane tab={<span className="px-4">{tab?.title}</span>} key={tab?.key}>
                {tab?.key === tabName?.toUpperCase() && (
                  <div key={tab?.key}>
                    <div className=" pb-4 mr-16 ml-2 ">
                      <Search
                        size="large"
                        placeholder="Enter keyword here to search..."
                        enterButton
                        onChange={(e) => {
                          onSearchChange(e.target.value);
                        }}
                      />
                    </div>
                    <Divider />
                    <Spin size="large" spinning={loading}>
                      <Table
                        className="no-shadow zcp-fixed-w-table"
                        rowClassName="cursor-pointer"
                        pagination={false}
                        dataSource={staffList?.data}
                        scroll={{ x: 1000 }}
                        columns={
                          tabName === 'all'
                            ? [srno, ...columns, Edit, actions]
                            : [
                                srno,
                                ...columns?.filter((item) => item?.key !== 'status'),
                                Edit,
                                actions,
                              ]
                        }
                        locale={{
                          emptyText: (
                            <div className="text-center flex justify-center items-center py-10">
                              <div>
                                <p className="text-lg">No staff member found!</p>
                                <img
                                  className=""
                                  src={SearchNotFound}
                                  alt="No staff member found!"
                                  style={{ height: '100px' }}
                                />
                              </div>
                            </div>
                          ),
                        }}
                        footer={() => (
                          <CheckValidation show={staffList?.count > 5}>
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
                                total={staffList?.count}
                                showTotal={(total, range) =>
                                  `${range[0]}-${range[1]} of ${total} items`
                                }
                                onChange={handleChangePagination}
                              />
                            </Row>
                          </CheckValidation>
                        )}
                      />
                    </Spin>
                  </div>
                )}
              </TabPane>
            ))}
          </Tabs>
        </div>
        <Modal
          open={editProfileModal?.visible}
          title="Edit Profile"
          closable={false}
          maskClosable={false}
          onCancel={() => {
            setEditProfileModal({ visible: false, data: '' });
          }}
          footer={null}
        >
          <Form
            requiredMark={false}
            layout="vertical"
            form={form}
            onFinish={onFinish}
            name="createRide"
          >
            <EditProfileForm
              form={form}
              editProfileModal={editProfileModal}
              setEditProfileModal={setEditProfileModal}
            />
          </Form>
        </Modal>
      </Page>
    </>
  );
};
export default connect(({ staff, loading }) => ({
  staffList: staff?.staffList,
  loading: loading?.effects['staff/getAllStaff'],
}))(StaffList);
