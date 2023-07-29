

import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Select, Row, Col, DatePicker, Space, Button, message } from 'antd';
import UploadComponent from './UploadComponent';
import { uploadContent } from '@/services/common';
import { Tabs } from 'antd';
import Step1 from './Step1';
import Step2 from './Step2';
import { connect } from 'umi';
import moment from 'moment';

const AddVehicleForm = ({
  onCancel,
  addedVehicleRes,
  activeTab,
  setActiveTab,
  dispatch,
  vehicleId,
  form,
  getAllVehicles,
  setIsFormEdit,
  isFormEdit,
  setCoi,
  setRego,
  setInsurance,
  coi,
  rego,
  insurance,
  vehicleLogo,
  setVehicleLogo,
  vehicleImageList,
  setVehicleImageList,
  setVehicleId,
  vehicleOwner,
  setVehicleOwner,
}) => {
  const [encodedList, setEncodedList] = React.useState([]);
  // const [contents , setContents] =useState([])
  // const [coi, setCoi] = useState([]);
  // const [rego, setRego] = useState([]);
  // const [insurance, setInsurance] = useState([]);

  const [chauffeurId, setChauffeurId] = useState('');
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('plateNumber', values.plateNumber);
    formData.append('registrationNumber', values.registrationNumber);
    formData.append('vehicleName', values.vehicleName);
    formData.append('category', values.category);
    formData.append('luggageQuantityLarge', Number(values.luggageQuantityLarge));
    formData.append('luggageQuantitySmall', Number(values.luggageQuantitySmall));
    formData.append('capacity', Number(values.capacity));
    formData.append('feulType', values.fuelType);
    formData.append('regoNo', values.regoNo);
    formData.append('insuranceNo', values.insuranceNo);
    formData.append('coiNo', values.coiNo);
    formData.append('trailerOption', values?.trailerOption || false);
    formData.append('vehicleOwner', values?.vehicleOwner || 'BGC');
    // formData.append('pricePerKm', values?.pricePerKm);
    // formData.append('pricePerHour', values?.pricePerHour);
    // formData.append('fixedKm', values?.fixedKm);
    // formData.append('fixedPrice', values?.fixedPrice);
    formData.append('infant', Number(values?.infant));
    formData.append('toddler', Number(values?.toddler));
    formData.append('booster', Number(values?.booster));

    formData.append(
      'luggageQuantity',
      Number(values.luggageQuantityLarge) + Number(values?.luggageQuantitySmall),
    );
    if (rego?.length < 1 && insurance?.length < 1) {
      return message.warning('please upload all provided document');
    }
    if (rego?.[0]?.file) {
      rego?.map((value, i) => {
        formData.append(value?.typeId, value?.file);
      });
    } else {
      rego?.map((value, i) => {
        formData.append(value?.typeId, value?.url);
      });
    }
    if (insurance?.[0]?.file) {
      insurance?.map((value, i) => {
        formData.append(value?.typeId, value?.file);
      });
    } else {
      insurance?.map((value, i) => {
        formData.append(value?.typeId, value?.url);
      });
    }
    if (coi?.[0]?.file) {
      coi?.map((value, i) => {
        formData.append(value?.typeId, value?.file);
      });
    } else {
      coi?.map((value, i) => {
        formData.append(value?.typeId, value?.url);
      });
    }
    if (vehicleImageList?.[0]?.file) {
      vehicleImageList?.map((value, i) => {
        formData.append(value?.typeId, value?.file);
      });
    } else {
      vehicleImageList?.map((value, i) => {
        formData.append(value?.typeId, value?.url);
      });
    }
    if (vehicleLogo?.[0].file) {
      vehicleLogo?.map((value, i) => {
        formData.append(value?.typeId, value?.file);
      });
    } else {
      vehicleLogo?.map((value, i) => {
        formData.append(value?.typeId, value?.url);
      });
    }

    formData.append('regoExpiryDate', values.regoExpiryDate.toISOString());
    formData.append('insuranceExpiryDate', values.insuranceExpiryDate.toISOString());
    formData.append('COIExpiryDate', values.COIExpiryDate.toISOString());
    if (values?.chauffeur) formData.append('chauffeur', values?.chauffeur);

    // vehicleImageList?.map((value, i) => {
    //   formData.append(value?.typeId, value.file);

    // });

    if (isFormEdit) {
      dispatch({
        type: 'vehicles/updateVehicle',
        payload: {
          body: formData,
          pathParams: { id: isFormEdit },
        },
      })
        .then((res) => {
          message.success('Vehicle updated successfully');
          form.resetFields();
          setVehicleId('');
          onCancel();
          getAllVehicles();
        })
        .catch((err) => {
          console.log('err', err);
        });
    } else {
      dispatch({
        type: 'vehicles/addVehicles',
        payload: {
          body: formData,
        },
      })
        .then((res) => {
          message.success('Vehicle added successfully');
          onCancel();
          form.resetFields();
          setRego([]);
          setInsurance([]);
          setCoi([]);
          setVehicleImageList([]);
          setVehicleLogo([]);
          getAllVehicles();
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  };

  useEffect(() => {
    if (vehicleId) {
      dispatch({
        type: 'vehicles/getSingleVehicleDetails',
        payload: {
          query: {
            vehicleID: vehicleId,
          },
        },
      }).then((res) => {
        setIsFormEdit(res?.data?._id);
        form.setFieldsValue({
          plateNumber: res?.data?.plateNumber,
          registrationNumber: res?.data?.registrationNumber,
          vehicleName: res?.data?.vehicleName,
          category: res?.data?.category,
          capacity: res?.data?.capacity,
          fuelType: res?.data?.fuelType,
          trailerOption: res?.data?.trailerOption || false,
          vehicleOwner: res?.data?.vehicleOwner,
          // pricePerKm: res?.data?.pricePerKm,
          // pricePerHour: res?.data?.pricePerHour,
          // fixedKm: res?.data?.fixedKm,
          // fixedPrice: res?.data?.fixedPrice,
          infant: res?.data?.infant,
          toddler: res?.data?.toddler,
          booster: res?.data?.booster,
          luggageQuantity: res?.data?.luggageQuantity,
          luggageQuantityLarge: res?.data?.luggageQuantityLarge,
          luggageQuantitySmall: res?.data?.luggageQuantitySmall,
          chauffeur: res?.data?.chauffeur,
          regoNo: res?.data?.regoNo,
          insuranceNo: res?.data?.insuranceNo,
          coiNo: res?.data?.coiNo,
          vehicleCOI: res?.data?.vehicleCOI?.url,
          vehicleRego: res?.data?.vehicleRego?.url,
          vehicleInsurance: res?.data?.vehicleInsurance?.url,
          COIExpiryDate: moment(res?.data?.vehicleCOI?.expiryDate),
          insuranceExpiryDate: moment(res?.data?.vehicleInsurance?.expiryDate),
          regoExpiryDate: moment(res?.data?.vehicleRego?.expiryDate),
          chauffeur: res?.data?.chauffeur,
        });

        setRego([{ ...res?.data?.vehicleRego, name: res?.data?.vehicleRego?.url, typeId: 'rego' }]);
        setInsurance([
          {
            ...res?.data?.vehicleInsurance,
            name: res?.data?.vehicleInsurance?.url,
            typeId: 'insuranceNumber',
          },
        ]);
        setCoi([
          {
            ...res?.data?.vehicleCOI,
            name: res?.data?.vehicleInsurance?.url,
            typeId: 'COICertificate',
          },
        ]);
        setVehicleImageList([
          {
            ...res?.data?.vehicleImage,
            name: res?.data?.vehicleImage?.url,
            typeId: 'vehicleImage',
          },
        ]);

        setVehicleLogo([
          { ...res?.data?.vehicleLogo, name: res?.data?.vehicleLogo?.url, typeId: 'vehicleLogo' },
        ]);

        setVehicleId('');
      });
    }
  }, [vehicleId]);

  return (
    <>
      <Form
        requiredMark={false}
        layout="vertical"
        form={form}
        onFinish={onFinish}
        name="addVehicle"
        // title={isFormEdit? 'Edit Vehicle' : 'eDIT Vehicle'}
      >
        <Tabs
          defaultActiveKey={activeTab}
          activeKey={activeTab}
          onChange={(val) => {
            setActiveTab(val);
          }}
        >
          <Tabs.TabPane tab="Step 1" key="1">
            <Step1
              onCancel={onCancel}
              setActiveTab={setActiveTab}
              form={form}
              setChauffeurId={setChauffeurId}
              chauffeurId={chauffeurId}
              vehicleOwner={vehicleOwner}
              setVehicleOwner={setVehicleOwner}
              isFormEdit={isFormEdit}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Step 2" key="2">
            <Step2
              onCancel={onCancel}
              setActiveTab={setActiveTab}
              form={form}
              isFormEdit={isFormEdit}
              vehicleImageList={vehicleImageList}
              setVehicleImageList={setVehicleImageList}
              vehicleLogo={vehicleLogo}
              setVehicleLogo={setVehicleLogo}
              setRego={setRego}
              rego={rego}
              setInsurance={setInsurance}
              insurance={insurance}
              setCoi={setCoi}
              coi={coi}
            />
          </Tabs.TabPane>
        </Tabs>
      </Form>
    </>
  );
};

export default connect(({ vehicles }) => ({
  addedVehicleRes: vehicles?.addedVehicleRes,
}))(AddVehicleForm);
