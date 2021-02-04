import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

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
    <div className="LoginForm">
      <form
        className="LoginForm-form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >

        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          placeholder="username"
          onChange={handleChange}
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          placeholder="password"
          onChange={handleChange}
        />

        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;