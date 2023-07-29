import { AutoComplete, Checkbox, Form, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import addressData from '../../../../../public/au.json';
import { connect } from 'umi';
import {
  Button,
  Input,
  Select,
  Row,
  Col,
  Dropdown,
  DatePicker,
  Space,
  Menu,
  Tabs,
  Radio,
  TimePicker,
} from 'antd';
import { CompassOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Option } from 'antd/lib/mentions';
import Icon from '@ant-design/icons/lib/components/Icon';
import { requiredStar } from '@/utils/AppIons';
import { Children } from 'react';
import PlaceComponent from '@/components/PlaceComponent';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Axios from 'axios';
const CreateRide = ({
  dispatch,
  handleCancel,
  loadingForUpload,
  form,
  handleOk,
  chauffeurList,
  pickupLocation,
  dropLocation,
  rideTypes,
  setRideTypes,
  setflightTime,
  flightTime,
  isDropAndStop,
  setpickupLocation,
  setDropLocation,
  addStop,
  setAddStop,
  setIsDropAndStop,
  isFormEdit,
}) => {
  const [luggageQuantity, setLuggageQuantity] = useState(0);
  const { inputRef } = useRef(null);
  const [optionss, setOptionss] = useState([]);
  const [vehicleCategory, setVehicleCategory] = useState([]);
  const [filteredChauffeurs, setFilteredChauffeurs] = useState([]);

  const [airport, setAirport] = useState('');

  useEffect(() => {
    dispatch({
      type: 'chauffeur/getAllChauffeur',
      payload: {
        query: {
          assignRide: true,
        },
      },
    });
    dispatch({
      type: 'prices/getPrices',
      payload: {},
    }).then(async (res) => {
      const vehicleCategory = await res?.data?.map((e) => {
        return { title: e.title, category: e.category };
      });
      setVehicleCategory(vehicleCategory);
    });
  }, [form]);

  const googleApi = 'AIzaSyC0TUVA7FHtzJqaWRLnLxbJ-zux6PSCDUM';

  useEffect(() => {}, [addStop]);

  const vehicleTypes = [
    { name: 'Executive Sedan (SEDAN)', value: 'SEDAN' },
    { name: 'First Class Sedan (SED)', value: 'SED' },
    { name: 'Luxury SUV (SUV)', value: 'SUV' },
    { name: 'Luxury Van (VAN)', value: 'VAN' },
    { name: 'People Mover (BUS)', value: 'BUS' },
    { name: 'Super Stretch (STR)', value: 'STR' },
    { name: 'Bus (ROSA BUS)', value: 'ROSA_BUS' },
  ];

  const NumberOfHours = [
    { name: '30 mins', value: '0.5' },
    { name: '1 hour', value: '1' },
    { name: '1 hour 30 mins', value: '1.5' },
    { name: '2 hours', value: '2' },
    { name: '2 hours 30 mins', value: '2.5' },
    { name: '3 hours', value: '3' },
    { name: '3 hours 30 mins', value: '3.5' },
    { name: '4 hours', value: '4' },
    { name: '4 hours 30 mins', value: '4.5' },
    { name: '5 hours', value: '5' },
    { name: '5 hours 30 mins', value: '5.5' },
    { name: '6 hours', value: '6' },
    { name: '6 hours 30 mins', value: '6.5' },
    { name: '7 hours', value: '7' },
    { name: '7 hours 30 mins', value: '7.5' },
    { name: '8 hours', value: '8' },
    { name: '8 hours 30 mins', value: '8.5' },
    { name: '9 hours', value: '9' },
    { name: '9 hours 30 mins', value: '9.5' },
    { name: '10 hours', value: '10' },
    { name: '10 hours 30 mins', value: '10.5' },
    { name: '11 hours', value: '11' },
    { name: '11 hours 30 mins', value: '11.5' },
    { name: '12 hours', value: '12' },
  ];
  const paymentType = [
    { name: 'Per Km', value: 'perKm' },
    { name: 'Per Hour', value: 'perHour' },
  ];
  const rideType = [
    { name: 'Point-to-Point', value: 'Point-to-Point' },
    { name: 'Airport Pickup', value: 'Airport-Pickup' },
    { name: 'Airport Drop', value: 'Airport-Drop' },
    { name: 'Event', value: 'Event' },
  ];
  const handleAirportSearch = () => {
    Axios.get(
      `https://aviation-edge.com/v2/public/autocomplete?key=ab0439-86b2ba&city=${airport}`,
    ).then((res) => {
      setOptionss(res?.data?.cities);
    });
  };
  const handleSelectFlight = (selectedTime) => {
    const iataCode = form.getFieldValue('airport');
    const flightNumber = form.getFieldValue('flightNumber');

    if (iataCode && flightNumber) {
      Axios.get(
        `https://aviation-edge.com/v2/public/flightsFuture?key=ab0439-86b2ba&type=arrival&iataCode=${iataCode}&date=${selectedTime}&flight_num=${flightNumber}
    `,
      ).then((res) => {
        if (res?.data?.error) {
          message.error('No flights found!');
          // form.setFieldValue('flightDetail', 'No flights found!');
        } else {
          setflightTime(res?.data?.[0]);
        }
      });
    }
  };
  useEffect(() => {
    if (airport) {
      handleAirportSearch();
    }
  }, [airport]);

  const handleFilterChauffeurs = (e) => {
    const filteredChauffeurList = chauffeurList?.data.filter((val) => val.vehicle.category === e);
    if (!filteredChauffeurList) {
      message.warning('No Chauffeurs found!');
    } else {
      setFilteredChauffeurs(filteredChauffeurList);
    }
  };
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="rideMode"
            rules={[
              {
                required: true,
                message: 'Please select ride mode!',
              },
            ]}
          >
            <Radio.Group>
              <Radio value={'One-Way-Ride'}>One Way Ride</Radio>
              <Radio value={'Round-Trip'}>Round Trip</Radio>
              <Radio value={'Instant-Ride'}>Instant Ride</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="rideType"
            className="flex justify-end"
            rules={[
              {
                required: true,
                message: 'Please select ride type!',
              },
            ]}
          >
            <Select placeholder="Select Ride type" onChange={(e) => setRideTypes(e)}>
              {rideType?.map((element) => (
                <Select.Option value={element?.value} key={element?.value}>
                  {element?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {rideTypes === 'Airport-Pickup' && (
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label={
                <div>
                  <span className="formLabel mr-1">Select Arrival Airport</span>
                  <span>{requiredStar()}</span>
                </div>
              }
              name="airport"
              rules={[
                {
                  required: true,
                  message: 'Please fill!',
                },
              ]}
            >
              <Select
                filterOption={false}
                showSearch
                searchValue={airport}
                onSearch={(e) => setAirport(e)}
                onSelect={() => {
                  setAirport('');
                }}
                size="large"
              >
                {optionss?.map((item) => (
                  <Select.Option value={item?.codeIataCity} key={item?.codeIataCity}>
                    {`${item?.nameCity} ${item?.codeIataCity}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}

        {rideTypes === 'Airport-Pickup' && (
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label={
                <div>
                  <span className="formLabel mr-1">Flight Number</span>
                  <span>{requiredStar()}</span>
                </div>
              }
              name="flightNumber"
              rules={[
                {
                  required: true,
                  message: 'Please fill!',
                },
              ]}
            >
              <Input size="large" placeholder="Flight Number" />
            </Form.Item>
          </Col>
        )}
        {rideTypes === 'Airport-Pickup' && (
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label={
                <div>
                  <span className="formLabel mr-1">Select Flight Date</span>
                  <span>{requiredStar()}</span>
                </div>
              }
              name="flightDate"
              rules={[
                {
                  required: true,
                  message: 'Please input Date!',
                },
              ]}
            >
              <DatePicker
                size="large"
                className="w-full"
                disabledDate={(current) => current.isBefore(moment().add(8, 'day'))}
                onSelect={(e) => {
                  const selectedTime = dayjs(e).format('YYYY-MM-DD');
                  handleSelectFlight(selectedTime);
                }}
              />
            </Form.Item>
          </Col>
        )}
        {rideTypes === 'Airport-Pickup' && (
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label={
                <div>
                  <span className="formLabel mr-1">Flight Detail</span>
                </div>
              }
              name="flightDetail"
            >
              <Input
                size="large"
                placeholder={
                  `${
                    flightTime?.departure?.iataCode.toUpperCase() +
                    flightTime?.departure?.scheduledTime
                  } - ${
                    flightTime?.arrival?.iataCode.toUpperCase() + flightTime?.arrival?.scheduledTime
                  } ` || `Flight Number`
                }
                disabled
              />
            </Form.Item>
          </Col>
        )}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Payment Type</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="paymentType"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input Payment type!',
            //   },
            // ]}
          >
            <Select
              placeholder="Select Payment type"
              size="large"
              defaultValue={'perKm'}
              onSelect={(e) => {
                if (e === 'perKm') {
                  setIsDropAndStop(true);
                } else {
                  setIsDropAndStop(false);
                }
              }}
            >
              {paymentType?.map((element) => (
                <Select.Option value={element?.value} key={element?.value}>
                  {element?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {form.getFieldValue('paymentType') === 'perHour' && (
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label={
                <div>
                  <span className="formLabel mr-1">Number of Hours</span>
                  <span>{requiredStar()}</span>
                </div>
              }
              name="numberOfHours"
              rules={[
                {
                  required: true,
                  message: 'Please input number of hours!',
                },
              ]}
            >
              <Select
                placeholder="Select number of hours"
                size="large"
                onSelect={(e) => {
                  if (e === 'perKm') {
                    setIsDropAndStop(true);
                  } else {
                    setIsDropAndStop(false);
                  }
                }}
              >
                {NumberOfHours?.map((element) => (
                  <Select.Option value={element?.value} key={element?.value}>
                    {element?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Pickup Location</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="pickupLocation"
          >
            <GooglePlacesAutocomplete
              type="text"
              apiKey={googleApi}
              ref={inputRef}
              selectProps={{
                onChange: (object) => {
                  setpickupLocation({
                    pickupPlaceId: object?.value?.place_id,
                    pickupLocation: object?.label,
                  });
                },
                placeholder: pickupLocation?.pickupLocation || 'Enter your pickup location',
                suggestionsClassNames: 'text-red-500',
              }}
              theme={{
                Theme: {
                  borderRadius: 0,
                  colors: {
                    primary25: 'hotpink',
                    primary: 'black',
                  },
                },
              }}
            />
          </Form.Item>
        </Col>
        {(isDropAndStop || form.getFieldValue('paymentType') === 'perKm') && (
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              label={
                <div>
                  <span className="formLabel mr-1">Drop Location</span>
                  <span>{requiredStar()}</span>
                </div>
              }
              name="dropLocation"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input drop location!',
              //   },
              // ]}
            >
              <GooglePlacesAutocomplete
                type="text"
                apiKey={googleApi}
                ref={inputRef}
                // selectOption={(value)=>console.log(value,'value')}
                selectProps={{
                  onChange: (object) => {
                    setDropLocation({
                      dropPlaceId: object?.value?.place_id,
                      dropLocation: object?.label,
                    });
                  },
                  placeholder: dropLocation?.dropLocation || 'Enter your drop location',
                  suggestionsClassNames: 'text-red-500',
                }}
                theme={{
                  Theme: {
                    borderRadius: 0,
                    colors: {
                      primary25: 'hotpink',
                      primary: 'black',
                    },
                  },
                }}
              />
            </Form.Item>
          </Col>
        )}

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Passengers</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="passengers"
            rules={[
              {
                required: true,
                message: 'Please input passenger count!',
              },
            ]}
          >
            <Input size="large" placeholder="Select Passengers" type="number" />
          </Form.Item>
        </Col>
        <Col xs={8} sm={8} md={4} lg={4} xl={4}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Infant Seats</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="infant"
            rules={[
              {
                required: true,
                message: 'Please fill!',
              },
            ]}
          >
            <Input size="large" placeholder="Infants" type="number" />
          </Form.Item>
        </Col>
        <Col xs={8} sm={8} md={4} lg={4} xl={4}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Toddler Seats</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="toddler"
            rules={[
              {
                required: true,
                message: 'Please fill!',
              },
            ]}
          >
            <Input size="large" placeholder="Toddlers" type="number" />
          </Form.Item>
        </Col>
        <Col xs={8} sm={8} md={4} lg={4} xl={4}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Booster Seats</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="booster"
            rules={[
              {
                required: true,
                message: 'Please fill!',
              },
            ]}
          >
            <Input size="large" placeholder="Booster" type="number" />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Luggage Capacity (Large)</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="luggageCapacityLarge"
            rules={[
              {
                required: true,
                message: 'Please input luggage capacity!',
              },
            ]}
          >
            <Input
              placeholder="Large luggage"
              size="large"
              onChange={(e) => setLuggageQuantity(Number(e.target.value))}
              autocomplete="off"
              type="number"
            />
          </Form.Item>
        </Col>

        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Luggage Capacity (Small)</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="luggageCapacitySmall"
            rules={[
              {
                required: true,
                message: 'Please input luggage capacity!',
              },
            ]}
          >
            <Input
              placeholder="Small luggage"
              size="large"
              onChange={(e) => setLuggageQuantity(Number(e.target.value))}
              autocomplete="off"
              type="number"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label={<span className="formLabel">Luggage Quantity</span>} name="luggage">
            <Input
              value={
                Number(form.getFieldValue('luggageCapacitySmall')) +
                Number(form.getFieldValue('luggageCapacityLarge'))
              }
              placeholder={
                form.getFieldValue('luggageCapacitySmall') === undefined ||
                form.getFieldValue('luggageCapacityLarge') === undefined
                  ? 'Luggage Quantity'
                  : Number(form.getFieldValue('luggageCapacitySmall')) +
                    Number(form.getFieldValue('luggageCapacityLarge'))
              }
              size="large"
              disabled
            />
          </Form.Item>
        </Col>

        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Date</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="date"
            rules={[
              {
                required: true,
                message: 'Please input Date!',
              },
            ]}
          >
            <DatePicker size="large" />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Time</span>
                <span>{requiredStar()}</span>
              </div>
            }
            initialValue={moment()}
            name="rideTime"
            required={true}
          >
            <TimePicker size="large" use12Hours={false} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Vehicle Type</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="vehicleType"
            rules={[
              {
                required: true,
                message: 'Please input vehicle type!',
              },
            ]}
          >
            <Select
              placeholder="Select vehicle type"
              size="large"
              onSelect={(e) => {
                handleFilterChauffeurs(e);
              }}
            >
              {vehicleCategory?.map((element) => (
                <Select.Option value={element?.category} key={element?.category}>
                  {element?.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="w-full">
            <Form.Item
              name="chauffeurID"
              label={
                <span className="formLabel p-0 mb-0">
                  {' '}
                  <p className="mb-0">
                    {' '}
                    <PlusOutlined />
                    Assign to chauffeur
                  </p>
                </span>
              }
            >
              <Select
                showSearch
                placeholder="Select a chauffeur"
                optionFilterProp="name"
                size="large"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase()?.includes(input?.toLowerCase())
                }
              >
                {filteredChauffeurs?.map((group) => (
                  <Option
                    filter={group?.name}
                    key={group?._id}
                    value={group?._id}
                    title={group?.name}
                  >
                    {group?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Col>
        {/* {isDropAndStop ||
          !isFormEdit ||
          (isFormEdit && ( */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.List name="addStop">
            {(fields, { add, remove }) => (
              <div>
                <div className="mb-2  ">
                  <span className="formLabel  mr-1">Add Stop</span>
                </div>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div key={key} className="flex justify-between items-center">
                    <Form.Item {...restField} name={[name, 'stop']}>
                      <GooglePlacesAutocomplete
                        type="text"
                        apiKey={googleApi}
                        ref={inputRef}
                        selectProps={{
                          onChange: (object) => {
                            setAddStop([
                              ...addStop,
                              { stopName: object?.label, stopPlaceId: object?.value?.place_id },
                            ]);
                          },
                          placeholder: addStop ? addStop?.[name]?.stopName : 'Enter your stop',
                          suggestionsClassNames: 'text-red-500',
                        }}
                        theme={{
                          Theme: {
                            borderRadius: 0,
                            colors: {
                              primary25: 'hotpink',
                              primary: 'black',
                            },
                          },
                        }}
                      />
                    </Form.Item>

                    <MinusCircleOutlined
                      className="mb-6 ml-2"
                      onClick={() => {
                        remove(name);
                        let newArr = addStop && addStop.filter((val, idx) => idx !== index);

                        setAddStop(newArr);
                      }}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      // add();
                      if (fields.length === 0) {
                        add();
                      } else if (addStop?.length >= fields?.length) {
                        add();
                      } else {
                        message.warning('Please fill previous stop!');
                        return false;
                      }
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add a stop
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
        </Col>
        {/* ))} */}

        <Col>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Add Trailer</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="addTrailer"
            valuePropName="checked"
          >
            <Checkbox size="large">Want to add a Trailer for 50$</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <div className="flex justify-end gap-4">
        <Button size="large" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="large"
          loading={loadingForUpload}
          onClick={() => {
            form
              .validateFields([
                'rideType',
                'rideMode',
                'paymentType',
                'pickupLocation',
                'dropLocation',
                'passengers',
                'childSeat',
                'luggageCapacitySmall',
                'luggageCapacityLarge',
                'date',
                'rideTime',
                'vehicleType',
                'addStop',
                'numberOfHours',
                'infant',
                'toddler',
                'booster',
              ])
              .then(() => {
                handleOk();
              });
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default connect(({ rides, chauffeur }) => ({
  ridesList: rides?.ridesList,
  chauffeurList: chauffeur?.chauffeurList,
}))(CreateRide);
