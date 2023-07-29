import React, { useState, useEffect, useRef } from 'react';
import {
  CaretDownOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DollarCircleFilled,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import Axios from 'axios';
import SignaturePad from '../SignaturePad';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  TimePicker,
  Upload,
  Switch,
  Spin,
  AutoComplete,
} from 'antd';
import { useAtom } from 'jotai';
import moment from 'moment';
import { connect } from 'umi';
import useFetchData from '@ant-design/pro-descriptions/lib/useFetchData';
import { modalsJotai } from '@/utils/globalStates/modals';
import RandomService from '../RandomServices';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { debounce } from 'lodash';
import Countries from '../Countries';
import { patternsUS } from '../USliecencepattern';
import { US_DL } from '@/regex';
import ReactInputMask from 'react-input-mask';

// import style from "../../components/AddNewClient/index.module.css"

const { Option } = Select;

const OPTIONS = [
  'Random',
  'Company Clearinghouse',
  'Driver Clearinghouse',
  'DQ File',
  'Driver Education',
];

const AddNewClient = ({
  setOpenModal,
  openModal,
  dispatch,
  getAllClients,
  setClientData,
  clientData,
  singleClientDetails,
  form,
  image,
  setImage,
  setButtonStatus,
  buttonStatus,
  url,
  setUrl,
  type,
  required,
  props,

  // titleStatus,
}) => {
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('Fulltime');
  const { inputRef } = useRef(null);
  const [city, setCity] = useState({ mailingcity: '', mailingcityId: '' });
  const [airport, setAirport] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchCity1, setSearchCity1] = useState('');
  const [gdsAccessItem, setGdsAccessItem] = useState([]);
  const [creditCardItem, setCreditCardItem] = useState([]);
  const [airlinesItem, setAirlinesItem] = useState([]);
  const [cabinClassItem, setCabinClassItem] = useState([]);
  const [fareTypeItem, setFareTypeItem] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sign, setSign] = useState();
  const [optionss, setOptionss] = useState([]);
  const [optionss1, setOptionss1] = useState([]);
  // const [licenceVefify, setlicenceVefify] = useState();
  const [licencePattern, setLicencePattern] = useState([]);
  const [cityOptionss1, setCityOptionss1] = useState([]);
  const [isopenModal, setIsopenModal] = useAtom(modalsJotai);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const [number, setNumber] = useState('');

  const handleNumberChange = (event) => {
    const inputNumber = event.target.value;
    const cleanedNumber = inputNumber.replace(/[,\s]/g, '');
    setNumber(cleanedNumber);
  };

  const formatNumber = (value) => {
    const formattedNumber = value.replace(
      /^(\d+?)(?=(\d{3})+(?!\d))(\.\d+)?$/,
      (match, p1, p2, p3) => `${p1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${p2 || ''}${p3 || ''}`,
    );
    return formattedNumber;
  };

  const parseNumber = (value) => {
    const parsedNumber = value.replace(/[,\s]/g, '');
    return parsedNumber;
  };

  const signatureRef = useRef();
  const handleClear = () => {
    signatureRef.current.clear();
    setUrl('');
  };
  console.log('stateSearch', stateSearch);
  const handleSave = () => {
    let signatureImage;
    if (signatureRef.current?._sigPad?._data.length == 1) {
      signatureImage = signatureRef.current.toDataURL();
      setUrl(signatureImage);
    } else {
      setUrl('');
    }
    console.log('eeee', url);

    // setUrl(sign.getTrimmedCanvas().toDataURL('"image/png"'));
  };

  const map = new google.maps.Map(document.getElementById('map'));
  // eslint-disable-next-line no-undef
  const googleInstance = new google.maps.places.AutocompleteService();
  // eslint-disable-next-line no-undef
  const placesService = new google.maps.places.PlacesService(map);
  const onChangeCheck = (e) => {
    console.log(`checked = ${e.target.checked}`);
    let phys = form.getFieldsValue('clientForm');
    if (e.target.checked === true) {
      console.log('phys', phys?.mailingAddress);
      form.setFieldsValue({
        physicalAddress: phys?.mailingAddress,
        physicalCity: phys?.mailingCity,
        physicalState: phys?.mailingState,
        physicalZip: phys?.mailingZip,
      });
    } else {
      form.setFieldsValue({
        physicalAddress: '',
        physicalCity: '',
        physicalState: '',
        physicalZip: '',
      });
    }
  };

  const onChangeCheckDER = (e) => {
    console.log(`checked = ${e.target.checked}`);
    let DerContact = form.getFieldsValue('clientForm');
    if (e.target.checked === true) {
      form.setFieldsValue({
        designatedRepresentativePhone: DerContact?.billingContact,
      });
    } else {
      form.setFieldsValue({
        designatedRepresentativePhone: '',
      });
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  const handleChanges = ({ file, fileList: newFileList }) => {
    setImage(newFileList);
  };
  // const onChange = (checkedValues) => {};
  const handleChange = (value) => {
    // setValue(nvalue);
    console.log(value);
  };
  // if (url) {
  //   message.success('E signature saved successfully');

  // }

  // console.log('buttonStatus', buttonStatus);
  const onFinish = (values) => {
    console.log('valuesNew', values);
    const formData = new FormData();
    // const vali=JSON.stringify(values?.services);
    const arrayOfObjects = values?.services.map((item) => ({ name: item }));
    console.log('vali4', arrayOfObjects);

    formData.append('signatureImage', url);
    formData.append('services', JSON.stringify(arrayOfObjects));
    formData.append('motorCarrierName', values?.motorCarrierName);
    formData.append('physicalAddress', values?.physicalAddress);
    formData.append('physicalCity', values?.physicalCity);
    formData.append('physicalState', values?.physicalState);
    formData.append('physicalZip', values?.physicalZip);
    formData.append('mailingAddress', values?.mailingAddress);
    formData.append('mailingCity', values?.mailingCity);
    formData.append('mailingState', values?.mailingState);
    formData.append('mailingZip', values?.mailingZip);
    formData.append('fax', values?.fax);
    formData.append('billingEmail', values?.billingEmail);
    formData.append('billingContact', values?.billingContact);
    formData.append('SSNTAXIdNumber', Number(values.SSNTAXIdNumber));
    formData.append('licenceNumber', Number(values.licenceNumber));
    formData.append('dotNumber', Number(values.dotNumber));
    formData.append('MCNumber', Number(values.MCNumber));
    formData.append('designatedRepresentativePhone', values?.designatedRepresentativePhone);
    formData.append('designatedRepresentativeFirstName', values?.designatedRepresentativeFirstName);
    formData.append('designatedRepresentativeLastName', values?.designatedRepresentativeLastName);
    formData.append('designatedRepresentativeEmail', values?.designatedRepresentativeEmail);

    if (url && formData) {
      setLoading(true);
      dispatch({
        type: 'client/createClient',
        payload: {
          body: formData,
        },
      }).then((res) => {
        setUrl('');
        setLoading(false);
        if (res) {
          message.success('Client Added Successfully');
          form.resetFields('');
          // setImage([]);
          setUrl();
          setOpenModal(false), getAllClients();
        } else {
          message.error('An error occured!');
        }
      });
    } else if (!url) {
      message.error('Please write e signature and save it');
    } else if (condition) {
    }
  };

  const updateClient = (values) => {
    const formData = new FormData();
    console.log('values', values);
    const arrayOfObjects = values?.services.map((item) => ({ name: item }));
    console.log('vali4', arrayOfObjects);
    formData.append('signatureImage', url);
    formData.append('services', JSON.stringify(arrayOfObjects));
    formData.append('motorCarrierName', values?.motorCarrierName);
    formData.append('physicalAddress', values?.physicalAddress);
    formData.append('physicalCity', values?.physicalCity);
    formData.append('physicalState', values?.physicalState);
    formData.append('physicalZip', values?.physicalZip);
    formData.append('mailingAddress', values?.mailingAddress);
    formData.append('mailingCity', values?.mailingCity);
    formData.append('mailingState', values?.mailingState);
    formData.append('mailingZip', values?.mailingZip);
    formData.append('fax', values?.fax);
    formData.append('billingEmail', values?.billingEmail);
    formData.append('billingContact', values?.billingContact);
    formData.append('SSNTAXIdNumber', Number(values.SSNTAXIdNumber));
    formData.append('licenceNumber', Number(values.licenceNumber));
    formData.append('dotNumber', Number(values.dotNumber));
    formData.append('MCNumber', Number(values.MCNumber));
    formData.append('designatedRepresentativePhone', values?.designatedRepresentativePhone);
    formData.append('designatedRepresentativeFirstName', values?.designatedRepresentativeFirstName);
    formData.append('designatedRepresentativeLastName', values?.designatedRepresentativeLastName);
    formData.append('designatedRepresentativeEmail', values?.designatedRepresentativeEmail);
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
        form.resetFields('');
        message.success('Client updated Successfully');
        // setImage([]);
        setUrl('');
        setOpenModal(false), getAllClients();
      } else {
        message.error('An error occured!');
      }
    });
  };
  const googleApi = 'AIzaSyC0TUVA7FHtzJqaWRLnLxbJ-zux6PSCDUM';
  // const lics=form.getFieldsValue("mailingState")
  // console.log("wrgge", lics?.mailingState && lics?.mailingState.replace(" ", ""))
  //   setlicenceVefify(lices)

  useEffect(() => {
    const urlsss = `https://maps.googleapis.com/maps/api/geocode/json?address=${airport}&key=${googleApi}`;
    if (airport) {
      // handleSearchCity();
      fetch(urlsss)
        .then((response) => response.json())
        .then((data) => {
          // Extract the state component from the response
          const result = data.results[0];
          const state = result.address_components.find((component) =>
            component.types.includes('administrative_area_level_1'),
          );
          // console.log('hjbhvhvjh456 ', data);
          setOptionss(state);
          if (state) {
            console.log('state', state);

            setOptionss(state);
            // Abbreviation of the state
          } else {
            console.log('State not found');
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  }, [airport]);
  useEffect(() => {
    const urlsss = `https://maps.googleapis.com/maps/api/geocode/json?address=${stateSearch}&key=${googleApi}`;
    if (stateSearch) {
      // handleSearchCity();
      fetch(urlsss)
        .then((response) => response.json())
        .then((data) => {
          // Extract the state component from the response
          const result = data.results[0];
          const state = result.address_components.find((component) =>
            component.types.includes('administrative_area_level_1'),
          );
          // console.log('hjbhvhvjh456 ', data);
          setOptionss(state);
          if (state) {
            console.log('state', state);

            setOptionss(state);
            // Abbreviation of the state
          } else {
            console.log('State not found');
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  }, [stateSearch]);
  useEffect(() => {
    const urlsss = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchCity}&key=${googleApi}`;
    if (searchCity) {
      // handleSearchCity();
      fetch(urlsss)
        .then((response) => response.json())
        .then((data) => {
          // Extract the city component from the response
          const result = data.results[0];
          const findCity = result.address_components.find((component) =>
            component.types.includes('locality'),
          );
          // console.log('hjbhvhvjh ', findCity)
          setOptionss1(findCity);
          if (findCity) {
            console.log('findCity', findCity);

            setOptionss1(findCity);
            // Abbreviation of the state
          } else {
            console.log('City not found');
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  }, [searchCity]);
  useEffect(() => {
    const urlsss = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchCity1}&key=${googleApi}`;
    if (searchCity1) {
      // handleSearchCity();
      fetch(urlsss)
        .then((response) => response.json())
        .then((data) => {
          // Extract the city component from the response
          const result = data.results[0];
          const findCity = result.address_components.find((component) =>
            component.types.includes('locality'),
          );
          // console.log('hjbhvhvjh ', findCity)
          setCityOptionss1(findCity);
          if (findCity) {
            console.log('findCity', findCity);

            setCityOptionss1(findCity);
            // Abbreviation of the state
          } else {
            console.log('State not found');
          }
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  }, [searchCity1]);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
          fontSize: '12px',
        }}
      >
        Upload Signature image{' '}
      </div>
    </div>
  );

  // console.log('singleClientDetails21321321', singleClientDetails)
  // console.log('titleStatus', singleClientDetails);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneValidation = /^[0-9]+$/;
  const regexPhone = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  // const regexPhone = /^(\d+?)(?=(\d{3})+(?!\d))(\.\d+)?$/;

  const [suggestedAddress, setSuggestedAddress] = useState([]);

  const action = (text) => {
    googleInstance.getPredictions({ input: text }, (predictions) => {
      setSuggestedAddress(predictions);
    });
  };
  const debounceSearch = debounce(action, 400);

  const [provinces, setProvinces] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('United States (USA)');

  const componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'short_name',
    postal_code: 'short_name',
    formatted_address: 'long_name',
  };

  useEffect(() => {
    const foundCountry = Countries.filter((c) => `${c.code})` === selectedCountry.split('(')[1]);
    console.log('foundCountry', foundCountry);
    setProvinces(foundCountry.length > 0 ? foundCountry[0].provinces : []);
  }, []);

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

  // useEffect(() => {
  //   form?.setFieldsValue({
  //     [type]: {
  //       // city: city,
  //       // postal_code: zipCode,
  //       mailingAddress: primaryAddress,
  //       address_line_2: '',
  //     },
  //   });
  // }, []);
  useEffect(() => {
    dispatch({
      type: 'common/getCountriesList',
    });
  }, [dispatch, selectedCountry]);

  // S-514-778-616-977

  // console.log('wdvwevwevwev', [
  //   {
  //     required: true,
  //     message: 'Please enter DER jbkjbjk no.',
  //   },

  // ])
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
  const handleLicenceError = (e) => {
    let isValid = US_DL[optionss?.short_name].map((pattern) => pattern.regex.test(e.target.value));
    console.log('isValid', isValid);
    isValid.every((v) => {
      if (v === true) {
        setLicencePattern('');
      } else {
        setLicencePattern(
          US_DL[optionss?.short_name]?.map((regexItem) => {
            return {
              pattern: regexItem?.regex,
              message: regexItem?.description,
            };
          }),
        );
      }
    });
  };
  return (
    <div>
      <Modal
        // title="Add Client"
        title={
          <span style={{ color: '#10181e' }} className="font-medium">
            {buttonStatus?._id ? 'Update Client' : 'Add Client'}
          </span>
        }
        width={1000}
        // height={800}
        centered
        footer={null}
        closeIcon={<CloseOutlined style={{ color: 'black' }} />}
        className="modalStyle"
        open={openModal}
        onOk={() => {
          setOpenModal(false);
          form.resetFields('');
          // setUrl("");
        }}
        onCancel={() => {
          setOpenModal(false);
          form.resetFields('');
          setUrl('');
        }}
      >
        <div className="mx-auto">
          <Form form={form} name="clientForm" onFinish={onFinish}>
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
                      ]}
                    >
                      <Input
                        placeholder="Enter Motor Carrier Name"
                        style={{ borderRadius: '5px' }}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <div className="mb-4 text-lg ml-5 font-medium">Mailing Address</div>
              <Row
                gutter={24}
                style={{ paddingLeft: '15px', paddingRight: '15px', paddingBottom: '5px' }}
              >
                <Col xs={24} sm={24} md={6} xl={6}>
                  <div className="">
                    <h4> Address</h4>
                    <Form.Item
                      // name="mailingAddress"
                      name="mailingAddress"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter address',
                        },
                      ]}
                    >
                      {/* <GooglePlacesAutocomplete
                        type="text"
                        apiKey={"AIzaSyDyAUx_-daxFtklRMBcgH5_BWEEpjq_hdo"}
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
                        
                        selectProps={{
                          onChange: (object) => {
                          
                             console.log('object13213', object)
                            // console.log('object5555555555', object?.value);
                            setCity({
                              mailingcityId: object?.value?.place_id,
                              mailingcity: object?.label,
                            });
                            // setpickupLocation({
                            //   pickupPlaceId: object?.value?.place_id,
                            //   pickupLocation: object?.label,
                            // });
                          },

                          placeholder: city?.mailingcity || 'Enter your City',
                          suggestionsClassNames: 'text-red-500',
                        }}
                        
                      /> */}
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
                          // console.log(`ob`);
                          const obj = JSON.parse(e);
                          console.log('obj123', obj);
                          // setCity(obj?.description);
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
                              mailingState: addressFieldsByGoogle.administrative_area_level_1,
                              mailingCity: addressFieldsByGoogle.locality,
                              mailingZip: addressFieldsByGoogle.postal_code,
                              mailingAddress: obj.description || '',
                              // mailingAddress: `${addressFieldsByGoogle.street_number || ''} ${
                              //   addressFieldsByGoogle.route || ''
                              // } ${addressFieldsByGoogle.formatted_address || ''}   ${
                              //   addressFieldsByGoogle.sublocality || ''
                              // }  ${addressFieldsByGoogle.administrative_area_level_3 || ''} ${
                              //   addressFieldsByGoogle.administrative_area_level_2 || ''
                              // }`,
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
                        <Input
                          placeholder="Street, House No."
                          size="large"
                          style={{ borderRadius: '5px' }}
                        />
                      </AutoComplete> */}
                      <Input placeholder="Enter Address" style={{ borderRadius: '5px' }} />
                    </Form.Item>
                  </div>
                </Col>

                <Col xs={24} sm={24} md={6} xl={6}>
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
                      {/* <Select
                        filterOption={true}
                        showSearch
                        searchValue={stateSearch}
                        onSearch={(e) => setStateSearch(e)}
                        onSelect={() => {
                          setStateSearch('');
                        }}
                        size="large"
                        placeholder="Please enter State"
                      >
                        <Select.Option value={optionss?.long_name} key={optionss?.short_name}>
                          {optionss?.long_name}
                        </Select.Option>
                      </Select> */}
                      {/* <Select
              allowClear
              showSearch
              size="large"
              placeholder="Select your state"
              notFoundContent="No States Found"
              suffixIcon={
                <CaretDownOutlined style={{ color: 'rgba(0,0,0,.45)', fontSize: '1rem' }} />
              }
              getPopupContainer={(node) => node.parentNode}
            >
              {provinces.map((province) => (
                <Option key={province.geoId} value={`${province.geoName} ${province.geoId}`}>
                  {province.geoName} ({province.geoCode})
                </Option>
              ))}
            </Select> */}
                      <Input placeholder="Enter State" style={{ borderRadius: '5px' }} />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} xl={6}>
                  <div className="">
                    <h4>City</h4>
                    <Form.Item
                      name="mailingCity"
                      rules={[
                        {
                          // required: true,
                          message: 'Please enter city',
                        },
                      ]}
                    >
                      {/* <Select
                        filterOption={true}
                        showSearch
                        searchValue={searchCity1}
                        onSearch={(e) => setSearchCity1(e)}
                        onSelect={() => {
                          setSearchCity1('');
                        }}
                        size="large"
                        placeholder="Please enter City"
                      >
                        <Select.Option
                          value={cityOptionss1?.long_name}
                          key={cityOptionss1?.short_name}
                        >
                          {cityOptionss1?.long_name}
                        </Select.Option>
                      </Select> */}

                      <Input placeholder="Enter City" style={{ borderRadius: '5px' }} />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} xl={6}>
                  <div className="">
                    <h4>Zip</h4>
                    <Form.Item
                      name="mailingZip"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter zip code',
                        },
                      ]}
                    >
                      <Input
                        type="Number"
                        className="inputNumber"
                        size="large"
                        placeholder="Zip code"
                        maxLength={6}
                        onChange={(e) => {
                          const { value } = e.target;
                          if (value.match(/^[0-9]*$/)) {
                            form.setFieldsValue({ [type]: { postal_code: value } });
                          } else {
                            message.error('Please enter a valid zip code');
                          }
                        }}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>

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
              <Row gutter={24} style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                <Col xs={24} sm={24} md={6} xl={6}>
                  <div className="">
                    <h4> Address</h4>
                    <Form.Item
                      name="physicalAddress"
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
                          // console.log('obj123', obj);
                          // setCity(obj?.description);
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
                              physicalAddress: obj.description || '',
                              // physicalAddress: `${addressFieldsByGoogle.street_number || ''}, ${
                              //   addressFieldsByGoogle.route || ''
                              // }${addressFieldsByGoogle.formatted_address || ''}   ${
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
                        <Input
                          placeholder="Street, House No."
                          size="large"
                          style={{ borderRadius: '5px' }}
                        />
                      </AutoComplete> */}
                      <Input placeholder="Enter Address" style={{ borderRadius: '5px' }} />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} xl={6}>
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
                      {/* <Select
                        filterOption={true}
                        showSearch
                        searchValue={airport}
                        onSearch={(e) => setAirport(e)}
                        onSelect={() => {
                          setAirport('');
                        }}
                        size="large"
                        placeholder="Please enter State"
                      >
                        <Select.Option value={optionss?.long_name} key={optionss?.short_name}>
                          {optionss?.long_name}
                        </Select.Option>
                      </Select> */}
                      <Input placeholder="Enter State" style={{ borderRadius: '5px' }} />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} xl={6}>
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
                      {/* <Select
                        filterOption={true}
                        showSearch
                        searchValue={searchCity}
                        onSearch={(e) => setSearchCity(e)}
                        onSelect={() => {
                          setSearchCity('');
                        }}
                        size="large"
                        placeholder="Please enter City"
                      >
           
                        <Select.Option value={optionss1?.long_name} key={optionss1?.short_name}>
                          {optionss1?.long_name}
                        </Select.Option>
                      </Select> */}
                      <Input placeholder="Enter City" style={{ borderRadius: '5px' }} />
                    </Form.Item>
                  </div>
                </Col>

                <Col xs={24} sm={24} md={6} xl={6}>
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
                    <h4>Fax</h4>
                    <Form.Item
                      name="fax"
                      rules={[
                        {
                          // required: true,
                          message: 'Please enter fax number',
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
                {/*   <Col xs={24} sm={24} md={6} xl={6}>
                  <div className="">
                    <h4>Billing Contact Name</h4>
                    <Form.Item
                      name="billingContact"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter billing contact name',
                        },
                        {
                          pattern: regexPhone,
                          message: 'Please enter valid phone no',
                        },
                      ]}
                    >
                      <Input
                        placeholder="Billing Contact Name"
                        style={{ borderRadius: '5px' }}
                        type="Number"
                        className="inputNumber"
                      />
                    </Form.Item>
                  </div>
                </Col> */}
                <Col xs={24} sm={24} md={6} xl={6}>
                  <div className="">
                    <h4>Billing Contact Name</h4>
                    <Form.Item
                      name="billingContact"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter billing contact name',
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
                    <h4>SSN /TAX Id Number</h4>
                    <Form.Item
                      name="SSNTAXIdNumber"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter SSN /TAX Id number',
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter SSN /TAX Id Number"
                        style={{ borderRadius: '5px' }}
                        type="Number"
                        className="inputNumber"
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} xl={6}>
                  <div className="">
                    <h4>Licence Number</h4>
                    <Form.Item
                      name="licenceNumber"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Please enter licence number',
                      //   },
                      // ]}
                      // rules={[{ validator: validatePassword }]}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter licence number',
                        },
                        // ...licencePattern,
                      ]}
                    >
                      <Input
                        placeholder="Enter Licence Number"
                        style={{ borderRadius: '5px' }}
                        // type="Number"
                        // onChange={(e) => handleLicenceError(e)}
                        className="inputNumber"
                      />
                    </Form.Item>
                  </div>
                </Col>

                <Col xs={24} sm={24} md={6} xl={6}>
                  <div className="">
                    <h4>Dot Number</h4>
                    <Form.Item
                      name="dotNumber"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter dot number',
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Dot Number"
                        style={{ borderRadius: '5px' }}
                        type="Number"
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
                      ]}
                    >
                      <Input
                        placeholder="Enter MC Number"
                        type="Number"
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
                        options={filteredOptions.map((item) => ({
                          value: item,
                          label: item,
                        }))}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>

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

              <Row gutter={24} style={{ padding: '15px' }}>
                <Col xs={24} sm={24} md={6} xl={6}>
                  <div className="">
                    <h4>First Name</h4>
                    <Form.Item
                      name="designatedRepresentativeFirstName"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter DER first name',
                        },
                      ]}
                    >
                      <Input placeholder="Enter First Name" style={{ borderRadius: '5px' }} />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} xl={6}>
                  <div className="">
                    <h4>Last Name</h4>
                    <Form.Item
                      name="designatedRepresentativeLastName"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter DER last name',
                        },
                      ]}
                    >
                      <Input placeholder="Enter Last Name " style={{ borderRadius: '5px' }} />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} xl={6}>
                  <div className="">
                    <h4>Phone</h4>
                    <Form.Item
                      name="designatedRepresentativePhone"
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
                      name="designatedRepresentativeEmail"
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
                {buttonStatus?._id ? (
                  <div className="ml-4">
                    <h4>Signature Image</h4>
                    <div className="border text-center py-4 rounded">
                      <img
                        alt="example"
                        style={{
                          width: '80%',
                          height: '',
                        }}
                        src={url}
                      />
                    </div>
                  </div>
                ) : (
                  <Col xs={24} sm={24} md={6} xl={6}>
                    <div className="">
                      <h4>Signature Image</h4>

                      <SignaturePad
                        signatureRef={signatureRef}
                        url={url}
                        handleClear={handleClear}
                        handleSave={handleSave}
                      />
                    </div>
                  </Col>
                )}
              </Row>

              <div className="flex justify-between">
                <Form.Item
                  name="terms"
                  valuePropName="checked"
                  rules={[
                    {
                      required: true,
                      message: 'Please accept the terms & conditions',
                    },
                  ]}
                >
                  <Checkbox
                    style={{
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '13px',
                      color: '#B4B4B4',
                      marginLeft: '15px',
                    }}
                  >
                    I accept the Terms and Conditions
                  </Checkbox>
                </Form.Item>

                <div className="gap-3 flex justify-end mr-5">
                  <Button
                    onClick={() => {
                      setOpenModal(false);
                      form.resetFields('');
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
                      // htmlType="submit"
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
              </div>
            </Spin>
          </Form>
        </div>
      </Modal>
      {/* {isopenModal?.randomServicesAgreement?.name === 'Random Services Agreement' &&<RandomService/>} */}
    </div>
  );
};

export default connect(({ client }) => ({
  // ridesList: rides?.ridesList,
  allClientList: client?.allClientList,
  singleClientDetails: client?.singleClientDetails,
}))(AddNewClient);
