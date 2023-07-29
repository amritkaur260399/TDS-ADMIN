import { Col, Row, Form, Input, Space, DatePicker, Button, Popconfirm, Divider, Modal } from 'antd';
import React from 'react';
import UploadComponent from '../UploadComponent';
import { message, Upload } from 'antd';
import { DeleteOutlined, EyeOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { useState } from 'react';
import { requiredStar } from '@/utils/AppIons';
const { Dragger } = Upload;
import PNG from '@/assets/file-types/png_doc.svg';
import PDF from '@/assets/file-types/pdf_doc.svg';
import dayjs from 'dayjs';
import VehicleUploadDocuments from '@/components/VehicleUploadDocuments';

const Step2 = ({
  loadingForUpload,
  setVehicleLogo,
  vehicleLogo,
  setActiveTab,
  setVehicleImageList,
  vehicleImageList,
  contents,
  isFormEdit,
  setContents,
  vehicleId,
  setRego,
  rego,
  setInsurance,
  insurance,
  setCoi,
  coi,
  loading,
}) => {
  const [viewImage, setViewImage] = useState({ visible: false, url: '' });

  // const uploadVehicleImage = (file, typeId) => {
  //   console.log('item uploadation start');
  //   const newFile = { file, typeId };
  //   setVehicleImageList([newFile]);
  // };
  // console.log('vehicleImageList :>> ', vehicleImageList);
  // console.log('vehicleLogo :>> ', vehicleLogo);
  // console.log('viewImage?.url :>> ', viewImage?.url);

  const uploadVehicleImage = (file, typeId) => {
    let newFile;

    newFile = {
      file,
      url: URL.createObjectURL(file),
      typeId,
    };

    setVehicleImageList([newFile]);
  };

  const uploadVehicleLogo = (file, typeId) => {
    let newFile;

    newFile = {
      file,
      url: URL.createObjectURL(file),
      typeId,
    };

    setVehicleLogo([newFile]);
  };

  const onChangeDatePicker = () => {};

  return (
    // <Form layout="vertical" form={form} onFinish={onFinish} name="step1">
    <div>
      <Row gutter={16}>
        {/* REGO */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <VehicleUploadDocuments
            setContents={setRego}
            setRego={setRego}
            contents={rego}
            fieldType={'Rego'}
            formItem={'rego'}
            inputName={'regoNo'}
          />
        </Col>
        {/* EXPIRY-REGO */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Expiry</span>
                <span>{requiredStar()}</span>
              </div>
            }
            rules={[
              {
                required: true,
                message: 'Please input vehicle reg expiry!',
              },
            ]}
            name="regoExpiryDate"
          >
            <DatePicker
              onChange={onChangeDatePicker}
              placeholder="DD/MM/YY"
              size="large"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        {/* INSURANCE */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <VehicleUploadDocuments
            setContents={setInsurance}
            contents={insurance}
            fieldType={'Insurance No.'}
            formItem={'insuranceNumber'}
            inputName={'insuranceNo'}
          />
        </Col>
        {/* EXPIRY-INSURANCE */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Expiry</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="insuranceExpiryDate"
            rules={[
              {
                required: true,
                message: 'Please input vehicle insurance expiry!',
              },
            ]}
          >
            <DatePicker
              onChange={onChangeDatePicker}
              placeholder="DD/MM/YY"
              size="large"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        {/* COI-CERTIFICATE */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <VehicleUploadDocuments
            setContents={setCoi}
            contents={coi}
            fieldType={'COI Certificate'}
            formItem={'COICertificate'}
            inputName={'coiNo'}
          />
        </Col>
        {/* COI-EXPIRY */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Expiry</span>
                <span>{requiredStar()}</span>
              </div>
            }
            rules={[
              {
                required: true,
                message: 'Please input vehicle COI expiry!',
              },
            ]}
            name="COIExpiryDate"
          >
            <DatePicker
              onChange={onChangeDatePicker}
              placeholder="DD/MM/YY"
              size="large"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        {/* VEHICLE-IMAGE */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Upload Vehicle Image</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="vehicleImage"
            rules={[
              {
                required: isFormEdit ? false : true,
                message: 'Please upload atleast one image!',
              },
            ]}
          >
            <Dragger
              name="vehicleImage"
              multiple={true}
              showUploadList={false}
              // disabled={vehicleImageList.length>0 ? true :false}
              maxCount={1}
              beforeUpload={async (content) => {
                uploadVehicleImage(content, 'vehicleImage');
                return false;
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Drag & drop your files here or browse</p>
            </Dragger>
          </Form.Item>
          <div>
            {vehicleImageList?.length > 0 && (
              <div style={{ position: 'relative', bottom: '20px' }}>
                <div className=" font-[400] text-xxs text-blue-900 ">Uploaded Documents</div>
                <div className="mt-1" style={{ maxHeight: '10vh', overflow: 'auto' }}>
                  {vehicleImageList?.map((info, index) => (
                    <div key={info?.name}>
                      {index !== 0 && <Divider />}

                      <div className="w-full flex justify-between mt-1 ">
                        <div className="flex">
                          <div className="">
                            <img
                              src={info?.name?.includes('pdf') ? PDF : PNG}
                              alt="PNG"
                              className="h-6 w-4"
                            />
                          </div>
                          <div className=" mx-3 ">
                            {/* <div className="text-blue-900 text-sm font-normal">{info?.name}</div> */}
                            <div className="text-gray-600 font-normal text-xxs">
                              {dayjs(new Date().toISOString()).format('MMMM D, YYYY')} at{' '}
                              {dayjs(new Date().toISOString()).format('h:mm A')} -{' '}
                            </div>
                          </div>
                        </div>

                        <div className="flex mx-2 " style={{ float: 'right' }}>
                          <div className="mx-2">
                            <Button
                              type="primary"
                              shape="circle"
                              size="small"
                              onClick={() => {
                                // PROBLEM IS HERE
                                setViewImage({ visible: true, url: info?.url });
                              }}
                            >
                              <EyeOutlined className="text-xs " />
                            </Button>
                          </div>
                          <div className="mx-2">
                            {' '}
                            <Popconfirm
                              title="Are you sure you want to delete this attachment?"
                              onConfirm={() => {
                                setVehicleImageList(() =>
                                  contents?.filter((item, i) => i !== index),
                                );
                              }}
                              okText="Delete"
                              cancelText="Cancel"
                              okType="danger"
                            >
                              <Button type="primary" shape="circle" size="small" className="">
                                <DeleteOutlined className="text-xs fill-red-500" />
                              </Button>
                            </Popconfirm>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Col>
        {/* VEHICLE-LOGO */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Upload Vehicle Logo</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="vehicleLogo"
            rules={[
              {
                required: isFormEdit ? false : true,
                message: 'Please upload vehicle Logo!',
              },
            ]}
          >
            <Dragger
              name="vehicleLogo"
              showUploadList={false}
              maxCount={1}
              beforeUpload={async (content) => {
                uploadVehicleLogo(content, 'vehicleLogo');
                return false;
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Drag & drop your files here or browse</p>
            </Dragger>
          </Form.Item>
          <div>
            {vehicleLogo?.length > 0 && (
              <div style={{ position: 'relative', bottom: '20px' }}>
                <div className=" font-[400] text-xxs text-blue-900 ">Uploaded Documents</div>
                <div className="mt-1" style={{ maxHeight: '10vh', overflow: 'auto' }}>
                  {vehicleLogo?.map((info, index) => (
                    <div key={info?.name}>
                      {index !== 0 && <Divider />}

                      <div className="w-full flex justify-between mt-1 ">
                        <div className="flex">
                          <div className="">
                            <img
                              src={info?.name?.includes('pdf') ? PDF : PNG}
                              alt="PNG"
                              className="h-6 w-4"
                            />
                          </div>
                          <div className=" mx-3 ">
                            {/* <div className="text-blue-900 text-sm font-normal">1232{info?.name}</div> */}
                            <div className="text-gray-600 font-normal text-xxs">
                              {dayjs(new Date().toISOString()).format('MMMM D, YYYY')} at{' '}
                              {dayjs(new Date().toISOString()).format('h:mm A')} -{' '}
                            </div>
                          </div>
                        </div>

                        <div className="flex mx-2 " style={{ float: 'right' }}>
                          <div className="mx-2">
                            <Button
                              type="primary"
                              shape="circle"
                              size="small"
                              onClick={() => {
                                setViewImage({ visible: true, url: info?.url });
                              }}
                            >
                              <EyeOutlined className="text-xs " />
                            </Button>
                          </div>
                          <div className="mx-2">
                            {' '}
                            <Popconfirm
                              title="Are you sure you want to delete this attachment?"
                              onConfirm={() => {
                                setVehicleLogo(() => contents?.filter((item, i) => i !== index));
                              }}
                              okText="Delete"
                              cancelText="Cancel"
                              okType="danger"
                            >
                              <Button type="primary" shape="circle" size="small" className="">
                                <DeleteOutlined className="text-xs fill-red-500" />
                              </Button>
                            </Popconfirm>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>

      <div className="flex justify-end gap-4 mt-4">
        <Button
          size="large"
          onClick={() => {
            // onCancel();
            // form.resetFields();
            setActiveTab('1');
          }}
        >
          Back
        </Button>
        <Button type="primary" size="large" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </div>
      <Modal
        visible={viewImage?.visible}
        title="Preview Document"
        onCancel={() => {
          setViewImage({ visible: false, url: '' });
        }}
        footer={null}
      >
        <div className="flex justify-center">
          <img width={500} src={viewImage?.url} alt="" />
        </div>
      </Modal>
    </div>
    // </Form>
  );
};

export default connect(({ vehicles, loading }) => ({
  // loadingForUpload: loading?.effects['vehicles/addVehicles'],
  // loadingForUpload: loading?.effects['vehicles/updateVehicle'],
  vehiclesList: vehicles?.vehiclesList,
  // loading: loading?.effects['rides/updateRide'] || loading?.effects['rides/createRide'],
  loading: loading?.effects['vehicles/updateVehicle'] || loading?.effects['vehicles/addVehicles'],
}))(Step2);
