import React, { useState, useEffect } from 'react';
import { CloseOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { useAtom } from 'jotai';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Spin,
  Space,
  AutoComplete,
} from 'antd';

import { connect } from 'umi';
import { driverImageGlobal, modalsJotai } from '@/utils/globalStates/modals';
import { US_DL } from '@/regex';
import { debounce } from 'lodash';
import ReactInputMask from 'react-input-mask';
import { usaStates } from '../UsStates';
import { stateDetails } from '../UsaStates';
import ImageUploadField from './ImageUploadField';
import { createInvoice } from '@/services/quickBooks';

const OPTIONS = [
  'Random',
  'Company Clearinghouse',
  'Driver Clearinghouse',
  'DQ File',
  'Driver Education',
  'Drug Test',
  'Query',
  'Random Driver enrollment',
];

const googleApi = 'AIzaSyCByUKsDuZX-QWIaixI-L3D7jHzW3lvJao';

const AddDrivers = ({
  dispatch,
  getAllDrivers,
  form,
  buttonStatus,
  allClientList,
  driverId,
  setDriverId,
  driverLoading,
}) => {
  const [isopenModal, setIsopenModal] = useAtom(modalsJotai);
  const [loading, setLoading] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const [optionss, setOptionss] = useState([]);
  const [licencePattern, setLicencePattern] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [image, setImage] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [driverImageArray, setDriverImageArray] = useState([]);
  const [suggestedCity, setSuggestedCity] = useState();
  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const [selState, setSelState] = useState();
  const map = new google.maps.Map(document.getElementById('map'));
  const [imageArrayList, setImageArrayList] = useState([]);
  const [driverGlobalImage, setDriverGlobalImage] = useAtom(driverImageGlobal);
  const [allServices, setAllServices] = useState([]);

  // eslint-disable-next-line no-undef
  const googleInstance = new google.maps.places.AutocompleteService();
  // eslint-disable-next-line no-undef
  const placesService = new google.maps.places.PlacesService(map);
  const action = (text) => {
    googleInstance.getPredictions({ input: text }, (predictions) => {
      setSuggestedAddress(predictions);
    });
  };

  const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  const statesUsa = usaStates?.map((item) => {
    return { value: item?.name, type: item?.abbreviation };
  });

  const getAllClients = () => {
    dispatch({
      type: 'client/getAllClients',
      payload: {
        query: {
          startIndex: 0,
          viewSize: 10000,
        },
      },
    });
  };

  useEffect(() => {
    getAllClients();
  }, []);

  const componentForm = {
    street_number: 'long_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'short_name',
    postal_code: 'short_name',
    formatted_address: 'long_name',
    address_line_2: 'long_name',
    premise: 'long_name',
    subpremise: 'long_name',
    room: 'long_name',
    building: 'long_name',
  };

  const getAllServices = () => {
    dispatch({
      type: 'service/getAllServices',
    }).then((res) => {
      if (res?.success) {
        setAllServices(res?.response);
      }
    });
  };

  useEffect(() => {
    getAllServices();
  }, []);

  useEffect(() => {
    if (selState) {
      const cityusa = stateDetails?.[selState];
      const cities = cityusa?.map((item) => {
        return { value: item, type: item };
      });
      setSuggestedCity(cities);
    }
  }, [selState]);

  const onFinish = (values) => {
    // setLoading(true);
    const request = values?.driverCollection?.map((item, index) => {
      return {
        ...item,
        media: imageArrayList?.[index] ? imageArrayList?.[index]?.base64 : '',
        services: item?.services?.map((itemService) => {
          return {
            name: itemService,
          };
        }),
      };
    });

    dispatch({
      type: 'driver/createDriver',
      payload: {
        body: {
          driverCollection: request,
        },
      },
    }).then((res) => {
      if (res) {
        message.success('Driver Added and Invoice created successfully');
        setIsopenModal({
          ...isopenModal,
          addDriver: { name: '', open: false },
        });
        getAllDrivers();
        setLoading(false);
        res?.createdDrivers?.map((elements) => {
          createInvoiceOfDriver(elements);
        });
      } else {
        message.error('An error occured!');
        setLoading(false);
      }
    });

    // create invoice of the driver
    const createInvoiceOfDriver = async (values) => {
      const filteredServices = allServices?.filter((obj1) =>
        values?.services.some((obj2) => obj1.name === obj2.name),
      );

      try {
        const createCustomerInQuickBooks = await createInvoice({
          body: {
            qbCustomerID: allClientList?.data
              ?.filter((obj) => {
                return values?.clientID === obj?._id;
              })
              .map((obj) => {
                return obj?.qbCustomerID;
              })?.[0],
            qb_admin: JSON.parse(localStorage.getItem('currentUser_details'))._id,
            db_id: values?._id,
            driver: true,
            qb_invoice: {
              Line: filteredServices?.map((item) => {
                return {
                  DetailType: 'SalesItemLineDetail',
                  Amount: item?.amount,
                  SalesItemLineDetail: {
                    ItemRef: {
                      value: item?.qbItemId,
                    },
                    Qty: item?.quantity,
                  },
                };
              }),
            },
          },
        });
        window.open(createCustomerInQuickBooks?.redirect_url, '_blank');
      } catch (error) {
        if (error?.data?.error?.status === 401) {
          window.location.replace(error.data.error.message.authURL);
        } else {
          message.error('Something went wrong');
        }
      }
    };
  };

  const regexPhone = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  const updateDriver = (values) => {
    setLoading(true);
    const vals = values?.driverCollection?.[0];
    const arrayOfObjects = values?.driverCollection?.[0]?.services.map((item) => ({ name: item }));

    dispatch({
      type: 'driver/updateDriver',
      payload: {
        body: {
          ...vals,
          media: driverGlobalImage,
          services: arrayOfObjects,
        },
        pathParams: {
          id: driverId,
        },
      },
    }).then((res) => {
      if (res) {
        message.success('Driver Updated Successfully');
        setIsopenModal({
          ...isopenModal,
          addDriver: { name: '', open: false },
        });
        setLoading(false);
        getAllDrivers();
      } else {
        message.error('An error occured!');
        setLoading(false);
      }
    });
  };

  const licenceType = [
    { value: 'Learning Driving Licence', name: 'Learning Driving Licence' },
    { value: 'Permanent Driving Licence', name: 'Permanent Driving Licence' },
    { value: 'Commercial Driving Licence', name: 'Commercial Driving Licence' },
    { value: 'International Driving Licence', name: ' International Driving Licence' },
  ];

  useEffect(() => {
    const urlsss = `https://maps.googleapis.com/maps/api/geocode/json?address=${stateSearch}&key=${googleApi}`;
    if (stateSearch) {
      fetch(urlsss)
        .then((response) => response.json())
        .then((data) => {
          // Extract the state component from the response
          const result = data.results[0];
          const state = result.address_components.find((component) =>
            component.types.includes('administrative_area_level_1'),
          );
          setOptionss(state);
          if (state) {
            setOptionss(state);
            // Abbreviation of the state
          } else {
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  }, [stateSearch]);
  useEffect(() => {
    if (optionss?.short_name) {
      setLicencePattern(
        US_DL[optionss?.short_name]?.map((regexItem) => {
          return {
            pattern: regexItem?.regex,
            message: regexItem?.description,
          };
        }),
      );
    }
  }, [optionss?.short_name]);

  return (
    <div>
      <Modal
        // title="Add driver"
        title={
          <span style={{ color: '#10181e' }} className="font-medium">
            {buttonStatus?._id ? 'Update Driver' : 'Add Driver'}
          </span>
        }
        width={750}
        centered
        footer={null}
        closeIcon={<CloseOutlined style={{ color: 'black' }} />}
        className="modalStyle"
        open={isopenModal?.addDriver?.name === 'Add drivers' && isopenModal?.addDriver?.open}
        onOk={() => {
          setIsopenModal({
            ...isopenModal,
            addDriver: { name: '', open: false },
          });
          form.resetFields('');
          setDriverImageArray([]);
        }}
        onCancel={() => {
          setIsopenModal({
            ...isopenModal,
            addDriver: { name: ' ', open: false },
          });
          form.resetFields();
          setDriverImageArray([]);
          setDriverGlobalImage('');
          setDriverId();
        }}
      >
        <div className="mx-auto">
          <Form
            form={form}
            name="driverForm"
            onFinish={onFinish}
            initialValues={{ driverCollection: [undefined] }}
          >
            <Spin size="large" spinning={driverLoading}>
              <Form.List name="driverCollection">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Space
                        key={key}
                        style={{
                          display: 'flex',
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <div className=" border my-4">
                          {/* <span className="p-4  text-xl"> {index + 1}</span> */}
                          <Row gutter={24} style={{ padding: '15px' }}>
                            <Col xs={24} sm={24} md={12} xl={12}>
                              <div className="">
                                <h4>First Name</h4>
                                <Form.Item
                                  {...restField}
                                  //  name={[name, 'first']}
                                  name={[name, 'firstName']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter first name',
                                    },
                                    {
                                      pattern: /^[A-Za-z]+$/,
                                      message: 'Only alphabets are allowed',
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="Enter First Name"
                                    style={{ borderRadius: '5px' }}
                                  />
                                </Form.Item>
                              </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} xl={12}>
                              <div className="">
                                <h4>Last Name</h4>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'lastName']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter Last name',
                                    },
                                    {
                                      pattern: /^[A-Za-z]+$/,
                                      message: 'Only alphabets are allowed',
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="Enter Last Name "
                                    style={{ borderRadius: '5px' }}
                                  />
                                </Form.Item>
                              </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} xl={12}>
                              <div className="">
                                <h4>Company Name</h4>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'clientID']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please select company/clientID ',
                                    },
                                  ]}
                                >
                                  <Select
                                    showSearch
                                    placeholder="Please Select "
                                    size="large"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                      (option?.label ?? '')
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    onSelect={(val) => {
                                      console.log('selectedValue', val);
                                    }}
                                    getPopupContainer={(node) => node.parentNode}
                                    options={allClientList?.data?.map((item) => ({
                                      value: item?._id,
                                      label: item?.motorCarrierName,
                                      key: item?._id,
                                    }))}
                                  />
                                </Form.Item>
                              </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                              <div>
                                <h4>Date of Birth</h4>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'DOB']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please Select Date of Birth',
                                    },
                                  ]}
                                >
                                  <DatePicker size="large" className="w-full rounded full" />
                                </Form.Item>
                              </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} xl={12}>
                              <div className="">
                                <h4>Phone</h4>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'phoneNumber']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter phone number',
                                    },
                                    {
                                      pattern: regexPhone,
                                      message: 'Please enter valid phone no',
                                    },
                                  ]}
                                >
                                  <ReactInputMask mask="(999) 999-9999" maskChar="_">
                                    {() => (
                                      <Input
                                        placeholder="Billing phone"
                                        style={{ borderRadius: '5px' }}
                                        type="text"
                                        className="inputNumber"
                                      />
                                    )}
                                  </ReactInputMask>
                                </Form.Item>
                              </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} xl={12}>
                              <div className="">
                                <h4>Issue State</h4>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'issueState']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please Enter Issue State',
                                    },
                                  ]}
                                  // style={{ height:"20px" }}
                                >
                                  <AutoComplete
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ borderRadius: '10px' }}
                                    placeholder="Please enter State"
                                    className="custom-dropdown"
                                    options={statesUsa}
                                    filterOption={true}
                                    onSelect={(val) => {
                                      console.log('selectedValue', val.split(' ').join(''));
                                      setSelState(val.split(' ').join(''));
                                    }}
                                  />

                                  {/* <Input
                                    placeholder="Enter Licence State"
                                    style={{ borderRadius: '5px' }}
                                    type="text"
                                    // className="inputNumber"
                                  /> */}
                                </Form.Item>
                              </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} xl={12}>
                              <div className="">
                                <h4>Licence Type</h4>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'licenceType']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please Enter Licence Type',
                                    },
                                  ]}
                                >
                                  <Select
                                    className="w-full"
                                    style={{ width: '100%' }}
                                    size="large"
                                    placeholder="Select Licence type"
                                  >
                                    {licenceType?.map((element) => (
                                      <Select.Option value={element?.value} key={element?.value}>
                                        {element?.name}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} xl={12}>
                              <div className="">
                                <h4>Licence Number</h4>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'licenceNumber']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter Licence Number',
                                    },
                                    // ...licencePattern,
                                  ]}
                                >
                                  {/* <Input
                                      placeholder="Enter Licence Number"
                                      onChange={(e) => handleLicenceError(e)}
                                      style={{ borderRadius: '5px' }}
                                    /> */}
                                  <Input
                                    placeholder="Enter Licence Number"
                                    style={{ borderRadius: '5px' }}
                                    type="text"
                                    // className="inputNumber"
                                  />
                                </Form.Item>
                              </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                              <div>
                                <h4>Start Date</h4>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'startDate']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please select start Date!',
                                    },
                                  ]}
                                >
                                  <DatePicker size="large" className="w-full" />
                                </Form.Item>
                              </div>
                            </Col>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                              <h4>Upload Licence Image</h4>
                              <ImageUploadField
                                index={index}
                                setImageArrayList={setImageArrayList}
                              />
                            </Col>
                            <Col xs={24} sm={24} md={24} xl={24}>
                              <div className="">
                                <h4>Services</h4>
                                <Form.Item
                                  // name="services"

                                  {...restField}
                                  name={[name, 'services']}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter services',
                                    },
                                  ]}
                                >
                                  <Select
                                    mode="multiple"
                                    placeholder="Please Select Services"
                                    value={selectedItems}
                                    onChange={setSelectedItems}
                                    style={{ width: '100%' }}
                                    options={filteredOptions.map((item) => ({
                                      value: item,
                                      label: item,
                                    }))}
                                  />
                                </Form.Item>
                              </div>
                            </Col>
                            <div className=" mb-2 text-lg ml-5 font-medium flex items-center ">
                              <p className="flex justify-end">
                                {/*    <Checkbox
                                    className="  mb-3 mt-3 "
                                    style={{
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      fontSize: '13px',
                                      color: '#B4B4B4',
                                      marginLeft: '15px',
                                    }}
                                    onChange={onChangeCheck}
                                  >
                                    Check If Mailing Address is same as Physical address
                                  </Checkbox>

                             */}
                              </p>
                            </div>
                            <Row gutter={24} style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                              <Col xs={24} sm={24} md={6} xl={6}>
                                <div className="">
                                  <h4> Address1</h4>
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'address1']}
                                    // name={[type, 'physicalAddress']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter address',
                                      },
                                    ]}
                                  >
                                    {/* <AutoComplete
                                      onSearch={debounceSearch}
                                      {...props}
                                      placeholder="Street and number , P.O. box, c/o"
                                      // size="large"
                                      style={{ borderRadius: '5px' }}
                                      apiKey={googleApi}
                                      dataSource={
                                        suggestedAddress &&
                                        suggestedAddress?.map(({ place_id, description }) => ({
                                          value: JSON.stringify({ id: place_id, description }),
                                          text: description,
                                        }))
                                      }
                                      onSelect={async (e) => {
                                        const obj = await JSON.parse(e);

                                        setLoadingAutoComplete(true);
                                        getAddressFieldsFromGoogle(
                                          obj?.id,
                                          (addressFieldsByGoogle) => {
                                            setLoadingAutoComplete(false);
                                            const foundCountry = Countries?.filter(
                                              (c) => c?.id === addressFieldsByGoogle?.country,
                                            );
                                            const foundProvince =
                                              Array.isArray(foundCountry) &&
                                              foundCountry.length > 0 &&
                                              foundCountry[0]?.provinces.find(
                                                (province) =>
                                                  province.geoId ===
                                                  addressFieldsByGoogle.administrative_area_level_1,
                                              );
                                            setSelectedCountry(
                                              `${foundCountry?.[0]?.name} (${foundCountry?.[0]?.code})`,
                                            );
                                            const sCode = foundProvince
                                              ? `${foundProvince.geoName} ${foundProvince.geoId}`
                                              : undefined;
                                            if (!foundProvince) {
                                              setProvinces([]);
                                            }

                                            const obj = {
                                              state:
                                                addressFieldsByGoogle.administrative_area_level_1,
                                              city: addressFieldsByGoogle.locality,
                                              zip: addressFieldsByGoogle.postal_code,

                                              address1:
                                                `${addressFieldsByGoogle.street_number || ''} ${
                                                  addressFieldsByGoogle.route || ''
                                                } ` || '',
                                              address2:
                                                `${addressFieldsByGoogle.premise || ''} ${
                                                  addressFieldsByGoogle.subpremise || ''
                                                } ${addressFieldsByGoogle.room || ''} ${
                                                  addressFieldsByGoogle.building || ''
                                                } ` || '',

                                              address_line_2: '',
                                              country_code: foundCountry?.length
                                                ? `${foundCountry?.[0]?.name} (${foundCountry?.[0]?.code})`
                                                : undefined,
                                              state_code: sCode,
                                            };

                                            const cdf = [...addresses];
                                            const st = cdf?.findIndex((_, i) => i === Number(name));
                                            const newState = { ...(cdf[st] || {}), ...obj };
                                            if (st !== -1) {
                                              cdf[st] = newState;
                                            } else {
                                              cdf[Number(name)] = newState;
                                            }
                                            setProvinces(
                                              (Countries && Countries[0]?.provinces) || [],
                                            );
                                            setSelectedCountry('United States (USA)');
                                            // return cdf;
                                            setAddresses(cdf);

                                            // todo: edit address
                                            form.setFieldsValue({
                                              driverCollection: cdf,
                                            });
                                          },
                                        );
                                      }}
                                    >
                                      {loadingAutoComplete && <div>Loading...</div>}
                                    </AutoComplete> */}
                                    <Input
                                      placeholder="Street and number , P.O. box, c/o"
                                      style={{ borderRadius: '5px' }}
                                    />
                                  </Form.Item>
                                </div>
                              </Col>
                              <Col xs={24} sm={24} md={6} xl={6}>
                                <div className="">
                                  <h4> Address2</h4>
                                  <Form.Item
                                    // name="physicalAddress2"
                                    // name={[type, 'physicalAddress']}
                                    {...restField}
                                    name={[name, 'address2']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter address',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Apartment, suite, unit, building, floor"
                                      style={{ borderRadius: '5px' }}
                                    />
                                  </Form.Item>
                                </div>
                              </Col>

                              <Col xs={24} sm={24} md={6} xl={6}>
                                <div className="">
                                  <h4>State</h4>
                                  <Form.Item
                                    // name="physicalState"

                                    {...restField}
                                    name={[name, 'state']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter state',
                                      },
                                    ]}
                                  >
                                    <AutoComplete
                                      style={{ width: '100%' }}
                                      dropdownStyle={{ borderRadius: '10px' }}
                                      placeholder="Please enter State"
                                      className="custom-dropdown"
                                      options={statesUsa}
                                      filterOption={true}
                                      onSelect={(val) => {
                                        console.log('selectedValue', val.split(' ').join(''));
                                        setSelState(val.split(' ').join(''));
                                      }}
                                    />
                                  </Form.Item>
                                </div>
                              </Col>
                              <Col xs={24} sm={24} md={6} xl={6}>
                                <div className="">
                                  <h4>City</h4>
                                  <Form.Item
                                    // name="physicalCity"
                                    {...restField}
                                    name={[name, 'city']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter city',
                                      },
                                    ]}
                                  >
                                    <AutoComplete
                                      style={{ width: '100%' }}
                                      dropdownStyle={{ borderRadius: '10px' }}
                                      placeholder="Please enter City"
                                      className="custom-dropdown"
                                      options={suggestedCity}
                                      filterOption={true}
                                      onSelect={(val) => {
                                        console.log('selectedValue', val);
                                      }}
                                    />
                                  </Form.Item>
                                </div>
                              </Col>
                              <Col xs={24} sm={24} md={6} xl={6}>
                                <div className="">
                                  <h4>Zip</h4>
                                  <Form.Item
                                    // name="physicalZip"
                                    {...restField}
                                    name={[name, 'zip']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter zip code',
                                      },
                                      {
                                        pattern: isValidZip,
                                        message: 'Please enter valid zip code',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Enter Zip Code"
                                      style={{ borderRadius: '5px' }}
                                      type="Number"
                                      className="inputNumber"
                                    />
                                  </Form.Item>
                                </div>
                              </Col>
                            </Row>
                          </Row>
                        </div>
                        {index ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        disabled={fields.length === 3 || driverId}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Driver
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <div className="gap-3 flex justify-end mr-5">
                <Button
                  style={{ height: '30px', borderRadius: '5px' }}
                  onClick={() =>
                    setIsopenModal({ ...isopenModal, addDriver: { name: '', open: false } })
                  }
                >
                  <span className="text-black px-2">Cancel</span>
                </Button>
                {buttonStatus?._id ? (
                  <Button
                    type="primary"
                    loading={loading}
                    style={{ height: '30px', borderRadius: '5px' }}
                    onClick={() =>
                      updateDriver(
                        form.getFieldsValue('driverForm'),
                        setIsopenModal({
                          ...isopenModal,
                          addDriver: { name: '', open: false },
                        }),
                      )
                    }
                  >
                    <span className="text-white px-2">Update</span>
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    style={{ height: '30px', borderRadius: '5px' }}
                    loading={loading}
                    htmlType="submit"
                  >
                    <span className="text-white px-2">Continue</span>
                  </Button>
                )}
              </div>
            </Spin>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ driver, client, service }) => ({
  allDriversList: driver?.allDriversList,
  allClientList: client?.allClientList,
  singleDriverDetails: driver?.singleDriverDetails,
  allServicesList: service?.getAllServices,
}))(AddDrivers);
