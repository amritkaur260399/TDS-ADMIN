import React from 'react';

const UserMessage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        <div
          style={{ fontFamily: 'Pacifico, cursive' }}
          className=" flex justify-center italic text-6xl font-bold text-blue-400 mb-10"
        >
          Thank you !
        </div>{' '}
        <span className="mt-6 text-2xl ">Your signature submitted successfully.</span>
      </div>
    </div>
  );
};

export default UserMessage;
