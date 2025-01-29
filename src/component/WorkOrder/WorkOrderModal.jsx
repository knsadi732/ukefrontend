import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import siteService from "../../service/site.service";
import Creatable from "react-select/creatable";
import workOrderService from "../../service/workOrder.service";

const WorkOrderModal = (props) => {
  const {
    id,
    data,
    show,
    dropdownLabel,
    onHide,
    siteList,
    setModal,
    setWorkOrderData,
    setFilterData,
    setLoading,
  } = props;

  console.log({ data });

  const [loadingButton, setLoadingButton] = useState(false);
  const [workOrderFormData, setWorkOrderFormData] = useState(data);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setWorkOrderFormData((prev) => {
      return {
        ...prev,
        [name]: value.toString().trim(),
      };
    });
  };

  console.log({ workOrderFormData });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setWorkOrderFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeOption = (e) => {
    console.log({ e });
    setWorkOrderFormData((prev) => ({
      ...prev,
      site_id: e?.value?._id,
      site_name: e?.value?.site_name,
    }));
  };
  console.log({ workOrderFormData });

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "site_id",
      "site_name",
      "wo_no",
      "wo_name",
      "nature_of_work",
      "start_date",
      "end_date",
      "inspecting_authority",
      "executing_authority",
      "work_order_tenure",
      "work_order_value",
      "billing_cycle",
    ];
    for (let field of requiredFields) {
      if (!workOrderFormData[field]) {
        alert(`${field} is required`);
        setLoadingButton(false);
        return;
      }
    }
    const form_data = new FormData();
    form_data.append("site_id", workOrderFormData?.site_id);
    form_data.append("site_name", workOrderFormData?.site_name);
    form_data.append("wo_no", workOrderFormData?.wo_no);
    form_data.append("wo_name", workOrderFormData?.wo_name);
    form_data.append("nature_of_work", workOrderFormData?.nature_of_work);
    form_data.append("start_date", workOrderFormData?.start_date);
    form_data.append("end_date", workOrderFormData?.end_date);
    form_data.append(
      "inspecting_authority",
      workOrderFormData?.inspecting_authority
    );
    form_data.append(
      "executing_authority",
      workOrderFormData?.executing_authority
    );
    form_data.append("work_order_tenure", workOrderFormData?.work_order_tenure);
    form_data.append("work_order_value", workOrderFormData?.work_order_value);
    form_data.append("billing_cycle", workOrderFormData?.billing_cycle);
    if (dropdownLabel === "Update Work Order") {
      form_data.append("id", workOrderFormData?._id);
      workOrderService.UpdateWorkOrder(id, form_data).then((res) => {
        console.log({ res });
        setLoadingButton(false);
        if (res?.status === 200) {
          setModal(false);
          setLoading(true);
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
        } else {
          console.warn(res?.message);
        }
      });
    } else {
      workOrderService.CreateWorkOrder(form_data).then((res) => {
        console.log({ res });
        setLoadingButton(false);
        if (res?.status === 201) {
          setModal(false);
          // setLoading(true);
          // workOrderService.GetSites().then((res) => {
          //   setLoading(false);
          //   if (res?.status === 200) {
          //     const roles = res?.data?.docs.map((val, index) => ({
          //       no: index + 1,
          //       ...val,
          //     }));
          //     setData(roles);
          //     setFilterData(roles);
          //   } else {
          //     console.warn(res?.message);
          //   }
          // });
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
          size="lg"
          backdrop="static"
          aaria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={onHide}
        >
          <Modal.Header closeButton>
            <h2 className=" text-start"> {dropdownLabel}</h2>
          </Modal.Header>
          <form className="ms-1" onSubmit={handleSubmit}>
            <div class="modal-body">
              <div className="container">
                <div className="row mt-1">
                  <div className="col-12">
                    <label htmlFor="site_name" className=" form-label mb-0">
                      Site Name
                    </label>
                    <Creatable
                      options={siteList}
                      onChange={handleChangeOption}
                      value={siteList.find(
                        (option) =>
                          // console.log(option.value._id , data?.site_id)
                          option.value._id === data?.site_id
                      )}
                    />
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-12">
                    <label htmlFor="wo_name" className=" form-label mb-0">
                      Work Order Name
                    </label>
                    <input
                      type="text"
                      name="wo_name"
                      id="wo_name"
                      value={workOrderFormData?.wo_name}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Work Order Name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="wo_no" className=" form-label mb-0">
                      Work Order No
                    </label>
                    <input
                      type="text"
                      name="wo_no"
                      id="wo_no"
                      value={workOrderFormData?.wo_no}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Work Order Name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="nature_of_work"
                      className=" form-label mb-0"
                    >
                      Work Order Nature
                    </label>
                    <input
                      type="text"
                      name="nature_of_work"
                      id="nature_of_work"
                      value={workOrderFormData?.nature_of_work}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Work Order Name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="start_date" className=" form-label mb-0">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      id="start_date"
                      value={workOrderFormData?.start_date}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Work Order Name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="end_date" className=" form-label mb-0">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      id="end_date"
                      value={workOrderFormData?.end_date}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter End Date"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="inspecting_authority"
                      className=" form-label mb-0"
                    >
                      Inspecting Authority
                    </label>
                    <input
                      type="text"
                      name="inspecting_authority"
                      id="inspecting_authority"
                      value={workOrderFormData?.inspecting_authority}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Inspecting Authority Name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="executing_authority"
                      className=" form-label mb-0"
                    >
                      Executing Authority
                    </label>
                    <input
                      type="text"
                      name="executing_authority"
                      id="executing_authority"
                      value={workOrderFormData?.executing_authority}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Executing Authority Name"
                      required
                    />
                  </div>{" "}
                  <div className="col-12">
                    <label
                      htmlFor="work_order_tenure"
                      className=" form-label mb-0"
                    >
                      Tenure
                    </label>
                    <input
                      type="text"
                      name="work_order_tenure"
                      id="work_order_tenure"
                      value={workOrderFormData?.work_order_tenure}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Tenure"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="work_order_value"
                      className=" form-label mb-0"
                    >
                      Work Order Price
                    </label>
                    <input
                      type="text"
                      name="work_order_value"
                      id="work_order_value"
                      value={workOrderFormData?.work_order_value}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Work Order Value"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="billing_cycle" className=" form-label mb-0">
                      Billing Cycle
                    </label>
                    <input
                      type="text"
                      name="billing_cycle"
                      id="billing_cycle"
                      value={workOrderFormData?.billing_cycle}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter  Billing Cycle"
                      required
                    />
                  </div>
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
                  {dropdownLabel === "Update Work Order" ? "Update" : "Submit"}
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

export default WorkOrderModal;
