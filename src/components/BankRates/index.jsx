import React, { useEffect } from 'react';
import { Row, Col, Form, Input, InputNumber, Select } from 'antd';
import { currencyFormatter, currencyParser } from '@/utils/utils';
import { decodeDhiramToNumber } from '@/utils/common';

const BankRates = ({ fieldKey, name, restField, form, index, offerIndex, viewBank }) => {
  const { Option } = Select;
  const { TextArea } = Input;

  const frequency = [
    {
      label: 'Overnight',
      value: 'OVERNIGHT',
    },
    {
      label: '1 Week',
      value: 'ONE_WEEK',
    },
    {
      label: '1 Month',
      value: 'ONE_MONTH',
    },
    {
      label: '2 Months',
      value: 'TWO_MONTH',
    },
    {
      label: '3 Months',
      value: 'THREE_MONTH',
    },
    {
      label: '6 Months',
      value: 'SIX_MONTH',
    },
    {
      label: '1 Year',
      value: 'ONE_YEAR',
    },
  ];

  return (
    <div className="bg-white">
      <Row gutter={24}>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'fixedRateTenure']}
            name={[name, 'fixedRateTenure']}
            extra="years"
            label={<span className="formLabel">Fixed rate tenure</span>}
            rules={[
              {
                required: true,
                message: "Fixed rate tenure can't be blank!",
              },
            ]}
          >
            <InputNumber
              disabled={viewBank}
              style={{
                width: '100%',
              }}
              size="large"
              type="number"
              placeholder="Enter fixed rate tenure"
            />
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'fixedInterestRate']}
            name={[name, 'fixedInterestRate']}
            initialValue={0}
            label={<span className="formLabel">Fixed interest rate</span>}
            rules={[
              {
                required: true,
                message: "Fixed interest rate can't be blank!",
              },
            ]}
          >
            <InputNumber
              disabled={viewBank}
              style={{
                width: '100%',
              }}
              min={0}
              max={100}
              size="large"
              placeholder="5%"
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'variableEibor']}
            name={[name, 'variableEibor']}
            initialValue={0}
            label={<span className="formLabel">Variable eibor</span>}
            rules={[
              {
                required: true,
                message: "Variable eibor can't be blank!",
              },
            ]}
          >
            <InputNumber
              disabled={viewBank}
              style={{
                width: '100%',
              }}
              size="large"
              placeholder="5"
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'eiborFrequency']}
            name={[name, 'eiborFrequency']}
            initialValue="ONE_WEEK"
            label={<span className="formLabel">Eibor frequency</span>}
            rules={[
              {
                required: true,
                message: "Eibor frequency can't be blank!",
              },
            ]}
          >
            <Select size="large" disabled={viewBank}>
              {frequency?.map((val) => (
                <Option key={val.value} value={val.value}>
                  {val.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'variableBankProfit']}
            name={[name, 'variableBankProfit']}
            initialValue={0}
            label={<span className="formLabel">Variable bank profit</span>}
            rules={[
              {
                required: true,
                message: "Variable bank profit can't be blank!",
              },
            ]}
          >
            <InputNumber
              disabled={viewBank}
              style={{
                width: '100%',
              }}
              size="large"
              placeholder="5"
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'minimumFloorRate']}
            name={[name, 'minimumFloorRate']}
            initialValue={0}
            label={<span className="formLabel">Minimum floor rate</span>}
            rules={[
              {
                required: true,
                message: "Minimum floor rate can't be blank!",
              },
            ]}
          >
            <InputNumber
              disabled={viewBank}
              style={{
                width: '100%',
              }}
              size="large"
              placeholder="5"
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Form.Item>
        </Col>

        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'valuationFees']}
            name={[name, 'valuationFees']}
            initialValue="AED 0.00"
            label={<span className="formLabel">Valuation fees</span>}
            rules={[
              {
                required: true,
                message: "Valuation fees can't be blank!",
              },
            ]}
          >
            <Input
              disabled={viewBank}
              size="large"
              placeholder="AED 0.00"
              autoComplete="off"
              className="text-right"
              onFocus={(e) => {
                const { value } = e.target;
                let val;

                if (isNaN(value)) {
                  val = parseInt(decodeDhiramToNumber(value));
                } else {
                  val = parseInt(value);
                }
                const allData = form?.getFieldsValue()?.offers[offerIndex];
                const parent = 'rates';
                allData[parent][index] = {
                  ...allData[parent][index],
                  valuationFees: val,
                };
                form?.setFieldsValue(allData);
              }}
              onBlur={(event) => {
                let i = 0;
                let res = event?.target?.value
                  // replace the dots with empty string if value contains more than one dot
                  // leave first decimal
                  .replace(/\./g, () => {
                    i += 1;
                    return i >= 2 ? '' : '.';
                  })
                  // replace the commas too with empty string if have any
                  .replace(/,/g, '');
                let mod;
                if (res) {
                  res = res[0] === '₹' ? res.substring(1, res.length)?.trim() : res;
                  mod = Number(res)?.toFixed(2);
                } else {
                  mod = event?.target?.value;
                }
                const allData = form?.getFieldsValue()?.offers[offerIndex]?.rates[index];

                form?.setFieldsValue(
                  (allData.valuationFees = currencyFormatter.format(currencyParser(mod))),
                );
              }}
            />
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'lifeInsurance']}
            name={[name, 'lifeInsurance']}
            initialValue={0}
            label={<span className="formLabel">Life insurance</span>}
            rules={[
              {
                required: true,
                message: "Life insurance can't be blank!",
              },
            ]}
          >
            <InputNumber
              disabled={viewBank}
              style={{
                width: '100%',
              }}
              size="large"
              placeholder="5"
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'propertyInsurance']}
            name={[name, 'propertyInsurance']}
            initialValue={0}
            label={<span className="formLabel">Property insurance</span>}
            rules={[
              {
                required: true,
                message: "Property insurance can't be blank!",
              },
            ]}
          >
            <InputNumber
              disabled={viewBank}
              style={{
                width: '100%',
              }}
              size="large"
              placeholder="5"
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'processingFees']}
            name={[name, 'processingFees']}
            initialValue={0}
            label={<span className="formLabel">Processing fees (%)</span>}
            rules={[
              {
                required: true,
                message: "Processing fees can't be blank!",
              },
            ]}
          >
            <InputNumber
              disabled={viewBank}
              style={{
                width: '100%',
              }}
              size="large"
              placeholder="5"
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'minimumProcessingFees']}
            name={[name, 'minimumProcessingFees']}
            initialValue="AED 0.00"
            label={<span className="formLabel">Minimum processing</span>}
            rules={[
              {
                required: true,
                message: "Minimum processing fee can't be blank!",
              },
            ]}
          >
            <Input
              disabled={viewBank}
              size="large"
              placeholder="AED 0.00"
              autoComplete="off"
              className="text-right"
              onFocus={(e) => {
                const { value } = e.target;

                let val;

                if (isNaN(value)) {
                  val = parseInt(decodeDhiramToNumber(value));
                } else {
                  val = parseInt(value);
                }

                const allData = form?.getFieldsValue()?.offers[offerIndex];
                const parent = 'rates';
                allData[parent][index] = {
                  ...allData[parent][index],
                  minimumProcessingFees: val,
                };

                form?.setFieldsValue(allData);
              }}
              onBlur={(event) => {
                let i = 0;
                let res = event?.target?.value
                  // replace the dots with empty string if value contains more than one dot
                  // leave first decimal
                  .replace(/\./g, () => {
                    i += 1;
                    return i >= 2 ? '' : '.';
                  })
                  // replace the commas too with empty string if have any
                  .replace(/,/g, '');
                let mod;
                if (res) {
                  res = res[0] === '₹' ? res.substring(1, res.length)?.trim() : res;
                  mod = Number(res)?.toFixed(2);
                } else {
                  mod = event?.target?.value;
                }
                const allData = form?.getFieldsValue()?.offers[offerIndex]?.rates[index];

                form?.setFieldsValue(
                  (allData.minimumProcessingFees = currencyFormatter.format(currencyParser(mod))),
                );
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'partialSettlementPercentage']}
            name={[name, 'partialSettlementPercentage']}
            initialValue={0}
            label={<span className="formLabel">Partial percentage</span>}
            rules={[
              {
                required: true,
                message: "Partial settlement percentage can't be blank!",
              },
            ]}
          >
            <InputNumber
              disabled={viewBank}
              style={{
                width: '100%',
              }}
              size="large"
              placeholder="5"
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Form.Item>
        </Col>
        <Col xl={18} lg={18} md={18} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'partialSettlement']}
            name={[name, 'partialSettlement']}
            initialValue={'Free Partial Settlement'}
            label={<span className="formLabel">Partial settlement</span>}
            rules={[
              {
                required: true,
                message: "Partial settlement can't be blank!",
              },
            ]}
          >
            <TextArea
              disabled={viewBank}
              autoSize
              size="large"
              placeholder="Enter partial settlement text"
            />
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'fullSettlementPercentage']}
            name={[name, 'fullSettlementPercentage']}
            initialValue={0}
            label={<span className="formLabel">Full percentage</span>}
            rules={[
              {
                required: true,
                message: "Full settlement percentage can't be blank!",
              },
            ]}
          >
            <InputNumber
              disabled={viewBank}
              style={{
                width: '100%',
              }}
              size="large"
              placeholder="5"
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace('%', '')}
            />
          </Form.Item>
        </Col>
        <Col xl={18} lg={18} md={18} sm={24} xs={24}>
          <Form.Item
            {...restField}
            fieldKey={[fieldKey, 'fullSettlement']}
            name={[name, 'fullSettlement']}
            initialValue={'1% or 10500 which ever is lower'}
            label={<span className="formLabel">Full settlement</span>}
            rules={[
              {
                required: true,
                message: "Full settlement can't be blank!",
              },
            ]}
          >
            <TextArea
              disabled={viewBank}
              autoSize
              size="large"
              placeholder="Enter full settlement text"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default BankRates;
