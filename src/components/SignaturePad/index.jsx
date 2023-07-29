import { globalSignImageCapture } from '@/utils/globalStates/modals';
import { Button, Modal } from 'antd';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ setSign, sign, url, setUrl, handleClear, handleSave, signatureRef }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  console.log('sign', url);
  const [, setSignature] = useAtom(globalSignImageCapture);
  useEffect(() => {
    setSignature(url);
  }, [url, setSignature]);

  const handlePreview = () => {
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }

    // setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    // setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleCancel = () => setPreviewOpen(false);
  return (
    <div className="flex">
      <div>
        <div style={{ border: '1px solid gray', width: 400, height: 100 }}>
          <SignatureCanvas
            canvasProps={{ width: 400, height: 100, className: 'sigCanvas' }}
            ref={signatureRef}
            // ref={(data) => {
            //   setSign(data);
            // }}
          />
        </div>
        <div className="mt-5">
          <Button onClick={handleClear}>Clear</Button>
          {!url && (
            <Button className="ml-5" onClick={handleSave}>
              Save
            </Button>
          )}
          {url && (
            <Button className="ml-5" onClick={handlePreview}>
              Preview
            </Button>
          )}
        </div>
      </div>

      <Modal
        title="E signature"
        open={previewOpen}
        width={400}
        height={300}
        // title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={url}
        />
      </Modal>

      {/* <img src={url} alt="" /> */}
    </div>
  );
};

export default SignaturePad;
