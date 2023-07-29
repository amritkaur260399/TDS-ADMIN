import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'antd';
import { connect } from 'umi';
import AddVehicleForm from './Form/AddVehicleForm';

const AddVehicle = ({
  visible,
  setVisible,
  chauffeurList,
  dispatch,
  vehicleId,
  getAllVehicles,
  setIsFormEdit,
  isFormEdit,
  setVehicleId,
}) => {
  const [activeTab, setActiveTab] = useState('1');
  const [coi, setCoi] = useState([]);
  const [rego, setRego] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [form] = Form.useForm();
  const [vehicleImageList, setVehicleImageList] = useState([]);
  const [vehicleLogo, setVehicleLogo] = useState([]);
  const [vehicleOwner, setVehicleOwner] = useState(true);

  const handleCancel = () => {
    dispatch({
      type: 'vehicles/setStates',
      addedVehicleRes: null,
      key: 'addedVehicleRes',
    });
    setIsFormEdit('');
    form.resetFields();
    setRego([]);
    setInsurance([]);
    setCoi([]);
    setVehicleImageList([]);
    setVehicleLogo([]);
    setVisible(false);
    setVehicleId('');
    setActiveTab('1');
    setVehicleOwner(false);
  };
  const getAllChauffeur = () => {
    dispatch({
      type: 'chauffeur/getAllChauffeur',
      payload: {
        query: {
          // type: tabName === 'all' ? '' : tabName,
        },
      },
    });
  };
  useEffect(() => {
    if (visible) {
      getAllChauffeur();
    }
  }, [visible]);

  return (
    <Modal
      title={
        <span style={{ color: '#10181e' }} className="font-medium">
          {isFormEdit ? 'Update Vehicle' : 'Add Vehicle'}
        </span>
      }
      open={visible}
      closable={false}
      // maskClosable={false}
      // onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit"
      okButtonProps={{ type: 'primary', size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
      okType=""
      width={900}
      footer={null}
    >
      <AddVehicleForm
        setIsFormEdit={setIsFormEdit}
        isFormEdit={isFormEdit}
        onCancel={handleCancel}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        vehicleId={vehicleId}
        form={form}
        getAllVehicles={getAllVehicles}
        setRego={setRego}
        setCoi={setCoi}
        setInsurance={setInsurance}
        coi={coi}
        rego={rego}
        insurance={insurance}
        setVehicleImageList={setVehicleImageList}
        vehicleImageList={vehicleImageList}
        vehicleLogo={vehicleLogo}
        setVehicleLogo={setVehicleLogo}
        setVehicleId={setVehicleId}
        vehicleOwner={vehicleOwner}
        setVehicleOwner={setVehicleOwner}
      />
    </Modal>
  );
};

export default connect(({ chauffeur }) => ({ chauffeurList: chauffeur?.chauffeurList }))(
  AddVehicle,
);
