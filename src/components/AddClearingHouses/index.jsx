// import { Button, Col, DatePicker, Divider, Form, Input, Modal, Row, Tabs } from 'antd';
// import React from 'react';
// import { modalsJotai } from '@/utils/globalStates/modals';
// import { useAtom } from 'jotai';
// import { CloseOutlined } from '@ant-design/icons';
// import DriverClearingHouses from '../DriverClearingHouses';
// import CompanyClearingHouses from '../CompanyClearingHouse';

// const AddClearingHouse = ({ form, setButtonStatus, buttonStatus,getAllDriverClearingHouse,getAllCompanyClearingHouse }) => {
//   const [isopenModal, setIsopenModal] = useAtom(modalsJotai);
//   const onFinish = (values) => {
//     console.log('values', values);
//   };

//   return (
//     <div className="">
//       <Modal
//         // title="Add Clearing House"
//         width={750}
//         centered
//         footer={null}
//         closeIcon={<CloseOutlined style={{ color: 'black' }} />}
//         className="modalStyle"
//         open={
//           isopenModal?.clearingHouse?.name === 'Add Clearing House' &&
//           isopenModal?.clearingHouse?.open
//         }
//         onOk={() =>
//           setIsopenModal({
//             ...isopenModal,
//             clearingHouse: { name: '', open: false },
//           })
//         }
//         onCancel={() =>
//           setIsopenModal({
//             ...isopenModal,
//             clearingHouse: { name: ' ', open: false },
//           })
//         }
//       >
//         <Tabs>
//           {/* ----Company Clearing House------------ */}
//           <Tabs.TabPane tab="Company clearing house" key="item-1">
//             <CompanyClearingHouses
//               form={form}
//               buttonStatus={buttonStatus}
//               setButtonStatus={setButtonStatus}
//               getAllCompanyClearingHouse={getAllCompanyClearingHouse}
//             />
//           </Tabs.TabPane>
//           {/* ------------Driver Clearing House--------- */}
//           <Tabs.TabPane tab="Driver clearing house" key="item-2">
//             <DriverClearingHouses form={form} buttonStatus={buttonStatus} getAllDriverClearingHouse={getAllDriverClearingHouse} />
//           </Tabs.TabPane>
//         </Tabs>
//       </Modal>
//     </div>
//   );
// };

// export default AddClearingHouse;
