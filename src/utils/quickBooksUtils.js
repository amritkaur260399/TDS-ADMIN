import { getExistingToken, getQuickBooksurl, refreshTokenCall } from '@/services/quickBooks';

const quickBookUtils = async (apiCaller, body) => {
  try {
    const getToken = await getExistingToken({
      pathParams: {
        id: JSON.parse(localStorage.getItem('currentUser_details'))._id,
      },
    });
    try {
      const response1 = await apiCaller?.({
        body,
        headerProps: {
          // quickbooks_authorization: JSON.parse(localStorage.getItem('quickBook_Token'))
          //   ?.access_token
          //   ? JSON.parse(localStorage.getItem('quickBook_Token'))?.access_token
          //   : getToken.authToken.access_token,
          quickbooks_authorization:
            'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..Er9c6XvLDGW0D0SapofqdA.3V1ndAmMuBKEY0tA0cTvjlJ-H4ThMI17p8MzMj5gIN7H0y5-BL4gT1a5_xeZat5dNlXLpn_YzIhn9FCABrNOR5VT_Sv9kfloKEjYwLTNfdF_gFhGqTYrolW7Y6o3E5PGpEe21RpRC_9HToYpmrwyJyMVZTfOGfoT0QUZP9MTcO1fNSAABEux-JOYI9gxlW8OPNxK0id7lgExO49CdeHscLrJTeaNvNNZuh-ilTBjkkkhjvQLv4RWrcIqHPpNBx5vpqaeiFXKV6rpIi4SRaPUNAmxQSp92_rKOmQNKEmbDBfZpfQdQ1VCK9gXtARiGe6mNBmnp_Szvf37-lGf8-inVDYSf8tsl6PG4wc8C0rDTVYBtsVOBl1GVmL6xezJiNkvhoU-_Kqm16I4V9CARMVRrIuwu8pSBNqj3yMpCejF7A3u833X2lmkcHNunVj-3xwajp_ldphtfEgn6FLfb2xaylaCeGOrkDZLht_1aF89Bq08DqFvreGxF-Q2i0TA-u24NDSvk1DH2IFKnP6sMAHKHnqGy2ReRdKtojigcQfr9nd-rnvXXT49O9jTpWwbbtWimxGWxnrW20a_SrY9pkfhSI0Kr864fJm6XlzajHb8NFwdHVgK1S19lXgKr5z-QrfsZ8jSIy15eeFJvnKCcpNCZN861n1T0LDgzjoU0BA7pKqUZ2_A6XNc5GI6wFoj5hRd17sizoF3Lakc9frSGNOLEge26z-ENW3jygZ5rKHsGzaJ4dXUJHZfcOGYjhdBhmLH.F8yYcHlZZhDEC2w-vzQMrQ',
        },
      });
      return {
        success: true,
        response: response1,
      };
    } catch (error) {
      if (error?.data?.err?.status === 401) {
        try {
          const response2 = await refreshTokenCall?.({
            body: {
              refresh_token: JSON.parse(localStorage.getItem('quickBook_Token'))?.refresh_token
                ? JSON.parse(localStorage.getItem('quickBook_Token'))?.refresh_token
                : getToken?.authToken?.refresh_token,
              user_id: JSON.parse(localStorage.getItem('currentUser_details'))._id,
            },
          });
          localStorage.setItem('quickBook_Token', JSON.stringify(response2.getLatestToken));
          quickBookUtils(apiCaller, body);
        } catch (error) {
          try {
            const response3 = await getQuickBooksurl();
            window.location.replace(response3.authURL);
          } catch (error) {
            console.log('quickk book login error', error);
          }
        }
      } else {
        return {
          success: false,
          error,
        };
      }
    }
  } catch (error) {
    console.log('get token error', error);
  }
};
export default quickBookUtils;

// {
//   "DetailType": "SalesItemLineDetail",
//   "Amount": 20,
//   "SalesItemLineDetail": {
//       "ItemRef": {
//           "value": "26"
//       },
//       "Qty": 1
//   }
// }
