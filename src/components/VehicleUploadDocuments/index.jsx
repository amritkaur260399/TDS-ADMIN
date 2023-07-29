import UploadComponent from '@/pages/Vehicles/AddVehicle/Form/UploadComponent';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Modal, Popconfirm } from 'antd';
import { requiredStar } from '@/utils/AppIons';
import PNG from '@/assets/file-types/png_doc.svg';
import PDF from '@/assets/file-types/pdf_doc.svg';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const VehicleUploadDocuments = ({
  setContents,
  contents,
  fieldType,
  formItem,
  inputName,
  setRego,
}) => {
  const [viewDocument, setViewDocument] = useState({ visible: false, url: '' });
  // const previewImage = (contents) => {
  //   setViewDocument({ visible: true, url: newFile?.url });
  // };

  return (
    <div>
      <div className=" flex  items-center">
        <div className=" flex ">
          <Form.Item
            name={inputName}
            label={
              <div>
                <span className="formLabel mr-1">{fieldType}</span>
                <span>{requiredStar()}</span>
              </div>
            }
            rules={[
              {
                required: true,
                message: `Please input ${inputName}`,
              },
              {
                pattern: new RegExp(/^[^ ]/),
                message: 'Spaces not allowed',
              },
            ]}
          >
            <Input
              required={true}
              size="large"
              name={inputName}
              placeholder={`Enter your ${fieldType} ${fieldType.includes('No.') ? '' : 'No.'}`}
              style={{ width: '300px' }}
            />
          </Form.Item>
        </div>
        <UploadComponent setContents={setContents} contents={contents} typeId={formItem} />
      </div>
      <div>
        {contents?.length > 0 && (
          <div style={{ position: 'relative', bottom: '20px' }}>
            <div className=" font-[400] text-xxs text-blue-900 ">Uploaded Documents</div>
            <div className="mt-1" style={{ maxHeight: '10vh', overflow: 'auto' }}>
              {contents?.map((info, index) => (
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
                            setViewDocument({ visible: true, url: info?.url });
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
                            setContents(() => contents?.filter((item, i) => i !== index));
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
      <Modal
        visible={viewDocument?.visible}
        title="Preview Document"
        onCancel={() => {
          setViewDocument(false);
        }}
        footer={null}
      >
        <div className="flex justify-center">
          <img width={500} src={viewDocument?.url} alt="" />
        </div>
      </Modal>
    </div>
  );
};

export default VehicleUploadDocuments;
