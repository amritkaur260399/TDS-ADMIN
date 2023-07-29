import { modalsJotai, newClientDetailsjotai } from '@/utils/globalStates/modals';
import { Modal, message } from 'antd';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import quickBooks from '../../assets/images/QuickBooks.png';
import { connect } from 'umi';
import { createCustomer } from '@/services/quickBooks';
import { PageLoading } from '@ant-design/pro-layout';
import { quickBooks_invoice_intent } from '@/pages/Dashboard/quickBooksInvoiceIntent';

const ConfirmModal = ({ dispatch }) => {
  const [isopenModal, setIsopenModal] = useAtom(modalsJotai);
  const [newClientDetails, setNewClientDetails] = useAtom(newClientDetailsjotai);
  console.log('newClientDetails', newClientDetails);
  const [isQuickBookLoading, setIsQuickBookLoading] = useState(false);
  const [allServices, setAllServices] = useState([]);

  // create customer in quickbooks
  const handleQuickBooksCustomer = async (records) => {
    const filteredServices = allServices?.filter((obj1) =>
      records?.services.some((obj2) => obj1.name === obj2),
    );

    try {
      const createCustomerInQuickBooks = await createCustomer({
        body: {
          qb_admin: JSON.parse(localStorage.getItem('currentUser_details'))._id,
          db_id: isopenModal?.ConfirmModal?.currentID,
          qb: {
            DisplayName: records?.motorCarrierName,
            PrimaryEmailAddr: {
              Address: records?.billingEmail,
            },
            PrimaryPhone: {
              FreeFormNumber: records?.billingContact,
            },
          },
          qb_invoice: {
            Line: filteredServices?.map((item) => {
              return {
                DetailType: 'SalesItemLineDetail',
                Amount: item?.amount,
                SalesItemLineDetail: {
                  ItemRef: {
                    value: item?.qbItemId,
                  },
                  Qty: item?.quantity,
                },
              };
            }),
          },
        },
      });
      window.open(createCustomerInQuickBooks?.redirect_url, '_blank');
    } catch (error) {
      if (error?.data?.error?.status === 401) {
        window.location.replace(error.data.error.message.authURL);
      } else {
        message.error('This client is already registered in the quickBooks');
      }
    }
  };

  const getAllServices = () => {
    dispatch({
      type: 'service/getAllServices',
    }).then((res) => {
      if (res?.success) {
        setAllServices(res?.response);
      }
    });
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div>
      {!isQuickBookLoading ? (
        <Modal
          width={500}
          open={
            isopenModal?.ConfirmModal?.name === 'Confirm Modal' && isopenModal?.ConfirmModal?.open
          }
          onOk={() => {
            message.success('Added in Quick Books Successfully');
            setIsopenModal('');
            handleQuickBooksCustomer(newClientDetails);
          }}
          onCancel={() =>
            setIsopenModal({
              ...isopenModal,
              ConfirmModal: { name: ' ', open: false },
            })
          }
          okButtonProps={{
            children: 'Custom OK',
          }}
          cancelButtonProps={{
            children: 'Custom cancel',
          }}
          okText="Continue"
          cancelText="Cancel"
        >
          <div className="flex items-center justify-center flex-col">
            <img src={quickBooks} width={80} height={80} />
            <p className="mt-4 text-gray-500 dark:text-gray-300 font-medium  text-lg	">
              Do you want to add in Quick books?
            </p>
          </div>
        </Modal>
      ) : (
        <PageLoading />
      )}
    </div>
  );
};

export default connect(({ quickBooks, service }) => ({
  allServicesList: service?.getAllServices,
}))(ConfirmModal);
