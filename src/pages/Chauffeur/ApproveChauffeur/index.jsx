import React from 'react';
import { Modal } from 'antd';
import { connect } from 'umi';
import ChauffeurDetail from './ChauffeurDetail';

const ApproveChauffeur = ({
  visible,
  setVisible,
  form,
  chauffeurList,
  dispatch,
  getAllChauffeur,
}) => {
  const handleCancel = () => {
    setVisible({ modal: false, id: '' });
    window.location.reload();
  };

  return (
    <Modal
      title={
        <span style={{ color: '#10181e' }} className="font-medium">
          Approve/Reject Chauffers
        </span>
      }
      closable={false}
      open={visible?.modal}
      onCancel={handleCancel}
      okText="Submit"
      okButtonProps={{ type: 'primary', size: 'large' }}
      cancelButtonProps={{ size: 'large' }}
      okType=""
      width={800}
      footer={null}
    >
      <ChauffeurDetail
        id={visible?.id}
        setVisible={setVisible}
        getAllChauffeur={getAllChauffeur}
        handleCancel={handleCancel}
      />
    </Modal>
  );
};

export default connect(({ chauffeur }) => ({ chauffeurList: chauffeur?.chauffeurList }))(
  ApproveChauffeur,
);
