import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { connect } from 'umi';
import { getInitials } from '@/utils/common';
import { DeleteOutlined, EnvironmentOutlined, PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const ProfileDetails = ({ dispatch }) => {
  const [notesForm] = Form.useForm();
  const { id } = useParams();
  const [data, setData] = useState('');
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  const currentUserDetails = JSON.parse(localStorage.getItem('currentUser_details'))?.firstName;

  const getSingleClientDetails = () =>
    dispatch({
      type: 'client/getSingleClientDetails',
      payload: {
        pathParams: { id: id },
      },
    }).then((res) => {
      setData(res);
    });

  useEffect(() => {
    getSingleClientDetails();
  }, [id, isNotesModalOpen]);

  const Item = ({ data, value }) => (
    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} className="mt-4">
      <div style={{ lineHeight: '15px   !important' }}>
        <p className="m-0 text-gray-600 font-semibold text-sm whitespace-nowrap">{data}</p>
        <p className="m-0 text-blue-900 font-semibold w-full" style={{ fontSize: '1rem' }}>
          {value}
        </p>
      </div>
    </Col>
  );

  const dataREprentative = data?.data?.designated.map((item) => item);

  const onFinish = (values) => {
    const notes = {
      clientId: id,
      subject: values?.notes,
    };
    dispatch({
      type: 'client/addNotes',
      payload: {
        body: notes,
      },
    })
      .then((res) => {
        if (res?.success) {
          message.success('Notes Added Successfully');
          notesForm.resetFields();
          setIsNotesModalOpen(false);
        } else {
          message.error('An error occured!');
        }
      })
      .catch((err) => console.log('er465465r', err));
  };

  const onDeleteNotes = (noteId) => {
    dispatch({
      type: 'client/deleteNotes',
      payload: {
        pathParams: { id: noteId },
      },
    }).then((res) => {
      if (res) {
        message.success('Notes deleted!');
        getSingleClientDetails();
      } else {
        message.error('An error occured!');
      }
    });
  };

  const people = [
    {
      name: 'Jane Cooper',
      title: 'Regional ',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image: 'https://bit.ly/33HnjK0',
    },
    {
      name: 'John Doe',
      title: 'Regional ',
      department: 'Optimization',
      role: 'Tester',
      email: 'john.doe@example.com',
      image: 'https://bit.ly/3I9nL2D',
    },
    {
      name: 'Veronica Lodge',
      title: 'Regional ',
      department: 'Optimization',
      role: ' Software Engineer',
      email: 'veronica.lodge@example.com',
      image: 'https://bit.ly/3vaOTe1',
    },
    {
      name: 'Veronica Lodge',
      title: 'Regional ',
      department: 'Optimization',
      role: ' Software Engineer',
      email: 'veronica.lodge@example.com',
      image: 'https://bit.ly/3vaOTe1',
    },
    {
      name: 'Veronica Lodge',
      title: 'Regional ',
      department: 'Optimization',
      role: ' Software Engineer',
      email: 'veronica.lodge@example.com',
      image: 'https://bit.ly/3vaOTe1',
    },
    // More people...
  ];

  return (
    <>
      <div
        className="text-center flex items-center justify-center mb-4"
        style={{ background: '#0b355f', height: '50px', color: 'white', fontSize: '25px' }}
      >
        View Profile
      </div>

      <div className="px-3 ">
        <div className="w-full flex">
          <div style={{ width: '25%' }}>
            <div className="mb-2 text-blue-900 font-semibold text-xl">Basic Details</div>
            <div
              className="bg-white border border-gray-200 rounded-lg shadow p-2"
              style={{ height: '240px' }}
            >
              <div className="flex items-center justify-center mb-4 ">
                <Avatar className="AvatarBg  text-center  " size={100}>
                  <span className="" style={{ fontSize: '20px' }}>
                    {getInitials(data?.data?.motorCarrierName)}
                  </span>
                </Avatar>
              </div>
              <div className="text-base">
                <div className="mb-1 font-medium text-gray-900 dark:text-white flex justify-between">
                  <div>Motor Carrier Name</div>{' '}
                  <div className=" text-gray-600 dark:text-gray-400 ml-10">
                    {data?.data?.motorCarrierName}
                  </div>
                </div>
                <div className="mb-1 font-medium text-gray-900 dark:text-white flex justify-between">
                  <div>Email</div>{' '}
                  <div className=" text-gray-600 dark:text-gray-400">
                    {data?.data?.billingEmail}
                  </div>
                </div>
                <div className="mb-1 font-medium text-gray-900 dark:text-white flex justify-between">
                  <div>Phone</div>{' '}
                  <div className="text-gray-600 dark:text-gray-400">
                    {data?.data?.billingContact}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-4" style={{ width: '20%' }}>
            <div className="mb-2 text-blue-900 font-semibold text-xl">Mailing Address</div>
            <div
              className="w-full bg-white p-6 border border-gray-200 rounded-lg shadow text-base"
              style={{ height: '240px' }}
            >
              <div className="mb-1  font-medium text-gray-900 dark:text-white flex justify-between">
                <div>Address1</div>
                <div className=" text-gray-600 dark:text-gray-400">
                  {data?.data?.mailingAddress1}
                </div>
              </div>
              <div className="mb-1  font-medium text-gray-900 dark:text-white flex justify-between">
                <div>Address2</div>
                <div className=" text-gray-600 dark:text-gray-400">
                  {data?.data?.mailingAddress2}
                </div>
              </div>
              <div className="mb-1   font-medium text-gray-900 dark:text-white flex justify-between">
                <div>State</div>
                <div className=" text-gray-600 dark:text-gray-400">{data?.data?.mailingState}</div>
              </div>
              <div className="mb-1   font-medium text-gray-900 dark:text-white flex justify-between">
                <div>City</div>{' '}
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  {data?.data?.mailingCity}
                </div>
              </div>
              <div className="mb-1  font-medium text-gray-900 dark:text-white flex justify-between">
                <div>Zip</div>
                <div className=" text-gray-600 dark:text-gray-400">{data?.data?.mailingZip}</div>
              </div>
            </div>
          </div>
          <div className="ml-4" style={{ width: '27%' }}>
            <div className="mb-2 text-blue-900 font-semibold lg:text-lg xl:text-lg  ">
              Desiginated Employer Representatives (DER)
            </div>

            <div
              className="w-full font-bold bg-white p-3 border border-gray-200 rounded-lg shadow flex flex-col"
              style={{ height: '240px' }}
            >
              <div style={{ maxWidth: '530px', overflowX: 'scroll', overflowY: 'hidden' }}>
                <div className="text-sm mr-2 flex">
                  <div className="flex border-b border-gray-800 bg-gray-300 p-1 rounded-t-lg">
                    <h3 style={{ width: '120px' }}>First Name</h3>
                    <h3 style={{ width: '120px' }}>Last Name</h3>
                    <h3 style={{ width: '120px' }}>Phone</h3>
                    <h3 style={{ width: '160px' }}>Email</h3>
                  </div>
                </div>
                <div
                  className="flex flex-col border-l border-r"
                  style={{
                    height: '150px',
                    overflowY: 'scroll',
                    width: '530px',
                    overflowX: 'hidden',
                  }}
                >
                  {data?.data?.designated?.map((item) => (
                    <div className="text-sm flex border-b" key={item}>
                      <div className="flex text-gray-600 pl-1">
                        <h4 style={{ width: '120px', padding: '4px' }}>
                          {item?.designatedRepresentativeFirstName}
                        </h4>
                        <h4 style={{ width: '120px', padding: '4px' }}>
                          {item?.designatedRepresentativeLastName}
                        </h4>
                        <h4 style={{ width: '120px', padding: '4px' }}>
                          {item?.designatedRepresentativePhone}
                        </h4>
                        <h4 style={{ width: '120px', padding: '4px' }}>
                          {item?.designatedRepresentativeEmail}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="ml-4" style={{ width: '25%' }}>
            <div className="mb-2 text-blue-900 font-semibold lg:text-lg xl:text-xl">Drivers</div>
            <div
              className="w-full font-bold bg-white p-3 border border-gray-200 rounded-lg shadow flex flex-col"
              style={{ height: '240px' }}
            >
              <div style={{ maxWidth: '530px', overflowX: 'scroll', overflowY: 'hidden' }}>
                <div className="text-sm mr-2 flex">
                  <div className="flex border-b border-gray-800 bg-gray-300 p-1 rounded-t-lg">
                    <h3 style={{ width: '120px' }}>First Name</h3>
                    <h3 style={{ width: '120px' }}>Last Name</h3>
                    <h3 style={{ width: '120px' }}>Phone</h3>
                    <h3 style={{ width: '120px' }}>License No.</h3>
                    <h3 style={{ width: '120px' }}>Start Date</h3>
                  </div>
                </div>
                <div
                  className="flex flex-col border-l border-r"
                  style={{
                    height: '150px',
                    overflowY: 'scroll',
                    width: '608px',
                    overflowX: 'hidden',
                  }}
                >
                  {data?.data?.drivers?.map((item) => (
                    <div className="text-sm flex border-b pl-1" key={item}>
                      <div className="flex text-gray-600">
                        <h4 style={{ width: '120px', padding: '4px' }}>{item?.firstName}</h4>
                        <h4 style={{ width: '120px', padding: '4px' }}>{item?.lastName}</h4>
                        <h4 style={{ width: '120px', padding: '4px' }}>{item?.phoneNumber}</h4>
                        <h4 style={{ width: '120px', padding: '4px' }}>{item?.licenceNumber}</h4>
                        <h4 style={{ width: '120px', padding: '4px' }}>
                          {moment(item?.startDate).format('L')}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-3 mb-2">
          <div className="  rounded mt-4 " style={{ width: '50%' }}>
            <div>
              <div className="pr-8">
                <div className="text-blue-900 font-semibold text-xl">
                  <EnvironmentOutlined style={{ fontSize: '20px' }} /> Physical Address
                </div>
              </div>
              <div className="p-4 border-b bg-white mt-2   border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Row gutter={([24], [24])}>
                  <Col xs={24} sm={12} md={12} lg={8} className="mt-4 ">
                    <div className="capitalize  text-xs font-semibold ml-3 ">
                      <div style={{ lineHeight: '15px !important' }}>
                        <div className="text-gray-600 font-semibold text-sm mb-1">Address1 </div>
                        <Tooltip placement="topLeft" title=" Address">
                          <div
                            className="text-blue-900 font-semibold "
                            style={{ fontSize: '1rem' }}
                          >
                            {data?.data?.physicalAddress1}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} className="mt-4 ">
                    <div className="capitalize  text-xs font-semibold ml-3 ">
                      <div style={{ lineHeight: '15px !important' }}>
                        <div className="text-gray-600 font-semibold text-sm mb-1">Address2 </div>
                        <Tooltip placement="topLeft" title=" Address">
                          <div
                            className="text-blue-900 font-semibold "
                            style={{ fontSize: '1rem' }}
                          >
                            {data?.data?.physicalAddress2}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} className="mt-4">
                    <div className="capitalize  text-xs font-semibold ml-3 ">
                      <div style={{ lineHeight: '15px !important' }}>
                        <div className="text-gray-600 font-semibold text-sm mb-1">State</div>
                        <Tooltip placement="topLeft" title="State">
                          <div
                            className="text-blue-900 font-semibold "
                            style={{ fontSize: '1rem' }}
                          >
                            {data?.data?.physicalState}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} className="mt-4 ">
                    <div className="capitalize  text-xs font-semibold ml-3 ">
                      <div style={{ lineHeight: '15px !important' }}>
                        <div className="text-gray-600 font-semibold text-sm mb-1">City</div>
                        <Tooltip placement="topLeft" title="City">
                          <div
                            className="text-blue-900 font-semibold "
                            style={{ fontSize: '1rem' }}
                          >
                            {data?.data?.physicalCity}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} className="mt-4 ">
                    <div className="capitalize  text-xs font-semibold ml-3 ">
                      <div style={{ lineHeight: '15px !important' }}>
                        <div className="text-gray-600 font-semibold text-sm mb-1">ZIP</div>
                        <Tooltip placement="topLeft" title="ZIP">
                          <div
                            className="text-blue-900 font-semibold "
                            style={{ fontSize: '1rem' }}
                          >
                            {data?.data?.physicalZip}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} className="mt-4 ">
                    <div className="capitalize  text-xs font-semibold ml-3 ">
                      <div style={{ lineHeight: '15px !important' }}>
                        <div className="text-gray-600 font-semibold text-sm mb-1">FAX</div>
                        <Tooltip placement="topLeft" title="FAX">
                          <div
                            className="text-blue-900 font-semibold "
                            style={{ fontSize: '1rem' }}
                          >
                            {data?.data?.fax}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} className="mt-4 ">
                    <div className="capitalize  text-xs font-semibold ml-3 ">
                      <div style={{ lineHeight: '15px !important' }}>
                        <div className="text-gray-600 font-semibold text-sm mb-1">
                          Billing Email
                        </div>
                        <Tooltip placement="topLeft" title="Billing Email">
                          <div
                            className="text-blue-900 font-semibold "
                            style={{ fontSize: '1rem' }}
                          >
                            {data?.data?.billingEmail}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} className="mt-4 ">
                    <div className="capitalize  text-xs font-semibold ml-3 ">
                      <div style={{ lineHeight: '15px !important' }}>
                        <div className="text-gray-600 font-semibold text-sm mb-1">
                          Billing Contact Name
                        </div>
                        <Tooltip placement="topLeft" title="Billing Contact Name">
                          <div
                            className="text-blue-900 font-semibold "
                            style={{ fontSize: '1rem' }}
                          >
                            {data?.data?.billingContact}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} className="mt-4 ">
                    <div className="capitalize  text-xs font-semibold ml-3 ">
                      <div style={{ lineHeight: '15px !important' }}>
                        <div className="text-gray-600 font-semibold text-sm mb-1">
                          SSN /TAX Id Number
                        </div>
                        <Tooltip placement="topLeft" title="SSN /TAX Id Number">
                          <div
                            className="text-blue-900 font-semibold "
                            style={{ fontSize: '1rem' }}
                          >
                            {data?.data?.SSNTAXIdNumber}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} className="mt-4 ">
                    <div className="capitalize  text-xs font-semibold ml-3 ">
                      <div style={{ lineHeight: '15px !important' }}>
                        <div className="text-gray-600 font-semibold text-sm mb-1">
                          Licence Number
                        </div>
                        <Tooltip placement="topLeft" title="License Number">
                          <div
                            className="text-blue-900 font-semibold "
                            style={{ fontSize: '1rem' }}
                          >
                            {data?.data?.licenceNumber}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} className="mt-4 ">
                    <div className="capitalize  text-xs font-semibold ml-3 ">
                      <div style={{ lineHeight: '15px !important' }}>
                        <div className="text-gray-600 font-semibold text-sm mb-1">Dot Number</div>
                        <Tooltip placement="topLeft" title="Dot Number">
                          <div
                            className="text-blue-900 font-semibold "
                            style={{ fontSize: '1rem' }}
                          >
                            {data?.data?.dotNumber}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={8} className="mt-4 ">
                    <div className="capitalize  text-xs font-semibold ml-3 ">
                      <div style={{ lineHeight: '15px !important' }}>
                        <div className="text-gray-600 font-semibold text-sm mb-1">MC Number</div>
                        <Tooltip placement="topLeft" title="MC Number">
                          <div
                            className="text-blue-900 font-semibold "
                            style={{ fontSize: '1rem' }}
                          >
                            {data?.data?.MCNumber}
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="flex mt-3 ml-4 flex-col" style={{ width: '26%' }}>
            <div className="text-blue-900 font-semibold mb-2 flex justify-between text-xl items-center px-2">
              Notes
              <PlusCircleOutlined
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setIsNotesModalOpen(true)}
              />
            </div>
            <div
              className="bg-white border border-gray-200 rounded-lg p-3 overflow-y-scroll w-full"
              style={{ height: '305px' }}
            >
              {data?.data?.clientNotes?.length > 0 ? (
                data?.data?.clientNotes?.map((item) => (
                  <div className="border-b p-2 justify-between flex" key={item?.id}>
                    <div>
                      <Tooltip title={'full name'}>
                        <Avatar>U</Avatar>
                      </Tooltip>
                      {/* <ToolOutlined className="pr-2 text-base" /> */}
                      {item?.subject}
                      <Typography.Text mark className="pl-2">
                        {moment(item?.createdAt).format('L @ LT')}
                      </Typography.Text>
                    </div>
                    <div className="w-10 flex items-center">
                      <DeleteOutlined
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => {
                          onDeleteNotes(item?._id);
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 flex text-lg mt-16 justify-center ">
                  Note down something ...
                </div>
              )}
            </div>
          </div>
          <div style={{ width: '20%', marginLeft: '10px' }}>
            <div>
              <div className="mb-2 text-blue-900 font-semibold text-xl mt-3">Services</div>
              <div className="border p-1 rounded-lg bg-white" style={{ height: '240px' }}>
                {data?.data?.services?.map((val) => {
                  let tagColor = '';

                  if (val?.status === 'completed') {
                    tagColor = 'green';
                  } else if (val?.status === 'pending') {
                    tagColor = 'red';
                  } else {
                    tagColor = 'orange';
                  }

                  return (
                    <div
                      className="font-semibold text-base mb-1 flex items-center justify-between"
                      key={val.name}
                    >
                      <div>{val?.name}</div>
                      <div>
                        {' '}
                        <Tag color={tagColor} style={{ width: '100%', fontSize: '14px' }}>
                          {val?.status == 'pending'
                            ? 'Pending'
                            : val?.status == 'completed'
                            ? 'Completed'
                            : 'Inprocess'}
                        </Tag>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-blue-900 font-semibold text-xl mb- mt-2">Signature Image </div>
              <div className="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 mb-4">
                <div className="border text-center py-4 rounded">
                  {data?.data?.signatureImage !== 'undefined' ? (
                    <img
                      alt={data?.data?.signatureImage}
                      style={{
                        width: '80%',
                        height: '',
                      }}
                      src={data?.data?.signatureImage}
                    />
                  ) : (
                    <div>Signature not set</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Notes"
        open={isNotesModalOpen}
        centered
        footer={false}
        onCancel={() => setIsNotesModalOpen(false)}
      >
        <Form name="notes" form={notesForm} onFinish={onFinish}>
          <Form.Item
            // label="Username"
            name="notes"
            rules={[{ required: true, message: 'Please add notes' }]}
          >
            <Input
              type="text"
              placeholder="Add Notes..."
              style={{
                width: '100%',
                marginBottom: 0,
              }}
            />
          </Form.Item>
          <div className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default connect(({ client }) => ({
  singleClientDetails: client?.singleClientDetails,
}))(ProfileDetails);
