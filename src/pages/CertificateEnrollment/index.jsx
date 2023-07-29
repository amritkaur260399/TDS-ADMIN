import React from 'react';
import img from '@/assets/images/certificate.png';
import { Divider } from 'antd';
import logo from '@/assets/images/tdsLogo-removebg-preview.png';

const CertificateEnrollment = () => {
  return (
    <>
      <div>
        <img src={img} style={{ width: '100%', height: '100%' }} />
      </div>
      <div
        className=" absolute  "
        style={{
          width: '100%',

          height: '100%',
          top: '15%',
          position: 'absolute',
          //   left: '11.5%',
          textAlign: 'center',
          paddingLeft: '10%',
          paddingRight: '10%',
        }}
      >
        <div
          className="font-bold "
          style={{
            fontFamily: 'serif',
            fontSize: '65px',
            fontStyle: 'inherit',
            letterSpacing: '20px',
          }}
        >
          CERTIFICATE
          <div
            className="font-bold"
            style={{
              fontFamily: 'serif',
              fontSize: '40px',
              fontStyle: 'inherit',
            }}
          >
            OF ENROLLMENT
          </div>
        </div>
        <div
          className="font-bold "
          style={{
            fontFamily: 'serif',
            fontSize: '30px',
            fontStyle: 'inherit',
            paddingLeft: '20%',
            paddingRight: '20%',
          }}
        >
          Department Of Transportation - 49 CFR Part 40 Random Drug and Alcohal Testing Consortium{' '}
        </div>
        <div
          className="font-semibold "
          style={{
            fontFamily: 'serif',
            fontSize: '50px',
            fontStyle: 'inherit',
            paddingLeft: '20%',
            paddingRight: '20%',
          }}
        >
          JS Carrier LLC
        </div>
        <div
          className=" "
          style={{
            fontFamily: 'serif',
            fontSize: '30px',
            fontStyle: 'inherit',
            paddingLeft: '10%',
            paddingRight: '10%',
          }}
        >
          The Drug Testing Services hereby certifies that the above named Company has enrolled in
          our consortium administrated random drug alcohol testing program as mandated by the DOT 46
          CFR part 40{' '}
        </div>
        <div
          className=" "
          style={{
            fontFamily: 'serif',
            fontSize: '30px',
            fontStyle: 'inherit',
            paddingLeft: '20%',
            paddingRight: '20%',
            padding: '1%',
          }}
        >
          This certificate is for the period starting April 20, 2022 and ending December 31, 2022
        </div>
        <div className="flex justify-between">
          <div style={{ width: '40%', marginTop: '4%', marginLeft: '8%' }}>
            <Divider className="bg-black " style={{ height: '2px' }} />
            <div
              className=""
              style={{
                fontFamily: 'serif',
                fontSize: '30px',
                fontStyle: 'inherit',
              }}
            >
              Raman Singh
            </div>{' '}
          </div>
          <div>
            {' '}
            <img className="px-20" src={logo} style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateEnrollment;
