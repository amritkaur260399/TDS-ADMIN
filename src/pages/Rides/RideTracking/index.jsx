import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Marker } from '@react-google-maps/api';

import { connect, useParams } from 'umi';
import dayjs from 'dayjs';
import Page from '@/components/Page';
import { useAtom } from 'jotai';
import { liveLocation, socketDetail } from '@/utils/globalStates/socket';
import { logo } from '../../../../public/pro_icon.svg';
const center = {
  lat: 31.5658991,
  lng: 75.122424,
};
const RideTracking = ({ dispatch, singleRideDetail, socketIO, currentUser }) => {
  const [map, setMap] = useState();
  const [directionResponse, setDirectionResponse] = useState();
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();
  const { id } = useParams();
  const [currentLocation, setCurrentLocation] = useState();
  const [conversationId, setConversationId] = useState();
  const [getLiveLocation] = useAtom(liveLocation);

  const [socket] = useAtom(socketDetail);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDyAUx_-daxFtklRMBcgH5_BWEEpjq_hdo',
    libraries: ['places'],
  });
  const onloadMap = async (res) => {
    if (res) {
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: res?.data?.pickupLocation?.name,
        destination: res?.data?.dropLocation?.name,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    }
  };
  useEffect(() => {
    dispatch({
      type: 'rides/getSingleRideDetails',
      payload: {
        query: {
          rideID: id,
        },
      },
    }).then((res) => {
      if (res?.success) {
        onloadMap(res);
      }
    });
    return () => {
      setDirectionResponse();
      setDistance();
      setDuration();
    };
  }, []);
  useEffect(() => {
    // if (socketIO?.connected) {
    //   socketIO?.emit(
    //     'join-conversation',
    //     {
    //       userId: currentUser?._id,
    //       conversationId,
    //     },
    //     () => {
    //       console.log(`'connected'`, 'connected');
    //     },
    //   );
    // }
    // return () => {
    //   if (socketIO?.connected) {
    //     socketIO?.emit(
    //       'leave-conversation',
    //       {
    //         userId: currentUser?._id,
    //         conversationId,
    //       },
    //       () => {
    //         console.log(`'disconnected'`, 'disconnected');
    //       },
    //     );
    //   }
    // };
  }, [socketIO]);
  //   const handleConversation = (user) => {
  //     // console.log('user', user);
  //     dispatch({
  //       type: 'message/checkConversation',
  //       payload: {
  //         query: {
  //           sender: currentUser?._id,
  //           receiver: user,
  //         },
  //       },
  //     }).then((res) => {
  //       if (res?.data?.exists) {
  //         setConversationId(res?.data?.conversation_id);
  //         // setIsChatDrawer(true);
  //       } else {
  //         dispatch({
  //           type: 'message/createConversation',
  //           payload: {
  //             body: {
  //               usersList: [user, currentUser?._id],
  //               type: 'single',
  //             },
  //           },
  //         }).then((res) => {
  //           setConversationId(res?.data?._id);
  //           // setIsChatDrawer(true);
  //         });
  //       }
  //     });
  //   };
  // useEffect(() => {
  //   // handleConversation(singleAllocation?.variantData?.driverId);
  //   if (socketIO?.connected) {
  //     console.log('socketIO?.connected', socketIO?.connected);
  //     socketIO.on('driverLocation', (res) => {
  //       console.log('res1111', res);
  //       setCurrentLocation(res?.location);
  //     });
  //   }
  // }, [socketIO]);
  // console.log('currentLocation', currentLocation);
  // console.log('singleRideDetail?.data', singleRideDetail);
  return (
    <Page>
      <div className="flex justify-center">
        <div className=" p-2 bg-white " style={{ width: '70%' }}>
          <div className=" mt-5   ">
            <p className="text-gray-600 text-xl  px-2 text-center font-semibold">Ride details</p>
            <hr className="m-2" />
            <div className="flex justify-center   gap-3  p-2 space-y-10">
              <div className="">
                <div className="flex items-center my-2 ">
                  <p className="text-gray-600  mr-3  ">Pickup Address : </p>
                  <p className="text-black">{singleRideDetail?.data?.pickupLocation?.name} </p>{' '}
                </div>
                <div className="flex items-center my-2 ">
                  <p className=" text-gray-600  mr-3">Booking no :</p>
                  <p>{singleRideDetail?.data?.bookingNo} </p>
                </div>

                <div className="flex items-center my-2">
                  <p className="text-gray-600  mr-3">Pickup Date : </p>
                  <p className="text-black">
                    {dayjs(singleRideDetail?.data?.date).format('DD-MM-YYYY HH:MM a')}
                  </p>{' '}
                </div>
              </div>
              <div>
                <div className="flex items-center my-2">
                  <p className="text-gray-600  mr-3">Delivery Address : </p>
                  <p className="text-black"> {singleRideDetail?.data?.dropLocation?.name}</p>{' '}
                </div>
                <div className="flex items-center my-2">
                  <p className="text-gray-600  mr-3">Total Ride Distance : </p>
                  <p className="text-black"> {singleRideDetail?.data?.totalRideDistance}</p>{' '}
                </div>
                <div className="flex items-center my-2">
                  <p className="text-gray-600  mr-3">Chauffeur Name : </p>
                  <p className="text-black">
                    {' '}
                    {singleRideDetail?.data?.chauffeurDetails?.name}
                  </p>{' '}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{
                width: '100%',
                height: '50vh',
              }}
            >
              {directionResponse && <DirectionsRenderer directions={directionResponse} />}
              <Marker
                position={{
                  lat: getLiveLocation?.latitude,
                  lng: getLiveLocation?.longitude,
                }}
                title="Driver"
                icon="https://freesvg.org/img/glibersat_Nioubiteul.png"
                // shape=
              />
            </GoogleMap>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default connect(({ rides, global, user }) => ({
  singleRideDetail: rides?.singleRideDetail,
  //   socketIO: global?.socketIO,
  //   currentUser: user?.currentUser,
}))(RideTracking);
