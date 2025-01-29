import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import userService from "../../service/user.service";
import roleService from "../../service/role.service";
import Select from "react-select";
import axios from "axios";
import workOrderService from "./../../service/workOrder.service";
import siteService from "./../../service/site.service";

const UserModal = (props) => {
  const {
    data,
    id,
    show,
    onHide,
    setModal,
    setData,
    setFilterData,
    setLoading,
    dropdownLabel,
  } = props;

  const option = [
    { label: "Below 10th", value: "below 10th" },
    { label: "Secondary", value: "secondary" },
    { label: "Higher Secondary", value: "higher secondary" },
    { label: "Diploma", value: "diploma" },
    { label: "Bachelor's Degree", value: "bachelor's degree" },
    { label: "Master's Degree", value: "master's degree" },
    { label: "Doctoral Degree (Ph.D.)", value: "doctorate" },
    {
      label: "Professional Qualification",
      value: "professional qualification",
    },
  ];

  const [loadingButton, setLoadingButton] = useState(false);
  const [userFormData, setUserFormData] = useState(data);
  const [roleData, setRoleData] = useState([]);
  const [workOrderData, setWorkOrderData] = useState([]);
  const [siteData, setSiteData] = useState([]);
  const [error, setError] = useState([]);
  // console.log({ data, id });

  useEffect(() => {
    try {
      roleService.GetRoles().then((res) => {
        // setLoading(false);
        if (res?.status === 200) {
          const roles = res?.data?.docs.map((val, index) => ({
            label: val?.role_name,
            value: val,
          }));
          setRoleData(roles);
        } else {
          console.warn(res?.message);
        }
      });
      siteService.GetSites().then((res) => {
        if (res?.status === 200) {
          const sites = res?.data?.docs.map((val, index) => ({
            label: `${val?.site_name}-${val?.site_shorthand}`,
            value: val,
          }));
          setSiteData(sites);
          let site_id = "";

          if (dropdownLabel !== "Edit User") {
            console.log("Create User Line no 69 Printed");
            site_id = sites[0]?.value?._id;
           
          } else {
            console.log("Edit User Line no 72 Printed", dropdownLabel);
             site_id = userFormData?.site_id;
          }
          const form_data = new FormData();
          form_data.append("site_id", site_id);
          workOrderService.GetWorkOrders(form_data).then((res) => {
            if (res?.status === 200) {
              const roles = res?.data?.map((val, index) => ({
                label: val?.wo_name,
                value: val,
              }));
              setWorkOrderData(roles);
            } else {
              console.warn(res?.message);
            }
          });
        } else {
          console.warn(res?.message);
        }
      });
    } catch (error) {
      console.log(error?.msg);
    }
  }, []);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => {
      return {
        ...prev,
        [name]: value.toString().trim(),
      };
    });
  };

  const handleChange = (e) => {
    let { name, value, files } = e.target;
    if (
      [
        "aadhar_front_image",
        "aadhar_back_image",
        "pan_image",
        "upload_image",
        "medical",
        "driving_license_image",
        "eye_test_medical",
      ].includes(name)
    ) {
      setUserFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === "is_subscribed" && value === false) {
      setUserFormData((prev) => ({
        ...prev,
        [name]: value,
        subscription_date: "",
        subscription_tenure: "",
      }));
    } else {
      setUserFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Conditionally exclude 'password' from the required fields if editing a user
    const requiredFields = [
      "name",
      "email",
      "phone",
      "aadhar_no",
      "aadhar_front_image",
      "aadhar_back_image",
      "pan_image",
      "highest_qualification",
      "upload_image",
      "nominee_name",
      "nominee_aadhar_no",
      "ifsc",
      "bank_account_no",
      "bank_name",
      "identification_mark",
      "blood_group",
      "medical",
      "role",
      "wo_id",
      "site_id",
    ];

    // If editing a user, don't require the password field
    if (dropdownLabel !== "Edit User") {
      requiredFields.push("password");
    }

    // Validate required fields
    for (let field of requiredFields) {
      if (!userFormData[field]) {
        alert(`${field} is required`);
        setLoadingButton(false);
        return;
      }
    }

    const form_data = new FormData();

    form_data.append("name", userFormData?.name);
    form_data.append("phone", userFormData?.phone);
    form_data.append("aadhar_no", userFormData?.aadhar_no);
    form_data.append("pan_no", userFormData?.pan_no);
    form_data.append("address", userFormData?.address);
    form_data.append("email", userFormData?.email);
    form_data.append(
      "highest_qualification",
      userFormData?.highest_qualification
    );
    form_data.append("specializations", userFormData?.specializations);
    form_data.append("wo_id", userFormData?.wo_id);
    form_data.append("site_id", userFormData?.site_id);
    form_data.append("nominee_name", userFormData?.nominee_name);
    form_data.append("nominee_aadhar_no", userFormData?.nominee_aadhar_no);
    form_data.append("ifsc", userFormData?.ifsc);
    form_data.append("bank_account_no", userFormData?.bank_account_no);
    form_data.append("bank_name", userFormData?.bank_name);
    form_data.append("identification_mark", userFormData?.identification_mark);
    form_data.append("blood_group", userFormData?.blood_group);
    form_data.append("uan", userFormData?.uan);
    form_data.append("esic", userFormData?.esic);
    form_data.append("role", userFormData?.role);
    form_data.append("driving_license_no", userFormData?.driving_license_no);

    // Append files if available
    if (userFormData?.aadhar_front_image) {
      form_data.append("aadhar_front_image", userFormData?.aadhar_front_image);
    }
    if (userFormData?.aadhar_back_image) {
      form_data.append("aadhar_back_image", userFormData?.aadhar_back_image);
    }
    if (userFormData?.pan_image) {
      form_data.append("pan_image", userFormData?.pan_image);
    }
    if (userFormData?.upload_image) {
      form_data.append("upload_image", userFormData?.upload_image);
    }

    if (userFormData?.medical) {
      form_data.append("medical", userFormData?.medical);
    }
    if (userFormData?.eye_test_medical) {
      form_data.append("eye_test_medical", userFormData?.eye_test_medical);
    }
    if (userFormData?.driving_license_image) {
      form_data.append(
        "driving_license_image",
        userFormData?.driving_license_image
      );
    }
    if (userFormData?.certificate && userFormData?.certificate.length > 0) {
      Array.from(userFormData?.certificate).forEach((file) => {
        form_data.append("certificate", file);
      });
    }

    // Handle Edit User case
    if (dropdownLabel === "Edit User") {
      form_data.append("id", id);
      userService.UpdateUser(id, form_data).then((res) => {
        setLoadingButton(false);
        if (res?.status === 200) {
          setModal(false);
          setLoading(true);
          userService.GetUsers().then((res) => {
            setLoading(false);
            if (res?.status === 200) {
              const users = res?.data?.docs.map((val, index) => ({
                no: index + 1,
                ...val,
              }));
              setData(users);
              setFilterData(users);
            } else {
              console.warn(res?.message);
            }
          });
        } else {
          console.warn(res?.message);
        }
      });
    } else {
      // Handle Create User case (password required)
      form_data.append("password", userFormData?.password);
      userService.CreateUser(form_data).then((res) => {
        setLoadingButton(false);
        if (res?.status === 201) {
          setModal(false);
          setLoading(true);
          userService.GetUsers().then((res) => {
            setLoading(false);
            if (res?.status === 200) {
              const users = res?.data?.docs.map((val, index) => ({
                no: index + 1,
                ...val,
              }));
              setData(users);
              setFilterData(users);
            } else {
              console.warn(res?.message);
            }
          });
        } else {
          console.warn(res?.message);
        }
      });
    }
  };

  const handleUploadCertificate = (e) => {
    const files = Array.from(e.target.files);
    setUserFormData((prev) => ({
      ...prev,
      certificate: files,
    }));
  };

  const handleIFSCChange = (e) => {
    setUserFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (userFormData?.ifsc?.length === 11) {
      const fetchBankDetails = async () => {
        try {
          if (userFormData?.ifsc) {
            setError(""); // Clear previous errors
            const res = await axios.get(
              `https://ifsc.razorpay.com/${userFormData?.ifsc}`
            );
            if (res?.status === 200) {
              const bank_name_and_branch = `${res?.data?.BANK}-${res?.data?.BRANCH}-${res?.data?.CENTRE}`;
              setUserFormData((prev) => ({
                ...prev,
                bank_name: bank_name_and_branch,
              })); // Set the bank details
            }
          }
        } catch (err) {
          setError("Invalid IFSC Code or API Error");
        }
      };

      fetchBankDetails(); // Call the function
    } else {
      setUserFormData((prev) => ({
        ...prev,
        bank_name: "",
      }));
    }
  }, [userFormData?.ifsc]);

  const validateDrivingLicenseNumber = (licenseNo) => {
    const licensePattern = /^[A-Z]{2}\d{13}$/; // Format: AA + 13 digits
    if (!licenseNo) {
      setError("Driving License No is required.");
    } else if (!licensePattern.test(licenseNo)) {
      setError("Invalid format. Example: AB1234567890123");
    } else {
      setError(""); // Clear the error if valid
    }
  };

  const handleSelectSite = (selectedOption) => {
    setUserFormData((prev) => ({
      ...prev,
      site_id: selectedOption.value?._id,
    }));
    if (selectedOption.value?._id !== "") {
      const form_data = new FormData();
      form_data.append("site_id", selectedOption.value?._id);
      workOrderService.GetWorkOrders(form_data).then((res) => {
        if (res?.status === 200) {
          const roles = res?.data?.map((val, index) => ({
            label: val?.wo_name,
            value: val,
          }));
          setWorkOrderData(roles);
        } else {
          console.warn(res?.message);
        }
      });
    }
  };
  try {
    return (
      <>
        <Modal
          size="xl"
          backdrop="static"
          aaria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={onHide}
        >
          <Modal.Header closeButton>
            <h2 className=" text-start">{dropdownLabel}</h2>
          </Modal.Header>
          <form className="ms-1" onSubmit={handleSubmit}>
            <div class="modal-body">
              <div>
                <h5>Personal Details</h5>
                <hr></hr>
              </div>
              <div className="row mt-1">
                <div className="col-12 col-md-6">
                  <label htmlFor="name" className=" form-label mb-0">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={userFormData?.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" form-control"
                    placeholder="Enter name"
                    required
                    autoCapitalize="characters"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="phone" className=" form-label mb-0">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={userFormData?.phone}
                    onChange={(e) => {
                      const cleanedValue = e.target.value
                        .slice(0, 10)
                        .replaceAll(/\D+/g, "");
                      e.target.value = cleanedValue;
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    className=" form-control"
                    placeholder="Enter Phone"
                    pattern="[0-9]{10}"
                    required
                  />
                  {userFormData?.phone?.length > 0 && (
                    <span className=" invalid-feedback">
                      Phone must have 10 digits
                    </span>
                  )}
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-12 col-md-6">
                  <label htmlFor="email" className=" form-label mb-0">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={userFormData?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" form-control"
                    placeholder="Enter email"
                    required
                    autoCapitalize="characters"
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label htmlFor="address" className="form-label mb-0">
                    Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    value={userFormData?.address}
                    onChange={(e) => handleChange(e)}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="Enter Address"
                    required
                  ></textarea>
                </div>
              </div>
              {dropdownLabel !== "Edit User" && (
                <div className="row mt-1">
                  <div className="col-12 col-md-6">
                    <label htmlFor="password" className="form-label mb-0">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={userFormData?.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                      placeholder="Enter Password"
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label
                      htmlFor="repeat_password"
                      className="form-label mb-0"
                    >
                      Repeat Password
                    </label>
                    <input
                      type="password"
                      name="repeat_password"
                      id="repeat_password"
                      value={userFormData?.repeat_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        userFormData?.repeat_password &&
                        userFormData?.repeat_password !== userFormData?.password
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Enter Repeat Password"
                      required
                      // disabled={loading}
                    />
                    {userFormData?.repeat_password &&
                      userFormData?.repeat_password !==
                        userFormData?.password && (
                        <div className="invalid-feedback">
                          Passwords do not match.
                        </div>
                      )}
                  </div>
                </div>
              )}
              <div className="row mt-1">
                <div className="col-12 col-md-6">
                  <label htmlFor="aadhar_no" className=" form-label mb-0">
                    Aadhar
                  </label>
                  <input
                    type="text"
                    name="aadhar_no"
                    id="aadhar_no"
                    value={userFormData?.aadhar_no}
                    onChange={(e) => {
                      const cleanedValue = e.target.value
                        .slice(0, 12)
                        .replaceAll(/\D+/g, "");
                      e.target.value = cleanedValue;
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    className=" form-control"
                    placeholder="Enter Aadhar"
                    pattern="[0-9]{12}"
                    required
                  />
                  {userFormData?.aadhar_no?.length > 0 && (
                    <span className=" invalid-feedback">
                      Aadhar must have 12 digits
                    </span>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="upload_image" className=" form-label mb-0">
                    Upload Passport Size Image
                  </label>
                  <input
                    type="file"
                    name="upload_image"
                    id="upload_image"
                    onChange={handleChange}
                    // value={userFormData?.upload_image}
                    className=" form-control"
                  />
                  {!!userFormData?.upload_image && (
                    <div className="d-flex">
                      <p className="text-danger me-1 mb-0">Uploaded file : </p>
                      <a
                        href={
                          typeof userFormData?.upload_image === "object"
                            ? URL.createObjectURL(userFormData?.upload_image)
                            : userFormData?.upload_image
                        }
                        target="_blank"
                        style={{ textDecoration: "none" }}
                        rel="noreferrer"
                        // isDisabled={loading}
                      >
                        <i class="bi bi-cloud-arrow-down-fill"></i> Download
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="aadhar_front_image"
                    className=" form-label mb-0"
                  >
                    Upload Front Side Of Aadhar
                  </label>
                  <input
                    type="file"
                    name="aadhar_front_image"
                    id="aadhar_front_image"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className=" form-control"
                    required={!userFormData?.aadhar_front_image}
                  />
                  {!!userFormData?.aadhar_front_image && (
                    <div className="d-flex">
                      <p className="text-danger me-1 mb-0">Uploaded file : </p>
                      <a
                        href={
                          typeof userFormData?.aadhar_front_image === "object"
                            ? URL.createObjectURL(
                                userFormData?.aadhar_front_image
                              )
                            : userFormData?.aadhar_front_image
                        }
                        target="_blank"
                        style={{ textDecoration: "none" }}
                        rel="noreferrer"
                      >
                        <i class="bi bi-cloud-arrow-down-fill"></i> Download
                      </a>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="aadhar_back_image"
                    className=" form-label mb-0"
                  >
                    Upload Back Side Of Aadhar
                  </label>
                  <input
                    type="file"
                    name="aadhar_back_image"
                    id="aadhar_back_image"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className=" form-control"
                    required={!userFormData?.aadhar_back_image}
                    // disabled={
                    //   loading || userDataKey?.aadhar_back_image === undefined
                    // }
                  />
                  {!!userFormData?.aadhar_back_image && (
                    <div className="d-flex">
                      <p className="text-danger me-1 mb-0">Uploaded file : </p>
                      <a
                        href={
                          typeof userFormData?.aadhar_back_image === "object"
                            ? URL.createObjectURL(
                                userFormData?.aadhar_back_image
                              )
                            : userFormData?.aadhar_back_image
                        }
                        target="_blank"
                        style={{ textDecoration: "none" }}
                        rel="noreferrer"
                      >
                        <i class="bi bi-cloud-arrow-down-fill"></i> Download
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-12 col-md-6">
                  <label htmlFor="pan_no" className=" form-label mb-0">
                    PAN
                  </label>
                  <input
                    type="text"
                    name="pan_no"
                    id="pan_no"
                    value={userFormData?.pan_no}
                    onChange={(e) => {
                      const cleanedValue = e.target.value
                        .slice(0, 10)
                        .replaceAll(/[^a-zA-Z0-9]/g, "")
                        .toUpperCase();
                      e.target.value = cleanedValue;
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    className=" form-control"
                    placeholder="Enter PAN"
                    pattern="[a-zA-Z0-9]{10}"
                    required
                    //   disabled={loading || userDataKey?.pan_no === undefined}
                  />
                  {userFormData?.pan_no?.length > 0 && (
                    <span className=" invalid-feedback">
                      PAN must be length of 10
                    </span>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="pan_image" className=" form-label mb-0">
                    Upload PAN
                  </label>
                  <input
                    type="file"
                    name="pan_image"
                    id="pan_image"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className=" form-control"
                    required={!userFormData?.pan_image}
                    // disabled={loading || userDataKey?.pan_image === undefined}
                  />
                  {!!userFormData?.pan_image && (
                    <div className="d-flex">
                      <p className="text-danger me-1 mb-0">Uploaded file : </p>
                      <a
                        href={
                          typeof userFormData?.pan_image === "object"
                            ? URL.createObjectURL(userFormData?.pan_image)
                            : userFormData?.pan_image
                        }
                        target="_blank"
                        style={{ textDecoration: "none" }}
                        rel="noreferrer"
                        // isDisabled={loading}
                      >
                        <i class="bi bi-cloud-arrow-down-fill"></i> Download
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="row mt-1">
                <div className="col-12 col-md-6">
                  <label htmlFor="blood_group" className=" form-label mb-0">
                    Blood Group
                  </label>
                  <input
                    type="text"
                    name="blood_group"
                    id="blood_group"
                    value={userFormData?.blood_group}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" form-control"
                    placeholder="Enter Blood Group"
                    required
                    autoCapitalize="characters"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="identification_mark"
                    className=" form-label mb-0"
                  >
                    Identification Mark
                  </label>
                  <input
                    type="text"
                    name="identification_mark"
                    id="identification_mark"
                    value={userFormData?.identification_mark}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" form-control"
                    placeholder="Enter Identification Mark"
                    required
                    autoCapitalize="characters"
                  />
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-12 col-md-4">
                  <label htmlFor="medical" className=" form-label mb-0">
                    Medical Certificate
                  </label>
                  <input
                    type="file"
                    name="medical"
                    id="medical"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className=" form-control"
                    required={!userFormData?.medical}
                    // disabled={loading || userDataKey?.medical === undefined}
                  />
                  {!!userFormData?.medical && (
                    <div className="d-flex">
                      <p className="text-danger me-1 mb-0">Uploaded file : </p>
                      <a
                        href={
                          typeof userFormData?.medical === "object"
                            ? URL.createObjectURL(userFormData?.medical)
                            : userFormData?.medical
                        }
                        target="_blank"
                        style={{ textDecoration: "none" }}
                        rel="noreferrer"
                        // isDisabled={loading}
                      >
                        <i class="bi bi-cloud-arrow-down-fill"></i> Download
                      </a>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-4">
                  <label
                    htmlFor="eye_test_medical"
                    className=" form-label mb-0"
                  >
                    Driver Eye Test Certificate
                  </label>
                  <input
                    type="file"
                    name="eye_test_medical"
                    id="eye_test_medical"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className=" form-control"
                    // required={!userFormData?.eye_test_medical}
                    // disabled={loading || userDataKey?.eye_test_medical === undefined}
                  />
                  {!!userFormData?.eye_test_medical && (
                    <div className="d-flex">
                      <p className="text-danger me-1 mb-0">Uploaded file : </p>
                      <a
                        href={
                          typeof userFormData?.eye_test_medical === "object"
                            ? URL.createObjectURL(
                                userFormData?.eye_test_medical
                              )
                            : userFormData?.eye_test_medical
                        }
                        target="_blank"
                        style={{ textDecoration: "none" }}
                        rel="noreferrer"
                        // isDisabled={loading}
                      >
                        <i class="bi bi-cloud-arrow-down-fill"></i> Download
                      </a>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-4">
                  <label
                    htmlFor="driving_license_image"
                    className=" form-label mb-0"
                  >
                    Driving License
                  </label>
                  <input
                    type="file"
                    name="driving_license_image"
                    id="driving_license_image"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className=" form-control"
                    // required={!userFormData?.driving_license_image}
                  />
                  {!!userFormData?.driving_license_image && (
                    <div className="d-flex">
                      <p className="text-danger me-1 mb-0">Uploaded file : </p>
                      <a
                        href={
                          typeof userFormData?.driving_license_image ===
                          "object"
                            ? URL.createObjectURL(
                                userFormData?.driving_license_image
                              )
                            : userFormData?.driving_license_image
                        }
                        target="_blank"
                        style={{ textDecoration: "none" }}
                        rel="noreferrer"
                        // isDisabled={loading}
                      >
                        <i class="bi bi-cloud-arrow-down-fill"></i> Download
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-12">
                  <label
                    htmlFor="driving_license_no"
                    className="form-label mb-0"
                  >
                    Driving License No
                  </label>
                  <input
                    type="text"
                    name="driving_license_no"
                    id="driving_license_no"
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    value={userFormData?.driving_license_no}
                    onChange={(e) => {
                      const value = e.target.value;
                      setUserFormData((prev) => ({
                        ...prev,
                        driving_license_no: value,
                      })); // Update the state
                      validateDrivingLicenseNumber(value); // Validate input
                    }}
                    placeholder="Enter your driving license number"
                    // required
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                  <small className="text-muted">Example: JH1720130002972</small>
                </div>
              </div>

              <div className="mt-4">
                <h5>Bank</h5>
                <hr></hr>
              </div>

              <div className="row mt-1">
                <div className="col-12 col-md-6">
                  <label htmlFor="bank_name" className=" form-label mb-0">
                    Bank Name & Branch
                  </label>
                  <input
                    type="text"
                    name="bank_name"
                    id="bank_name"
                    value={userFormData?.bank_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" form-control"
                    placeholder="Enter Bank and Branch Name"
                    required
                    autoCapitalize="characters"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="ifsc" className="form-label mb-0">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifsc"
                    id="ifsc"
                    value={userFormData?.ifsc}
                    onChange={(e) => {
                      // Allow alphanumeric characters (IFSC code can contain letters and numbers)
                      const cleanedValue = e.target.value
                        .toUpperCase() // Ensure letters are in uppercase
                        .slice(0, 11); // IFSC codes are usually 11 characters long
                      e.target.value = cleanedValue;
                      handleIFSCChange(e);
                    }}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="Enter IFSC"
                    pattern="[A-Za-z0-9]{11}" // Pattern to allow alphanumeric characters for IFSC
                    required
                  />
                  {userFormData?.ifsc?.length === 11 &&
                    !/^[A-Za-z]{4}[0-9]{7}$/.test(userFormData?.ifsc) && (
                      <span className="invalid-feedback">
                        IFSC code format is invalid.
                      </span>
                    )}
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-12">
                  <label htmlFor="bank_account_no" className="form-label mb-0">
                    Bank Account No
                  </label>
                  <input
                    type="text" // Changed from "number" to "text"
                    name="bank_account_no"
                    id="bank_account_no"
                    value={userFormData?.bank_account_no}
                    onChange={(e) => {
                      // Ensure only digits are entered
                      const value = e.target.value.replace(/\D/g, ""); // Only allow numbers
                      handleChange({ target: { name: e.target.name, value } });
                    }}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="Enter Account No"
                    pattern="[0-9]{10,18}" // Optional: set max and min length for account number
                    required
                  />
                  {userFormData?.bank_account_no &&
                    !/^\d{10,18}$/.test(userFormData?.bank_account_no) && (
                      <span className="invalid-feedback">
                        Account number must be between 10 and 18 digits
                      </span>
                    )}
                </div>
              </div>

              <div className="mt-4">
                <h5>Nominee</h5>
                <hr></hr>
              </div>
              <div className="row mt-1">
                <div className="col-12 col-md-6">
                  <label htmlFor="nominee_name" className=" form-label mb-0">
                    Name
                  </label>
                  <input
                    type="text"
                    name="nominee_name"
                    id="nominee_name"
                    value={userFormData?.nominee_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className=" form-control"
                    placeholder="Enter Nominee Name"
                    required
                    autoCapitalize="characters"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label
                    htmlFor="nominee_aadhar_no"
                    className=" form-label mb-0"
                  >
                    Nominee Aadhar
                  </label>
                  <input
                    type="text"
                    name="nominee_aadhar_no"
                    id="nominee_aadhar_no"
                    value={userFormData?.nominee_aadhar_no}
                    onChange={(e) => {
                      const cleanedValue = e.target.value
                        .slice(0, 12)
                        .replaceAll(/\D+/g, "");
                      e.target.value = cleanedValue;
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    className=" form-control"
                    placeholder="Enter Nominee Aadhar"
                    pattern="[0-9]{12}"
                    required
                  />
                  {userFormData?.nominee_aadhar_no?.length > 0 && (
                    <span className=" invalid-feedback">
                      Aadhar must have 12 digits
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h5>Education Qualification</h5>
                <hr></hr>
              </div>
              <div className="row mt-1">
                <div className="col-12">
                  <label
                    htmlFor="highest_qualification"
                    className=" form-label mb-0"
                  >
                    Highest Qualification
                  </label>
                  <Select
                    options={option}
                    value={option.filter(
                      (val) =>
                        val?.value === userFormData?.highest_qualification
                    )}
                    onChange={(selectedOption) =>
                      setUserFormData((prev) => ({
                        ...prev,
                        highest_qualification: selectedOption.value,
                      }))
                    } // Handle selected option
                    styles={{ zIndex: 2 }}
                  />
                </div>
              </div>
              {userFormData?.highest_qualification !== "below 10th" &&
                userFormData?.highest_qualification !== "secondary" &&
                userFormData?.highest_qualification !== "higher secondary" &&
                userFormData?.highest_qualification !== "" && (
                  <div className="row mt-1">
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="specializations"
                        className=" form-label mb-0"
                      >
                        Specializations
                      </label>
                      <input
                        type="text"
                        name="specializations"
                        id="specializations"
                        value={userFormData?.specializations}
                        onChange={handleChange}
                        className=" form-control"
                        placeholder="Enter Specializations"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="certificate" className=" form-label mb-0">
                        Upload Certificate
                      </label>
                      <input
                        type="file"
                        name="certificate"
                        id="certificate"
                        // value={userFormData?.certificate}
                        onChange={handleUploadCertificate}
                        className=" form-control"
                        placeholder="Upload Certificate"
                        multiple
                      />
                    </div>
                  </div>
                )}

              <div className="mt-4">
                <h5>Office Use Only</h5>
                <hr></hr>
              </div>
              <div className="row mt-1">
                <div className="col-4">
                  <label htmlFor="role" className=" form-label mb-0">
                    Role
                  </label>
                  <Select
                    options={roleData}
                    value={roleData.filter(
                      (val) => val?.label === userFormData?.role
                    )}
                    onChange={(selectedOption) =>
                      setUserFormData((prev) => ({
                        ...prev,
                        role: selectedOption.label,
                      }))
                    } // Handle selected option
                    styles={{ zIndex: 2 }}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="role" className=" form-label mb-0">
                    Select Site
                  </label>
                  <Select
                    options={siteData}
                    value={siteData.filter(
                      (val) => val?.value?._id === userFormData?.site_id
                    )}
                    onChange={handleSelectSite} // Handle selected option
                    styles={{ zIndex: 2 }}
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="wo_id" className=" form-label mb-0">
                    Work Order
                  </label>
                  <Select
                    options={workOrderData}
                    value={workOrderData.filter(
                      (val) => val?.value?._id === userFormData?.wo_id
                    )}
                    onChange={(selectedOption) =>
                      setUserFormData((prev) => ({
                        ...prev,
                        wo_id: selectedOption.value?._id,
                      }))
                    }
                    // isDisabled={userFormData?.site_id === ""}
                    isDisabled={
                      userFormData?.site_id === "" ||
                      userFormData?.site_id === undefined
                    }
                    styles={{ zIndex: 2 }}
                  />
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-12 col-md-6">
                  <label htmlFor="uan" className="form-label mb-0">
                    UAN
                  </label>
                  <input
                    type="text" // UAN is typically a number, so we use text input
                    name="uan"
                    id="uan"
                    value={userFormData?.uan}
                    onChange={(e) => {
                      // Only allow numeric input for UAN
                      const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                      handleChange({ target: { name: e.target.name, value } });
                    }}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="Enter UAN"
                    pattern="\d{12}" // Ensure UAN is 12 digits
                    required
                  />
                  {userFormData?.uan && !/^\d{12}$/.test(userFormData?.uan) && (
                    <span className="invalid-feedback">
                      UAN must have exactly 12 digits.
                    </span>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="esic" className="form-label mb-0">
                    ESIC
                  </label>
                  <input
                    type="text" // ESIC is typically a 12-digit number, so we use text input
                    name="esic"
                    id="esic"
                    value={userFormData?.esic}
                    onChange={(e) => {
                      // Allow only numeric input for ESIC
                      const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                      handleChange({ target: { name: e.target.name, value } });
                    }}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="Enter ESIC"
                    pattern="\d{12}" // Ensure ESIC is 12 digits long
                    required
                  />
                  {userFormData?.esic &&
                    !/^\d{12}$/.test(userFormData?.esic) && (
                      <span className="invalid-feedback">
                        ESIC must have exactly 12 digits.
                      </span>
                    )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <button
                className=" btn btn-secondary"
                onClick={onHide}
                disabled={loadingButton}
              >
                Close
              </button>
              {loadingButton ? (
                <button className=" btn btn-success" disabled>
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <button className=" btn btn-success">
                  {dropdownLabel === "Edit User" ? "Update User" : "Add User"}
                </button>
              )}
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  } catch (error) {
    console.log(error);
  }
};

export default UserModal;
