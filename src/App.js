import "./App.css";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Routes from "./Routes";

const BASE_URL = "http://127.0.0.1:5000";

/** App for ShareBnB
 * renders Routes and Navigation bar
 *
 * props:
 *
 * state:
 *
 * App -> Navigation
 *     -> Routes
 **/
function App() {

  /** signup user with form data to API
   * NOTE: backend needs to enable CORS for API routes, this was done
   * with Express with app.use(cors()), need to do the same with Flask backend
   */
  async function signup(userFormData) {
    const response = await axios({
      url: `${BASE_URL}/signup`,
      headers: {"Content-Type": "multipart/form-data"},
      method: "POST",
      data: userFormData,
    });
    console.log("response = ", response);
    return response.data;
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes signup={signup}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
