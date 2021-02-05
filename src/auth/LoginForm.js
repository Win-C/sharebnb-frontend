import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "../forms.css";

/** Login Form for access to site features
 *
 * props:
 * - login: fnm to be called in parent
 * - initialFormData: empty form data obj in default props
 *
 * state:
 * - formData obj like,
 *        { username, password }
 *
 * On success, redirects to /listings or / (TBD)
 * Routes -> LoginForm
 **/

function LoginForm({
  login,
  initialFormData = { username: "", password: "" },
}) {

  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();

  /** Handle input changes and update form state */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  /** Handle submit of SignupForm */
  async function handleSubmit(evt) {
    evt.preventDefault();

    const result = await login(formData);
    if (result.success) {
      history.push("/");
    } else {
      // TODO: Add error local state to render error alerts
      console.error(":( Invalid credentials");
    }
  }

  return (
    <div className="LoginForm mx-auto col-12 col-sm-10 col-md-8 col-lg-6 mt-5">
      <form
        className="LoginForm-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group formField mb-4">
          <input
            className="formInput"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label 
            className="formLabel"
            htmlFor="username">Username: 
          </label>
        </div>

        <div className="form-group formField mb-4">
          <input
            className="formInput"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label 
            className="formLabel"
            htmlFor="password">Password: 
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-lg btn-primary mb-3"
          >Login!
        </button>
      </form>
    </div>
  );
}

export default LoginForm;