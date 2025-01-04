import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import roleService from "../../service/role.service";

const RoleModal = (props) => {
  const {
    data,
    show,
    onHide,
    setModal,
    edit_form,
    setData,
    setFilterData,
    setLoading,
  } = props;

  const [loadingButton, setLoadingButton] = useState(false);
  const [userFormData, setUserFormData] = useState(data);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => {
      return {
        ...prev,
        [name]: value.toString().trim(),
      };
    });
  };

  console.log({ userFormData });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["role_name", "role_shorthand"];

    for (let field of requiredFields) {
      if (!userFormData[field]) {
        alert(`${field} is required`);
        setLoadingButton(false);
        return;
      }
    }

    const form_data = new FormData();
    for (let key in userFormData) {
      form_data.append(key, userFormData[key]);
    }

    console.log([...form_data.entries()]);
    roleService.CreateRole(form_data).then((res) => {
      console.log({ res });
      setLoadingButton(false);
      if (res?.status === 201) {
        setModal(false);
        setLoading(true);
        roleService.GetRoles().then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            const roles = res?.data?.docs.map((val, index) => ({
              ["no"]: index + 1,
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
            <h2 className=" text-start"> Add Role</h2>
          </Modal.Header>
          <form className="ms-1" onSubmit={handleSubmit}>
            <div class="modal-body">
              <div
                className="container"
                // style={{ overflowY: "scroll", maxHeight: "70vh" }}
              >
                <div className="row mt-1">
                  <div className="col-12">
                    <label htmlFor="role_name" className=" form-label mb-0">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role_name"
                      id="role_name"
                      value={userFormData?.role_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className=" form-control"
                      placeholder="Enter Role"
                      required
                      autoCapitalize="characters"
                    />
                  </div>
                </div>

                <div className="row mt-1">
                  <div className="col-12">
                    <label
                      htmlFor="role_shorthand"
                      className=" form-label mb-0"
                    >
                      Role Shorthand
                    </label>
                    <input
                      type="text"
                      name="role_shorthand"
                      id="role_shorthand"
                      value={userFormData?.role_shorthand}
                      onChange={handleChange}
                      className=" form-control"
                      placeholder="Enter Role Shorthand"
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
                  {edit_form ? "Re-apply" : "Add User"}
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

export default RoleModal;
