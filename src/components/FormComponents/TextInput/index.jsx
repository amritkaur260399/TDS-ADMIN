import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

const TextInput = ({ placeholder, name, rules, label }) => {
  return (
    <Form.Item name={name} rules={rules} label={<span className="formLabel">{label}</span>}>
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

TextInput.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string || PropTypes.array,
  rules: PropTypes.array,
  label: PropTypes.string,
};

export default TextInput;
