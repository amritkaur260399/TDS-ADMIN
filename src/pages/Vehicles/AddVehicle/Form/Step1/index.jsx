import Icon, { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { connect } from 'umi';
import React, { useEffect, useState } from 'react';
import { requiredStar } from '@/utils/AppIons';

const Step1 = ({
  dispatch,
  loadingForUpload,
  onCancel,
  setActiveTab,
  setPayloadData,
  payloadData,
  form,
  chauffeurList,
  setChauffeurId,
  vehicleOwner,
  setVehicleOwner,
  isFormEdit,
}) => {
  const { Option } = Select;
  const [luggageQuantity, setLuggageQuantity] = useState(0);
  const [vehicleCategory, setVehicleCategory] = useState([]);
  const [singleCategory, setSingleCategory] = useState('SED');
  const vehicleTypes = [
    { name: 'Executive Sedan (SEDAN)', value: 'SEDAN' },
    { name: 'First Class Sedan (SED)', value: 'SED' },
    { name: 'Luxury SUV (SUV)', value: 'SUV' },
    { name: 'Luxury Van (VAN)', value: 'VAN' },
    { name: 'People Mover (BUS)', value: 'BUS' },
    { name: 'Super Stretch (STR)', value: 'STR' },
    { name: 'Bus (ROSA BUS)', value: 'ROSA_BUS' },
  ];
  const fuelType = [
    { name: 'Petrol', value: 'Petrol' },
    { name: 'Diesel', value: 'Diesel' },
    { name: 'CNG', value: 'CNG' },
    { name: 'Electric', value: 'Electric' },
  ];
  const ownerType = [
    { name: 'BGC', value: 'BGC' },
    { name: 'Operator', value: 'operator' },
  ];

  useEffect(() => {
    dispatch({
      type: 'chauffeur/getAllChauffeur',
      payload: {
        query: {
          type: 'Verified',
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
  }, []);

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Plate No.</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="plateNumber"
            rules={[
              {
                required: true,
                message: 'Please input plate no.!',
              },
              {
                pattern: new RegExp(/^[^ ]/),
                message: 'Spaces not allowed',
              },
            ]}
          >
            <Input placeholder="Enter your Plate no" size="large" autocomplete="off" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Registration No.</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="registrationNumber"
            rules={[
              {
                required: true,
                message: 'Please input registration no.!',
              },
              {
                pattern: new RegExp(/^[^ ]/),
                message: 'Spaces not allowed',
              },
            ]}
          >
            <Input placeholder="Enter your Registration no" size="large" autocomplete="off" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Vehicle Name</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="vehicleName"
            rules={[
              {
                required: true,
                message: 'Please input vehicle name!',
              },
              {
                pattern: new RegExp(/^[^ ]/),
                message: 'Spaces not allowed',
              },
            ]}
          >
            <Input placeholder="Enter vehicle name" size="large" autocomplete="off" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Category</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="category"
            rules={[
              {
                required: true,
                message: 'Please input vehicle category!',
              },
            ]}
          >
            <Select
              placeholder="Select vehicle category"
              size="large"
              onChange={(e) => {
                setSingleCategory(e);
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
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Capacity</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="capacity"
            rules={[
              {
                required: true,
                message: 'Please input vehicle capacity!',
              },
            ]}
          >
            <Input
              placeholder="Enter total capacity"
              size="large"
              autocomplete="off"
              type="number"
            />
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
            <Input size="large" placeholder="Infants" type="number" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Fuel Type</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="fuelType"
            rules={[
              {
                required: true,
                message: 'Please select Fuel Type!',
              },
            ]}
          >
            <Select placeholder="Select fuel type" size="large">
              {fuelType?.map((element) => (
                <Select.Option value={element?.value} key={element?.value}>
                  {element?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {/* <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Fixed Km (Initial)</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="fixedKm"
            rules={[
              {
                required: true,
                message: 'Please input fixed Km!',
              },
            ]}
          >
            <Input
              placeholder="Enter total capacity"
              size="large"
              autocomplete="off"
              type="number"
            />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Fixed Price (Initial Km)</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="fixedPrice"
            rules={[
              {
                required: true,
                message: 'Please input fixed price!',
              },
            ]}
          >
            <Input
              placeholder="Enter total capacity"
              size="large"
              autocomplete="off"
              type="number"
            />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Price(per KM)</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="pricePerKm"
          >
            <Input prefix="$" suffix="AUD" size="large" autocomplete="off" type="number" />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Price(per Hour)</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="pricePerHour"
          >
            <Input prefix="$" suffix="AUD" size="large" autocomplete="off" type="number" />
          </Form.Item>
        </Col> */}

        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Luggage Quantity (Large)</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="luggageQuantityLarge"
            rules={[
              {
                required: true,
                message: 'Please select large luggage!',
              },
            ]}
          >
            <Input
              placeholder="Large luggage"
              size="large"
              autocomplete="off"
              type="number"
              onChange={(e) => {
                setLuggageQuantity(Number(e.target.value));
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Form.Item
            label={
              <div>
                <span className="formLabel mr-1">Luggage Quantity (Small)</span>
                <span>{requiredStar()}</span>
              </div>
            }
            name="luggageQuantitySmall"
            rules={[
              {
                required: true,
                message: 'Please select small luggage!',
              },
            ]}
          >
            <Input
              placeholder="Small luggage"
              size="large"
              autocomplete="off"
              type="number"
              onChange={(e) => setLuggageQuantity(Number(e.target.value))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={<span className="formLabel">Luggage Quantity</span>}
            name="luggageQuantity"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input luggage quantity!',
            //   },
            // ]}
          >
            <Input
              size="large"
              disabled
              value={
                Number(form.getFieldValue('luggageQuantitySmall')) +
                Number(form.getFieldValue('luggageQuantityLarge'))
              }
              placeholder={
                form.getFieldValue('luggageQuantitySmall') === undefined ||
                form.getFieldValue('luggageQuantityLarge') === undefined
                  ? 'Luggage Quantity'
                  : Number(form.getFieldValue('luggageQuantitySmall')) +
                    Number(form.getFieldValue('luggageQuantityLarge'))
              }
            />
          </Form.Item>
        </Col>
        {(singleCategory === 'BUS' || singleCategory === 'VAN') && (
          <Col>
            <Form.Item
              label={
                <div>
                  <span className="formLabel mr-1">Add Trailer</span>
                  <span>{requiredStar()}</span>
                </div>
              }
              name="trailerOption"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input Payment type!',
              //   },
              // ]}
              valuePropName="checked"
            >
              <Checkbox size="large">Want to add a Trailer support</Checkbox>
            </Form.Item>
          </Col>
        )}

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="chauffeur"
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
              onChange={() => {
                setVehicleOwner(true);
              }}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase()?.includes(input?.toLowerCase())
              }
            >
              {chauffeurList?.data?.map((group) => (
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
        </Col>
        {vehicleOwner ||
          (isFormEdit && (
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Form.Item
                label={
                  <div>
                    <span className="formLabel mr-1">Vehicle Owner</span>
                    <span>{requiredStar()}</span>
                  </div>
                }
                name="vehicleOwner"
              >
                <Select placeholder="Select fuel type" size="large" defaultValue={'BGC'}>
                  {ownerType?.map((element) => (
                    <Select.Option value={element?.value} key={element?.value}>
                      {element?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          ))}
      </Row>

      <div className="flex justify-end gap-4">
        <Button size="large" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            // form.validateFields().then(() => {
            form
              .validateFields([
                'plateNumber',
                'registrationNumber',
                'vehicleName',
                'category',
                'capacity',
                'infant',
                'toddler',
                'booster',
                'fuelType',
                'luggageQuantityLarge',
                'luggageQuantitySmall',

                'trailerOption',
              ])
              .then(() => {
                setActiveTab('2');
              });

            // });
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default connect(({ vehicles, chauffeur }) => ({
  vehiclesList: vehicles?.vehiclesList,
  chauffeurList: chauffeur?.chauffeurList,
}))(Step1);
