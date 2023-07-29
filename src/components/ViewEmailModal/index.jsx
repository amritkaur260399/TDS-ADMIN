import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { getIntials } from '../../utils/utils';
import AppModal from '../AppModal';

const ViewEmailModal = ({ showModal, setShowModal, data }) => (
  <AppModal
    destroyOnClose
    showModal={showModal}
    width={1000}
    footer={false}
    titleName={<span className="capitalize">View Email </span>}
    setShowModal={setShowModal}
  >
    <div className="p-2 pb-4">
      <section className="w-full px-4 flex flex-col bg-white rounded-r-3xl ">
        <div className="flex justify-between items-center border-b mb-3 pb-2">
          <div className="flex space-x-2 items-center">
            <div className="h-auto w-auto rounded-full overflow-hidden">
              <div className="inline-flex bg-indigo-600 text-white rounded-full h-8 w-8 flex items-center justify-center">
                {getIntials(data?.sentFrom)}
              </div>
            </div>
            <div className="ml-2 flex flex-col">
              <h2 className="font-semibold text-lg">{data?.sentFrom}</h2>
              {data?.toList && (
                <div>
                  <span className=" text-lg text-gray-800 font-semibold"> to: </span>
                  <span className="text-gray-600 font-semibold"> {data?.toList}</span>
                </div>
              )}
              {data?.ccList && (
                <div>
                  <span className=" text-lg text-gray-800 font-semibold"> cc: </span>
                  <span className="text-gray-600 font-semibold"> {data?.ccList}</span>
                </div>
              )}
              {data?.bccList && (
                <div>
                  <span className=" text-lg text-gray-800 font-semibold"> bcc: </span>
                  <span className="text-gray-600 font-semibold">{data?.bccList}</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="px-2 text-xs text-gray-600 font-semibold flex-1 text-right">
              <span className="mr-1">
                {' '}
                <ClockCircleOutlined />
              </span>
              {moment(data?.sentDateTime).calendar()}
            </div>
          </div>
        </div>
        <div className=" overflow-auto" style={{ height: 300 }}>
          <h1 className="font-bold text-xl">{data?.subject}</h1>
          <div className="mt-4 text-gray-600 leading-7 tracking-wider">
            {ReactHtmlParser(data.body)}{' '}
          </div>
        </div>
      </section>
    </div>
  </AppModal>
);

export default ViewEmailModal;
