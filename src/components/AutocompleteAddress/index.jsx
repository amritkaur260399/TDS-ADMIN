import { AutoComplete, Input, Form } from 'antd';
import { debounce } from 'lodash';
import React, { useState, useEffect } from 'react';
import Countries from '../Countries';

const AutocompleteAddresss = ({ Val, form }) => {
  const [suggestedAddress, setSuggestedAddress] = useState([]);
  const action = (text) => {
    googleInstance.getPredictions({ input: text }, (predictions) => {
      setSuggestedAddress(predictions);
      console.log('predictions', predictions);
    });
  };
  const debounceSearch = debounce(action, 400);
  console.log('name123', Val);
  const [provinces, setProvinces] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('United States (USA)');
  //   const [form] = Form.useForm();
  const componentForm = {
    street_number: 'long_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'short_name',
    postal_code: 'short_name',
  };
  const map = new google.maps.Map(document.getElementById('map'));
  // eslint-disable-next-line no-undef
  const googleInstance = new google.maps.places.AutocompleteService();
  // eslint-disable-next-line no-undef
  const placesService = new google.maps.places.PlacesService(map);
  const googleApi = 'AIzaSyC0TUVA7FHtzJqaWRLnLxbJ-zux6PSCDUM';
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
  //   useEffect(() => {
  //     form.setFieldsValue({

  //         country_code: selectedCountry,

  //     });
  //   }, []);
  //   useEffect(() => {
  //     dispatch({
  //       type: 'common/getCountriesList',
  //     });
  //   }, [dispatch, selectedCountry]);
  console.log('Val123', Val);
  return (
    <div>
      <AutoComplete
        onSearch={debounceSearch}
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
            const foundCountry = Countries?.filter((c) => c.id === addressFieldsByGoogle.country);
            const foundProvince =
              Array.isArray(foundCountry) &&
              foundCountry.length > 0 &&
              foundCountry[0]?.provinces.find(
                (province) => province.geoId === addressFieldsByGoogle.administrative_area_level_1,
              );
            setSelectedCountry(`${foundCountry?.[0]?.name} (${foundCountry?.[0]?.code})`);
            const sCode = foundProvince
              ? `${foundProvince.geoName} ${foundProvince.geoId}`
              : undefined;
            if (!foundProvince) {
              setProvinces([]);
            }
            console.log('Val', Val);
            console.log('addressFieldsByGoogle', addressFieldsByGoogle);
            // form.setFieldsValue({
            // address:'good'
            //   mailingState: addressFieldsByGoogle.administrative_area_level_1,
            //   mailingCity: addressFieldsByGoogle.locality,
            //   mailingZip: addressFieldsByGoogle.postal_code,
            //   Val: `${addressFieldsByGoogle.street_number || ''} ${
            //     addressFieldsByGoogle.route || 'ghghfgh'
            //   }`,
            //   address_line_2: '',
            //   country_code: foundCountry?.length
            //     ? `${foundCountry?.[0]?.name} (${foundCountry?.[0]?.code})`
            //     : undefined,
            //   state_code: sCode,
            // });

            setProvinces((Countries && Countries[0]?.provinces) || []);
            setSelectedCountry('United States (USA)');
          });
        }}
      >
        <Input placeholder="Street, House No." size="large" style={{ borderRadius: '5px' }} />
      </AutoComplete>
    </div>
  );
};

export default AutocompleteAddresss;
