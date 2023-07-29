import { Avatar } from 'antd'
import React from 'react'

const ClientProfile = () => {
    
  return (
    <div className='flex  justify-center mt-10' style={{marginTop:"20"}}>
    <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
  <div className='ml-20 '>
      <div className=" mt-10">
          {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" /> */}
          <div>
                    <Avatar className="AvatarBg">
                      {/* {getInitials()} */}
                    </Avatar>
                  </div>
          </div>
          <div className="mb-1 text-lg font-medium text-gray-900 dark:text-white"><span>Motor Carrier Name</span>: <span className="text-sm text-gray-500 dark:text-gray-400">5456</span></div>
          <div className="mb-1 text-lg font-medium text-gray-900 dark:text-white"><span>Address</span>: <span className="text-sm text-gray-500 dark:text-gray-400">5456</span></div>
          <div className="mb-1 text-lg font-medium text-gray-900 dark:text-white"><span>Fax</span>: <span className="text-sm text-gray-500 dark:text-gray-400">5456</span></div>
          <div className="mb-1 text-lg font-medium text-gray-900 dark:text-white"><span>Email</span>: <span className="text-sm text-gray-500 dark:text-gray-400">5456</span></div>
          <div className="mb-1 text-lg font-medium text-gray-900 dark:text-white"><span>Phone Number</span>: <span className="text-sm text-gray-500 dark:text-gray-400">5456</span></div>
          <div className="mb-1 text-lg font-medium text-gray-900 dark:text-white"><span>SSN /TAX Id Number</span>: <span className="text-sm text-gray-500 dark:text-gray-400">5456</span></div>
          <div className="mb-1 text-lg font-medium text-gray-900 dark:text-white"><span>Licence Number</span>: <span className="text-sm text-gray-500 dark:text-gray-400">5456</span></div>
          <div className="mb-1 text-lg font-medium text-gray-900 dark:text-white"><span>Dot Number</span>: <span className="text-sm text-gray-500 dark:text-gray-400">5456</span></div>
          <div className="mb-1 text-lg font-medium text-gray-900 dark:text-white"><span>Dot Number</span>: <span className="text-sm text-gray-500 dark:text-gray-400">5456</span></div>
          <div className="mb-1 text-lg font-medium text-gray-900 dark:text-white"><span>Dot Number</span>: <span className="text-sm text-gray-500 dark:text-gray-400">5456</span></div>
  
     
          <div className="flex mt-4 space-x-10 md:mt-6 ">
  
              <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
              <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>
          </div>
      </div>
  
  </div>
  </div>
  )
}

export default ClientProfile
