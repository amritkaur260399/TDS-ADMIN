import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Tabs,
  message,
} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { modalsJotai } from '@/utils/globalStates/modals';
import { useAtom } from 'jotai';
import { CloseOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import ConfirmModal from '../ConfirnModal';
import AutocompleteAddresss from '../AutocompleteAddress';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { debounce } from 'lodash';
import Countries from '../Countries';
import ReactInputMask from 'react-input-mask';

const CompanyClearingHouses = ({
  form,
  dispatch,
  buttonStatus,
  SingleCompanyClearingHouseDetails,
  getAllCompanyClearingHouse,
  selectedCountry,
  setSelectedCountry,
  suggestedAddress,
  setSuggestedAddress,
  provinces,
  setProvinces,
  setButtonStatus,
  clientId,
  setClientId,
  serviceId,
  getAllClients,
}) => {
  const [isopenModal, setIsopenModal] = useAtom(modalsJotai);
  const [loadingAutoComplete, setLoadingAutoComplete] = useState(false);

  // const [selectedCountry, setSelectedCountry] = useState('United States (USA)');
  // const [suggestedAddress, setSuggestedAddress] = useState([]);
  // const [provinces, setProvinces] = useState([]);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const googleApi = 'AIzaSyC0TUVA7FHtzJqaWRLnLxbJ-zux6PSCDUM';
  const { inputRef } = useRef(null);
  const regexPhone = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  const action = (text) => {
    googleInstance.getPredictions({ input: text }, (predictions) => {
      setSuggestedAddress(predictions);
    });
  };
  console.log('values23132', clientId, serviceId);
  const onFinish = (values) => {
    console.log(values, 'iijjjj');
    if (values) {
      dispatch({
        type: 'clearingHouse/createClearingHouse',
        payload: {
          body: {
            companyName: values?.companyName,
            phoneNumber: values?.phoneNumber,
            firstName: values?.firstName,
            lastName: values?.lastName,
            dob: values?.dob,
            ownersDriverLicenseNumber: values?.ownersDriverLicenseNumber,
            email: values?.email,
            address: values?.address,
            FMCSAPassword: values?.FMCSAPassword,
            FMCSAEmail: values?.FMCSAEmail,
            clearingHouseLogin: values?.clearingHouseLogin,
            clearingHousePassword: values?.clearingHousePassword,
            clientId: clientId,
            serviceId: serviceId,
          },
        },
      }).then((res) => {
        if (res?.data) {
          // message.success('Company Clearing House Added Successfully');
          // form.resetFields('');
          // setButtonStatus("")
          setIsopenModal({
            ...isopenModal,
            CompanyClearingHouses: { name: '', open: false },
          });
          setIsopenModal({
            ...isopenModal,
            ConfirmModal: { name: 'Confirm Modal', open: true },
          });
          getAllCompanyClearingHouse();
          getAllClients();
        } else {
          message.error('An error occured!');
        }
        // console.log('res23123132', res);
        // setLoading(false);
      });
    }
  };
  const updateCompanyClearingHouse = (values) => {
    if (values) {
      dispatch({
        type: 'clearingHouse/updateCompanyClearingHouse',
        payload: {
          pathParams: {
            id: SingleCompanyClearingHouseDetails?.data?._id,
          },
          body: {
            companyName: values?.companyName,
            phoneNumber: values?.phoneNumber,
            firstName: values?.firstName,
            lastName: values?.lastName,
            dob: values?.dob,
            ownersDriverLicenseNumber: values?.ownersDriverLicenseNumber,
            email: values?.email,
            address: values?.address,
            FMCSAPassword: values?.FMCSAPassword,
            FMCSAEmail: values?.FMCSAEmail,
            clearingHouseLogin: values?.clearingHouseLogin,
            clearingHousePassword: values?.clearingHousePassword,
          },
        },
      }).then((res) => {
        if (res) {
          message.success('Company Clearing House Updated Successfully');
          // form.resetFields('');
          setIsopenModal({
            ...isopenModal,
            CompanyClearingHouses: { name: '', open: false },
          });
          getAllCompanyClearingHouse();
        } else {
          message.error('An error occured!');
        }
      });
    }
  };
  const emailPattern = /^[^@!#$%^&*()_+=\[\]{};':"\\|,<>\/?][^!#$%^&*()_+=\[\]{};':"\\|,<>\/?]*$/;
  // const phoneValidation = /^[0-9]+$/;
  const map = new google.maps.Map(document.getElementById('map'));
  // eslint-disable-next-line no-undef
  const googleInstance = new google.maps.places.AutocompleteService();
  // eslint-disable-next-line no-undef
  const placesService = new google.maps.places.PlacesService(map);
  const componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'short_name',
    postal_code: 'short_name',
    formatted_address: 'long_name',
  };
  const getAddressFieldsFromGoogle = async (placeId, cb) => {
    let finalData = {};
    placesService.getDetails({ placeId }, ({ address_components }) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < address_components.length; i++) {
        const addressType = address_components[i].types[0];
        if (componentForm[addressType]) {
          const val = address_components[i][componentForm[addressType]];
          finalData = { ...finalData, [addressType]: val };
        }
        if (address_components.length - 1 === i) {
          cb(finalData);
          console.log('finalData', finalData);
        }
      }
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      country_code: selectedCountry,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'common/getCountriesList',
    });
  }, [dispatch, selectedCountry]);
  const debounceSearch = debounce(action, 400);
  const phoneValidation = /^[0-9]+$/;
  return (
    <div className="">
      <div>
        <Modal
          title="Company Clearing House"
          width={750}
          centered
          footer={null}
          closeIcon={<CloseOutlined style={{ color: 'black' }} />}
          className="modalStyle"
          open={
            isopenModal?.CompanyClearingHouses?.name === 'Company Clearing House' &&
            isopenModal?.CompanyClearingHouses?.open
          }
          onOk={() =>
            setIsopenModal({
              ...isopenModal,
              CompanyClearingHouses: { name: '', open: false },
            })
          }
          onCancel={() => {
            setIsopenModal({
              ...isopenModal,
              CompanyClearingHouses: { name: ' ', open: false },
            });
            form.resetFields('');
          }}
        >
          <Form form={form} name="Company Clearing form" onFinish={onFinish}>
            <Row gutter={24} style={{ padding: '15px' }}>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>Company name</h4>
                <Form.Item
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Company name',
                    },
                  ]}
                >
                  <Input placeholder="Enter Company name" style={{ borderRadius: '5px' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>Phone number</h4>
                <Form.Item
                  name="phoneNumber"
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
                        placeholder="Enter Phone number"
                        style={{ borderRadius: '5px' }}
                        className="inputNumber"
                      />
                    )}
                  </ReactInputMask>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>First name</h4>
                <Form.Item
                  name="firstName"
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
                  <Input placeholder="Enter first name" style={{ borderRadius: '5px' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>Last name</h4>
                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter last name',
                    },
                    {
                      pattern: /^[A-Za-z]+$/,
                      message: 'Only alphabets are allowed',
                    },
                  ]}
                >
                  <Input placeholder="Enter last name" style={{ borderRadius: '5px' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>DOB</h4>
                <Form.Item
                  name="dob"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select Date of Birth',
                    },
                  ]}
                >
                  <DatePicker
                    size="large"
                    className="w-full rounded full"
                    // disabledDate={(current) => current.isBefore(moment().add(8, 'day'))}
                    // onSelect={(e) => {
                    //   const selectedTime = dayjs(e).format('YYYY-MM-DD');
                    //   handleSelectFlight(selectedTime);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>Owners driver licence number</h4>
                <Form.Item
                  name="ownersDriverLicenseNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter owners driver license number',
                    },
                    {
                      pattern: /^[a-zA-Z0-9\s]+$/,
                      message: 'Please enter a driver license number without special characters.',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter driver license number"
                    style={{ borderRadius: '5px' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>Email address</h4>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter email',
                    },
                    {
                      pattern: emailPattern,
                      message: 'Please enter a valid email',
                    },
                  ]}
                >
                  <Input placeholder="Enter email address" style={{ borderRadius: '5px' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>Address</h4>
                <Form.Item
                  name="address"
                  // rules={[
                  //   {
                  //     required: true,
                  //   },
                  // ]}
                >
                  {/* <GooglePlacesAutocomplete
                    type="text"
                    apiKey={googleApi}
                    ref={inputRef}
                    styles={{
                      borderRadius: '5px',
                      textInputContainer: {
                        backgroundColor: 'red',
                      },
                      textInput: {
                        height: 3,
                        color: '#5d5d5d',
                        fontSize: 16,
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb',
                      },
                    }}
                    onChange={(e) => {
                      setFoundAddress({ addressId: e.target.value, fulladdress: e.target.value });
                    }}
                    selectProps={{
                      onChange: (object, e) => {
                        setFoundAddress({
                          addressId: object?.value?.place_id,
                          fulladdress: object?.label,
                        });
                      },

                      placeholder: foundAddress?.fulladdress || 'Enter your Address',
                      suggestionsClassNames: 'text-red-500',
                    }}
                  /> */}
                  <AutoComplete
                    onSearch={debounceSearch}
                    // {...props}
                    placeholder="Enter Address"
                    apiKey={googleApi}
                    dataSource={
                      suggestedAddress &&
                      suggestedAddress.map(({ place_id, description }) => ({
                        value: JSON.stringify({ id: place_id, description }),
                        text: description,
                      }))
                    }
                    onSelect={async (e) => {
                      // console.log(`ob`);
                      const obj = JSON.parse(e);
                      console.log('obj123', obj);
                      // setCity(obj?.description);
                      setLoadingAutoComplete(true);
                      getAddressFieldsFromGoogle(obj.id, (addressFieldsByGoogle) => {
                        const foundCountry = Countries?.filter(
                          (c) => c.id === addressFieldsByGoogle.country,
                        );
                        setLoadingAutoComplete(false);
                        const foundProvince =
                          Array.isArray(foundCountry) &&
                          foundCountry.length > 0 &&
                          foundCountry[0]?.provinces.find(
                            (province) =>
                              province.geoId === addressFieldsByGoogle.administrative_area_level_1,
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
                          // mailingState: addressFieldsByGoogle.administrative_area_level_1,
                          // mailingCity: addressFieldsByGoogle.locality,
                          // mailingZip: addressFieldsByGoogle.postal_code,
                          address: obj.description || '',
                          // address: `${addressFieldsByGoogle.street_number || ''} ${
                          //   addressFieldsByGoogle.route || ''
                          // } ${addressFieldsByGoogle.formatted_address || ''}   ${
                          //   addressFieldsByGoogle.sublocality || ''
                          // }  ${addressFieldsByGoogle.administrative_area_level_3 || ''} ${
                          //   addressFieldsByGoogle.administrative_area_level_2 || ''
                          // }`,
                          // address_line_2: '',
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
                  </AutoComplete>
                  {/* <Input placeholder="Enter  address" style={{ borderRadius: '5px' }} /> */}
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>FMCSA portal login (email)</h4>
                <Form.Item
                  name="FMCSAEmail"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter email',
                    },
                    {
                      pattern: emailPattern,
                      message: 'Please enter a valid email',
                    },
                  ]}
                >
                  <Input placeholder="Enter login email " style={{ borderRadius: '5px' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>FMCSA password</h4>
                <Form.Item
                  name="FMCSAPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter FMCSA password',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Clearinghouse password"
                    style={{ borderRadius: '5px' }}
                    type="password"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>Clearinghouse login</h4>
                <Form.Item
                  name="clearingHouseLogin"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter clearinghouse login',
                    },
                    {
                      pattern: emailPattern,
                      message: 'Please enter a valid email',
                    },
                  ]}
                >
                  <Input placeholder="Enter email password" style={{ borderRadius: '5px' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>Clearinghouse password</h4>
                <Form.Item
                  name="clearingHousePassword"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter clearinghouse password',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter email password"
                    style={{ borderRadius: '5px' }}
                    type="password"
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="gap-3 flex justify-end mr-5">
              <Button
                style={{ height: '30px', borderRadius: '5px' }}
                onClick={() => {
                  setIsopenModal({
                    ...isopenModal,
                    CompanyClearingHouses: { name: '', open: false },
                  });
                  form.resetFields('');
                }}
              >
                <span className="text-black px-2">Cancel</span>
              </Button>

              {buttonStatus?._id ? (
                <Button
                  type="primary"
                  style={{ height: '30px', borderRadius: '5px' }}
                  // htmlType="submit"
                  onClick={() =>
                    updateCompanyClearingHouse(
                      form.getFieldsValue('Company Clearing form'),
                      setIsopenModal({
                        ...isopenModal,
                        CompanyClearingHouses: { name: '', open: false },
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
                  htmlType="submit"
                  // onClick={()=>
                  //   setIsopenModal({
                  //   ...isopenModal,
                  //   ConfirmModal: { name: 'Confirm Modal', open: true },
                  // })}
                  onClick={() => console.log('firstddddd')}
                >
                  <span className="text-white px-2">Continue</span>
                </Button>
              )}
            </div>
          </Form>
        </Modal>
      </div>
      {isopenModal?.ConfirmModal?.name === 'Confirm Modal' && <ConfirmModal />}
    </div>
  );
};
export default connect(({ clearingHouse }) => ({
  allCompanyClearingHouseList: clearingHouse?.allCompanyClearingHouseList,
  SingleCompanyClearingHouseDetails: clearingHouse?.SingleCompanyClearingHouseDetails,
  clearingHouseList: clearingHouse?.clearingHouseList,
}))(CompanyClearingHouses);
