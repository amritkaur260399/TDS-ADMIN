import { Button, Drawer, Form } from 'antd';
import React, { useEffect } from 'react';
import { connect, useParams } from 'umi';
import { decodeDollarsToDigits } from '@/utils/common';
import CurrencyFormattedInput from '../CurrencyFormattedInput';

const EditProduct = ({ visible, setVisible, quoteDetail, dispatch, loading }) => {
  const [form] = Form.useForm();
  const { id } = useParams();

  const submitForm = (values) => {
    dispatch({
      type: 'quote/updateQuote',
      payload: {
        pathParams: {
          quote_id: id,
        },
        body: {
          quote_unit_price: parseFloat(decodeDollarsToDigits(values?.cost)),
          quote_item_seq_id: quoteDetail?.quote_item_seq_id,
        },
      },
    }).then((res) => {
      if (res) {
        setVisible(false);
        dispatch({
          type: 'quote/getQuoteItems',
          payload: {
            pathParams: {
              quote_id: id,
            },
          },
        });
      }
    });
  };

  // useEffect(() => {
  //   if (quoteDetail) {
  //     form.setFieldsValue({ cost: `$${quoteDetail && quoteDetail?.quote_unit_price}.00` });
  //   } else {
  //     form.resetFields();
  //   }
  // }, [quoteDetail]);

  return (
    <Drawer
      destroyOnClose
      maskClosable={false}
      title={<span className="text-gray-600">Edit product</span>}
      placement="right"
      width="400px"
      onClose={() => {
        setVisible(false);
      }}
      visible={visible}
    >
      <div className="text-2xl text-gray-600 mb-8">
        {quoteDetail?.product_name || 'Product Name'}
      </div>

      <Form form={form} layout="vertical" hideRequiredMark onFinish={submitForm} size="large">
        <div className="py-2">
          <div className="appFormLabel pb-1">Unit price</div>
          <Form.Item name="cost" colon={false}>
            <CurrencyFormattedInput
              form={form}
              size="large"
              id="cost"
              onFocus={(e) => e.target.select()}
              style={{ width: '100%' }}
              placeholder="Enter cost"
              afterOnBlur={() => {}}
            />
          </Form.Item>
        </div>

        <div className="text-right">
          <Button type="primary" htmlType="submit" className="capitalize" loading={loading}>
            Update
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default connect(({ loading, user }) => ({
  loading: loading.effects['quote/updateQuote'],
  currentUser: user.currentUser,
}))(EditProduct);
