import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import siteService from "../../service/site.service";
import Creatable from "react-select/creatable";

const WorkOrderModal = (props) => {
  const {
    data,
    show,
    dropdownLabel,
    onHide,
    setModal,
    setData,
    setFilterData,
    setLoading,
  } = props;
  const option = [
    {
      label: "IISCO Steel Plant- SAIL(ISP)",
      value: { id: 1, name: "IISCO Steel Plant", short_hand: "SAIL(ISP)" },
    },
    {
      label: "Bokaro Steel Limited- SAIL(BSL)",
      value: { id: 1, name: "Bokaro Steel Limited", short_hand: "SAIL(BSL)" },
    },
    {
      label: "Rauorkela Steel Plant- SAIL(BSL)",
      value: { id: 1, name: "Rauorkela Steel Plant", short_hand: "SAIL(RSP)" },
    },
    {
      label: "Bhilai Steel Plant- SAIL(BSL)",
      value: { id: 1, name: "Bhilai Steel Plant", short_hand: "SAIL(RSP)" },
    },
  ];

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
    console.log({e})
     setWorkOrderFormData((prev) => ({
       ...prev,
       site_id: e?.value?.id,
       site_name: e?.value?.name,
     }));
   };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["site_name", "work_order_name"];

    for (let field of requiredFields) {
      if (!workOrderFormData[field]) {
        alert(`${field} is required`);
        setLoadingButton(false);
        return;
      }
    }

    const form_data = new FormData();
    form_data.append("site_name", workOrderFormData?.site_name);
    form_data.append("work_order_name", workOrderFormData?.work_order_name);

    if (dropdownLabel === "Edit Site") {
      form_data.append("id", workOrderFormData?._id);
      siteService.UpdateSite(workOrderFormData?._id, form_data).then((res) => {
        console.log({ res });
        setLoadingButton(false);
        if (res?.status === 200) {
          setModal(false);
          setLoading(true);
          siteService.GetSites().then((res) => {
            setLoading(false);
            if (res?.status === 200) {
              const roles = res?.data?.docs.map((val, index) => ({
                no: index + 1,
                ...val,
              }));
              setData(roles);
              setFilterData(roles);
            } else {
              console.warn(res?.message);
            }
          });
        } else {
          console.warn(res?.message);
        }
      });
    } else {
      siteService.CreateSite(form_data).then((res) => {
        console.log({ res });
        setLoadingButton(false);
        if (res?.status === 201) {
          setModal(false);
          setLoading(true);
          siteService.GetSites().then((res) => {
            setLoading(false);
            if (res?.status === 200) {
              const roles = res?.data?.docs.map((val, index) => ({
                no: index + 1,
                ...val,
              }));
              setData(roles);
              setFilterData(roles);
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
                    <Creatable options={option} onChange={handleChangeOption}/>
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-12">
                    <label
                      htmlFor="work_order_name"
                      className=" form-label mb-0"
                    >
                      Work Order Name
                    </label>
                    <input
                      type="text"
                      name="work_order_name"
                      id="work_order_name"
                      value={workOrderFormData?.work_order_name}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Work Order Name"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="work_order_no"
                      className=" form-label mb-0"
                    >
                      Work Order No
                    </label>
                    <input
                      type="text"
                      name="work_order_no"
                      id="work_order_no"
                      value={workOrderFormData?.work_order_no}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Work Order Name"
                      required
                    />
                  </div>
                   <div className="col-12">
                    <label
                      htmlFor="work_order_nature"
                      className=" form-label mb-0"
                    >
                      Work Order Nature
                    </label>
                    <input
                      type="text"
                      name="work_order_nature"
                      id="work_order_nature"
                      value={workOrderFormData?.work_order_nature}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Work Order Name"
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
                  {dropdownLabel === "Edit Site" ? "Update" : "Submit"}
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
