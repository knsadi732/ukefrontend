import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import authService from "../../service/auth.service";
import Joi from "joi";

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const form = useRef(null);
  const initialValues = { phone: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Define the Joi schema
  const schema = Joi.object({
    phone: Joi.string().length(10).required().label("Phone"),
    password: Joi.string().min(4).max(20).required().label("Password"),
  });

  // Validate the entire form
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = schema.validate(formValues, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  // Validate individual fields
  const validateProperty = (event) => {
    const { name, value } = event.target;
    const obj = { [name]: value };
    const subSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = subSchema.validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = validate();
    setFormErrors(errors || {});

    if (errors) {
      setIsLoading(false);
      return;
    }

    const form_data = new FormData();
    form_data.append("phone", formValues.phone);
    form_data.append("password", formValues.password);

    try {
      const response = await authService.login(form_data); 
      console.log("Login successful:", response);
      setIsLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="container d-flex d-flex-wrap justify-content-center mt-3">
        <div className="col-md-7 col-12 rounded bg-body">
          <form className="ms-1" onClick={handleSubmit}>
            <div className="row mt-2">
              <div className="col-12 col-md-6 ">
                <label htmlFor="phone" className=" form-label mb-0 ms-0">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="Enter Phone"
                  value={formValues.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-6 ">
                <label htmlFor="password" className=" form-label mb-0 ms-0">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
