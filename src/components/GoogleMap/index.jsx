import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import { debounce } from 'lodash';
// import { DirectionsService } from '@react-google-maps/api';

const GoogleMap = ({ data, height, center }) => {
  const [zoomLevel, setZoomLevel] = useState(12);
  const action = (val) => setZoomLevel(val);
  const debounceSetZoom = debounce(action, 1000);
  const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  const MarkersCount = ({ lat, lng }) => {
    return (
      <span
        className={`p-1 font-bold  text-red-100 bg-red-600 rounded-full
        
        ${
          data?.filter((item) => item?.latitude + item?.longitude === lat + lng)?.length === 1 &&
          'hidden'
        }`}
      >
        {data?.filter((item) => item?.latitude + item?.longitude === lat + lng)?.length}
      </span>
    );
  };

  // DirectionsService.route(
  //   {
  //     origin: origin,
  //     destination: destination,
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   },
  //   (result, status) => {
  //     if (status === google.maps.DirectionsStatus.OK) {
  //       this.setState({
  //         directions: result,
  //       });
  //     } else {
  //       console.error(`error fetching directions ${result}`);
  //     }
  //   },
  // );
  // const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  // const markers = data?.map((device, i) => {
  //   return new google.maps.Marker({
  //     position: { lat: device?.latitude, lng: device?.longitude },
  //     label: labels[i % labels.length],
  //   });
  // });
  // Add a marker clusterer to manage the markers.
  // new google.maps.MarkerClusterer(map, markers, {
  //   imagePath:
  //     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
  // });

  const markers = data?.map((device) => {
    return (
      <LocationMarker
        key={device?.inventoryItemId}
        lat={device?.latitude}
        lng={device?.longitude}
        info={{
          battery: device?.battery,
          deviceName: device?.deviceName,
          isAlarm: device?.alarm,
          isExpired: device?.expired,
        }}
      />
    );
  });

  const markersCount = data?.map((item) => {
    return <MarkersCount key={item?.inventoryItemId} lat={item?.latitude} lng={item?.longitude} />;
  });

  function createMapOptions(maps) {
    return {
      zoomControlOptions: {
        center: maps.ControlPosition.RIGHT_CENTER,
        style: maps.ZoomControlStyle.SMALL,
      },
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT,
      },
      mapTypeControl: true,
      streetViewControl: true,
    };
  }
  return (
    <div className="shadow" style={{ height, position: 'relative', width: 'auto' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY, libraries: ['visualization'] }}
        defaultCenter={center}
        defaultZoom={zoomLevel}
        // onChange={(val) => debounceSetZoom(val?.zoom)}
        options={createMapOptions}
        // layerTypes={['TransitLayer']}
      >
        {markers}
        {markersCount}
      </GoogleMapReact>
    </div>
  );
};
GoogleMap.defaultProps = {
  center: {
    lat: 31.5571677,
    lng: 75.154545544994,
  },
  zoomLevel: 12,
  height: '100vh',
};
export default GoogleMap;
