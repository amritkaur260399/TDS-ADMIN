import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const NumberInput = ({ placeholder, name, rules, label, form, setFields }) => {
  const onChange = (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    // eslint-disable-next-line no-restricted-globals
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      if (setFields) {
        setFields(value);
      }
    } else {
      form?.setFieldsValue({
        [name]: '',
      });
    }
    return value;
  };
  return (
    <Form.Item name={name} rules={rules} label={<span className="formLabel">{label}</span>}>
      <Input placeholder={placeholder} onChange={onChange} />
    </Form.Item>
  );
};

NumberInput.propTypes = {
  placeholder: PropTypes.string,
  rules: PropTypes.array,
  label: PropTypes.string,
};

export default NumberInput;
