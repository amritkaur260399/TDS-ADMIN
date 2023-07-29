import React, { useState, useRef } from 'react';
import { Form, Button, message } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'umi';
import { DeleteOutlined, EyeOutlined, UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import PreviewImage from '@/components/PreviewImage';

// 5 mb
const maxAllowedFileSize = 1024 * 1024 * 5;

const UploadAttachment = ({ name, rules, label, multiple, dispatch, setFields }) => {
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState({
    index: 0,
    visible: false,
  });

  const fileRef = useRef();

  const uploadedImg =
    'https://cdn-test.dazzleroad.com/cflare-assets/assets/images/CaratFlare_files/5eeda7310aad897d6ddd8593_icons8-check-file-64%20(1).png';

  const [files, setFiles] = useState([]);

  const onFileChange = async (event) => {
    setLoading(true);
    const allFiles = Array.from(event.target.files);
    // show the error message of some of the files are greater than 5 mb limit
    if (allFiles.some((singleFile) => singleFile.size > maxAllowedFileSize)) {
      message.error('Cannot upload some files due to 5 mb max size allowed');
    }
    // filter out the files that are greater than 5 mb
    allFiles
      .filter((f) => f.size < maxAllowedFileSize)
      .forEach((singleFile) => {
        return new Promise((resolve, reject) => {
          // custom logic of upload files and generate content ids
          const formData = new FormData();
          formData.append('file', singleFile);
          dispatch({
            type: 'common/uploadContent',
            payload: formData,
          })
            .then((res) => {
              if (res) {
                setFields(res?.contentId);
                setFiles((prev) =>
                  prev.concat({
                    uid: (prev.length + 1).toString(),
                    contentId: res?.contentId,
                    name: singleFile.name,
                    status: 'done',
                    url: res.downloadUrl,
                  }),
                );
                setLoading(false);
                resolve();
              }
            })
            .catch(() => {
              return reject();
            });
        });
      });
  };

  return (
    <>
      <Form.Item name={name} colon={false} rules={rules} label={label}>
        <div className="hidden">
          {/* Using the native input file type to achieve more control over file upload */}
          <input
            type="file"
            ref={fileRef}
            onChange={onFileChange}
            multiple={!!multiple}
            accept=".png,.jpg,.jpeg"
          />
        </div>
        <Button
          onClick={() => fileRef.current.click()}
          icon={!loading ? <UploadOutlined /> : <LoadingOutlined />}
        >
          Click to Upload
        </Button>
        {files.map((file) => (
          <div
            className="flex items-center justify-between my-1 border rounded-lg bg-gray-100 border-dashed"
            key={file?.contentId}
          >
            <div className="px-2">
              <img src={uploadedImg} width={20} alt="upload-image1" />
            </div>
            <div className="p-2 flex-auto flex">
              <div className="text-xs text-blue-800 font-semibold leading-none">
                {file?.name}
                <div className="font-normal">{file?.shortText}</div>
              </div>
            </div>
            <div className="flex items-center px-2">
              <div
                id="previewButton"
                className="cursor-pointer ml-3 text-black-600"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setLightbox({
                    index: 0,
                    visible: true,
                  });
                }}
              >
                <EyeOutlined />
              </div>

              <div
                id="DeleteButton"
                className="cursor-pointer ml-3 text-red-600"
                onClick={(e) => {
                  e.preventDefault();
                  setFiles((prev) => prev.filter((f) => f.contentId !== file.contentId));
                }}
              >
                <DeleteOutlined />
              </div>
            </div>
          </div>
        ))}
      </Form.Item>
      {lightbox.visible && (
        <PreviewImage
          lightbox={lightbox}
          setLightbox={setLightbox}
          imageList={files.map((f) => f.url)}
        />
      )}
    </>
  );
};

UploadAttachment.propTypes = {
  name: PropTypes.string || PropTypes.array,
  rules: PropTypes.array,
  label: PropTypes.string,
  multiple: PropTypes.string,
  setFields: PropTypes.func,
};

export default connect()(UploadAttachment);
