import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Form } from 'antd';
import React, { useRef, useState } from 'react';
import SignaturePad from '../../../components/SignaturePad';
import { useAtom } from 'jotai';
import { globalSignImageCapture } from '@/utils/globalStates/modals';
import { connect } from 'umi';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const UserSignature = ({ dispatch }) => {
  const [url, setUrl] = useState('');
  const [signature] = useAtom(globalSignImageCapture);
  const signatureRef = useRef();
  const { id } = useParams();
  const history = useHistory();
  console.log(id, 'id');

  const handleClear = () => {
    signatureRef.current.clear();
    setUrl('');
  };

  const onFinish = () => {
    dispatch({
      type: 'client/captureSignature',
      payload: {
        body: {
          signatureImage: signature,
        },
        pathParams: {
          id: window.location.href?.split('id=')?.[1],
        },
      },
    })
      .then((res) => {
        console.log('res', res);
        history.push('/user/message');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const handleSave = () => {
    let signatureImage;
    if (signatureRef.current?._sigPad?._data.length == 1) {
      signatureImage = signatureRef.current.toDataURL();
      setUrl(signatureImage);
    } else {
      setUrl('');
    }
    console.log('eeee', url);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center  ">
      <div
        className=" bg-white p-4   border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        style={{ height: '550px', width: '500px' }}
      >
        <div className="flex justify-center items center  mt-12">
          <UserOutlined style={{ fontSize: '80px' }} />
        </div>
        <div className="flex justify-center items-center p-4 text-3xl "> User Signature</div>

        <div className="flex justify-center items-center mt-4">
          <Form name="form" onFinish={onFinish} autoComplete="off">
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              {/*       <div className="ml-4">
                    <h4>Signature Image</h4>
                    <div className="border text-center py-4 rounded">
                      <img
                        alt="example"
                        style={{
                          width: '80%',
                          height: '',
                        }}
                        src={url}
                      />
                    </div>
                  </div>
                ) : (*/}
              <Col xs={24} sm={24} md={6} xl={24} className="-ml-40">
                <div className="">
                  <h4>Signature Image</h4>

                  <SignaturePad
                    signatureRef={signatureRef}
                    url={url}
                    handleClear={handleClear}
                    handleSave={handleSave}
                  />
                </div>
              </Col>
            </Form.Item>
            <div className="flex justify-end ">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

// export default UserSignature;
export default connect(() => ({}))(UserSignature);
