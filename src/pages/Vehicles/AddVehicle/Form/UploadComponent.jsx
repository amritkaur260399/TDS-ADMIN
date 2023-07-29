import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React, { useEffect } from 'react';

const UploadComponent = ({ typeId, contents, setContents }) => {
  // const toBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  useEffect(() => {
    console.log(`contents`, contents);
  }, [contents]);

  const formDataValues = (file, typeId) => {
    // const newFile = { file, typeId };

    let newFile;

    newFile = {
      file,
      url: URL.createObjectURL(file),
      typeId,
    };

    setContents([...contents, newFile]);
  };

  return (
    <div>
      <div className="">
        <div className="flex mt-2">
          <Upload
            beforeUpload={async (content) => {
              formDataValues(content, typeId);
              return false;
            }}
            fileList={[]}
          >
            <Button type="primary" size="large" disabled={contents?.length > 0 ? true : false}>
              <UploadOutlined className="text-xl font-extrabold " />
            </Button>
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default UploadComponent;
