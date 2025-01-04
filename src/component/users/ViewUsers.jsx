import React, { useEffect, useState } from "react";
import Select from "react-select";
import { UsersHeaders } from "../../helpers/headers/usersHeaders";
import userService from "../../service/user.service";
import CustomTable from "../common/CustomTable";
import SearchBox from "../common/SearchBox";
import UserModal from "./UserModal";
import ViewDocuments from "./ViewDocuments";

const ViewUsers = () => {
  const header = UsersHeaders;
  const initialValues = {
    name: "",
    phone: "",
    aadhar_no: "",
    pan_no: "",
    address: "",
    email: "",
    password: "",
    aadhar_front_image: "",
    aadhar_back_image: "",
    pan_image: "",
    repeat_password: "",
    highest_qualification: "",
    specializations: "",
    certificate: "",
    upload_image: "",
    nominee_name: "",
    nominee_aadhar_no: "",
    ifsc: "",
    bank_account_no: "",
    bank_name: "",
    identification_mark: "",
    blood_group: "",
    uan: "",
    esic: "",
    medical: "",
    eye_test_medical: "",
    role: "",
    driving_license_no: "",
    driving_license_image: "",
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [dropdownLabel, setDropdownLabel] = useState("");
  const [modalData, setModalData] = useState(initialValues);
  const [viewDocModal, setViewDocModal] = useState(false);
  const [viewDocModalData, setViewDocModalData] = useState([]);
  const [modal, setModal] = useState(false);
  let setflag = "add";

  useEffect(() => {
    document.title = "View User";
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await userService.GetUsers();
        console.log({ res });
        setLoading(false);
        if (res?.status === 200) {
          const users = res?.data?.docs.map((val, index) => ({
            no: index + 1,
            ...val,
          }));

          setData(users);
          setFilterData(users);
        } else {
          console.warn(res?.message || "Failed to fetch users.");
        }
      } catch (error) {
        setLoading(false);
        console.error("An error occurred while fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    try {
      console.log({ id });
      const form_data = new FormData();
      form_data.append("id", id);
      userService.getUserById(form_data).then((res) => {
        if (res?.status === 200) {
          setDropdownLabel("Edit User");
          setModalData(res?.data);
          setModal(true);
        } else {
          console.log(res?.message);
        }
      });
    } catch (error) {
      setLoading(false);
      console.error("An error occurred while fetching roles:", error);
    }
  };

  const handleDelete = (id) => {
    try { 
      const form_data = new FormData();
      form_data.append("id", id);
      userService.DeleteUserById(form_data).then((res) => {
        if (res?.status === 200) {
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
              console.warn(res?.message || "Failed to fetch users.");
            }
          });
        } else {
          console.log(res?.message);
        }
      });

      // setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("An error occurred while fetching roles:", error);
    }
  };
  return (
    <>
      {modal && (
        <UserModal
          show={modal}
          setData={setData}
          setLoading={setLoading}
          dropdownLabel={dropdownLabel}
          setFilterData={setFilterData}
          setModal={setModal}
          data={modalData}
          onHide={() => {
            setModal(false);
            setModalData(initialValues);
            setDropdownLabel("Add User");
          }}
        />
      )}
      {viewDocModal && (
        <ViewDocuments
          show={viewDocModal}
          data={viewDocModalData}
          onHide={() => {
            setViewDocModal(false);
            // setDropdownLabel("Add User Type");
          }}
        />
      )}

      <div className="container responsive mt-2 ms-auto ">
        <div
          className="row mt-2"
          style={{ marginLeft: "0px", marginRight: "0px" }}
        >
          <div className="col-10 col-sm-12 col-md-8 col-lg-8 d-flex d-flex-wrap justify-content-between mt-2">
            <h4 className="">User Data List </h4>
          </div>

          <div
            className="col-12 col-sm-12 col-md-4 col-lg-4  mt-2 d-flex d-flex-wrap justify-content-end"
            style={{ marginBottom: "4px" }}
          >
            <button
              className="btn btn-primary"
              href="#"
              onClick={() => {
                setDropdownLabel("Add User");
                setModal(true);
              }}
            >
              <i className="bi bi-plus" style={{ cursor: "pointer" }}></i>
              Add Users
            </button>
          </div>
        </div>

        <div
          className="row mt-2"
          style={{ marginLeft: "0px", marginRight: "0px" }}
        >
          <div
            className="col-12 col-sm-12 col-md-6 col-lg-3 mt-2"
            style={{
              marginBottom: "4px",
              fontSize: "small",
              position: "sticky",
              top: 0,
              zIndex: 5,
            }}
          >
            <Select
              // options={stateList}
              // onChange={handleSelect}
              // value={stateList.find((option) => option.value === selectedValue)}
              placeholder="Select State"
            />
          </div>

          <div
            className="col-12 col-sm-12 col-md-6 col-lg-3  mt-2 d-flex d-flex-wrap ms-auto"
            style={{ marginBottom: "4px" }}
          >
            <SearchBox
              placeholder="Search here..."
              allData={data}
              setFilteredData={setFilterData}
            />
          </div>
        </div>
      </div>

      <div className="container mt-2">
        <div className="d-flex d-flex-wrap justify-content-between">
          <CustomTable
            headers={header}
            body={filterData}
            loading={loading}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setflag={setflag}
            setViewDocModal={setViewDocModal}
            setViewDocModalData={setViewDocModalData}
          />
        </div>
      </div>

      {/* {Object.entries(filterData)?.length === 0 && !loading && (
        <p className=" fw-semibold text-danger text-center">No Data</p>
      )} */}
    </>
  );
};

export default ViewUsers;
