import React from 'react';
import sample from '../../../../public/Daco_5054445.png';

const DriverProfile = () => {
  return (
    <>
      <div className="flex flex-row" style={{ border: '1px solid red' }}>
        {/* sidebar */}
        <div className="bg-white " style={{ width: '30%', height: '88vh', filter: 'blur(5px)' }}>
          <div className="border flex items-center gap-2 m-2 p-1 shadow-md">
            <img
              src={sample}
              alt=""
              style={{ height: '100px', width: '100px', borderRadius: '100%' }}
            />
            <div className="text-lg">Jhon Doe</div>
          </div>
        </div>
        {/* right content */}
        <div className="" style={{ width: '70%' }}>
          asdf
        </div>
      </div>
    </>
  );
};

export default DriverProfile;
