import React from "react";
import { Modal } from "react-bootstrap";
import { viewURL } from "../common/stringFormatter";
const ViewDocuments = (props) => {
  const { data } = props;
  console.log({ data });
  const rowClass =
    "d-flex justify-content-start flex-column col-md-6 col-12 p-2 col-xl-4";
  try {
    return (
      <>
        <Modal
          size="lg"
          backdrop="static"
          aaria-labelledby="contained-modal-title-vcenter"
          centered
          show={props.show}
          onHide={props.onHide}
        >
          <Modal.Header closeButton>
            <h4>
              Name: {data?.name} Phone:{data?.phone}
            </h4>
          </Modal.Header>
          <Modal.Body>
            <div className=" row">
              <div className={rowClass}>
                <span className=" fw-semibold">Bank</span>
                <span>{data?.bank_name}</span>
              </div>
              <div className={rowClass}>
                <span className=" fw-semibold">Bank Account No</span>
                <span>{data?.bank_account_no}</span>
              </div>
              <div className={rowClass}>
                <span className=" fw-semibold">IFSC Code</span>
                <span>{data?.ifsc}</span>
              </div>
            </div>
            <div className=" row">
              <div className={rowClass}>
                <span className=" fw-semibold">UAN</span>
                <span>{data?.uan}</span>
              </div>
              <div className={rowClass}>
                <span className=" fw-semibold">ESIC</span>
                <span>{data?.esic}</span>
              </div>
              <div className={rowClass}>
                <span className=" fw-semibold">Driving License No</span>
                <span>
                  {data?.driving_license_no ? data?.driving_license_no : "-"}
                </span>
              </div>
            </div>
            <div className=" row">
              <div className={rowClass}>
                <span className=" fw-semibold">Role</span>
                <span>{data?.role}</span>
              </div>
              <div className={rowClass}>
                <span className=" fw-semibold">Highest Qualification</span>
                <span>{data?.highest_qualification}</span>
              </div>
              <div className={rowClass}>
                <span className=" fw-semibold">Specializations</span>
                <span>
                  {data?.specializations ? data?.specializations : "-"}
                </span>
              </div>
            </div>
            <div className=" row">
              <div className={rowClass}>
                <span className=" fw-semibold">Blood Group</span>
                <span>{data?.blood_group}</span>
              </div>
              <div className={rowClass}>
                <span className=" fw-semibold">Identification Mark</span>
                <span>{data?.identification_mark}</span>
              </div>
              <div className={rowClass}>
                <span className=" fw-semibold">Nominee Name</span>
                <span>{data?.nominee_name}</span>
              </div>
            </div>
            <div className="row">
              <div className={rowClass}>
                <span className=" fw-semibold">AADHAAR front</span>
                <span>
                  {data?.aadhar_front_image && (
                    <a
                      href={viewURL(data?.aadhar_front_image)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      {" "}
                      <i className="bi bi-eye-fill"></i> View
                    </a>
                  )}{" "}
                  |
                  {data?.aadhar_front_image ? (
                    <a
                      href={data?.aadhar_front_image}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      {" "}
                      <i className=" bi bi-cloud-arrow-down-fill"></i> Download
                    </a>
                  ) : (
                    "No document"
                  )}
                </span>
              </div>
              <div className={rowClass}>
                <span className=" fw-semibold">AADHAAR back</span>
                <span>
                  {data?.aadhar_back_image && (
                    <a
                      href={viewURL(data?.aadhar_back_image)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      {" "}
                      <i className="bi bi-eye-fill"></i> View
                    </a>
                  )}{" "}
                  |
                  {data?.aadhar_back_image ? (
                    <a
                      href={data?.aadhar_back_image}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      {" "}
                      <i className=" bi bi-cloud-arrow-down-fill"></i> Download
                    </a>
                  ) : (
                    " No document"
                  )}
                </span>
              </div>
              <div className={rowClass}>
                <span className=" fw-semibold">PAN file</span>
                <span>
                  {data?.pan_image && (
                    <a
                      href={viewURL(data?.pan_image)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      {" "}
                      <i className="bi bi-eye-fill"></i> View
                    </a>
                  )}{" "}
                  |{" "}
                  {data?.pan_image ? (
                    <a
                      href={data?.pan_image}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      <i className=" bi bi-cloud-arrow-down-fill"></i> Download
                    </a>
                  ) : (
                    " No document"
                  )}
                </span>
              </div>
            </div>
            <div className="row">
            
              <div className={rowClass}>
                <span className=" fw-semibold">Medical Certificate</span>
                <span>
                  {data?.medical && (
                    <a
                      href={viewURL(data?.medical)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      {" "}
                      <i className="bi bi-eye-fill"></i> View
                    </a>
                  )}{" "}
                  |
                  {data?.medical ? (
                    <a
                      href={data?.medical}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      {" "}
                      <i className=" bi bi-cloud-arrow-down-fill"></i> Download
                    </a>
                  ) : (
                    " No document"
                  )}
                </span>
              </div>
              <div className={rowClass}>
                <span className=" fw-semibold">Eye Test Medical</span>
                <span>
                  {data?.eye_test_medical && (
                    <a
                      href={viewURL(data?.eye_test_medical)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      {" "}
                      <i className="bi bi-eye-fill"></i> View
                    </a>
                  )}{" "}
                  |{" "}
                  {data?.eye_test_medical ? (
                    <a
                      href={data?.eye_test_medical}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      <i className=" bi bi-cloud-arrow-down-fill"></i> Download
                    </a>
                  ) : (
                    " No document"
                  )}
                </span>
              </div> 
               <div className={rowClass}>
                <span className=" fw-semibold">Employee Image</span>
                <span>
                  {data?.upload_image && (
                    <a
                      href={viewURL(data?.upload_image)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      {" "}
                      <i className="bi bi-eye-fill"></i> View
                    </a>
                  )}{" "}
                  |{" "}
                  {data?.upload_image ? (
                    <a
                      href={data?.upload_image}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      <i className=" bi bi-cloud-arrow-down-fill"></i> Download
                    </a>
                  ) : (
                    " No document"
                  )}
                </span>
              </div>
            </div>  
            <div className="row">
              <div className={rowClass}>
                <span className="fw-semibold">Certificates</span>
                <span>
                  {data?.certificate && data?.certificate.length > 0
                    ? data.certificate.map((cert, index) => (
                        <span key={index} className="d-block">
                          <a
                            href={viewURL(cert)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none me-2"
                          >
                            <i className="bi bi-eye-fill"></i> View
                          </a>
                          |
                          <a
                            href={cert}
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none ms-2"
                          >
                            <i className="bi bi-cloud-arrow-down-fill"></i>{" "}
                            Download
                          </a>
                        </span>
                      ))
                    : "No documents"}
                </span>
              </div>
            
            </div>
          </Modal.Body>
          <Modal.Footer> </Modal.Footer>
        </Modal>
      </>
    );
  } catch (error) {
    console.log(error);
  }
};

export default ViewDocuments;
