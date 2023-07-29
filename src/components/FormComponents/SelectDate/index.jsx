import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Form } from 'antd';

const SelectDate = ({ placeholder, name, rules, label, onChange }) => {
  return (
    <Form.Item name={name} rules={rules} label={<span className="formLabel">{label}</span>}>
      <DatePicker
        style={{ width: '100%' }}
        placeholder={placeholder}
        // onSelect={onSelect}
        onChange={onChange}
      />
    </Form.Item>
  );
};

SelectDate.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string || PropTypes.array,
  rules: PropTypes.array,
  label: PropTypes.string,
};

export default SelectDate;
