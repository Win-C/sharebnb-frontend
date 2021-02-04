import React, { useState } from "react";

/** Signup Form for access to site features
 *
 * props:
 * - signup: fnm to be called in parent
 *
 * state:
 * - formData obj like,
 *        { username, first_name, last_name, email, image_url, location }
 *
 * On success, redirects to /listings or / (TBD)
 * Routes -> SignupForm
 **/


const PREFILLED_FORM = {
  username: "test6",
  first_name: "test",
  last_name: "test",
  password: "password",
  email: "test6@test.com",
  image_url: "",
  location: "Canada",
};

function SignupForm({ signup }) {
  const [formData, setFormData] = useState(PREFILLED_FORM);
  const [imageSource, setImageSource] = useState("");


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
    // NOTE: Need to figure out if FormData obj makes the multipart setting redundant
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };

    let result = await signup(formToSubmit);

    console.debug("Result: ", result);

  // console.debug("puppy file? ", files[0]);
  }

  return (
    <div className="SignupForm">
      <img className="SignupForm-image" src={imageSource} alt="user"/>
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
          value="test"
          placeholder="username"
          onChange={handleChange}
        />

        <label htmlFor="first_name">First Name: </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value="test"
          placeholder="first_name..."
          onChange={handleChange}
        />

        <label htmlFor="last_name">Last Name: </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value="test"
          placeholder="last_name"
          onChange={handleChange}
        />

        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          value="test@test.com"
          placeholder="email"
          onChange={handleChange}
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value="password"
          placeholder="password"
          onChange={handleChange}
        />

        <label htmlFor="location">Location: </label>
        <input
          type="text"
          id="location"
          name="location"
          value="Canada"
          placeholder="location"
          onChange={handleChange}
        />

        <button>Submit me!</button>
      </form>
    </div>
  );

}

export default SignupForm;
