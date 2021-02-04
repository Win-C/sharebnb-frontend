import './App.css';
import { useState } from 'react';
import axios from 'axios';


const BASE_URL = "http://127.0.0.1:5000";

const PREFILLED_FORM = {
  username: "test",
  first_name: "test",
  last_name: "test",
  email: "test@test.com",
  image_url: "",
  location: "Canada",
};
function App() {
  const [formData, setFormData] = useState(PREFILLED_FORM)

  /** Handle Change*/  
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(prevData => (
      {
        ...prevData,
        [name]: value
      }
    ))
  }

  /** Handle changes of image file*/ 
  function handleChangeImage(evt) {
    setFormData(prevData => (
      {
        ...prevData,
        image_url: evt.target.files[0]
      }
    ))
  }

  /** Handle submit of file */  
  async function handleSubmit(evt) {
    evt.preventDefault();
    // const { files } = evt.target;
    console.log(formData);
    debugger;
    let formToSubmit = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const response = await axios({
      url: `${BASE_URL}/uploaded`,
      method: "POST",
      data: {
        image_url: formData.image_url
      },
      config
    })

    console.debug("Response: ", response.data);

    // console.debug("puppy file? ", files[0]);
  }

  return (
    <div className="App">
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
          onChange={handleChangeImage}
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

export default App;
