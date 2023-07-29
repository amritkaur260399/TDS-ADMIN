import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Tabs,
  message,
} from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { driverClearingDetailsJotai, modalsJotai } from '@/utils/globalStates/modals';
import { useAtom } from 'jotai';
import { CloseOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import ConfirmModal from '../ConfirnModal';
import { debounce } from 'lodash';
import Countries from '../Countries';
import { getAllClients } from '@/services/client';
import quickBookUtils from '@/utils/quickBooksUtils';
import { createInvoice } from '@/services/quickBooks';

const DriverClearingHouses = ({
  form,
  dispatch,
  buttonStatus,
  SingleDriverClearingHouseDetails,
  getAllDriverClearingHouse,
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
  const plainOptions = ['Yes', 'No'];
  const [value1, setValue1] = useState('Yes');
  const [isopenModal, setIsopenModal] = useAtom(modalsJotai);
  const [loadingAutoComplete, setLoadingAutoComplete] = useState(false);

  const [driverClearingDetails, setDriverClearingDetails] = useAtom(driverClearingDetailsJotai);
  const googleApi = 'AIzaSyC0TUVA7FHtzJqaWRLnLxbJ-zux6PSCDUM';
  const { inputRef } = useRef(null);
  const action = (text) => {
    googleInstance.getPredictions({ input: text }, (predictions) => {
      setSuggestedAddress(predictions);
    });
  };
  // const getAndAddInQB = async () => {
  //   if (isopenModal?.userData?.qbCustomerID) {
  //     const res = await quickBookUtils(createInvoice, {
  //       Line: [
  //         {
  //           DetailType: 'SalesItemLineDetail',
  //           Amount: 20,
  //           SalesItemLineDetail: {
  //             ItemRef: {
  //               value: '25',
  //             },
  //             Qty: 1,
  //           },
  //         },
  //       ],
  //       CustomerRef: {
  //         value: isopenModal?.userData?.qbCustomerID,
  //       },
  //     });

  //     if (res?.success) {
  //       message.success('Invoice generated successfully');
  //     } else {
  //       message.error('Testing...');
  //     }
  //   }
  // };
  // console.log('values121313', clientId);
  const onFinish = (values) => {
    setDriverClearingDetails(values);
    if (values) {
      dispatch({
        type: 'clearingHouse/createDriverClearingHouse',
        payload: {
          body: {
            firstName: values?.firstName,
            lastName: values?.lastName,
            driverLicenseNumber: values?.driverLicenseNumber,
            email: values?.email,
            mailingAddress: values?.mailingAddress,
            onlineDriverEducation: values?.onlineDriverEducation,
            DOB: values?.DOB,
            clientId: clientId,
            serviceId: serviceId,
          },
        },
      }).then((res) => {
        if (res) {
          message.success('Driver Clearing House Added Successfully');
          // getAndAddInQB();
          // form.resetFields('');
          // setButtonStatus("")
          setIsopenModal({
            ...isopenModal,
            DriverClearingHouses: { name: '', open: false },
          });
          // setIsopenModal({
          //   ...isopenModal,
          //   ConfirmModal: { name: 'Confirm Modal', open: true },
          // });
          getAllDriverClearingHouse();
          getAllClients();
        } else {
          message.error('An error occured!');
        }
        // console.log('res23123132', res);
        // setLoading(false);
      });
    }
  };
  const updateDriverClearingHouse = (values) => {
    if (values) {
      // console.log('first213213', SingleDriverClearingHouseDetails);
      dispatch({
        type: 'clearingHouse/updateDriverClearingHouse',
        payload: {
          pathParams: {
            id: SingleDriverClearingHouseDetails?.data?._id,
          },
          body: {
            firstName: values?.firstName,
            lastName: values?.lastName,
            driverLicenseNumber: values?.driverLicenseNumber,
            email: values?.email,
            mailingAddress: values?.mailingAddress,
            onlineDriverEducation: values?.onlineDriverEducation,
            DOB: values?.DOB,
          },
        },
      }).then((res) => {
        if (res) {
          message.success('Driver Clearing House Updated Successfully');
          // form.resetFields('');
          setIsopenModal({
            ...isopenModal,
            DriverClearingHouses: { name: '', open: false },
          });
          getAllDriverClearingHouse();
        } else {
          message.error('An error occured!');
        }
      });
    }
  };

  const onChange1 = ({ target: { value } }) => {
    console.log('radio1 checked', value);
    // let updateRadio=value;
    // if(updateRadio==="yes"){
    //   updateRadio=="true"
    // }else if(updateRadio=="no"){
    //   updateRadio=="false"
    // }
    // console.log('updateRadio', updateRadio)

    // setValue1(updateRadio);
  };
  const emailPattern = /^[^@!#$%^&*()_+=\[\]{};':"\\|,<>\/?][^!#$%^&*()_+=\[\]{};':"\\|,<>\/?]*$/;
  const map = new google.maps.Map(document.getElementById('map'));
  // eslint-disable-next-line no-undef
  const googleInstance = new google.maps.places.AutocompleteService();
  // eslint-disable-next-line no-undef
  const placesService = new google.maps.places.PlacesService(map);
  console.log('first11111', placesService);
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
      console.log('addressType2132132', address_components);
      for (let i = 0; i < address_components.length; i++) {
        const addressType = address_components[i].types[0];
        console.log('addressType', addressType);
        if (componentForm[addressType]) {
          const val = address_components[i][componentForm[addressType]];
          finalData = { ...finalData, [addressType]: val };
        }
        if (address_components.length - 1 === i) {
          cb(finalData);
          console.log('finalData', address_components);
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
  return (
    <div className="">
      <div>
        <Modal
          title="Driver Clearing House"
          width={750}
          centered
          footer={null}
          closeIcon={<CloseOutlined style={{ color: 'black' }} />}
          className="modalStyle"
          open={
            isopenModal?.DriverClearingHouses?.name === 'Driver Clearing House' &&
            isopenModal?.DriverClearingHouses?.open
          }
          onOk={() =>
            setIsopenModal({
              ...isopenModal,
              DriverClearingHouses: { name: '', open: false },
            })
          }
          onCancel={() => {
            setIsopenModal({
              ...isopenModal,
              DriverClearingHouses: { name: ' ', open: false },
            });
            form.resetFields('');
          }}
        >
          <Form form={form} name="Driver Clearing House form" onFinish={onFinish}>
            <Row gutter={24} style={{ padding: '15px' }}>
              <Col xs={24} sm={24} md={12} xl={12}>
                <h4>First name</h4>
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter first name',
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
                  ]}
                >
                  <Input placeholder="Enter last name" style={{ borderRadius: '5px' }} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} xl={12}>
                <h4> Driver license number</h4>
                <Form.Item
                  name="driverLicenseNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter driver licence number',
                    },
                    {
                      pattern: /^[a-zA-Z0-9\s]+$/,
                      message: 'Please enter a driver license number without special characters.',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter driver licence number"
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
                      message: 'Please enter email address',
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
                <h4> Mailing Address</h4>
                <Form.Item
                  name="mailingAddress"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter mailing address',
                    },
                    {
                      pattern: emailPattern,
                      message: 'Please enter a valid email',
                    },
                  ]}
                >
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
                          mailingAddress: obj.description || '',
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
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div>
                  <h4>Date of Birth</h4>
                  <Form.Item
                    name="DOB"
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
                </div>
              </Col>

              <Col xs={24} sm={24} md={12} xl={12} className="flex">
                <h4>Online driver education</h4>

                <Form.Item
                  name="onlineDriverEducation"
                  rules={[
                    {
                      required: true,
                      message: 'Please select online driver education',
                    },
                  ]}
                >
                  <Radio.Group onChange={onChange1} value={value1}>
                    <Radio.Button value={true}>Yes</Radio.Button>
                    <Radio.Button value={false}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <div className="gap-3 flex justify-end mr-5">
              {buttonStatus?._id ? (
                <Button
                  type="primary"
                  style={{ height: '30px', borderRadius: '5px' }}
                  // htmlType="submit"
                  onClick={() =>
                    updateDriverClearingHouse(
                      form.getFieldsValue('Driver Clearing House form'),
                      setIsopenModal({
                        ...isopenModal,
                        DriverClearingHouses: { name: '', open: false },
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
  allDriverClearingHouseList: clearingHouse?.allDriverClearingHouseList,
  SingleDriverClearingHouseDetails: clearingHouse?.SingleDriverClearingHouseDetails,
  // allDriversList: driver?.allDriversList,
  clearingHouseList: clearingHouse?.clearingHouseList,
  // singleDriverDetails: driver?.singleDriverDetails,
}))(DriverClearingHouses);

// export default DriverClearingHouses;
