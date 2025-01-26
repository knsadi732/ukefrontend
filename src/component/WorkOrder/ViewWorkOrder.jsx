import React, { useState } from "react";
import Select from "react-select";
import WorkOrderModal from "./WorkOrderModal";

const ViewWorkOrder = () => {
  const initialValues = {
    site_name: "",
    site_id: "",
    work_order_name: "",
    work_order_no: "",
    work_order_nature: "",
  };
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(initialValues)
  const [workOrderData, setWorkOrderData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [dropdownLabel, setDropdownLabel] = useState("Add Work Order");

  return (
    <>
      {modal && (
        <WorkOrderModal
          show={modal}
          setModal={setModal}
          dropdownLabel={dropdownLabel}
          data={modalData}
          setData={setWorkOrderData}
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
            <h4 className="">Work Order List </h4>
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
              Add Work Order
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
              allData={workOrderData}
              setFilteredData={setFilterData}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewWorkOrder;
