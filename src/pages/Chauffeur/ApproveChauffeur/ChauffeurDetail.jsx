import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Divider, Input, message, Modal, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import moment from 'moment';
import { Option } from 'antd/lib/mentions';
import Icon from '@ant-design/icons/lib/components/Icon';
const ChauffeurDetail = ({
  dispatch,
  id,
  singleChauffeur,
  setVisible,
  getAllChauffeur,
  handleCancel,
  chauffeurList,
}) => {
  const [rejectModal, setRejectModal] = useState({ modal: false, id: '' });
  const [previewDocument, setPreviewDocument] = useState({ visible: false, url: '' });
  const [pendingRides, setPendingRides] = useState([]);
  const [chauffeurId, setChauffeurId] = useState('');
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'chauffeur/getSingleChauffeur',
        payload: {
          pathParams: { id },
        },
      });
      // dispatch({
      //   type: 'chauffeur/getAllChauffeur',
      //   payload: {
      //     query: {
      //       deactiveChauffeurId: id,
      //     },
      //   },
      // });
    }
  }, [id]);
  const previewDoc = (doc) => {
    setPreviewDocument({ visible: true, url: doc });
  };
  const getColor = (val) => {
    switch (val) {
      case 'Verified':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'Deactivated':
        return 'red';
      default:
        return 'orange';
    }
  };
  const reAssignRide = (rideId) => {
    dispatch({
      type: 'rides/updateRide',
      payload: {
        body: { chauffeurID: chauffeurId, rideID: rideId },
      },
    })
      .then((res) => {
        message.success('Ride updated successfully');
        setChauffeurId('');
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  const verifyDocuments = (docType, id, status) => {
    dispatch({
      type: 'chauffeur/updateDocuments',
      payload: {
        query: {
          chauffeurId: id,

          [docType]: status,
        },
      },
    }).then((res) => {
      message.success('Document verified successfully!');
    });
  };
  const getSingleChauffeurRides = (id) => {
    dispatch({
      type: 'rides/getRides',
      payload: {
        query: {
          chauffeurID: id,
          singleChauffeur: true,
        },
      },
    })
      .then((res) => {
        setPendingRides(res?.data);
        setRejectModal({ modal: true, id: id });
      })
      .catch((err) => {
        console.log('err :>> ', err);
      });
  };
  // }
  const verifyChauffeur = (value) => {
    dispatch({
      type: 'chauffeur/verifyChauffeur',
      payload: {
        body: { status: value, chauffeurID: id },
      },
    }).then((res) => {
      if (res?.message === 'Status Updated Successfully') {
        setVisible({ modal: false, id: '' });
        setRejectModal({ modal: false, id: '' });
        getAllChauffeur();

        window.location.reload();
      } else {
      }
    });
  };

  return (
    <div className="outer">
      <div className="content ">
        <div className="detail grid grid-cols-3 justify-between ">
          <div className="image h-48 w-48 flex flex-col  items-center">
            <div className="img">
              <img
                src={singleChauffeur?.data?.avatar_url}
                alt="image here"
                className="h-48 w-48 rounded-lg mb-2"
              />
            </div>
            <div className="id">
              <span className="font-semibold"> Uniquie ID </span>:{' '}
              <span>{singleChauffeur?.data?._id}</span>
            </div>
          </div>
          <div className="leftContent mr-4">
            <div className="name flex flex-col mb-4">
              <span className="mb-1 font-semibold">Name</span>
              <span>{singleChauffeur?.data?.name}</span>
            </div>
            <div className="email flex flex-col mb-4">
              <span className="font-semibold">Email</span>
              <span>{singleChauffeur?.data?.email}</span>
            </div>
            <div className="phone flex flex-col mb-4">
              <span className="font-semibold">Phone No.</span>
              <span>+{singleChauffeur?.data?.phone}</span>
            </div>
            <div className="dob flex flex-col mb-4">
              <span className="font-semibold">Date of Birth</span>
              <span>{moment(singleChauffeur?.data?.dateOfBirth).format('DD/MM/YYYY')}</span>
            </div>
          </div>
          <div className="rightContent ml-4">
            <div className="gender flex flex-col mb-4">
              <span className="font-semibold">Gender</span>
              <span>{singleChauffeur?.data?.gender}</span>
            </div>
            <div className="drivingExp flex flex-col mb-4">
              <span className="font-semibold">Driving Experience</span>
              <span>{singleChauffeur?.data?.experience}</span>
            </div>
            <div className="vehicleType flex flex-col mb-4">
              <span className="font-semibold">Vehicle Type</span>
              <span>{singleChauffeur?.data?.vehicleType}</span>
            </div>
            <div className="licenseType flex flex-col mb-4">
              <span className="font-semibold">License Type</span>
              <span>{singleChauffeur?.data?.licenseType}</span>
            </div>
          </div>
        </div>
        <div className="my-5 space-y-4">
          <div className="flex gap-4 item-center my-5">
            <div className="flex items-center mt-3">
              <p className="font-semibold">Chauffeur License</p>
              <p className="mx-2">
                Expire Date : {moment(singleChauffeur?.data?.licenseExpiry).format('ll')}
              </p>
              <p
                className="mx-2"
                onClick={() => previewDoc(singleChauffeur?.data?.drivingDocument)}
              >
                <EyeOutlined />{' '}
              </p>
            </div>
            {singleChauffeur?.data?.isDrivingLicenseVerified === 'Rejected' ? (
              <div>Rejected</div>
            ) : (
              <Button
                onClick={() =>
                  verifyDocuments('licenseStatus', singleChauffeur?.data?._id, 'Rejected')
                }
              >
                Reject
              </Button>
            )}
            {singleChauffeur?.data?.isDrivingLicenseVerified === 'Verified' ? (
              <div>Accepted</div>
            ) : (
              <Button
                type="primary"
                onClick={() =>
                  verifyDocuments('licenseStatus', singleChauffeur?.data?._id, 'Verified')
                }
              >
                Accept
              </Button>
            )}
          </div>
          <div className="flex gap-4 item-center my-5">
            <div className="flex items-center mt-3">
              <p className="font-semibold">Driving Authority</p>
              <p className="mx-2">Expire Date :2years</p>
              <p
                className="mx-2"
                onClick={() => previewDoc(singleChauffeur?.data?.drivingAuthorityDocument)}
              >
                <EyeOutlined />{' '}
              </p>
            </div>
            {singleChauffeur?.data?.isDrivingLicenseVerified === 'Rejected' ? (
              <div>Rejected</div>
            ) : (
              <Button
                onClick={() =>
                  verifyDocuments('drivingAuthorityStatus', singleChauffeur?.data?._id, 'Rejected')
                }
              >
                Reject
              </Button>
            )}
            {singleChauffeur?.data?.drivingAuthorityDocument === 'Rejected' ? (
              <div>Accepted</div>
            ) : (
              <Button
                type="primary"
                onClick={() =>
                  verifyDocuments('drivingAuthorityStatus', singleChauffeur?.data?._id, 'Verified')
                }
              >
                Accept
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="footer flex justify-between">
        <div className="cancel">
          <Button size="large" onClick={() => handleCancel()}>
            Cancel
          </Button>{' '}
        </div>
        <div className="right flex  ">
          {singleChauffeur?.data?.isVerified === 'Verified' ||
          singleChauffeur?.data?.isVerified === 'Pending' ? (
            <div>
              <Button
                onClick={() => {
                  getSingleChauffeurRides(singleChauffeur?.data?._id);
                }}
                size="large"
                className="mr-4"
              >
                Reject
              </Button>
            </div>
          ) : (
            <div></div>
          )}
          {singleChauffeur?.data?.isVerified === 'Rejected' ||
          singleChauffeur?.data?.isVerified === 'Pending' ||
          singleChauffeur?.data?.isVerified === 'Deactivated' ? (
            <div>
              {' '}
              <Button
                onClick={() => {
                  verifyChauffeur('Verified');
                }}
                type="primary"
                size="large"
                className="bg-black text-white"
              >
                {singleChauffeur?.data?.isVerified === 'Deactivated' ? 'Activate' : 'Approve'}
              </Button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Modal
        width="60%"
        onCancel={() => {
          setRejectModal({ modal: false, id: '' });
        }}
        footer={null}
        title="Reject chauffeur"
        open={rejectModal.modal}
      >
        <div>
          <div className="ridesList mb-4 flex flex-col justify-center align-center">
            <div className="title font-semibold text-xl m-auto mb-4">Chauffeur&apos;s Rides</div>
            <div
              className="rides"
              style={pendingRides.length > 3 ? { height: '200px', overflow: 'scroll' } : {}}
            >
              {pendingRides?.length === 0 ? (
                <div className="  flex justify-center text-gray-700">No Pending Rides Found</div>
              ) : (
                pendingRides.map((ride) => (
                  <div key={ride?._id}>
                    <div className="outer flex justify-start align-center my-2">
                      <div className="details font-semibold flex justify-around align-center">
                        <div className="bookingID mx-2">{ride?.bookingNo}</div>
                        <div
                          className="vehicleType mx-2 flex justify-center"
                          style={{ width: '80px' }}
                        >
                          {ride?.vehicleType}
                        </div>
                        <div className="date ml-2 mr-8 ">{moment(ride?.date).format('ll')}</div>
                        <Tag color={getColor(ride?.status)} style={{ marginRight: '20px' }}>
                          {ride?.status}
                        </Tag>
                      </div>
                      <div className="chauffeurList ml-8">
                        <AutoComplete
                          allowClear
                          onChange={(data, props) => {
                            setChauffeurId(props?.item?._id);
                          }}
                          dataSource={chauffeurList?.data?.map((group) => (
                            <Option
                              item={group}
                              filter={group.name}
                              key={group._id}
                              value={group.name}
                              title={group.name}
                            >
                              {group.name}
                            </Option>
                          ))}
                          placeholder="Select Chauffeur here"
                        >
                          <Input suffix={<Icon type="search" />} />
                        </AutoComplete>
                      </div>
                      <div className="button ml-4">
                        <Button type="primary" onClick={() => reAssignRide(ride?._id)}>
                          Reassign
                        </Button>
                      </div>
                    </div>
                    <Divider />
                  </div>
                ))
              )}
            </div>
          </div>
          <div>
            <div className="ridesList">{/* RidesList Here */}</div>
            <p>Reason</p>
            <Input.TextArea rows={3} style={{ fontSize: '20px' }} />
          </div>
          <div className="flex justify-end mt-5 gap-4">
            <Button
              onClick={() => {
                setRejectModal({ modal: false, id: '' });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                verifyChauffeur('Rejected');
              }}
              type="primary"
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={previewDocument?.visible}
        title="Preview Document"
        onCancel={() => {
          setPreviewDocument({ visible: false, url: '' });
        }}
        footer={null}
      >
        <div className="flex justify-center">
          <img width={500} src={previewDocument?.url} alt="" />
        </div>
      </Modal>
    </div>
  );
};

export default connect(({ chauffeur }) => ({
  singleChauffeur: chauffeur?.singleChauffeur,
  chauffeurList: chauffeur?.chauffeurList,
}))(ChauffeurDetail);
