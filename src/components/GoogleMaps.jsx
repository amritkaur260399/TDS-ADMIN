import { GoogleApiWrapper } from 'google-maps-react';

const API_KEY = 'AIzaSyDyAUx_-daxFtklRMBcgH5_BWEEpjq_hdo';

export default GoogleApiWrapper({
  apiKey: API_KEY
})(GoogleMaps);