import { callApi } from '@/utils/apiUtils';
import { analytics } from '@/utils/endpoints/analytics';

export const getAnalytics = ({ query }) =>
  callApi({ uriEndPoint: analytics.getAnalytics.v1, query });
