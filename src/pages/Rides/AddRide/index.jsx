import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Form, message, Modal, Tabs } from 'antd';
import { connect } from 'umi';
import CreateRide from '@/pages/Rides/AddRide/Form/CreateRide';
import PersonalDetails from '@/pages/Rides/AddRide/Form/PersonalDetails';
const AddRide = ({
  visible,
  setVisible,
  dispatch,
  getAllRides,
  form,
  isFormEdit,
  setIsFormEdit,
  setpickupLocation,
  setDropLocation,
  setAddStop,
  addStop,
  pickupLocation,
  dropLocation,
  chauffeurId,
}) => {
  const onChange = (key) => {
    setactiveTab(key);
  };
  const [activeTab, setactiveTab] = useState(1);
  const [rideTypes, setRideTypes] = useState('');
  const [flightTime, setflightTime] = useState('');
  const [isDropAndStop, setIsDropAndStop] = useState(true);

  const handleOk = () => {
    setactiveTab(2);
  };

  const handleCancel = () => {
    form.setFieldValue('flightDetails', 'Flight Details');
    form.resetFields();
    setIsFormEdit('');
    setVisible(null);
    setAddStop([]);
    setpickupLocation('');
    setDropLocation('');
    setRideTypes('');
    setIsDropAndStop(false);
  };
  const onFinish = (values) => {
    let childSeats = [
      { infant: values?.infant },
      { toddler: values?.toddler },
      { booster: values?.booster },
    ];
    delete values?.infant;
    delete values?.toddler;
    delete values?.booster;
    delete values?.airport;
    delete values?.flightDate;
    delete values?.flightNumber;
    const body = {
      ...values,
      luggage: Number(values?.luggageCapacityLarge) + Number(values?.luggageCapacitySmall),
      passengers: Number(values?.passengers),
      luggageCapacityLarge: Number(values?.luggageCapacityLarge),
      luggageCapacitySmall: Number(values?.luggageCapacitySmall),
      phoneNo: Number(values?.phoneNo),
      numberOfHours: Number(values?.numberOfHours) || 0,
      date: values?.date?.toISOString(),
      rideTime: values?.rideTime?.toISOString(),
      pickupLocation: pickupLocation?.pickupLocation,
      pickupPlaceId: pickupLocation?.pickupPlaceId,
      lastName: values?.lastName ?? '',
      dropLocation: dropLocation?.dropLocation,
      dropPlaceId: dropLocation?.dropPlaceId,
      addStop: addStop ? addStop : [],
      addTrailer: values?.addTrailer || false,
      paymentType: values?.paymentType || 'perKm',
      // chauffeurID: chauffeurId ,
      childSeats,

      chauffeurID: values?.chauffeurID,
      flightDetails: flightTime,
    };
    if (!flightTime) {
      delete body?.flightDetails;
    }
    if (!values?.chauffeurID) {
      delete body.chauffeurID;
    }
    if (isFormEdit) {
      dispatch({
        type: 'rides/updateRide',
        payload: {
          body: { ...body, rideID: isFormEdit },
        },
      })
        .then((res) => {
          message.success('Ride updated successfully');
          form.resetFields();
          handleCancel();
          getAllRides();
        })
        .catch((err) => {
          message.error(err);
        });
    } else {
      dispatch({
        type: 'rides/createRide',
        payload: {
          body,
        },
      })
        .then((res) => {
          message.success('Ride created successfully');
          setpickupLocation('');
          setDropLocation('');
          setAddStop([]);
          form.resetFields();
          handleCancel();
          getAllRides();
        })
        .catch((err) => {
          message.error(err);
        });
    }
  };

  const createRideTabs = [
    {
      key: 1,
      label: `Ride Details`,
      children: (
        <CreateRide
          setVisible={setVisible}
          visible={visible}
          handleCancel={handleCancel}
          form={form}
          handleOk={handleOk}
          setpickupLocation={setpickupLocation}
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          setDropLocation={setDropLocation}
          addStop={addStop}
          setAddStop={setAddStop}
          rideTypes={rideTypes}
          setRideTypes={setRideTypes}
          setflightTime={setflightTime}
          flightTime={flightTime}
          isDropAndStop={isDropAndStop}
          setIsDropAndStop={setIsDropAndStop}
          isFormEdit={isFormEdit}
        />
      ),
    },
    {
      key: 2,
      label: `Personal Details`,
      children: (
        <PersonalDetails
          setVisible={setVisible}
          visible={visible}
          handleCancel={handleCancel}
          form={form}
          handleOk={handleOk}
          isFormEdit={isFormEdit}
        />
      ),
    },
  ];

  return (
    <Modal
      title={
        <span style={{ color: '#10181e' }} className="font-medium">
          {isFormEdit ? 'Update Ride' : 'Create ride'}
        </span>
      }
      closable={false}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={activeTab === 1 ? 'Continue' : 'Submit'}
      okButtonProps={{ type: 'primary', size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
      okType=""
      footer={null}
      width={800}
    >
      <Form
        requiredMark={false}
        layout="vertical"
        form={form}
        onFinish={onFinish}
        name="createRide"
      >
        <Tabs
          defaultActiveKey={activeTab}
          activeKey={activeTab}
          items={createRideTabs}
          onChange={onChange}
        />
      </Form>
    </Modal>
  );
};

export default connect(() => ({}))(AddRide);
