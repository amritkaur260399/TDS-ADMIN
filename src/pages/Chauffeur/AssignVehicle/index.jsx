import React from 'react';
import { Button, Form, Modal, Select } from 'antd';
import { connect } from 'umi';

// import VehicleDetails from './VehicleDetails';

const VehicleDetails = ({
  visible,
  setVisible,
  getAllChauffeur,
  chauffeurList,
  dispatch,
  vehiclesList,
}) => {
  const handleCancel = () => {
    setVisible({ modal: false, id: '' });
  };
  const [form] = Form.useForm();
  const assignVehicle = (value) => {
    dispatch({
      type: 'chauffeur/assignVehicle',
      payload: {
        body: { chauffeurID: visible?.id, vehicleID: value?.vehicleName },
      },
    }).then((res) => {
      if (res?.message === 'Vehicle assigned Successfully') {
        setVisible({ modal: false, id: '' });
        window.location.reload();
        getAllChauffeur();
      } else {
      }
    });
  };
  const onFinish = (values) => {
    assignVehicle(values);
  };

  return (
    <Modal
      title={
        <span style={{ color: '#10181e' }} className="font-medium">
          Assign Vehicle
        </span>
      }
      open={visible?.modal}
      closable={false}
      onCancel={handleCancel}
      okText="Submit"
      okButtonProps={{ type: 'primary', size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
      okType=""
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={onFinish} name="assignVehicle" className="">
        <Form.Item
          name="vehicleName"
          rules={[
            {
              required: true,
              message: 'Please select Vehicle!',
            },
          ]}
        >
          <Select
            className="w-full"
            style={{ width: '100%' }}
            size="large"
            placeholder="Select Vehicle"
          >
            {vehiclesList?.data?.map((element) => (
              <Select.Option value={element?._id} key={element?._id}>
                {element?.vehicleName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className="flex justify-end">
          <Button size="large" className="mr-4" onClick={() => handleCancel()}>
            Cancel
          </Button>

          <Button type="primary" htmlType="submit" size="large">
            Assign
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default connect(({ chauffeur }) => ({ chauffeurList: chauffeur?.chauffeurList }))(
  VehicleDetails,
);
