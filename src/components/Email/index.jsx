/* eslint-disable no-unused-vars */
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Form, Steps, Switch } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { connect } from 'umi';
import React, { useState } from 'react';
import CKEditorConfig from '@/config/appConfig';
import EmailAddressInput from '@/components/EmailAddressInput';
import styles from './index.less';

CKEditor.editorConfig = () => {
  // misc options
};

const Email = (props) => {
  const [enableBCC, setEnableBCC] = useState(false);
  const { form, body, setBody, data } = props;

  const setStepStatus = (stepNumber) => {
    const values = form.getFieldsValue();
    switch (stepNumber) {
      case 1:
        if ((values.toEmail && values.toEmail.length) !== 0) {
          return 'finish';
        }
        return 'pending';
      case 2:
        if (values.subject !== '') {
          return 'finish';
        }
        return 'pending';
      case 3:
        if (body !== '') {
          return 'finish';
        }
        return 'pending';
      default:
        break;
    }
    return pending;
  };

  return (
    <div className="px-6">
      <Steps direction="vertical" size="small" current={0}>
        <Steps.Step
          status={setStepStatus(1)}
          className="app-step-title-full"
          title={
            <div className="flex justify-between w-full">
              <div className="text-xs font-semibold text-gray-500 uppercase">
                <span className="text-red-600 text-base">* </span>Send To
              </div>
              <div className="mx-3" title="Show Bcc field">
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
            <div className="mt-5">
              <div className="mb-4">
                <EmailAddressInput data={data} label="To" type="toEmail" tabIndex={0} form={form} />
              </div>
              <div className="mb-4">
                <EmailAddressInput data={data} label="Cc" form={form} type="ccEmail" />
              </div>
              {enableBCC && (
                <div className="mb-4">
                  <EmailAddressInput data={data} label="Bcc" form={form} type="bccEmail" />
                </div>
              )}
            </div>
          }
        />
        <Steps.Step
          status={setStepStatus(2)}
          title={
            <div className="text-xs font-semibold text-gray-500 uppercase">
              <span className="text-red-600 text-base">* </span>Subject
            </div>
          }
          description={
            <>
              <div className={`${styles.Input} w-full  rounded p-1	`}>
                <Form form={form} layout="vertical" hideRequiredMark colon={false}>
                  <Form.Item
                    className="w-full m-0"
                    colon={false}
                    name="subject"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please enter a valid email subject',
                      },
                    ]}
                  >
                    <TextArea
                      className="w-full border-gray-400	"
                      placeholder="Enter subject here"
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                </Form>
              </div>
            </>
          }
        />

        <Steps.Step
          status={setStepStatus(3)}
          className="app-step-title-full"
          title={
            <div className="flex justify-between">
              <div className="text-xs font-semibold text-gray-500 uppercase">
                <span className="text-red-600 text-base">* </span>Message
              </div>
            </div>
          }
          description={
            <div>
              <div className=" rounded p-2 text-gray-800">
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
                    const datas = editor.getData();
                    setBody(datas);
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
            </div>
          }
        />
      </Steps>
    </div>
  );
};

export default connect(({ loading }) => ({
  loadingResetEmailDefaults: loading.effects['projectandfolders/resetQuoteEmailDefaults'],
}))(Email);
