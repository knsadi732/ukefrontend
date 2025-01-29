import React, { useEffect, useState } from "react";
import Select from "react-select";
import WorkOrderModal from "./WorkOrderModal";
import CustomTable from "../common/CustomTable";
import { WoHeaders } from "../../helpers/headers/woHeaders";
import { useNavigate } from "react-router-dom";
import workOrderService from "./../../service/workOrder.service";

const ViewWorkOrder = () => {
  const navigate = useNavigate();

  const header = WoHeaders;
  const initialValues = {
    site_id: "",
    site_name: "",
    wo_no: "",
    wo_name: "",
    nature_of_work: "",
    start_date: "",
    end_date: "",
    inspecting_authority: "",
    executing_authority: "",
    work_order_tenure: "",
    work_order_value: "",
    billing_cycle: "",
  };
  const data = [
    {
      no: 1,
      site_id: "1",
      site_name: "SAIL IISCO Burnpur",
      wo_no: "WO001",
      wo_name: "Construction of Office",
      nature_of_work: "Civil Engineering",
      start_date: "2025-01-01",
      end_date: "2025-06-30",
      inspecting_authority: "Authority A",
      executing_authority: "Contractor A",
      work_order_tenure: "6 months",
      work_order_value: "1000000",
      billing_cycle: "Monthly",
    },
    {
      no: 2,
      site_id: "2",
      site_name: "TATA Steel Jamshedpur",
      wo_no: "WO002",
      wo_name: "Road Repair Project",
      nature_of_work: "Infrastructure",
      start_date: "2025-02-01",
      end_date: "2025-08-31",
      inspecting_authority: "Authority B",
      executing_authority: "Contractor B",
      work_order_tenure: "7 months",
      work_order_value: "1500000",
      billing_cycle: "Quarterly",
    },
    {
      no: 3,
      site_id: "3",
      site_name: "JSW Steel Vijayanagar",
      wo_no: "WO003",
      wo_name: "Bridge Construction",
      nature_of_work: "Civil Engineering",
      start_date: "2025-03-01",
      end_date: "2025-09-30",
      inspecting_authority: "Authority C",
      executing_authority: "Contractor C",
      work_order_tenure: "7 months",
      work_order_value: "2000000",
      billing_cycle: "Bi-Monthly",
    },
    {
      no: 4,
      site_id: "4",
      site_name: "RINL Vizag Steel Plant",
      wo_no: "WO004",
      wo_name: "Building Renovation",
      nature_of_work: "Architecture",
      start_date: "2025-04-01",
      end_date: "2025-12-31",
      inspecting_authority: "Authority D",
      executing_authority: "Contractor D",
      work_order_tenure: "9 months",
      work_order_value: "500000",
      billing_cycle: "Monthly",
    },
    {
      no: 5,
      site_id: "5",
      site_name: "Essar Steel Hazira",
      wo_no: "WO005",
      wo_name: "Pipeline Installation",
      nature_of_work: "Utility Services",
      start_date: "2025-05-01",
      end_date: "2025-10-31",
      inspecting_authority: "Authority E",
      executing_authority: "Contractor E",
      work_order_tenure: "6 months",
      work_order_value: "800000",
      billing_cycle: "Quarterly",
    },
    {
      no: 6,
      site_id: "6",
      site_name: "Bhushan Steel Odisha",
      wo_no: "WO006",
      wo_name: "Pipeline Installation",
      nature_of_work: "Utility Services",
      start_date: "2025-05-01",
      end_date: "2025-10-31",
      inspecting_authority: "Authority F",
      executing_authority: "Contractor F",
      work_order_tenure: "6 months",
      work_order_value: "800000",
      billing_cycle: "Quarterly",
    },
    {
      no: 7,
      site_id: "7",
      site_name: "AM/NS India Hazira",
      wo_no: "WO007",
      wo_name: "Solar Power Installation",
      nature_of_work: "Renewable Energy",
      start_date: "2025-06-01",
      end_date: "2025-12-31",
      inspecting_authority: "Authority G",
      executing_authority: "Contractor G",
      work_order_tenure: "7 months",
      work_order_value: "1500000",
      billing_cycle: "Monthly",
    },
    {
      no: 8,
      site_id: "8",
      site_name: "JSPL Raigarh",
      wo_no: "WO008",
      wo_name: "Warehouse Construction",
      nature_of_work: "Logistics",
      start_date: "2025-07-01",
      end_date: "2026-01-31",
      inspecting_authority: "Authority H",
      executing_authority: "Contractor H",
      work_order_tenure: "7 months",
      work_order_value: "1100000",
      billing_cycle: "Quarterly",
    },
    {
      no: 9,
      site_id: "9",
      site_name: "Vedanta Electrosteel",
      wo_no: "WO009",
      wo_name: "Machinery Installation",
      nature_of_work: "Industrial",
      start_date: "2025-08-01",
      end_date: "2025-12-31",
      inspecting_authority: "Authority I",
      executing_authority: "Contractor I",
      work_order_tenure: "5 months",
      work_order_value: "1700000",
      billing_cycle: "Bi-Monthly",
    },
    {
      no: 10,
      site_id: "10",
      site_name: "TATA Steel Kalinganagar",
      wo_no: "WO010",
      wo_name: "Parking Lot Construction",
      nature_of_work: "Infrastructure",
      start_date: "2025-09-01",
      end_date: "2026-03-31",
      inspecting_authority: "Authority J",
      executing_authority: "Contractor J",
      work_order_tenure: "7 months",
      work_order_value: "1300000",
      billing_cycle: "Monthly",
    },
  ];

  const Options = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "SAIL IISCO Burnpur - SAIL ISP",
      value: {
        site_id: "1",
        site_name: "SAIL IISCO Burnpur",
        site_shorthand: "SAIL ISP",
      },
    },
    {
      label: "TATA Steel Jamshedpur-TATA JSR",
      value: {
        site_id: "2",
        site_name: "TATA Steel Jamshedpur",
        site_shorthand: "TATA JSR",
      },
    },
    {
      label: "JSW Steel Vijayanagar-JSW VN",
      value: {
        site_id: "3",
        site_name: "JSW Steel Vijayanagar",
        site_shorthand: "JSW VN",
      },
    },
    {
      label: "RINL Vizag Steel Plant-RINL VSP",
      value: {
        site_id: "4",
        site_name: "RINL Vizag Steel Plant",
        site_shorthand: "RINL VSP",
      },
    },
    {
      label: "Essar Steel Hazira-Essar Hazira",
      value: {
        site_id: "5",
        site_name: "Essar Steel Hazira",
        site_shorthand: "Essar Hazira",
      },
    },
    {
      label: "Bhushan Steel Odisha - Bhushan Odisha",
      value: {
        site_id: "6",
        site_name: "Bhushan Steel Odisha",
        site_shorthand: "Bhushan Odisha",
      },
    },
    {
      label: "AM/NS India Hazira-AM/NS Hazira",
      value: {
        site_id: "7",
        site_name: "AM/NS India Hazira",
        site_shorthand: "AM/NS Hazira",
      },
    },
    {
      label: "JSPL Raigarh-JSPL RG",
      value: {
        site_id: "8",
        site_name: "JSPL Raigarh",
        site_shorthand: "JSPL RG",
      },
    },
    {
      label: "Vedanta Electrosteel-Vedanta ELS",
      value: {
        site_id: "9",
        site_name: "Vedanta Electrosteel",
        site_shorthand: "Vedanta ELS",
      },
    },
    {
      label: "TATA Steel Kalinganagar-TATA KLN",
      value: {
        site_id: "10",
        site_name: "TATA Steel Kalinganagar",
        site_shorthand: "TATA KLN",
      },
    },
  ];

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(initialValues);
  const [stateList, setStateList] = useState(Options);
  const [workOrderData, setWorkOrderData] = useState(data);
  const [filterData, setFilterData] = useState(data);
  const [dropdownLabel, setDropdownLabel] = useState("Add Work Order");

  useEffect(() => {
    try {
      workOrderService.GetWorkOrders().then((res) => {
        setLoading(false);
        if (res?.status === 200) {
          const wo_list = res?.data.map((val, index) => ({
            no: index + 1,
            ...val,
          }));
          setWorkOrderData(wo_list);
          setFilterData(wo_list);
        } else {
          console.warn(res?.message);
        }
      });
    } catch (error) {}
  }, []);

  const handleEdit = (data) => {
    setModalData(data);
    setModal(true);
  };
  const handleDelete = () => {};

  const handleSelectSite = (e) => {
    console.log({e})
    if (e.value === "all") {
      setFilterData(workOrderData);
    } else {
      const selected_value = workOrderData.filter(
        (val) => val?.site_id ===
        parseInt(e.value?.site_id)
      );
      console.log({ selected_value });
      setFilterData(selected_value);
    }
  };
  const handleRedirectToDetails = (workOrder_id) => {
    navigate(`/work_order/upload_excel?wo_no=${workOrder_id}`); // Corrected URL
  };

  return (
    <>
      {modal && (
        <WorkOrderModal
          show={modal}
          Options={Options}
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
              options={stateList} // Ensure options is correctly spelled in lowercase
              onChange={handleSelectSite} // Use camelCase for consistency
              // value={
              //   stateList.find((option) => option.value === selectedValue) ||
              //   null
              // }
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
      <div className="container mt-2">
        <div className="d-flex d-flex-wrap justify-content-between">
          <CustomTable
            headers={header}
            handleRedirectToDetails={handleRedirectToDetails}
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

export default ViewWorkOrder;
