/* eslint-disable import/no-unresolved */
import { Modal } from 'antd';
import React, { useState } from 'react';
import { Eye, DeleteIcon } from '../../utils/AppIons';
import uploadedImg from '../../assets/imageicon.svg';

const UploadDocument = ({ fileList, setFilelist }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);

  const fileSizeConvertor = (size) => {
    if (size && size / 1024 / 1024 > 0) {
      const newSize = (size / 1024 / 1024).toFixed(2);
      return `${newSize} MB`;
    }
    return null;
  };

  return (
    <div className="w-full">
      {fileList?.map((uploadedDoc) => (
        <div
          className="flex items-center justify-between mt-2 mb-2 border rounded-lg bg-gray-100 border-dashed"
          key={uploadedDoc.id}
        >
          <div className="p-2">
            <img src={uploadedImg} width={40} alt="upload-image1" />
          </div>
          <div className="p-2 flex-auto flex">
            <div className="text-xs text-blue-800 font-semibold leading-none">
              {uploadedDoc.name}
              <div className="font-normal">
                {document.shortText}
                <div>{fileSizeConvertor(uploadedDoc?.size)}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center ">
            <div className="text-lg text-gray-800 font-semibold">
              <span
                className="cursor-pointer"
                onClick={() => {
                  setPreviewModal(true);
                  setPdfUrl(URL.createObjectURL(uploadedDoc));
                }}
              >
                {Eye()}
              </span>
            </div>
            <div className="text-lg text-red-700 font-semibold pl-2 pr-2">
              <span
                className="cursor-pointer"
                onClick={() => {
                  const pData = fileList.filter((p) => p.uid !== uploadedDoc.uid);
                  setFilelist(pData);
                }}
              >
                {DeleteIcon()}
              </span>
            </div>
          </div>
        </div>
      ))}

      <Modal
        onCancel={() => setPreviewModal(false)}
        visible={previewModal}
        width="80%"
        title="Document Perview"
        footer={null}
        bodyStyle={{ margin: 0, padding: 0, height: '75vh' }}
      >
        <iframe
          title="Documents Preview"
          src={pdfUrl}
          className="h-full text-center w-full"
          frameBorder="0"
        />
      </Modal>
    </div>
  );
};

export default UploadDocument;
