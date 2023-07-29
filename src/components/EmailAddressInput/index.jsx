import React, { useState } from 'react';
import { Form, Select, Button, Tooltip, Avatar } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { getIntials } from '@/utils/utils';
import styles from './index.less';

const filterEmail = (e) =>
  e
    .filter((token) => token.key.trim())
    .map((tokenn) => ({
      key:
        !!tokenn.key.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) &&
        tokenn.key.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0],
      label: tokenn.label.split('<')[0],
    }))
    .filter((token) => token.key)
    .filter((obj, pos, arr) => arr.map((mapObj) => mapObj.key).indexOf(obj.key) === pos);

const EmailAddressInput = ({ form, type, data, currentUser, tabIndex, label }) => {
  const [maxCount, setMaxCount] = useState(undefined);

  const onEmailChange = (e) => {
    const a = filterEmail(e);
    setTimeout(() => {
      form.setFieldsValue({
        [type]: a,
      });
    }, 100);
  };

  return (
    <>
      <div className="flex items-center  rounded p-1">
        <div className="font-semibold text-gray-500 px-1 pr-2">{label}</div>
        <div className={`flex-auto ${styles.Input}`}>
          <Form form={form} layout="vertical" hideRequiredMark colon={false}>
            <Form.Item className="m-0" name={type}>
              <Select
                className="w-full"
                showSearch
                size="large"
                tabIndex={tabIndex && tabIndex}
                defaultActiveFirstOption={false}
                filterOption
                mode="tags"
                onBlur={() => setMaxCount(3)}
                onFocus={() => setMaxCount(undefined)}
                maxTagCount={maxCount}
                placeholder="Start typing your email here..."
                optionLabelProp="label"
                tokenSeparators={[',']}
                onChange={onEmailChange}
                dropdownStyle={{
                  display: 'none',
                }}
                labelInValue
              >
                {data &&
                  data.map((datas) => (
                    <Select.Option
                      className={styles.SelectAssigneeWrapper}
                      value={datas.email}
                      label={datas.name}
                      key={datas.email}
                    >
                      <div className={styles.AssigneeWrapper}>
                        <Avatar
                          size={40}
                          style={{ backgroundColor: '#3624db' }}
                          src={datas.publicResourceUrl}
                        >
                          {getIntials(datas.name)}
                        </Avatar>
                        <div className={styles.AssigneeInfoWrapper}>
                          <p className={styles.AsssigneeName}>{datas.name}</p>
                          <p className={styles.AssigneeEmail}>{datas.email}</p>
                        </div>
                      </div>
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className="mb-2 ml-2 mr-2">
          <Tooltip title="Send a copy to yourself by adding your email to the package.">
            <Button
              className="text-xs text-gray-500 "
              onClick={() => {
                setMaxCount(undefined);
                form.setFieldsValue({
                  [type]: [
                    ...(form.getFieldValue(type) || []),
                    ...filterEmail([
                      {
                        key: currentUser?.personal_details?.primary_email,
                        label: `${`${currentUser?.personal_details?.display_name} `}<${
                          currentUser?.personal_details?.primary_email
                        }`,
                      },
                    ]),
                  ].filter(
                    (obj, pos, arr) => arr.map((mapObj) => mapObj.key).indexOf(obj.key) === pos,
                  ),
                });
              }}
              type="link"
            >
              <UserAddOutlined />
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(EmailAddressInput);
