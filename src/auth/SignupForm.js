import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
  username: "test6",
  first_name: "test",
  last_name: "test",
  password: "password",
  email: "test6@test.com",
  image_url: "",
  location: "Canada",
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

function SignupForm({ signup, initialFormData = INITIAL_FORM_DATA }) {
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
    <div className="SignupForm mb-4">
      <img className="SignupForm-image" src={imageSource} alt="user" />
      <form
        className="UserSignUpForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label htmlFor="image_url">Profile Image: </label>
        <input
          type="file"
          id="image_url"
          name="image_url"
          onChange={handleImageChange}
        />

        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          placeholder="username"
          onChange={handleChange}
        />

        <label htmlFor="first_name">First Name: </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          placeholder="first_name..."
          onChange={handleChange}
        />

        <label htmlFor="last_name">Last Name: </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          placeholder="last_name"
          onChange={handleChange}
        />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          placeholder="email"
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

        <label htmlFor="location">Location: </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          placeholder="location"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-lg btn-primary"
        >
          Submit me!
        </button>
      </form>
    </div>
  );

}

export default SignupForm;
