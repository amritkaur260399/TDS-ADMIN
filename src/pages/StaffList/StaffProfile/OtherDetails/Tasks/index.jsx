import React, { useState } from 'react';
import SearchNotFound from '../../../../../assets/icons/empty-search-contact.png';
import {
  Avatar,
  Badge,
  Divider,
  Input,
  message,
  Pagination,
  Popover,
  Row,
  Table,
  Tabs,
  Tag,
} from 'antd';
import { connect, useParams } from 'umi';
import { useEffect } from 'react';
import { debounce } from 'lodash';
import { returnColor, toTitleCase } from '@/pages/Tasks';
import moment from 'moment';
import { getInitials } from '@/utils/common';
import { MoreOutlined } from '@ant-design/icons';

const { Search } = Input;

const StaffTasks = ({ dispatch, staffTasksList, loading }) => {
  const { staffId } = useParams();
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [tabKey, setTabKey] = useState('ASSIGNED');
  const tabs = [
    {
      title: 'All',
      key: 'ALL',
      count: staffTasksList?.all,
    },
    {
      title: 'Assigned',
      key: 'ASSIGNED',
      count: staffTasksList?.assigned,
    },
    {
      title: 'Today',
      key: 'TODAY',
      count: staffTasksList?.today,
    },
    {
      title: 'Active',
      key: 'ACTIVE',
      count: staffTasksList?.active,
    },
    {
      title: 'Completed',
      key: 'COMPLETED',
      count: staffTasksList?.completed,
    },
    {
      title: 'Overdue',
      key: 'OVERDUE',
      count: staffTasksList?.overdue,
    },
  ];
  const getStaffTasks = () => {
    let status = '';
    if (tabKey !== 'all') {
      status = tabKey?.toLowerCase();
    }
    dispatch({
      type: 'staff/getStaffTasks',
      payload: {
        pathParams: {
          staffId,
        },
        query: {
          viewSize,
          startIndex,
          keyword,
          status,
        },
      },
    });
  };
  useEffect(() => {
    getStaffTasks();
  }, [viewSize, startIndex, keyword, tabKey]);

  const action = (value) => {
    setCurrentPage(1);
    setKeyword(value);
  };
  const onSearchChange = debounce(action, 600);
  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));

    setCurrentPage(current);
  }
  const columns = [
    {
      title: 'Sr no.',
      key: 'SRNO',
      align: 'center',
      width: 70,
      render: (_, __, index) => index + 1 + viewSize * (currentPage - 1),
    },
    {
      title: 'Task',
      key: 'TASKS',
      render: (_, record) => (
        <Popover
          title={<p className="font-medium text-blue-700 text-center m-0 w-48">{record?.title}</p>}
          content={
            <p className="font-medium text-gray-700 text-justify m-0 w-48">{record?.description}</p>
          }
        >
          <p className="font-medium text-gray-700  m-0 w-12 truncate">{record?.title}</p>
        </Popover>
      ),
    },
    {
      title: 'Assignee',
      key: 'ASSIGNEE',
      render: (_, record) => (
        <span className="flex">
          <>
            <Avatar.Group
              maxCount={1}
              size="large"
              onClick={(e) => e.stopPropagation()}
              maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
            >
              {record?.assignee?.map((items) => (
                <>
                  <Popover
                    key={items?.id}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    content={
                      <a className="flex gap-2 cursor-pointer">
                        <Avatar
                          className="uppercase font-medium"
                          style={{
                            backgroundColor: '#f56a00',
                          }}
                        >
                          {items?.firstName &&
                            getInitials(`${items?.firstName} ${items?.lastName}`)}
                        </Avatar>

                        <p className="mt-2 text-gray-900 font-medium">{`${items?.firstName} ${items?.lastName}`}</p>
                      </a>
                    }
                  >
                    <Avatar
                      className="uppercase font-medium"
                      style={{
                        backgroundColor: '#f56a00',
                        cursor: 'pointer',
                        fontSize: '11px',
                      }}
                      size={35}
                    >
                      {items?.firstName && getInitials(`${items?.firstName} ${items?.lastName}`)}
                    </Avatar>
                  </Popover>
                </>
              ))}
            </Avatar.Group>
          </>
        </span>
      ),
    },
    {
      title: 'Priority',
      key: 'PRIORITY',
      render: (_, record) => (
        <span>
          <Tag
            style={{ borderRadius: '10px', fontWeight: '500' }}
            color={returnColor(record?.priority)}
          >
            {toTitleCase(record?.priority)}
          </Tag>
        </span>
      ),
    },
    {
      title: 'Due date',
      key: 'DUEDATE',
      render: (_, record) =>
        record?.dueDate === undefined
          ? '--'
          : (record?.status !== 'completed' && (
              <Popover
                content={
                  record?.dueDate && (
                    <span
                      className={`font-medium text-sm ${
                        moment(record?.dueDate).isBefore(moment())
                          ? 'text-red-500'
                          : 'text-gray-900'
                      }`}
                    >
                      Due {moment(record?.dueDate).fromNow()}
                    </span>
                  )
                }
              >
                <span
                  className={`font-medium text-sm ${
                    moment(record?.dueDate).isBefore(moment()) ? 'text-red-500' : 'text-gray-900'
                  }`}
                >
                  {record?.dueDate && moment(record?.dueDate).format('Do MMM h:mm a')}
                </span>
              </Popover>
            )) || (
              <span
                className={`font-medium text-sm text-gray-900'
            `}
              >
                {record?.dueDate && moment(record?.dueDate).format('Do MMM h:mm a')}
              </span>
            ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <span>
          <Tag
            style={{ borderRadius: '10px', fontWeight: '500' }}
            color={returnColor(record?.status)}
          >
            {toTitleCase(record?.status)}
          </Tag>
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'ACTIONS',
      render: (_, record) =>
        (!moment(record?.dueDate).isBefore(moment()) && record?.status === 'assigned') ||
        record?.status === 'active' ? (
          <Popover
            content={
              record?.status === 'assigned' ? (
                <a
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch({
                      type: 'staff/changeTaskStatus',
                      payload: {
                        body: {
                          status: 'active',
                        },
                        pathParams: {
                          taskId: record?._id,
                        },
                      },
                    }).then((res) => {
                      if (res?.data?._id) {
                        message.success('Task was successfully updated');
                        setTabKey('active');
                      }
                    });
                  }}
                >
                  Mark as in process
                </a>
              ) : (
                (record?.status === 'active' && (
                  <a
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      dispatch({
                        type: 'staff/changeTaskStatus',
                        payload: {
                          body: {
                            status: 'completed',
                          },
                          pathParams: {
                            taskId: record?._id,
                          },
                        },
                      }).then((res) => {
                        if (res?.data?._id) {
                          message.success('Task was successfully updated');
                          setTabKey('completed');
                        }
                      });
                    }}
                  >
                    Mark as complete
                  </a>
                )) ||
                null
              )
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
            trigger={'click'}
            placement="bottomRight"
            overlayClassName={`p-0`}
          >
            <a
              className="text-gray-900"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <MoreOutlined className="text-gray-900 " />
            </a>
          </Popover>
        ) : null,
    },
  ];
  return (
    <>
      <div className="bg-white ">
        <Tabs
          activeKey={tabKey?.toUpperCase()}
          onTabClick={(key) => {
            setTabKey(key?.toLowerCase());
            setCurrentPage(1);
            setStartIndex(0);
          }}
        >
          {tabs?.map((tab) => (
            <Tabs.TabPane
              tab={
                <Badge
                  count={tab?.count}
                  style={{
                    fontSize: '10px',
                    backgroundColor: '#126E32',
                    padding: '0px 4px 0px 4px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    width: '28px',
                  }}
                  size="small"
                  offset={[6, 0]}
                >
                  <span className="px-4">{tab?.title}</span>
                </Badge>
              }
              key={tab?.key}
            >
              {tab?.key === tabKey?.toUpperCase() && (
                <>
                  <div className="px-5 pb-4">
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
                  <Table
                    loading={Boolean(loading)}
                    className="no-shadow zcp-fixed-w-table"
                    rowClassName="cursor-pointer"
                    pagination={false}
                    dataSource={staffTasksList?.data}
                    scroll={{ x: 600 }}
                    columns={columns?.filter((item) => {
                      if (tabKey === 'completed' || tabKey === 'overdue') {
                        return item?.key !== 'ACTIONS' && item?.key !== 'status';
                      }
                      if (tabKey !== 'all') {
                        return item?.key !== 'status';
                      }
                      return true;
                    })}
                    locale={{
                      emptyText: (
                        <div className="text-center flex justify-center items-center py-10">
                          <div>
                            <p className="text-lg">No task found yet!</p>
                            <img
                              className=""
                              src={SearchNotFound}
                              alt="No task found yet!"
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
                          total={staffTasksList?.count}
                          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                          onChange={handleChangePagination}
                        />
                      </Row>
                    )}
                  />{' '}
                </>
              )}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default connect(({ staff, loading }) => ({
  staffTasksList: staff?.staffTasksList,
  loading: loading?.effects['staff/getStaffTasks'],
}))(StaffTasks);
