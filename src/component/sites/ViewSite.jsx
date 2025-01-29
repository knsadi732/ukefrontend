import React, { useEffect, useState } from "react";
import Select from "react-select";
import { SiteHeaders } from "../../helpers/headers/siteHeaders";
import siteService from "../../service/site.service";
import CustomTable from "../common/CustomTable";
import SiteModal from "./SiteModal";

const ViewSite = () => {
  const header = SiteHeaders;
  const initialValues = {
    site_name: "",
    site_shorthand: "",
  };
  const [siteData, setSiteData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [dropdownLabel, setDropdownLabel] = useState("Add Site");
  const [modalData, setModalData] = useState(initialValues);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    siteService.GetSites().then((res) => {
      setLoading(false);
      if (res?.status === 200) {
        const roles = res?.data?.docs.map((val, index) => ({
          no: index + 1,
          ...val,
        }));
        setSiteData(roles);
        setFilterData(roles);
      } else {
        console.warn(res?.message);
      }
    });
  }, []);

  const handleEdit = (data) => {
    try {
      const form_data = new FormData();
      form_data.append("id", data?.id);
      siteService.getSiteById(form_data).then((res) => {
        if (res?.status === 200) {
          setDropdownLabel("Edit Site");
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
      siteService.DeleteSiteById(form_data).then((res) => {
        if (res?.status === 200) {
          console.log({ res });
          siteService.GetSites().then((res) => {
            setLoading(false);
            if (res?.status === 200) {
              const users = res?.data?.docs.map((val, index) => ({
                no: index + 1,
                ...val,
              }));

              setSiteData(users);
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
        <SiteModal
          show={modal}
          setModal={setModal}
          dropdownLabel={dropdownLabel}
          data={modalData}
          setData={setSiteData}
          setFilterData={setFilterData}
          setLoading={setLoading}
          onHide={() => {
            setModal(false);
            setDropdownLabel("Add Site");
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
                setDropdownLabel("Add Site");
                setModal(true);
              }}
            >
              <i className="bi bi-plus" style={{ cursor: "pointer" }}></i>
              Add Site
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
            {/* <SearchBox
              placeholder="Search here..."
              allData={siteData}
              setFilteredData={setFilterData}
            /> */}
          </div>
        </div>
      </div>

      <div className="container mt-2">
        <div className="d-flex d-flex-wrap justify-content-between">
          <CustomTable
            headers={header}
            body={filterData}
            loading={loading}
            flag={""}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
};

export default ViewSite;
