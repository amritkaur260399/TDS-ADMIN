// import { AutoComplete, Col, Form, Input, Row, Select } from 'antd';
// import TextArea from 'antd/lib/input/TextArea';
// import { debounce } from 'lodash';
// import React, { useEffect, useState } from 'react';
// import { connect } from 'umi';

// const { Option } = Select;

// // eslint-disable-next-line no-undef
// const map = new google.maps.Map(document.getElementById('map'));
// // eslint-disable-next-line no-undef
// const googleInstance = new google.maps.places.AutocompleteService();
// // eslint-disable-next-line no-undef
// const placesService = new google.maps.places.PlacesService(map);

// const Address = (props) => {
//   const { form, dispatch, countries = [], type = 'address' } = props;

//   const [suggestedAddress, setSuggestedAddress] = useState([]);

//   const action = (text) => {
//     googleInstance.getPredictions({ input: text }, (predictions) => {
//       setSuggestedAddress(predictions);
//     });
//   };
//   const debounceSearch = debounce(action, 400);

//   const [provinces, setProvinces] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState('AUS Australia');

//   const componentForm = {
//     street_number: 'short_name',
//     route: 'long_name',
//     locality: 'long_name',
//     administrative_area_level_1: 'short_name',
//     country: 'short_name',
//     postal_code: 'short_name',
//   };

//   // useEffect(() => {
//   //   // dispatch({
//   //   //   type: 'common/getCountriesList',
//   //   // }).then((countriesData) => {
//   //   //   const foundCountry = countriesData.filter((c) => c.id === selectedCountry.split(' ')[0]);
//   //   //   setProvinces(foundCountry.length > 0 ? foundCountry[0].provinces : []);
//   //   // });
//   // }, []);

//   // const getAddressFieldsFromGoogle = async (placeId, cb) => {
//   //   let finalData = {};
//   //   placesService.getDetails({ placeId }, ({ address_components }) => {
//   //     // eslint-disable-next-line no-plusplus
//   //     for (let i = 0; i < address_components.length; i++) {
//   //       const addressType = address_components[i].types[0];
//   //       if (componentForm[addressType]) {
//   //         const val = address_components[i][componentForm[addressType]];
//   //         finalData = { ...finalData, [addressType]: val };
//   //       }
//   //       if (address_components.length - 1 === i) {
//   //         cb(finalData);
//   //       }
//   //     }
//   //   });
//   // };

//   useEffect(() => {
//     form.setFieldsValue({
//       [type]: {
//         country_code: selectedCountry,
//       },
//     });
//   }, []);

//   return (
//     <div>
//       <Form.Item
//         name="address_line_1"
//         label={<span className="formLabel">Address line 1</span>}
//         rules={[
//           {
//             required: true,
//             message: "Address line 1 can't be blank!",
//           },
//         ]}
//       >
//         <Input size="large" rows={1} placeholder="Street, House No." />
//       </Form.Item>
//       <Form.Item name="address_line_2" label={<span className="formLabel">Address line 2</span>}>
//         <Input type="text" placeholder="Suite, Building, Apt." size="large" />
//       </Form.Item>
//       <Row gutter={[12, 0]}>
//         <Col xl={12} lg={12} md={12} sm={24} xs={24}>
//           <Form.Item
//             name="country"
//             label={<span className="formLabel">Country / Region</span>}
//             rules={[
//               {
//                 required: true,
//                 message: 'Please select your Country',
//               },
//             ]}
//           >
//             <Input type="primary" size="large" />
//           </Form.Item>
//         </Col>
//         <Col xl={12} lg={12} md={12} sm={24} xs={24}>
//           <Form.Item
//             name="state"
//             rules={[
//               {
//                 required: provinces.length > 0,
//                 message: 'Please select your State',
//               },
//             ]}
//             label={<span className="formLabel">State</span>}
//           >
//             <Input type="primary" size="large" placeholder="State" />
//           </Form.Item>
//         </Col>
//         <Col xl={12} lg={12} md={12} sm={24} xs={24}>
//           <Form.Item
//             name="city"
//             label={<span className="formLabel">City</span>}
//             rules={[
//               {
//                 required: true,
//                 message: "City can't be blank!",
//               },
//             ]}
//           >
//             <Input size="large" type="text" placeholder="Chicago" />
//           </Form.Item>
//         </Col>
//         <Col xl={12} lg={12} md={12} sm={24} xs={24}>
//           <Form.Item
//             name="postal_code"
//             label={<span className="formLabel">Zipcode</span>}
//             rules={[
//               {
//                 required: true,
//                 message: "Zipcode/Postal code can't be blank!",
//               },
//             ]}
//           >
//             <Input size="large" placeholder="ZIP / Postal Code" />
//           </Form.Item>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default connect(({ common }) => ({
//   countries: common.countriesList,
// }))(Address);

import React from 'react';
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-google-autocomplete';

class AddressForm extends React.Component {
  handlePlaceSelect = (place) => {
    geocodeByPlaceId(place.place_id)
      .then((results) => {
        // Handle the geocoding results
        const addressComponents = results[0].address_components;
        const address1 = addressComponents[0]?.long_name || '';
        const address2 = addressComponents[1]?.long_name || '';
        console.log('Address Line 1:', address1);
        console.log('Address Line 2:', address2);
      })
      .catch((error) => {
        console.error('Error fetching address:', error);
      });
  };

  render() {
    return (
      <div>
        <h4>Address</h4>
        <PlacesAutocomplete
          apiKey="AIzaSyCByUKsDuZX-QWIaixI-L3D7jHzW3lvJao"
          onSelect={this.handlePlaceSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
              <input {...getInputProps({ placeholder: 'Address Line 1' })} />
              <input {...getInputProps({ placeholder: 'Address Line 2' })} />
              <div>
                {suggestions.map((suggestion) => (
                  <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion)}>
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}

export default AddressForm;
