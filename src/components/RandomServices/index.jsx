import { modalsJotai } from '@/utils/globalStates/modals';
import { CloseOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Input, Modal } from 'antd';
import React from 'react';
import { useAtom } from 'jotai';
import CertificateEnrollMent from '../CertificateEnrollment';
import logo from '@/assets/images/tdsLogo-removebg-preview.png';
const RandomService = () => {
  const [isopenModal, setIsopenModal] = useAtom(modalsJotai);
  return (
    <div>
      <Modal
        title="Random Service Agreement"
        width={1200}
        // height={800}
        // bodyStyle={{overflow: 'auto'}}
        // style={{
        //     overflow:"auto"
        // }}
        centered
        // footer={null}
        closeIcon={<CloseOutlined style={{ color: 'black' }} />}
        className="modalStyle"
        open={
          isopenModal?.randomServicesAgreement?.name === 'Random Services Agreement' &&
          isopenModal?.randomServicesAgreement?.open
        }
        okButtonProps={{
          children: 'Custom OK',
        }}
        cancelButtonProps={{
          children: 'Custom cancel',
        }}
        okText="Continue"
        cancelText="Cancel"
        onOk={() => {
          setIsopenModal({
            ...isopenModal,
             certificateEnrollment: { name: 'Certificate Enrollment', open: true }
          })
          ;

          // setIsopenModal({
          //   ...isopenModal,
          //   certificateEnrollment: { name: 'Certificate Enrollment', open: true },
          // });
          // setIsopenModal({
          //   ...isopenModal,
          //   ConfirmModal: { name: '', open: false },
          // });

        }}
        onCancel={() => {
          setIsopenModal({
            ...isopenModal,
            randomServicesAgreement: { name: '', open: false },
          });
        }}
      >
        <div
          className="p-5 border    "
          style={{
            overflow: 'auto',
            height: '750px',
          }}
        >
          <div className=" text-center mx-10 ">
            <h2 className="underline py-6">RANDOM ENROLLEMENT SERVICE AGREEMENT</h2>
            {/* ---------first page----------- */}
            <div className=" text-justify " style={{ fontSize: '18px' }}>
              <div>
                This Agreement is made on <input type="text  " className="input" />
                by and between The Drug Testing Services, Inc. (hereinafter “TDS”), a Indiana
                Corporation with its principal place of business located at 4670 N El Capitan Ave
                Ste 105 Fresno, CA 93722 and <input type="text  " className="input" />
                (hereinafter “COMPANY”), with its principal office located at{' '}
                <input type="text  " className="input" />
                to retain TDS for the administration of a drug (and/or) alcohol testing program, as
                set forth in the Policy & Procedures Manual, for CLIENT employees who are enrolled
                in the Program. Now, therefore for good and valuable consideration the parties agree
                as follows:{' '}
              </div>

              <ol className="list mt-4 ">
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline">
                    Program Term:
                  </span>{' '}
                  This Agreement will become effective on the date this agreement is signed by a
                  representative of COMPANY,
                  <input type="text  " className="input" />
                  However, TDS reserves the right to approve any proposed changes to the terms of
                  this Agreement before providing any services to COMPANY. This Agreement will
                  remain in effect for a period ending on <input
                    type="text  "
                    className="input"
                  />{' '}
                  of the next year of this Agreement. The Agreement will be automatically renewed
                  for the same time unless the client submits a written 30-day notice.{' '}
                </li>
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline">
                    Program Services:
                  </span>{' '}
                  include the following and/or other services as required.{' '}
                  <ul className="list-disc">
                    <li>Computer Generated Random Selections</li>
                    <li>
                      Management of random testing pool including addition or deletion of employees
                    </li>
                    <li>Statistical Data Reporting to COMPANY including MIS Report </li>
                    <li>Administrative Support for compliance audits</li>
                    <li>Substance Abuse Professional Referrals</li>
                    <li>Collection Site Selection (Nationwide)</li>
                    <li>Electronic Chain of Custody Forms</li>
                    <li>Test Results Reporting via TDS Portal / Nationwide Medical Review</li>
                    <li>MRO Services provided by Nationwide Medical Review</li>
                    <li>DHHS Certified Laboratory (Quest Diagnostics / CRL)</li>
                    <li>Certification & Verification</li>
                    <li>Drug & Alcohol Testing Policy</li> <li>Employee Record Administration</li>{' '}
                    <li>Five Year Storage & Documentation of Positive Specimens</li>
                    <li>
                      Reporting of Positive Alcohol and/or Drug Tests in the FMCSA Clearinghouse (if
                      applicable)
                    </li>
                  </ul>
                </li>
                {/* --------Sec Page-------- */}
                <li>
                  <span style={{ fontWeight: 'bolder' }} className="underline">
                    Program Administration:
                  </span>{' '}
                  TDS objective is to provide consistent, objective, fair and manageable procedures
                  for drug (and/or) alcohol testing of COMPANY employees. TDS drug and alcohol
                  testing program will be administered as follows:
                  <ol className="upper ">
                    <li>
                      COMPANY will provide TDS with a complete list, in MS Excel format, of all its
                      locations and employees who will participate in the program.{' '}
                    </li>
                    <li>
                      COMPANY agrees to abide by TDS policies and rules and to make TDS information
                      available to all employees.{' '}
                    </li>
                    <li>
                      TDS will maintain information regarding the status of employees on its secure
                      database and make such information available to clients in good standing.{' '}
                    </li>
                    <li>
                      TDS will establish selection protocols and conduct employee drug (and/or)
                      alcohol testing to include the following:
                      <ol className="decimal  grid grid-cols-2  ">
                        <li>Pre-Employment </li>
                        <li>Reasonable Suspicion </li>
                        <li>Random </li>
                        <li>Post-Accident </li>
                        <li>Return to Duty Observed (Positive results) </li>
                        <li>Follow up Observed (Positive results)</li>
                      </ol>
                    </li>
                    <li>
                      TDS will provide COMPANY with a list of approved specimen collection centers
                      for collection of biological specimens TDS will review collection center
                      procedures and replace specimen collection centers if deemed necessary and
                      advise our clients immediately of any such replacements.{' '}
                    </li>
                    <li>
                      TDS will utilize laboratories certified by the Department of Health and Human
                      Services for the testing of biological specimens when required by Mandated
                      Federal Testing Programs. Laboratories certified by either the Department of
                      Health and Human Services, or the College American Pathologists will perform
                      testing not mandated by Federal Department of Transportation Regulations.
                    </li>
                    <li>
                      TDS will provide review and reporting of positive and questionable negative
                      drug test results performed by an authorized Medical Review Officer (MRO)
                      contracted or employed by TDS.
                    </li>
                    <li className="font-bold">
                      TDS and Nationwide Medical Review Officer will report any positive verified
                      drug and/or alcohol tests to the FMCSA Clearinghouse as part 49 Code of
                      Federal Regulations, Parts 40 and 382.{' '}
                    </li>
                    <li>TDS will maintain employee drug (and/or) alcohol records. </li>
                    <li>
                      TDS will provide federal and company reporting and certification (when
                      required) of COMPANY.
                    </li>
                    <li>
                      COMPANY agrees to pay TDS for their services as set forth in section II above,
                      at the rate set forth on the Implementation Worksheet attached hereto as
                      Exhibit A and incorporated into this Agreement.
                    </li>
                  </ol>
                </li>
                {/* ----------third page------------- */}
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline">
                    {' '}
                    Coordination of Activities:{' '}
                  </span>
                  TDS will coordinate the activities, described in Paragraphs II and III, through
                  designated persons known as Designated Employer Representative "DER" within the
                  herein named COMPANY. COMPANY must designate in writing to TDS a "DER" and a
                  “Back-up DER” and notify TDS of any subsequent designations or changes.
                </li>
                <li style={{ fontWeight: 'bolder' }} className="underline py-4">
                  Indemnification: TDS is an independent contractor providing its clients with the
                  administration of mandated and non-mandated substance abuse programs described
                  herein. TDS’ and COMPANY mutually agreed to indemnify, defend, and hold harmless
                  its officers, members, directors, shareholders, employees, agents, and
                  representatives, from and against any and all claims, demands, actions, causes of
                  actions, damages, costs and expenses (including attorneys' fees and court costs)
                  directly or indirectly arising out of the performance or non-performance of TDS’
                  obligations under this service Agreement. TDS does not have any control over nor
                  assume any liability for the enforcement of policies or the actions of COMPANY
                  personnel. As an independent contractor, TDS shall not be deemed to be engaged
                  either directly or indirectly in the business of nor deemed to be an agent of said
                  COMPANY, the Department of Transportation, the Health and Human Services
                  regulations or corporate contract testing mandates. Notwithstanding the foregoing,
                  in no event shall either party be liable to the other party for any indirect,
                  incidental, punitive, exemplary, or consequential damages asserted by any party.
                </li>
                <li>
                  <span style={{ fontWeight: 'bolder' }} className="underline py-4">
                    Confidentiality.
                  </span>{' '}
                  TDS acknowledges that during the engagement TDS will have access to and become
                  acquainted with confidential or proprietary information owned, licensed or used by
                  the Customer, whether furnished before or after the Effective Date, including,
                  without limitation, business plans, marketing plans, Protected Data (as defined
                  below), trade secrets, technical data, financial data, test or evaluation results,
                  system concepts, drawings, models, product designs, product specifications,
                  product performance data, information pertaining to Customer’s shareholders or
                  representatives and other commercial information whether or not patented or
                  copyrighted (“Confidential Information”). TDS agrees that it will not disclose
                  Confidential Information to any third party or use the Confidential Information in
                  any manner, either during or after the term of this Agreement, except as permitted
                  pursuant to this Agreement. All files, records, documents, blueprints,
                  specifications, information, letters, notes, media lists, original
                  artwork/creative notebooks, and similar items relating to the business of the
                  Customer, whether prepared by the TDS or otherwise coming into TDS’ possession,
                  remain the exclusive property of Customer. Upon termination of this Agreement, or
                  at the request of Customer at any time, the TDS will immediately deliver to the
                  Customer all such files, records, documents, specifications, information, and
                  other items in TDS’ possession or under TDS’ control. TDS may not publish or
                  permit the publication of, in any manner or media, the existence or terms of this
                  Agreement, any actual or potential business relationship between Customer and TDS,
                  or the logos or any other intellectual property of Customer, its affiliates or its
                  customers.{' '}
                </li>
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline ">
                    Protected Data.
                  </span>{' '}
                  Protected Data means any data or information accessible by TDS as a result of its
                  business relationship with Customer that can be used to identify or locate a
                  natural person, including but not limited to: name, address, telephone number,
                  e-mail address, social security number or driver’s license number. Protected Data
                  also includes any other data, such as, but not limited to, identifiers,
                  demographic or behavioral data, when such data is linked or has the capacity to be
                  linked to a specific person. Protected Data also includes “non-public personal
                  information” as that term is defined under Title V of the Federal
                  Gramm-Leach-Bliley Act and any state statutes adopted to comply therewith, the
                  regulations promulgated pursuant thereto, including 16 CFR Parts 313 and 314 and
                  12 CFR Parts 332 and 364, any state regulations promulgated under such state
                  statutes or in compliance with the Federal Gramm- Leach-Bliley Act. Protected Data
                  shall also include “health information” and “personally identifiable health
                  information” as defined by HIPAA, 42 U.S.C. §1320d (4) and 1320d (6).{' '}
                </li>
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline ">
                    General Obligations to Safeguard Confidential Information.{' '}
                  </span>
                  TDS shall implement and maintain appropriate measures designed to meet the
                  following objectives:
                </li>
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline ">
                    Notification of Loss or Unauthorized Access.
                  </span>{' '}
                  TDS agrees to immediately notify Customer in the event that TDS reasonably
                  suspects that Confidential Information has been, or may have been, lost or subject
                  to unauthorized internal or external access. To the extent Customer seeks the
                  assistance of TDS, TDS agrees to reasonably cooperate with Customer at TDS’
                  expense to: (i) determine the scope and severity of any such loss or unauthorized
                  access; and (ii) give notice to individuals whose Confidential Information is the
                  subject of such unauthorized access, to the extent required by law or Customer
                  policy. Unless TDS is required by law to provide notice, TDS shall not give notice
                  to individuals except with the prior approval of the Customer.{' '}
                </li>
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline ">
                    {' '}
                    Compliance with Laws.
                  </span>{' '}
                  TDS certifies that (a) TDS holds and will maintain the applicable licenses to
                  perform the specified testing services, (b) TDS will comply with all local, state
                  and federal laws, (c) TDS and its employees are not persons or entities identified
                  at www.ustreas.gov/offices/enforcement/ofac, (d) TDS’ employees who perform the
                  testing services under this Agreement are authorized to be employed in the United
                  States and have undergone a national background check and have not been convicted
                  of any crimes of moral turpitude, and (e) TDS will comply with the
                  Gramm-Leach-Bliley Act of 1999 to the extent that TDS receives or has access to
                  nonpublic personal information, as defined therein and the Health Insurance
                  Portability and Accountability Act to the extent that TDS receives or has access
                  to health information and personally identifiable health information, as defined
                  therein. TDS further certifies that all of its employees who perform testing
                  services under this Agreement are in a random drug screen program and any TDS
                  employee who has tested positive for illegal substances shall not be assigned to
                  work on testing services for Customer. TDS utilizes outside agencies for some of
                  the services performed under the Agreement. TDS is only certifying that it and its
                  employees are subject to the terms stated in Paragraph X Compliance with Laws.
                </li>
                {/* ------------five page------------- */}
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline">
                    Notice.{' '}
                  </span>{' '}
                  Any notices under this Agreement will be given in writing by overnight courier or
                  Certified U.S. mail to Customer at 4670 N El Capitan Ave Ste 105 Fresno, CA 93722
                  or such other address as may be designated in writing by Customer from time to
                  time, and to TDS at the address listed on the seventh page attached hereto.
                  Notices are effective when received.
                </li>
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline ">
                    Assignment.
                  </span>{' '}
                  TDS may not assign this Agreement without the prior written consent of the
                  Customer.{' '}
                </li>
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline ">
                    Survival.
                  </span>{' '}
                  Sections V, VI, VII, VIII, IX, X and XI will survive termination or expiration of
                  this Agreement.{' '}
                </li>
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline ">
                    Force Majeure:
                  </span>{' '}
                  TDS will not be responsible for, nor liable to, the herein named business, for
                  failure or delay in performance which results from, or is due to, directly or
                  indirectly, in whole or in part, any cause or circumstance beyond the reasonable
                  control of TDS.
                </li>
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline ">
                    Payment Terms:
                  </span>{' '}
                  Payment terms are net Thirty (30) days after the date of any invoice by TDS. All
                  overdue payments shall be subject to an additional interest and service charge
                  calculated at the rate of one- and one-half percent (1.5%) per month from the due
                  date until the date of payment. TDS may suspend or terminate this Agreement if
                  COMPANY.{' '}
                  <ol className="upper  ">
                    <li>Does not pay any invoice within 30 days after the date of the invoice.</li>
                    <li>
                      Fails to remain DOT compliance with its random program, as per 49 CFR Part 40.
                    </li>
                  </ol>{' '}
                </li>
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline">
                    Termination:
                  </span>{' '}
                  Should either party, for any reason, breach the terms of this Agreement, the
                  non-breaching party shall have the right to suspend or terminate this Agreement,
                  upon THIRTY (30) days written notice to the breaching party, if the breaching
                  party does not correct the violation, by the expiration of the thirty (30) day
                  notice period, to the satisfaction of the non-breaching party. In the event of
                  such termination under this Section, the non-breaching party shall notify the
                  appropriate contracting or regulating agencies of the suspension or termination of
                  this Agreement.
                  <div className=" py-6">
                    If this Agreement is suspended or terminated for any reason, the herein named
                    business entity, COMPANY, shall assume full responsibility for administration of
                    its corporate and/or federally mandated drug and alcohol testing programs
                    including but not limited to:
                  </div>
                  {/* ----------six------- */}
                  <ol className="decimal">
                    <li>Reporting,</li>
                    <li>Records maintenance and </li>
                    <li>Ensuring confidentiality, and security of any confidential information </li>
                  </ol>
                </li>
                <li className="py-4">
                  <span style={{ fontWeight: 'bolder' }} className="underline ">
                    Applicable Law:
                  </span>{' '}
                  This Agreement will be construed under the laws of the State of California.
                </li>
              </ol>
              {/* ----------sever page-------------- */}
              <div className=" text-justify  pt-10" style={{ fontSize: '18px' }}>
                <div className="flex justify-center ">
                  {' '}
                  <img src={logo} style={{ width: '25%' }} />
                </div>
                <div className="text-center">4670 N El Capitan Ave Ste 105 Fresno, CA 93722</div>
                <div className="text-center  font-bold">(559) 900-1500</div>
                <Divider style={{ backgroundColor: 'red', fontWeight: 'bolder', height: '2px' }} />
                <div className="py-2">
                  Please sign and return this Contract Agreement to indicate your acceptance of the
                  Terms and Conditions.
                </div>
                <div>
                  <div className=" flex flex-rows-2 justify-between">
                    <div className="flex flex-col">
                      <label>Accepted By:</label> <Input style={{ width: '350px' }} />
                    </div>

                    <div className="underline">The Drug Testing Services, Inc.</div>
                  </div>
                  <div className=" flex flex-rows-2 justify-between mt-6">
                    <div className="flex flex-col">
                      <Input style={{ width: '350px' }} />
                      <label>PRINTED NAME</label>
                    </div>

                    <div className="flex flex-col">
                      <Input style={{ width: '350px' }} />
                      <label>PRINTED NAME</label>
                    </div>
                  </div>
                  <div className="flex  justify-between">
                    <div style={{ width: '350px' }}>
                      <Divider
                        style={{
                          backgroundColor: 'black',
                          // fontWeight: 'bolder',
                          height: '2px',
                          width: '2px',
                        }}
                      />
                    </div>
                    <div style={{ width: '350px' }}>
                      {' '}
                      <Divider
                        style={{
                          backgroundColor: 'black',
                          // fontWeight: 'bolder',
                          height: '2px',
                          width: '2px',
                        }}
                      />
                    </div>
                  </div>
                  <div className=" flex flex-rows-2 justify-between mt-6">
                    <div className="flex flex-col">
                      <Input style={{ width: '350px' }} />
                      <label>SIGNATURE</label>
                    </div>

                    <div className="flex flex-col">
                      <Input style={{ width: '350px' }} />
                      <label>SIGNATURE</label>
                    </div>
                  </div>
                  <div className=" flex flex-rows-2 justify-between mt-6">
                    <div className="flex flex-col">
                      <label>TITLE</label> <Input style={{ width: '350px' }} />
                    </div>

                    <div className="flex flex-col">
                      <label>TITLE</label> <Input style={{ width: '350px' }} />
                    </div>
                  </div>

                  <div className=" flex flex-rows-2 justify-between mt-6">
                    <div className="flex flex-col">
                      <label>DATE</label>
                      <Input style={{ width: '350px' }} />
                      {/* <DatePicker/> */}
                    </div>

                    <div className="flex flex-col">
                      <label>DATE</label> <Input style={{ width: '350px' }} />
                    </div>
                  </div>
                  <div className=" flex flex-rows-2 justify-between mt-6">
                    <div>USDOT NUMBER</div>
                    <div>TDS ACCOUNT NO.</div>
                  </div>
                  <ol className=" mt-10 mb-20 font-semibold">
                    <div className="flex gap-4">
                      <Input
                        type="checkbox"
                        style={{
                          width: '15px',
                          height: '15px',
                          border: '2px solid black',
                          marginTop: '10px',
                        }}
                      />
                      <li>
                        {' '}
                        Employers are responsible for conducting pre-employment urine drug screening
                        on its employees within{' '}
                        <span className="underline font-semibold ">30 days</span> of this agreement.
                      </li>
                    </div>

                    <div className="flex gap-4">
                      <Input
                        type="checkbox"
                        style={{
                          width: '15px',
                          height: '15px',
                          border: '2px solid black',
                          marginTop: '10px',
                        }}
                      />
                      <li>
                        TDS Service Agreement is{' '}
                        <span className="underline font-semibold">NOT VALID</span> without the
                        signatures from both parties.
                      </li>
                    </div>

                    <div className="flex gap-4">
                      <Input
                        type="checkbox"
                        style={{
                          width: '15px',
                          height: '15px',
                          border: '2px solid black',
                          marginTop: '10px',
                        }}
                      />
                      <li>Notice address: 4670 N El Capitan Ave Ste 105 Fresno, CA 93722</li>
                    </div>
                  </ol>
                </div>
              </div>
              {/* ----------eight page----------- */}
              <div className=" text-justify pt-10">
                <div className="text-center font-semibold">EXHIBIT A</div>
                <div className="text-center font-semibold">IMPLEMENTATION WORKSHEET</div>
                <ol className="list">
                  <li>
                    Program Startup:
                    <ol className="upper">
                      <li>
                        The Drug and Random program will commence on{' '}
                        <input type="text  " className="input" />
                      </li>
                    </ol>
                  </li>
                  <li>
                    Services/Tests Requested:
                    <ol className="upper">
                      <li>
                        A. <input type="text  " className="input" />
                        requests that The Driver Services, Inc. develop and administer the drug and
                        random testing program of
                        <input type="text  " className="input" />
                      </li>
                      <li>
                        Each employee of Omni Transport LLC will be enrolled in the program after
                        TDS receives a negative pre-employment screen and will be subject to drug
                        screen specimen collections tests during the program years.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Reasons for testing: will conduct drug testing of prospective employees and
                    existing employees under the following categories.
                  </li>
                  <div
                    className="App"
                    style={{
                      width: '100%',
                      height: '100%',
                      // border: '1px solid',
                      marginTop: '40px',
                      marginBottom: '30px',
                      display: 'flex',
                    }}
                  >
                    <table className=" th ">
                      <tbody className="">
                        <tr className="">
                          <td className="td">Pre-Employment </td>

                          <td className="td">Random </td>
                          <td className="td">Reasonable Cause </td>
                        </tr>
                        <tr className="">
                          <td className="td">Post-Accident</td>

                          <td className="td">Return to Duty (POS results)</td>
                          <td className="td">Follow-Up (POS results)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <li>
                    <span style={{ fontWeight: 'bolder' }} className="underline ">
                      Pricing:
                    </span>{' '}
                    The following charges are recognized and agreed upon.{' '}
                    <div
                      className="App "
                      style={{
                        width: '100%',
                        height: '100%',
                        border: '1px solid',
                        marginTop: '60px',
                        marginBottom: '30px',
                        justifyContent: 'center',
                      }}
                    >
                      <table className="th  ">
                        <tbody className="">
                          <tr className="">
                            <td className="td">A. Annual Registration Fee/Membership Fees </td>

                            <td className="td">$99.00 </td>
                          </tr>
                          <tr>
                            <td className="td">
                              B. DOT and Non-DOT Urine drug screen specimen collected at Quest
                              Diagnostics Preferred Network location
                            </td>
                            <td className="td">$60.00 </td>
                          </tr>
                          <tr>
                            <td className="td">
                              E. Hair testing with Expanded Opiates – specimen collection procedure
                              completed at a Quest Diagnostics Preferred Network location{' '}
                            </td>
                            <td className="td">$90.00</td>
                          </tr>
                          <tr>
                            <td className="td">
                              F. Administrative Fee for Positive DOT tests ONLY – reported to local
                              state agencies as required{' '}
                            </td>
                            <td className="td">$20.00</td>
                          </tr>
                          <tr>
                            <td className="td">
                              G. STAT/Emergency Collection: Post Accidents, Reasonable Suspicion –
                              in addition to above fees
                            </td>
                            <td className="td">$125.00</td>
                          </tr>
                          <tr>
                            <td className="td">H. Mileage from port to port</td>
                            <td className="td">$0.60/mile</td>
                          </tr>
                          <tr>
                            <td className="td">I. Drug & Alcohol Testing Policy </td>
                            <td className="td">$50.00</td>
                          </tr>
                          <tr>
                            <td className="td">
                              K. Reinstatement Fee: Fee to place company back into program after
                              being removed due to non-Compliance
                            </td>
                            <td className="td">$100.00</td>
                          </tr>
                          <tr>
                            <td className="td">
                              M. 3rd Party Collection site-surcharge (not part of Quest Diagnostics
                              Preferred Network) per collection
                            </td>
                            <td className="td"> $25.00 </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>{' '}
                  </li>
                  <li>
                    The Driver Services, Inc. or the appropriate medical clinic will perform the
                    drug screen specimen collection and/or breath alcohol test at its office or the
                    offices of the medical clinic, as appropriate.
                  </li>
                  <li>
                    Schedule of testing: Testing of employees will be accomplished on a quarterly
                    basis.
                  </li>
                </ol>
                <div className="mx-10 mt-20" style={{ width: '400px' }}>
                  <Divider
                    style={{
                      backgroundColor: 'black',
                      fontWeight: 'bolder',
                      height: '3px',
                    }}
                  />
                  <div className="">*Initial and date acceptance of pricing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {isopenModal?.certificateEnrollment?.name === 'Certificate Enrollment' && (
        <CertificateEnrollMent />
      )}
    </div>
  );
};

export default RandomService;
