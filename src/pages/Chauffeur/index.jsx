import React, { useEffect } from 'react';
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
  Form,
  Tag,
  Spin,
} from 'antd';
import { connect, useParams, history } from 'umi';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import {
  CheckCircleOutlined,
  CheckOutlined,
  DownOutlined,
  SearchOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import ApproveChauffeur from './ApproveChauffeur';
import { useState } from 'react';
import { debounce } from 'lodash';
import AssignVehicle from './AssignVehicle';

const { TabPane } = Tabs;

const Chaffeur = ({ dispatch, loading, chauffeurList, vehiclesList }) => {
  const [form] = Form.useForm();
  const { tabName } = useParams();
  const [isAddModalVisible, setAddModalVisible] = useState({ modal: false, id: '' });
  const [isAssignModalVisible, setAssignModalVisible] = useState({ modal: false, id: '' });
  const [keyword, setKeyword] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllChauffeur = () => {
    dispatch({
      type: 'chauffeur/getAllChauffeur',
      payload: {
        query: {
          type: tabName === 'all' ? '' : tabName,
          keyword,
          startIndex,
        },
      },
    });
  };
  const verifyChauffeur = (id, value) => {
    dispatch({
      type: 'chauffeur/verifyChauffeur',
      payload: {
        body: { status: value, chauffeurID: id },
      },
    }).then((res) => {
      if (res?.message === 'Status Updated Successfully') {
        message.success('Chauffeur has been deactivted successfully');
        getAllChauffeur();
      }
    });
  };
  const getColor = (val) => {
    switch (val) {
      case 'Verified':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'Deactivated':
        return 'red';
      default:
        return 'orange';
    }
  };
  function formatPhoneNumber(phoneNumberString) {
    const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }

  useEffect(() => {
    dispatch({
      type: 'vehicles/getAllVehicles',
      payload: {
        query: { assignVehicle: true },
      },
    });
    getAllChauffeur();
  }, [tabName, keyword, startIndex, viewSize]);

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }

  const onAssignVehicle = (id) => {
    setAssignModalVisible({ modal: 'true', id: id });
  };
  const changeStatus = (record) => {};

  const tabs = [
    {
      title: 'All',
      key: 'all',
    },
    {
      title: 'Verified',
      key: 'Verified',
    },
    {
      title: 'Pending',
      key: 'Pending',
    },
    {
      title: 'Rejected',
      key: 'Rejected',
    },
    {
      title: 'Deactivated',
      key: 'Deactivated',
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'License No.',
      dataIndex: 'licenseNo',
      key: 'licenseNo',
      render: (record) => <div>{record ? record : 'N/A'}</div>,
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicle',
      key: 'vehicle',
      render: (__, record) => (
        <div className="flex ">
          {record?.vehicle?.vehicleLogo ? (
            <div className="mr-1">
              {' '}
              <img src={record?.vehicle?.vehicleLogo?.url} width="20px" height="20px" alt="" />{' '}
            </div>
          ) : (
            <div></div>
          )}

          {record?.vehicle?.vehicleName || 'N/A'}
        </div>
      ),
    },
    {
      title: 'Contact No.',
      dataIndex: 'phone',
      key: 'phoneNumber',
      render: (record) => <div>{formatPhoneNumber(record)}</div>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'isVerified',
      key: 'status',
      render: (record) => <Tag color={getColor(record)}>{record}</Tag>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',

      render: (_, record) => (
        <div>
          {tabName === 'Verified' ? (
            <div className="flex justify-start">
              <Button
                onClick={() => {
                  verifyChauffeur(record?._id, 'Deactivated');
                }}
                type="primary"
                className="mr-4"
              >
                Deactivate
              </Button>
              {!!record?.vehicleId == true ? (
                <></>
              ) : (
                <Button onClick={() => onAssignVehicle(record?._id)} type="primary">
                  Assign Vehicle
                </Button>
              )}
            </div>
          ) : (
            <span onClick={() => setAddModalVisible({ modal: true, id: record?._id })}>
              {chauffeurList?.data?.isVerified === 'Verified' ? (
                <CheckCircleOutlined className="text-xl ml-8" />
              ) : (
                <Button type="primary">Change Status</Button>
              )}{' '}
            </span>
          )}
        </div>
      ),
    },
  ];
  const action = (text) => {
    setKeyword(text);
  };
  const debounceSearch = debounce(action, 400);

  return (
    <>
      <Page
        title="Chauffeur"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Chauffeur',
                path: '#',
              },
            ]}
          />
        }
      >
        {' '}
        <div className="bg-white ">
          <Tabs
            activeKey={tabName}
            onTabClick={(key) => {
              history.push(`/chauffeur/${key}`);
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
                        onChange={(e) => {
                          debounceSearch(e.target.value);
                        }}
                      />
                    </div>
                    <Divider />
                    <Spin size="large" spinning={loading}>
                      {' '}
                      <Table
                        className="no-shadow zcp-fixed-w-table"
                        rowClassName="cursor-pointer"
                        pagination={false}
                        loading={Boolean(loading)}
                        scroll={{ x: 1000 }}
                        columns={
                          tabName === 'all'
                            ? columns?.filter((item) => item?.key !== 'changeStatus')
                            : columns
                        }
                        dataSource={chauffeurList?.data || []}
                        locale={{
                          emptyText: (
                            <div className="text-center flex justify-center items-center py-10 ">
                              <div>
                                <p className="text-lg">No Chauffeur found!</p>
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
                              total={chauffeurList?.totalCount || 0}
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
        <ApproveChauffeur
          setVisible={setAddModalVisible}
          visible={isAddModalVisible}
          form={form}
          getAllChauffeur={getAllChauffeur}
        />
        <AssignVehicle
          setVisible={setAssignModalVisible}
          visible={isAssignModalVisible}
          vehiclesList={vehiclesList}
          getAllChauffeur={getAllChauffeur}
        />
      </Page>
    </>
  );
};
export default connect(({ chauffeur, vehicles, loading }) => ({
  chauffeurList: chauffeur?.chauffeurList,
  vehiclesList: vehicles?.vehiclesList,
  loading: loading.effects['chauffeur/getAllChauffeur'],
}))(Chaffeur);
