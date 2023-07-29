import { driverImageGlobal } from '@/utils/globalStates/modals';
import { DeleteFilled, DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useAtom } from 'jotai';
import React, { useState } from 'react';

const ImageUploadField = ({ setImageArrayList, index }) => {
  const [base64Image, setBase64Image] = useState('');
  const [driverGlobalImage, setDriverGlobalImage] = useAtom(driverImageGlobal);
  const [imageName, setImageName] = useState('');

  const handleImageChange = (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      setImageName(file.name);
      reader.onload = () => {
        setBase64Image(reader.result);
        setDriverGlobalImage(reader.result);
        setImageArrayList((oldItem) => [
          ...oldItem.filter((item) => item?.index !== index),
          {
            index: index,
            base64: reader.result,
          },
        ]);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteImage = (e) => {
    e.preventDefault();
    setBase64Image('');
    setDriverGlobalImage('');
    setImageArrayList((oldItem) => oldItem.filter((item) => item?.index !== index));
    document.getElementsByClassName('imageInput')[0].value = '';
  };

  const truncateText = (text) => {
    if (text?.length > 20) {
      return text?.substring(0, 18) + '...';
    } else {
      return text;
    }
  };

  return (
    <div>
      <div className="">
        {driverGlobalImage && (
          <div className="flex">
            <div className="flex rounded-full p-2 border uploadImageStyles">
              <img
                src={base64Image ? base64Image : driverGlobalImage}
                alt="Selected"
                width={90}
                height={90}
                className="rounded-full"
              />
              <span className="uploadImageStyles2" onClick={(e) => handleDeleteImage(e)}>
                <DeleteFilled style={{ fontSize: '16px' }} />
              </span>
            </div>
          </div>
          // <div className="w-1/2" style={{ maxHeight: '100px', overflowY: 'auto' }}>
          //   <div className="flex border border-gray-300 rounded-md justify-between items-center p-1 my-3 ">
          //     <div className="flex gap-1">
          //       <div className="flex items-center w-12">
          //         <img
          //           src={base64Image ? base64Image : driverGlobalImage}
          //           alt="Selected"
          //           width={70}
          //           height={50}
          //         />
          //       </div>
          //       <div className="ml-10 flex items-center">
          //         <Tooltip title={imageName}>
          //           <span className="text-sm font-semibold">
          //             {imageName && truncateText(imageName)}
          //           </span>
          //         </Tooltip>
          //       </div>
          //     </div>
          //     <div className="cursor-pointer">
          //       <Button danger type="link" onClick={(e) => handleDeleteImage(e)}>
          //         <DeleteOutlined style={{ fontSize: '16px' }} />
          //       </Button>
          //     </div>
          //   </div>
          // </div>
        )}

        <div className="flex items-center my-2 ml-4">
          <input
            className="custom imageInput border w-1/2 rounded-md"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="upload-button"
            style={{ display: 'none' }}
          />
          <label
            htmlFor="upload-button"
            className="border rounded-md p-1 w-16 text-center cursor-pointer hover:shadow-sm"
          >
            Upload
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadField;
