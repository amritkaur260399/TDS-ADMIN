import Breadcrumbs from '@/components/BreadCrumbs';
import Page from '@/components/Page';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import { Button, Col, Divider, Input, message, Modal, Pagination, Row, Spin, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { connect } from 'umi';
import moment from 'moment';

const Complaints = ({ loading, dispatch, feedbackList }) => {
  const { TextArea } = Input;
  const [searchText, setSearchText] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [viewSize, setViewSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackModal, setFeedbackModal] = useState({ visible: false, id: '' });
  const [response, setResponse] = useState('');

  function handleChangePagination(current) {
    setStartIndex(viewSize * (current - 1));
    setCurrentPage(current);
  }
  const action = (val) => {
    setSearchText(val);
    setStartIndex(0);
  };
  const getAllFeedbacks = () => {
    dispatch({
      type: 'feedbacks/getAllFeedback',
      payload: {
        query: {
          startIndex,
          viewSize,
          keyword: searchText,
        },
      },
    });
  };
  useEffect(() => {
    getAllFeedbacks();
  }, [startIndex, viewSize, searchText, currentPage]);
  const addResponse = (id) => {
    dispatch({
      type: 'feedbacks/addResponse',
      payload: {
        body: {
          feedbackId: id,
          response: response,
        },
      },
    })
      .then((response) => {
        getAllFeedbacks();
        setFeedbackModal({ visible: false, id: '' });
        message.success('Response sent successfully!');
        setResponse('');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  const debounceSearch = debounce(action, 500);
  const columns = [
    {
      title: 'Customer Name',
      key: 'customerName',
      dataIndex: 'customerName',
      width: 150,
      render: (_, record) => <div>{record?.customerName}</div>,
    },
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'createdAt',
      width: 120,
      render: (record) => <div>{moment(record).format('ll')}</div>,
    },
    {
      title: 'Feedback',
      key: 'feedback',
      dataIndex: 'feedback',
      width: 400,
    },

    {
      title: 'Action',
      align: 'center',
      width: 160,
      render: (__, record) => (
        <>
          <div className="">
            <Button
              type="primary"
              onClick={() => setFeedbackModal({ visible: true, id: record?._id })}
            >
              Respond
            </Button>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <Page
        title="Complaints"
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Complaints',
                path: '#',
              },
            ]}
          />
        }
      >
        <div className="bg-white ">
          <div>
            <div className="px-5 pt-5 flex gap-5 ">
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
                pagination={false}
                loading={Boolean(loading)}
                dataSource={feedbackList?.data}
                scroll={{ x: 1000 }}
                columns={columns}
                locale={{
                  emptyText: (
                    <div className="text-center flex justify-center items-center py-10">
                      <div>
                        <p className="text-lg">No rides found!</p>
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
                      total={feedbackList?.count}
                      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                      onChange={handleChangePagination}
                    />
                  </Row>
                )}
              />
            </Spin>
          </div>
        </div>
        <Modal
          title={
            <span style={{ color: '#10181e' }} className="font-medium">
              Respond to Complaint
            </span>
          }
          closable={false}
          footer={null}
          width={800}
          open={feedbackModal.visible}
        >
          <div>
            <Row gutter={16}>
              <Col xs={48} sm={48} md={24} lg={24} xl={24}>
                <TextArea
                  rows={4}
                  style={{ fontSize: '18px' }}
                  onChange={(e) => setResponse(e.target.value)}
                />
              </Col>
            </Row>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                size="large"
                onClick={() => {
                  setFeedbackModal({ visible: false, id: '' });
                }}
              >
                Back
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={() => addResponse(feedbackModal.id)}
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      </Page>
    </>
  );
};

export default connect(({ feedbacks, loading }) => ({
  feedbackList: feedbacks?.feedbackList,
  loading: loading.effects['feedbacks/getAllFeedback'],
}))(Complaints);
