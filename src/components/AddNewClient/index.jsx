import React, { useState, useEffect, useRef } from 'react';
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Spin,
  AutoComplete,
} from 'antd';
import { useAtom } from 'jotai';
import { connect } from 'umi';
import { modalsJotai, newClientDetailsjotai } from '@/utils/globalStates/modals';
import { US_DL } from '@/regex';
import ReactInputMask from 'react-input-mask';
import { stateDetails } from '../UsaStates';
import { usaStates } from '../UsStates';

import { AlphaCodeState } from '../AlphaCodeState';
import { quickBooks_invoice_intent } from '@/pages/Dashboard/quickBooksInvoiceIntent';
import { createCustomer, queryCustomer, updateInvoice } from '@/services/quickBooks';

const statesUsa = usaStates?.map((item) => {
  return { value: item?.name, type: item?.abbreviation };
});

const alphaCode = AlphaCodeState?.map((item) => {
  return { value: item?.name };
});
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

const AddNewClient = ({
  setOpenModal,
  openModal,
  dispatch,
  getAllClients,
  singleClientDetails,
  form,
  buttonStatus,
  url,
  setUrl,
  setIsQuickBookLoading,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [licencePattern, setLicencePattern] = useState([]);
  const [selState, setSelState] = useState('');
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const [suggestedCity, setSuggestedCity] = useState();
  const [newClientDetails, setNewClientDetails] = useAtom(newClientDetailsjotai);
  const [alphaCodeState, setAlphaCodeState] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [createCustomerLoading, setCreateCustomerLoading] = useState(false);
  const [isopenModal, setIsopenModal] = useAtom(modalsJotai);

  const handleAcceptTermsChange = (e) => {
    setAcceptTerms(e.target.checked);
  };

  const handleTermsClick = (e) => {
    e?.stopPropagation();
    setModalVisible(!modalVisible);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (selState) {
      const cityusa = stateDetails?.[selState];
      const cities = cityusa?.map((item) => {
        return { value: item, type: item };
      });
      setSuggestedCity(cities);
    }
  }, [selState]);

  const onChangeCheck = (e) => {
    let phys = form.getFieldsValue('clientForm');
    if (e.target.checked === true) {
      form.setFieldsValue({
        physicalAddress1: phys?.mailingAddress1,
        physicalAddress2: phys?.mailingAddress2,
        physicalCity: phys?.mailingCity,
        physicalState: phys?.mailingState,
        physicalZip: phys?.mailingZip,
      });
    } else {
      form.setFieldsValue({
        physicalAddress1: '',
        physicalAddress2: '',
        physicalCity: '',
        physicalState: '',
        physicalZip: '',
      });
    }
  };

  const onChangeCheckDER = (e) => {
    let DerContact = form.getFieldsValue('designatedRepresentative');
    if (e.target.checked === true) {
      form.setFieldsValue({
        designatedRepresentative: [
          {
            designatedRepresentativePhone: DerContact?.billingContact,
            designatedRepresentativeFirstName: DerContact?.billingContactName?.split(' ')?.[0],
            designatedRepresentativeLastName: DerContact?.billingContactName?.split(' ')?.[1],
            designatedRepresentativeEmail: DerContact?.billingEmail,
          },
        ],
      });
    } else {
      form.setFieldsValue({
        designatedRepresentative: [
          {
            designatedRepresentativePhone: '',
            designatedRepresentativeFirstName: '',
            designatedRepresentativeLastName: '',
            designatedRepresentativeEmail: '',
          },
        ],
      });
    }
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

  const onFinish = (values) => {
    if (acceptTerms) {
      setNewClientDetails(values);
      const formData = new FormData();

      const arrayOfObjects = values?.services.map((item) => ({ name: item }));
      formData.append('services', JSON.stringify(arrayOfObjects));
      formData.append('motorCarrierName', values?.motorCarrierName);
      formData.append('physicalAddress1', values?.physicalAddress1);
      formData.append('physicalAddress2', values?.physicalAddress2);

      formData.append('physicalCity', values?.physicalCity);
      formData.append('physicalState', values?.physicalState);
      formData.append('physicalZip', values?.physicalZip);
      formData.append('mailingAddress1', values?.mailingAddress1);
      formData.append('mailingAddress2', values?.mailingAddress2);
      formData.append('mailingCity', values?.mailingCity);
      formData.append('mailingState', values?.mailingState);
      formData.append('mailingZip', values?.mailingZip);
      formData.append('fax', values?.fax || '');
      formData.append('billingEmail', values?.billingEmail);
      formData.append('billingContact', values?.billingContact);
      formData.append('billingContactName', values?.billingContactName);
      formData.append('billingPhone', values?.billingPhone);
      formData.append('SSNTAXIdNumber', values.SSNTAXIdNumber);
      formData.append('licenceNumber', values.licenceNumber);
      formData.append('licenseState', values?.licenseState);

      formData.append('dotNumber', Number(values.dotNumber));
      formData.append('MCNumber', values.MCNumber);
      formData.append('designated', JSON.stringify(values?.designatedRepresentative));
      formData.append('signature_url', `${window.location.origin}/user/user-signature`);

      const handleQuickBooksCustomer = async (records) => {
        setCreateCustomerLoading(true);

        const filteredServices = allServices?.filter((obj1) =>
          records?.services.some((obj2) => obj1.name === obj2),
        );

        try {
          const queryCustomerInQuickBooks = await queryCustomer({
            body: {
              qb_admin: JSON.parse(localStorage.getItem('currentUser_details'))._id,
              query: 'select * from Customer',
            },
          });
          if (queryCustomerInQuickBooks?.success) {
            const findObject = queryCustomerInQuickBooks.response.find(
              (item) => item.DisplayName.toLowerCase() === records?.motorCarrierName?.toLowerCase(),
            );
            setCreateCustomerLoading(false);
            if (findObject) {
              message.error('This motor carrier name already exist in quickBooks.');
            } else {
              dispatch({
                type: 'client/createClient',
                payload: {
                  body: formData,
                },
              })
                .then((res) => {
                  if (res?.success) {
                    setOpenModal(false);
                    setLoading(false);
                    setIsopenModal({
                      ...isopenModal,
                      ConfirmModal: {
                        name: 'Confirm Modal',
                        open: true,
                        currentID: res?.data?._id,
                      },
                    });
                    form.resetFields();
                    message.success('Client Added Successfully');
                    setUrl();
                    getAllClients();
                  } else {
                    message.error('An error occured!');
                  }
                })
                .catch((err) => console.log('er465465r', err));
            }
          }
        } catch (error) {
          setCreateCustomerLoading(false);
          console.log('error in queryCustomer', error);
        }
      };
      handleQuickBooksCustomer(values);
    } else {
      message.error('Please accept terms and Conditions');
    }
  };

  // checks if both array are equal or not
  function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      const obj1 = arr1[i];
      const obj2 = arr2.find((obj) => obj.id === obj1.id && obj.name === obj1.name);

      if (!obj2) {
        return false;
      }
    }

    return true;
  }

  // Calculate the center position for pop-up
  const width = 1100;
  const height = 800;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const leftPosition = screenWidth / 2 - width / 2;
  const topPosition = screenHeight / 2 - height / 2;

  const updateClient = (values) => {
    const formData = new FormData();
    const arrayOfObjects = values?.services.map((item) => ({ name: item }));
    formData.append('signatureImage', url);
    formData.append('services', JSON.stringify(arrayOfObjects));
    formData.append('motorCarrierName', values?.motorCarrierName);
    formData.append('physicalAddress1', values?.physicalAddress1);
    formData.append('physicalAddress2', values?.physicalAddress2);
    formData.append('isPhysicalAddress', values?.isPhysicalAddress === 'on' ? true : false);
    formData.append('isDERCheck', values?.isDERCheck === 'on' ? true : false);
    formData.append('isTermsAndConditions', values?.isTermsAndConditions === 'on' ? true : false);
    formData.append('physicalCity', values?.physicalCity);
    formData.append('physicalState', values?.physicalState);
    formData.append('physicalZip', values?.physicalZip);
    formData.append('mailingAddress2', values?.mailingAddress2);
    formData.append('mailingCity', values?.mailingCity);
    formData.append('mailingState', values?.mailingState);
    formData.append('mailingZip', values?.mailingZip);
    formData.append('fax', values?.fax || '');
    formData.append('billingEmail', values?.billingEmail);
    formData.append('billingContact', values?.billingContact);
    formData.append('billingContactName', values?.billingContactName);
    formData.append('SSNTAXIdNumber', values.SSNTAXIdNumber);
    formData.append('licenceNumber', values.licenceNumber);
    formData.append('licenseState', values.licenseState);
    formData.append('dotNumber', Number(values.dotNumber));
    formData.append('MCNumber', values.MCNumber);
    formData.append('designated', JSON.stringify(values?.designatedRepresentative));

    dispatch({
      type: 'client/updateClient',
      payload: {
        body: formData,
        pathParams: {
          id: singleClientDetails?.data?._id,
        },
      },
    }).then((res) => {
      if (res) {
        message.success('Client updated Successfully');
        form.resetFields();
        setUrl('');
        setOpenModal(false);
        getAllClients();
      } else {
        message.error('An error occured!');
      }
    });

    // update invoice in quickbooks
    const handleQuickBooksInvoice = async (records, values) => {
      setIsQuickBookLoading(true);
      const filteredServices = allServices?.filter((obj1) =>
        values?.services.some((obj2) => obj1.name === obj2),
      );

      try {
        const updateInvoiceInQuickBooks = await updateInvoice({
          body: {
            qb_admin: JSON.parse(localStorage.getItem('currentUser_details'))._id,
            update_content: {
              Id: records?.qbInvoiceID,
              sparse: true,
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

        if (updateInvoiceInQuickBooks?.success) {
          setIsQuickBookLoading(false);
          message.success('Services updated in QuickBooks');
          // window.open(updateInvoiceInQuickBooks?.redirect_url);
          window.open(
            `${updateInvoiceInQuickBooks?.redirect_url}`,
            '_blank',
            `toolbar=yes,scrollbars=yes,resizable=yes, width=${width},height=${height}, left=${leftPosition}, top=${topPosition}`,
          );
        }
      } catch (error) {
        if (error?.data?.error?.status === 401) {
          setIsQuickBookLoading(false);
          window.location.replace(error.data.error.message.authURL);
        } else {
          message.error(error?.data?.message);
        }
      }
    };

    if (
      buttonStatus?.qbInvoiceID &&
      !areArraysEqual(
        buttonStatus?.services?.map((element) => {
          return element?.name;
        }),
        values?.services,
      )
    ) {
      handleQuickBooksInvoice(buttonStatus, values);
    }
  };

  const emailPattern = /^[^@!#$%^&*()_+=\[\]{};':"\\|,<>\/?][^!#$%^&*()_+=\[\]{};':"\\|,<>\/?]*$/;

  const regexPhone = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  // const regexPhone = /^(\d+?)(?=(\d{3})+(?!\d))(\.\d+)?$/;

  const handleLicenceError = (e) => {
    let isValid = US_DL[alphaCodeState]?.map((pattern) => pattern?.regex?.test(e.target.value));
    isValid?.every((v) => {
      if (v === true) {
        setLicencePattern([]);
      } else {
        setLicencePattern(
          US_DL[alphaCodeState]?.map((regexItem) => {
            return {
              pattern: regexItem?.regex,
              message: regexItem?.description,
            };
          }),
        );
      }
    });
  };
  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div>
      <Modal
        title={
          <span style={{ color: '#10181e' }} className="font-medium">
            {buttonStatus?._id ? 'Update Client' : 'Add Client'}
          </span>
        }
        width={1000}
        centered
        footer={null}
        closeIcon={<CloseOutlined style={{ color: 'black' }} />}
        className="modalStyle"
        open={openModal}
        onOk={() => {
          setOpenModal(false);
          form.resetFields();
        }}
        onCancel={() => {
          setOpenModal(false);
          form.resetFields();
          setUrl('');
        }}
      >
        <Spin size="large" spinning={createCustomerLoading}>
          <div className="mx-auto">
            <Form
              form={form}
              name="clientForm"
              onFinish={onFinish}
              initialValues={{ designatedRepresentative: [undefined] }}
            >
              <Spin size="large" spinning={loading}>
                <Row gutter={24} style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                  <Col xs={24} sm={24} md={24} xl={24}>
                    <div className="">
                      <h4>Motor Carrier Name</h4>
                      <Form.Item
                        name="motorCarrierName"
                        placeholder="Motor Carrier Name"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter motor carrier name',
                          },
                          {
                            pattern: /^[A-Za-z\s]+$/,
                            message: 'Only alphabets and spaces are allowed',
                          },
                        ]}
                      >
                        <Input
                          disabled={!!buttonStatus?._id}
                          placeholder="Enter Motor Carrier Name"
                          style={{ borderRadius: '5px' }}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <div className="mb-4 text-lg ml-5 font-medium">Mailing Address</div>
                <Row
                  gutter={16}
                  style={{ paddingLeft: '15px', paddingRight: '15px', paddingBottom: '5px' }}
                >
                  <Col xs={24} sm={24} md={5} xl={5}>
                    <div className="">
                      <h4> Address 1</h4>
                      <Form.Item
                        name="mailingAddress1"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter address',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Street and number , P.O. box, c/o"
                          style={{ borderRadius: '5px' }}
                        />
                        {/* <AutoComplete
                        onSearch={debounceSearch}
                        {...props}
                        placeholder="Street and number , P.O. box, c/o"
                        style={{ borderRadius: '5px' }}
                        apiKey={googleApi}
                        dataSource={
                          suggestedAddress &&
                          suggestedAddress.map(({ place_id, description }) => ({
                            value: JSON.stringify({ id: place_id, description }),
                            text: description,
                          }))
                        }
                        onSelect={async (e) => {
                          console.log('ewcef', e);
                          const obj = await JSON.parse(e);

                          setLoadingAutoComplete(true);

                          console.log('obj123', obj);

                          getAddressFieldsFromGoogle(obj?.id, (addressFieldsByGoogle) => {
                            setLoadingAutoComplete(false);
                            const foundCountry = Countries?.filter(
                              (c) => c.id === addressFieldsByGoogle.country,
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
                            form.setFieldsValue({
                              mailingState: addressFieldsByGoogle.administrative_area_level_1,
                              mailingCity: addressFieldsByGoogle.locality,
                              mailingZip: addressFieldsByGoogle.postal_code,
                              mailingAddress1:
                                `${addressFieldsByGoogle.street_number || ''} ${
                                  addressFieldsByGoogle.route || ''
                                } ` || '',
                              mailingAddress2:
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
                            });

                            setProvinces((Countries && Countries[0]?.provinces) || []);
                            setSelectedCountry('United States (USA)');
                          });
                        }}
                      >
                        {loadingAutoComplete && <div>Loading...</div>}
                      </AutoComplete> */}
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={5} xl={5}>
                    <div className="">
                      <h4> Address 2</h4>
                      <Form.Item
                        // name="mailingAddress"
                        name="mailingAddress2"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter Apartment, suite',
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

                  <Col xs={24} sm={24} md={5} xl={5}>
                    <div className="">
                      <h4>State</h4>
                      <Form.Item
                        // name="mailingState"
                        name="mailingState"
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
                            setSelState(val.split(' ').join(''));
                          }}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={5} xl={5}>
                    <div className="">
                      <h4>City</h4>
                      <Form.Item
                        name="mailingCity"
                        // rules={[
                        //   {
                        //     // required: true,
                        //     message: 'Please enter city',
                        //   },
                        // ]}
                      >
                        <AutoComplete
                          style={{ width: '100%' }}
                          dropdownStyle={{ borderRadius: '10px' }}
                          placeholder="Please enter City"
                          className="custom-dropdown"
                          options={suggestedCity}
                          filterOption={true}
                        />

                        {/* <Input placeholder="Enter City" style={{ borderRadius: '5px' }} /> */}
                      </Form.Item>
                    </div>
                  </Col>

                  <Col xs={24} sm={24} md={4} xl={4}>
                    <div className="">
                      <h4>Zip</h4>
                      <Form.Item
                        name="mailingZip"
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
                          type="Number"
                          className="inputNumber"
                          size="large"
                          placeholder="Zip code"
                          maxLength={6}
                          // onChange={(e) => {
                          //   const { value } = e.target;
                          //   if (value.match(/^[0-9]*$/)) {
                          //     form.setFieldsValue({ [type]: { postal_code: value } });
                          //   } else {
                          //     message.error('Please enter a valid zip code');
                          //   }
                          // }}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <Form.Item
                  name="isPhysicalAddress"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please enter zip code',
                  //   },
                  // ]}
                >
                  <div className=" mb-2 text-lg ml-5 font-medium flex items-center ">
                    <p>Physical Address</p>
                    <p className="flex justify-end">
                      <Checkbox
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
                    </p>
                  </div>
                </Form.Item>
                <Row gutter={16} style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                  <Col xs={24} sm={24} md={5} xl={5}>
                    <div className="">
                      <h4> Address 1</h4>
                      <Form.Item
                        name="physicalAddress1"
                        // name={[type, 'physicalAddress']}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter address',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Street and number , P.O. box, c/o"
                          style={{ borderRadius: '5px' }}
                        />
                        {/* <AutoComplete
                        onSearch={debounceSearch}
                        {...props}
                        apiKey={googleApi}
                        dataSource={
                          suggestedAddress &&
                          suggestedAddress.map(({ place_id, description }) => ({
                            value: JSON.stringify({ id: place_id, description }),
                            text: description,
                          }))
                        }
                        onSelect={async (e) => {
                          const obj = JSON.parse(e);
                          getAddressFieldsFromGoogle(obj.id, (addressFieldsByGoogle) => {
                            const foundCountry = Countries?.filter(
                              (c) => c.id === addressFieldsByGoogle.country,
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
                            form.setFieldsValue({
                              physicalState: addressFieldsByGoogle.administrative_area_level_1,
                              physicalCity: addressFieldsByGoogle.locality,
                              physicalZip: addressFieldsByGoogle.postal_code,
                              physicalAddress1:
                                `${addressFieldsByGoogle.street_number || ''} ${
                                  addressFieldsByGoogle.route || ''
                                } ` || '',
                              physicalAddress2:
                                `${addressFieldsByGoogle.premise || ''} ${
                                  addressFieldsByGoogle.subpremise || ''
                                } ${addressFieldsByGoogle.room || ''} ${
                                  addressFieldsByGoogle.building || ''
                                } ` || '',
                              country_code: foundCountry?.length
                                ? `${foundCountry?.[0]?.name} (${foundCountry?.[0]?.code})`
                                : undefined,
                              state_code: sCode,
                            });

                            setProvinces((Countries && Countries[0]?.provinces) || []);
                            setSelectedCountry('United States (USA)');
                          });
                        }}
                      >
                        <Input
                          placeholder="Street and number , P.O. box, c/o"
                          size="large"
                          style={{ borderRadius: '5px' }}
                        />
                      </AutoComplete> */}
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={5} xl={5}>
                    <div className="">
                      <h4> Address 2</h4>
                      <Form.Item
                        name="physicalAddress2"
                        // name={[type, 'physicalAddress']}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter Apartment, suite',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Apartment, suite, unit, building, floor"
                          style={{ borderRadius: '5px' }}
                        />
                        {/* <Input placeholder="Enter Address" style={{ borderRadius: '5px' }} /> */}
                      </Form.Item>
                    </div>
                  </Col>

                  <Col xs={24} sm={24} md={5} xl={5}>
                    <div className="">
                      <h4>State</h4>
                      <Form.Item
                        name="physicalState"
                        // name={[type, 'physicalState']}

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
                            setSelState(val.split(' ').join(''));
                          }}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={5} xl={5}>
                    <div className="">
                      <h4>City</h4>
                      <Form.Item
                        name="physicalCity"
                        //  name={[type, 'physicalCity']}
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
                        />

                        {/* <Input placeholder="Enter City" style={{ borderRadius: '5px' }} /> */}
                      </Form.Item>
                    </div>
                  </Col>

                  <Col xs={24} sm={24} md={4} xl={4}>
                    <div className="">
                      <h4>Zip</h4>
                      <Form.Item
                        name="physicalZip"
                        //  name={[type, 'physicalZip']}
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
                <Row gutter={24} style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                  <Col xs={24} sm={24} md={6} xl={6}>
                    <div className="">
                      <h4>Billing Contact Name</h4>
                      <Form.Item
                        name="billingContactName"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter billing contact name',
                          },
                          {
                            pattern: /^[A-Za-z\s]+$/,
                            message: 'Only alphabets and spaces are allowed',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Billing Contact Name"
                          style={{ borderRadius: '5px' }}
                          type="text"
                          className="inputNumber"
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={6} xl={6}>
                    <div className="">
                      <h4>Billing Email</h4>
                      <Form.Item
                        name="billingEmail"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter billing email',
                          },
                          {
                            pattern: emailPattern,
                            message: 'Please enter a valid email',
                          },
                        ]}
                      >
                        <Input placeholder="Enter Billing Email" style={{ borderRadius: '5px' }} />
                      </Form.Item>
                    </div>
                  </Col>

                  <Col xs={24} sm={24} md={6} xl={6}>
                    <div className="">
                      <h4>Billing Phone</h4>
                      <Form.Item
                        name="billingContact"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter billing phone',
                          },
                          {
                            pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
                            message: 'Phone number must be 10 digits',
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
                  <Col xs={24} sm={24} md={6} xl={6}>
                    <div className="">
                      <h4>Fax (optional)</h4>
                      <Form.Item
                        name="fax"
                        rules={[
                          // {
                          //   required: true,
                          //   message: 'Please enter fax number',
                          // },
                          {
                            pattern: /^\d{10}$/, // Updated pattern to accept 10 digits
                            message: 'Please enter a 10-digit fax number.',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter Fax Number"
                          style={{ borderRadius: '5px' }}
                          type="Number"
                          className="inputNumber"
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={6} xl={6}>
                    <div className="">
                      <h4>SSN /TAX Id Number</h4>
                      <Form.Item
                        name="SSNTAXIdNumber"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter SSN /TAX Id number',
                          },
                          {
                            pattern: /^\d{2}-\d{4}$/,
                            message: 'SSN / TAX Id number  must be 6 digits',
                          },
                        ]}
                      >
                        <ReactInputMask mask="99-9999" maskChar="_">
                          {() => (
                            <Input
                              placeholder="Enter SSN /TAX Id Number"
                              style={{ borderRadius: '5px' }}
                              type="text"
                              className="inputNumber"
                            />
                          )}
                        </ReactInputMask>
                      </Form.Item>
                    </div>
                  </Col>
                  {/* <Col xs={24} sm={24} md={6} xl={6} style={{ paddingRight: 0 }}>
                  <h4>Licence Number</h4>

                  <Space direction="vertical">
                    <Space.Compact>
                    <Form.Item
                    name=''
                    >
                      <Select
                        showSearch
                        placeholder="State"
                        size="middle"
                        style={{ width: '80px', height: '30px' }}
                        optionFilterProp="children"
                        onChange={onHandleCodeChange}
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        onSelect={(val) => {
                          console.log('selectedValue', val);

                          setAlphaCodeState(val);
                        }}
                        getPopupContainer={(node) => node.parentNode}
                        options={alphaCode.map((item) => ({
                          value: item?.value,
                          label: item?.value,
                          key: item?._id,
                        }))}
                      />
                      </Form.Item>
                      <Form.Item
                        name="licenceNumber"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter licence number',
                          },

                          {
                            pattern: `${licencePattern?.map((i) => i)}`,
                            message: `${licencePattern?.map((item) => item?.message)}`,
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter Licence Number"
                          onChange={(e) => handleLicenceError(e)}
                          className="inputNumber"
                        />
                      </Form.Item>
                    </Space.Compact>
                  </Space>
                </Col> */}
                  <Col xs={3} sm={3} md={3} xl={3} style={{ paddingRight: 0 }}>
                    <div
                      className=""
                      style={{ paddingRight: '0', marginTop: '29px', borderRadius: '10px' }}
                    >
                      <Form.Item
                        name="licenseState"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: 'Please enter licence number',
                        //   },
                        // ]}
                        // rules={[{ validator: validatePassword }]}
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: 'Please select Licence state',
                        //   },
                        //   ...licencePattern,
                        // ]}
                      >
                        <Select
                          showSearch
                          placeholder="State"
                          size="large"
                          optionFilterProp="children"
                          // onChange={onChange}cept the terms
                          style={{ borderRadius: '2px' }}
                          filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                          onSelect={(val) => {
                            setAlphaCodeState(val);
                          }}
                          getPopupContainer={(node) => node.parentNode}
                          options={alphaCode.map((item) => ({
                            value: item?.value,
                            label: item?.value,
                            key: item?._id,
                          }))}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={6} xl={6} style={{ paddingLeft: 0 }}>
                    <div className="">
                      <h4 style={{ marginLeft: '-100px' }}>Licence Number</h4>
                      <Form.Item
                        name="licenceNumber"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter licence number',
                          },

                          {
                            pattern: licencePattern?.[0]?.message,
                            message: `${licencePattern?.map((item) => item?.message)}`,
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter Licence Number"
                          style={{ borderRadius: '0px' }}
                          // type="Number"
                          onChange={(e) => handleLicenceError(e)}
                          className="inputNumber"
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  {/* <Col xs={24} sm={24} md={4} xl={4} style={{ paddingLeft: 0 }}>
                  <div className="">
                    <h4 >Licence Number</h4>

                  </div>
                </Col> */}

                  <Col xs={24} sm={24} md={6} xl={6}>
                    <div className="">
                      <h4>Dot Number</h4>
                      <Form.Item
                        name="dotNumber"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter DOT number',
                          },
                          {
                            pattern: /^[0-9]{6,8}$/, // Updated pattern to accept exactly 8 digits
                            message: 'Please enter an 6 to 8-digit number.',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter DOT Number"
                          style={{ borderRadius: '5px' }}
                          className="inputNumber"
                        />
                      </Form.Item>
                    </div>
                  </Col>

                  <Col xs={24} sm={24} md={6} xl={6}>
                    <div className="">
                      <h4>MC Number</h4>
                      <Form.Item
                        name="MCNumber"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter mc number',
                          },
                          {
                            pattern: /^\d{5,6}$/,
                            message: 'Please enter a valid MC number.',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Enter MC Number"
                          type="text"
                          className="inputNumber rounded-md"
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} xl={24}>
                    <div className="">
                      <h4>Services</h4>
                      <Form.Item
                        name="services"
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
                          options={allServices?.map((item) => ({
                            value: item?.name,
                            label: item?.name,
                          }))}
                          // options={filteredOptions.map((item) => ({
                          //   value: item,
                          //   label: item,
                          // }))}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <Col>
                  {' '}
                  <Form.Item
                    name="isDERCheck"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please enter zip code',
                    //   },
                    // ]}
                  >
                    <div className=" mb-2 text-lg ml-5 font-medium flex items-center ">
                      <p>Designated Employer Representatives (DER)</p>
                      <p className="flex justify-end">
                        <Checkbox
                          className="  mb-3 mt-3 "
                          style={{
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '13px',
                            color: '#B4B4B4',
                            marginLeft: '15px',
                          }}
                          onChange={onChangeCheckDER}
                        >
                          Check If Client contact person is same as DER conatct person
                        </Checkbox>
                      </p>
                    </div>
                  </Form.Item>
                  <Form.List name="designatedRepresentative">
                    {(fields, { add, remove }) => (
                      <div>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <div key={key}>
                            <div className="flex justify-end font-semibold text-green-700">
                              {fields?.length > 1 && (
                                <div
                                  style={{
                                    padding: '0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}
                                >
                                  {index ? (
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                  ) : null}
                                  {/*         <Popconfirm
                                  title="Are you sure that you want to delete?"
                                  okButtonProps={{
                                    onClick: () => handleRemove(remove, name),
                                  }}
                                  okText="Yes"
                                  okType="danger"
                                  cancelText="No"
                                >
                                  <Button danger>Remove</Button>
                                </Popconfirm> */}
                                </div>
                              )}
                            </div>

                            <Row gutter={24} style={{ padding: '15px' }}>
                              <Col xs={24} sm={24} md={6} xl={6}>
                                <div className="">
                                  <h4>First Name</h4>
                                  <Form.Item
                                    // name={[
                                    //   'designatedRepresentative',
                                    //   index,
                                    //   'designatedRepresentativeFirstName',
                                    // ]}
                                    {...restField}
                                    name={[name, 'designatedRepresentativeFirstName']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter DER first name',
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
                              <Col xs={24} sm={24} md={6} xl={6}>
                                <div className="">
                                  <h4>Last Name</h4>
                                  <Form.Item
                                    // name={[
                                    //   'designatedRepresentative',
                                    //   index,
                                    //   'designatedRepresentativeLastName',
                                    // ]}
                                    {...restField}
                                    name={[name, 'designatedRepresentativeLastName']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter DER last name',
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
                              <Col xs={24} sm={24} md={6} xl={6}>
                                <div className="">
                                  <h4>Phone</h4>
                                  <Form.Item
                                    {...restField}
                                    // name={[
                                    //   'designatedRepresentative',
                                    //   index,
                                    //   'designatedRepresentativePhone',
                                    // ]}
                                    name={[name, 'designatedRepresentativePhone']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter DER Phone no.',
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
                                          placeholder="Billing Contact Name"
                                          style={{ borderRadius: '5px' }}
                                          type="text"
                                          className="inputNumber"
                                        />
                                      )}
                                    </ReactInputMask>
                                  </Form.Item>
                                </div>
                              </Col>
                              <Col xs={24} sm={24} md={6} xl={6}>
                                <div className="">
                                  <h4>Email Address</h4>
                                  <Form.Item
                                    // name={[
                                    //   'designatedRepresentative',
                                    //   index,
                                    //   'designatedRepresentativeEmail',
                                    // ]}
                                    {...restField}
                                    //  name={[name, 'first']}
                                    name={[name, 'designatedRepresentativeEmail']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter DER email.',
                                      },
                                      {
                                        pattern: emailPattern,
                                        message: 'Please enter a valid email',
                                      },
                                    ]}
                                  >
                                    <Input
                                      placeholder="Enter Email Address"
                                      style={{ borderRadius: '5px' }}
                                      type="email"
                                    />
                                  </Form.Item>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        ))}
                        <Form.Item>
                          <Button
                            style={{ marginBottom: '1.5rem' }}
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            // disabled={disabled}
                          >
                            Add another Designated Employer Representatives
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </Col>
                {!buttonStatus?._id ? (
                  <div className="flex justify-between">
                    <Form.Item
                      name="isTermsAndConditions"
                      valuePropName="checked"
                      // rules={[
                      //   {
                      //     validator: (_, value) =>
                      //       value
                      //         ? Promise.resolve()
                      //         : Promise.reject('Please accept the terms & conditions'),
                      //   },
                      // ]}
                    >
                      <Checkbox
                        style={{
                          fontStyle: 'normal',
                          fontWeight: 400,
                          fontSize: '13px',
                          color: '#B4B4B4',
                          marginLeft: '15px',
                        }}
                        onChange={handleAcceptTermsChange}
                      />

                      <div className="ml-2">
                        I accept the{' '}
                        <span
                          style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
                          onClick={handleTermsClick}
                        >
                          Terms and Conditions
                        </span>
                      </div>
                    </Form.Item>
                  </div>
                ) : (
                  <div> </div>
                )}
                {buttonStatus?._id ? (
                  <div className="ml-4">
                    <h4>Signature Image</h4>
                    <div className="border text-center py-4 rounded">
                      {url !== 'undefined' && url ? (
                        <img
                          alt="example"
                          style={{
                            width: '80%',
                            height: '',
                          }}
                          src={url}
                        />
                      ) : (
                        <div>Signature not set</div>
                      )}
                    </div>
                  </div>
                ) : null}
              </Spin>
               {' '}
              <div className="gap-3 flex justify-end mr-5">
                <Button
                  onClick={() => {
                    setOpenModal(false);
                    form.resetFields();
                    setUrl('');
                  }}
                  style={{ height: '30px', borderRadius: '5px' }}
                >
                  <span className="text-black px-2">Cancel</span>
                </Button>
                {buttonStatus?._id ? (
                  <Button
                    type="primary"
                    style={{ height: '30px', borderRadius: '5px' }}
                    onClick={() =>
                      updateClient(form.getFieldsValue('clientForm'), setOpenModal(false))
                    }
                  >
                    <span className="text-white px-2">Update</span>
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    style={{ height: '30px', borderRadius: '5px' }}
                    htmlType="submit"
                  >
                    <span className="text-white px-2">Continue</span>
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </Spin>
      </Modal>
      <Modal
        title="Terms and Conditions"
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleModalClose}
      >
        <p className="p-1">I CERTIFY THAT I AM AN EMPLOYEE OF AND AUTHORZED TO REPRESENT </p>
        <p className="p-1">THE MOTOR CARRIER INDICATED ABOVE, THAT I HAVE READ,INDITALED,</p>
        <p className="p-1">UNDERSTAND , AND AGREE TO ADHERE TO THE CONSORTIUM GUIDLINES </p>
        <p className="p-1">PROVIDED TO ME WITH THIS APPLICATION</p>
      </Modal>
    </div>
  );
};

export default connect(({ client, service }) => ({
  allClientList: client?.allClientList,
  singleClientDetails: client?.singleClientDetails,
  allServicesList: service?.getAllServices,
}))(AddNewClient);
