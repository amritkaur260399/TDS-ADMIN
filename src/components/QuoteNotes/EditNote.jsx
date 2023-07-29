import { Button, Input } from 'antd';
import React from 'react';
import AppModal from '../AppModal';

const { TextArea } = Input;

const EditNote = ({
  showModal,
  setShowModal,
  updateNote,
  updateNoteLoading,
  note,
  setNote,
  type,
}) => (
  <AppModal
    destroyOnClose
    showModal={showModal}
    width={640}
    titleName={<span className="capitalize">Edit {type}</span>}
    afterClose={() => setShowModal(false)}
    footer={[
      <Button id="create-note-btn" type="primary" onClick={updateNote} loading={updateNoteLoading}>
        Update
      </Button>,
    ]}
    setShowModal={setShowModal}
  >
    <div className="p-8">
      <div className="text-gray-600 uppercase mb-2 text-sm font-semibold">{type}</div>
      <TextArea
        rows="5"
        className="w-full"
        placeholder="Enter here..."
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
    </div>
  </AppModal>
);

export default EditNote;
