import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../forms.css";

/** Signup Form for access to site features
 *
 * props:
 * - signup: fnm to be called in parent
 * - initialFormData: empty form data obj in default props
 *
 * state:
 * - formData obj like,
 *        { username, first_name, last_name, email, image_url, location }
 *
 * On success, redirects to /listings or / (TBD)
 * Routes -> SignupForm
 **/

// for tests
const PREFILLED_FORM = {
  username: "test",
  first_name: "test",
  last_name: "test",
  password: "password",
  email: "test@test.com",
  image_url: "",
  location: "test",
};

const INITIAL_FORM_DATA = {
  username: "",
  first_name: "",
  last_name: "",
  password: "",
  email: "",
  image_url: "",
  location: "",
};

function SignupForm({ signup }) {
  const [formData, setFormData] = useState(PREFILLED_FORM);
  const [imageSource, setImageSource] = useState("");
  const history = useHistory();

  /** Handle input changes and update form state */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  /** Handle changes of image file */
  function handleImageChange(evt) {
    setFormData((prevData) => ({
      ...prevData,
      image_url: evt.target.files[0],
    }));
    let reader = new FileReader();
    let file = evt.target.files[0]
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageSource(reader.result);
    };
  }


  /** Handle submit of SignupForm */
  async function handleSubmit(evt) {
    evt.preventDefault();

    let formToSubmit = new FormData();
    for (let key in formData) {
      formToSubmit.append(key, formData[key]);
    }
    console.debug("signupform= ", formToSubmit);

    let result = await signup(formToSubmit);
    console.debug("Result: ", result);

    if (result.success) {
      history.push("/");
    } else {
      // TODO: Add error local state to render error alerts
      console.error(":( User already exists or pw too short");
    }

  }

  return (
    <div className="SignupForm mx-auto col-12 col-sm-10 col-md-8 col-lg-6 mt-5">
      <img 
        className="SignupForm-image img-thumbnail" 
        src={imageSource} 
        alt="profile" 
        />
      <form
        className="UserSignUpForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="input-group mb-3">
          <div className="custom-file">
            <input
              className="custom-file-input"
              type="file"
              id="image_url"
              name="image_url"
              onChange={handleImageChange}
            />
            <label
              className="custom-file-label d-flex align-items-start" 
              htmlFor="image_url">
                Select a profile image
            </label>
          </div>
          <div className="input-group-append">
            <button 
              className="btn btn-primary"
              type="button">
                Select
            </button>
          </div>
        </div>

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
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <label 
            className="formLabel"
            htmlFor="first_name">First Name: 
          </label>
        </div>

        <div className="form-group formField mb-4">
          <input
            className="formInput"
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <label 
            className="formLabel"
            htmlFor="last_name">Last Name: 
          </label>
        </div>

        <div className="form-group formField mb-4">
          <input
            className="formInput"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label 
            className="formLabel"
            htmlFor="email">Email: 
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

        <div className="form-group formField mb-4">
          <input
            className="formInput"
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <label 
            className="formLabel"
            htmlFor="location">Location: 
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-lg btn-primary mb-3"
        >
          Sign up!
        </button>
      </form>
    </div>
  );

}

export default SignupForm;
