/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
  Button,
  Form,
  Modal,
  Input,
  Switch,
  Steps,
  Upload,
  message,
  Tooltip,
  Row,
  Col,
} from 'antd';
import classNames from 'classnames';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import CKEditor from '@ckeditor/ckeditor5-react';
import React, { useState, useEffect } from 'react';
import EmailInput from './EmailInput';
import CKEditorConfig from '@/config/appConfig';
import AttachedDocument from '@/components/AttachedDocument';
import styles from './index.less';
import { connect, useParams } from 'umi';
import { Attachment } from '@/utils/AppIons';

CKEditor.editorConfig = () => {
  // misc options
};

const GenerateLeadEmail = ({
  visible,
  setVisible,
  recordDetails,
  dispatch,

  currentUser,
  selectedRows,
}) => {
  const [form] = Form.useForm();
  const { customerId } = useParams();
  const [body, setBody] = useState('');
  const [enableBCC, setEnableBCC] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [subject, setSubject] = useState('');
  const [encodedList, setEncodedList] = useState([]);
  const [fileList, setFilelist] = useState([]);

  useEffect(() => {
    if (recordDetails) {
      form.setFieldsValue({
        to: [recordDetails?.email],
      });
    }
  }, [recordDetails]);

  useEffect(() => {
    form.setFieldsValue({
      subject,
    });
  }, [subject]);

  const fileSizeConvertor = (size) => {
    if (size && size / 1024 / 1024 > 0) {
      const newSize = (size / 1024 / 1024).toFixed(2);
      return `${newSize} MB`;
    }
    return null;
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const beforeUpload = async (content) => {
    await toBase64(content).then((res) => {
      const obj = {
        encodedFile: res,
        size: fileSizeConvertor(content.size),
        name: content?.name,
      };
      setFilelist([].concat(obj, fileList));
    });

    setEncodedList([].concat(content, encodedList));
  };

  const onFinishHandler = (values) => {
    const payload = {
      body: {
        ...values,
        body,
      },
    };
    dispatch({
      type: 'customer/sendEmail',
      payload,
    }).then((res) => {
      if (res) {
        setVisible(false);
        message.success('Email is sent successfully');
        dispatch({
          type: 'customer/getEmailList',
          payload: {
            pathParams: {
              partyId: customerId,
            },
          },
        });
      }
    });
  };

  return (
    <Modal
      width={800}
      centered
      bodyStyle={{ maxHeight: '80vh', overflow: 'auto' }}
      destroyOnClose
      keyboard={false}
      maskClosable={false}
      title={<div className="text-gray-500">Generate email</div>}
      visible={visible}
      footer={null}
      onCancel={() => {
        setSubject('');
        setBody('');
        setVisible(false);

        form?.setFieldsValue('message', null);
      }}
    >
      <Form hideRequiredMark form={form} colon={false} onFinish={onFinishHandler}>
        <div>
          <Steps direction="vertical" size="small" current={0}>
            <Steps.Step
              status={!isEmpty ? 'finish' : 'pending'}
              title={
                <div className={classNames('flex justify-between w-full', styles.stepTitleStyling)}>
                  <div className="text-xs font-semibold text-gray-500 uppercase">Send To</div>
                  <div className="" title="Show Bcc field">
                    <Switch
                      checkedChildren="BCC"
                      unCheckedChildren="BCC"
                      checked={enableBCC}
                      onChange={(e) => setEnableBCC(e)}
                    />
                  </div>
                </div>
              }
              description={
                <div className="mt-4">
                  <EmailInput
                    name="to"
                    label="To"
                    data={[recordDetails]}
                    form={form}
                    setIsEmpty={setIsEmpty}
                  />
                  <EmailInput name="cc" label="Cc" data={[recordDetails]} form={form} />
                  {enableBCC && (
                    <EmailInput
                      name="bcc"
                      label="Bcc"
                      data={[recordDetails]}
                      form={form}
                      allowStyling={true}
                    />
                  )}
                </div>
              }
            />
            <Steps.Step
              status={subject ? 'finish' : 'pending'}
              title={<div className="mb-2 text-xs font-semibold text-gray-500 ">SUBJECT</div>}
              description={
                <>
                  <div>
                    <Form.Item
                      name="subject"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter a valid email subject',
                        },
                      ]}
                    >
                      <Input.TextArea
                        allowClear
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                        placeholder="Enter subject here"
                        autoSize={{ minRows: 1, maxRows: 4 }}
                      />
                    </Form.Item>
                  </div>
                </>
              }
            />
            <Steps.Step
              status={body ? 'finish' : 'pending'}
              title={
                <div className="flex justify-between w-full">
                  <div className="text-xs font-semibold text-gray-500 uppercase">Message</div>
                  <div className="flex">
                    {body && (
                      <div
                        className="mt-1 mr-2 text-xs font-semibold text-yellow-600 uppercase cursor-pointer"
                        onClick={() => setBody('')}
                      >
                        Clear
                      </div>
                    )}

                    <Upload
                      beforeUpload={(content) => {
                        beforeUpload(content);
                      }}
                      fileList={[]}
                    >
                      <Tooltip placement="topRight" title="Attachment">
                        <div
                          className="mt-1 text-xs font-semibold text-blue-500 uppercase cursor-pointer"
                          style={{
                            transform: 'rotate(270deg)',
                          }}
                        >
                          <Attachment />
                        </div>
                      </Tooltip>
                    </Upload>
                  </div>
                </div>
              }
              description={
                <div>
                  <div className="text-gray-800 rounded">
                    <CKEditor
                      style={{ border: 2 }}
                      onInit={(editor) => {
                        editor.ui
                          .getEditableElement()
                          .parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement(),
                          );
                      }}
                      onChange={(event, editor) => {
                        const editorData = editor.getData();
                        setBody(editorData);
                      }}
                      editor={DecoupledEditor}
                      data={body || ''}
                      config={
                        CKEditorConfig.editor &&
                        CKEditorConfig.editor.toolbarType &&
                        CKEditorConfig.editor.toolbarType.email
                      }
                    />
                  </div>
                  <AttachedDocument {...{ fileList, setFilelist, encodedList, setEncodedList }} />
                </div>
              }
            />
          </Steps>
        </div>
        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24} />

          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <div className="flex justify-end">
              <div>
                <Button
                  type="link"
                  onClick={() => {
                    form.resetFields();
                    setVisible(false);
                    setSubject('');
                    setBody('');
                  }}
                >
                  Cancel
                </Button>
              </div>
              <div>
                <Button type="primary" onClick={() => form?.submit()}>
                  Send
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default connect(({ user }) => ({
  currentUser: user?.currentUser,
}))(GenerateLeadEmail);
