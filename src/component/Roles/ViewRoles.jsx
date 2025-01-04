import React, { useState, useEffect } from "react";
import CustomTable from "../common/CustomTable";
import { RolesHeaders } from "../../helpers/headers/roleHeaders";
import SearchBox from "./../common/SearchBox";
import RoleModal from "./RoleModal";
import roleService from "../../service/role.service";

const ViewRoles = () => {
  const header = RolesHeaders;
  const initialValues = {
    role_name: "",
    role_shorthand: "",
  };
  const [roleData, setRoleData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(initialValues);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const res = await roleService.GetRoles();
        console.log({ res });
        setLoading(false);
        if (res?.status === 200) {
          const roles = res?.data?.docs.map((val, index) => ({
            no: index + 1,
            ...val,
          }));
          console.log({ roles });
          setRoleData(roles);
          setFilterData(roles);
        } else {
          console.warn(res?.message || "Failed to fetch roles.");
        }
      } catch (error) {
        setLoading(false);
        console.error("An error occurred while fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleEdit = (id) => {
    // getRolesById;
    try {
      // setLoading(true);
      console.log({ id });
      const form_data = new FormData();
      form_data.append("id", id);
      roleService.getRolesById(form_data).then((res) => {
        if (res?.status === 200) {
          setModalData(res?.data);
          setModal(true);
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
  const handleDelete = (id) => {
    // getRolesById;
    try {
      // setLoading(true);
      console.log({ id });
      const form_data = new FormData();
      form_data.append("id", id);
      roleService.DeleteRoleById(form_data).then((res) => {
        if (res?.status === 200) {
          roleService.GetRoles().then((res) => {
            setLoading(false);
            if (res?.status === 200) {
              const roles = res?.data?.docs.map((val, index) => ({
               no: index + 1,
                ...val,
              }));
              setRoleData(roles);
              setFilterData(roles);
            } else {
              console.warn(res?.message);
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
        <RoleModal
          show={modal}
          setModal={setModal}
          data={modalData}
          setData={setRoleData}
          setFilterData={setFilterData}
          setLoading={setLoading}
          onHide={() => {
            setModal(false);
          }}
        />
      )}

      <div className="container responsive mt-2 ms-auto ">
        <div
          className="row mt-2"
          style={{ marginLeft: "0px", marginRight: "0px" }}
        >
          <div className="col-10 col-sm-12 col-md-8 col-lg-8 d-flex d-flex-wrap justify-content-between mt-2">
            <h4 className="">Roles Data List </h4>
          </div>

          <div
            className="col-12 col-sm-12 col-md-4 col-lg-4  mt-2 d-flex d-flex-wrap justify-content-end"
            style={{ marginBottom: "4px" }}
          >
            <button
              className="btn btn-primary"
              href="#"
              onClick={() => {
                setModal(true);
              }}
            >
              <i className="bi bi-plus" style={{ cursor: "pointer" }}></i>
              Add Role
            </button>
          </div>
        </div>

        <div
          className="row mt-2"
          style={{ marginLeft: "0px", marginRight: "0px" }}
        >
          <div
            className="col-12 col-sm-12 col-md-6 col-lg-3  mt-2 d-flex d-flex-wrap ms-auto"
            style={{ marginBottom: "4px" }}
          >
            <SearchBox
              placeholder="Search here..."
              allData={roleData}
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
            flag={""}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default ViewRoles;
