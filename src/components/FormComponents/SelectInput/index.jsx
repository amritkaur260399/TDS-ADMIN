import React from 'react';
import PropTypes from 'prop-types';
import { Select, Form, Input, Row, Col } from 'antd';

const SelectInput = ({
  placeholder,
  name,
  label,
  rules,
  children,
  onSearch,
  onSelect,
  showSearch,
  setFields,
  otherValue,
  setOtherValue,
  type,
  showOtherOptionError,
  setShowOtherOptionError,
  selectedOption,
  setSelectedOption,
  ...rest
}) => {
  const responsiveCol1 = {};
  const responsiveCol2 = {};
  if (selectedOption && selectedOption[type]) {
    responsiveCol1.xs = 24;
    responsiveCol1.sm = 24;
    responsiveCol1.md = 24;
    responsiveCol1.lg = 6;
    responsiveCol1.xl = 6;
    responsiveCol1.xxl = 6;

    responsiveCol2.xs = 24;
    responsiveCol2.sm = 24;
    responsiveCol2.md = 24;
    responsiveCol2.lg = 10;
    responsiveCol2.xl = 10;
    responsiveCol2.xxl = 10;
  } else {
    responsiveCol1.xs = 24;
    responsiveCol1.sm = 24;
    responsiveCol1.md = 24;
    responsiveCol1.lg = 24;
    responsiveCol1.xl = 16;
    responsiveCol1.xxl = 16;

    responsiveCol2.xs = 0;
    responsiveCol2.sm = 0;
    responsiveCol2.md = 0;
    responsiveCol2.lg = 0;
    responsiveCol2.xl = 0;
    responsiveCol2.xxl = 0;
  }

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
          <div className="formLabel inline-block flex items-center" style={{ height: 30 }}>
            <span className="mr-1" style={{ color: '#ff4d4f', fontSize: 18, lineHeight: 1 }}>
              *
            </span>
            {label}:
          </div>
        </Col>
        <Col {...responsiveCol1}>
          <Form.Item name={name} rules={rules}>
            <Select
              {...rest}
              filterOption={false}
              showSearch={showSearch}
              onSearch={onSearch}
              onSelect={onSelect}
              placeholder={placeholder}
            >
              {children}
            </Select>
          </Form.Item>
        </Col>
        {selectedOption && selectedOption[type] && (
          <Col {...responsiveCol2}>
            <Form.Item name={[name[0], 'label']} rules={rules}>
              <Input type="text" placeholder="Other option" />
            </Form.Item>
          </Col>
        )}
      </Row>
    </>
  );
};

// xs={24} sm={24} md={24} lg={24} xl={16} xxl={16}

SelectInput.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string || PropTypes.array,
  rules: PropTypes.array,
  label: PropTypes.string,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
};

export default SelectInput;
