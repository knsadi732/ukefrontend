import Joi from "joi";
import React, { useEffect, useState } from "react";
import authService from "../../service/auth.service";
import Button from "./Button";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  let user = null;
  if (accessToken) {
    user = jwtDecode(accessToken);
  }
  useEffect(() => {
    document.title = "Login";
  }, []);

  // const form = useRef(null);
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


    try {
      const form_data = new FormData();
      form_data.append("phone", formValues.phone);
      form_data.append("password", formValues.password);
      const res = await authService.login(form_data);
      if (res?.status === 200) {
        const authToken = res?.data?.accessToken;
        const roleName = res?.data?.role;
     
        localStorage.setItem("accessToken", authToken);
        localStorage.setItem("role_name", roleName);
        const user = jwtDecode(authToken);
        if (roleName === "Super Admin") {
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        console.log(res?.msg); // Handle error response from the API
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="container d-flex d-flex-wrap justify-content-center mt-3">
        <div className="col-md-5 col-12 rounded bg-body">
          <form className="ms-1" onSubmit={handleSubmit}>
            <div className="row mt-2">
              <div className="col-12">
                <label htmlFor="phone" className=" form-label mb-0">
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
              <div className="col-12">
                <label htmlFor="password" className=" form-label mb-0">
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
