import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import siteService from "../../service/site.service";

const SiteModal = (props) => {
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

  const [loadingButton, setLoadingButton] = useState(false);
  const [siteFormData, setSiteFormData] = useState(data);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setSiteFormData((prev) => {
      return {
        ...prev,
        [name]: value.toString().trim(),
      };
    });
  };

  console.log({ siteFormData });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setSiteFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["site_name", "site_shorthand"];

    for (let field of requiredFields) {
      if (!siteFormData[field]) {
        alert(`${field} is required`);
        setLoadingButton(false);
        return;
      }
    }

    const form_data = new FormData();
    form_data.append("site_name", siteFormData?.site_name);
    form_data.append("site_shorthand", siteFormData?.site_shorthand);

    if (dropdownLabel === "Edit Site") {
      form_data.append("id", siteFormData?._id);
      siteService.UpdateSite(siteFormData?._id, form_data).then((res) => {
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
                    <input
                      type="text"
                      name="site_name"
                      id="site_name"
                      value={siteFormData?.site_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className=" form-control"
                      placeholder="Enter Site Name"
                      required
                      autoCapitalize="characters"
                    />
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-12">
                    <label
                      htmlFor="site_shorthand"
                      className=" form-label mb-0"
                    >
                      Site Shorthand
                    </label>
                    <input
                      type="text"
                      name="site_shorthand"
                      id="site_shorthand"
                      value={siteFormData?.site_shorthand}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Site Shorthand"
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

export default SiteModal;
