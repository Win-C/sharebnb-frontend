import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import jwt from "jsonwebtoken";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Routes from "./Routes";
import ShareBnBApi from "./api/api";
// import useLocalStorage from "./hooks/useLocalStorage";

const BASE_URL = "http://127.0.0.1:5000";

/** App for ShareBnB
 * renders Routes and Navigation bar
 *
 * props:
 *
 * state:
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 * 
 * App -> Navigation
 *     -> Routes
 **/
function App() {
  // const [infoLoaded, setInfoLoaded] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);
  // const [token, setToken] = useLocalStoarage(TOKEN_STORAGE_ID);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  // useEffect(function loadUserInfo() {
  //   console.debug("App useEffect loadUserInfo", "token=", token);

  //   async function getCurrentUser() {
  //     if (token) {
  //       try {
  //         let { username } = jwt.decode(token);
  //         // put the token on the Api class so it can use it to call the API.
  //         JoblyApi.token = token;
  //         let currentUser = await JoblyApi.getCurrentUser(username);
  //         setCurrentUser(currentUser);
  //         setApplicationIds(new Set(currentUser.applications));
  //       } catch (err) {
  //         console.error("App loadUserInfo: problem loading", err);
  //         setCurrentUser(null);
  //       }
  //     }
  //     setInfoLoaded(true);
  //   }

  //   // set infoLoaded to false while async getCurrentUser runs; once the
  //   // data is fetched (or even if an error happens!), this will be set back
  //   // to false to control the spinner.
  //   setInfoLoaded(false);
  //   getCurrentUser();
  // }, [token]);

  // TODO: create function to handle logout


  /** signup user with form data to API
   * NOTE: backend needs to enable CORS for API routes, this was done
   * with Express with app.use(cors()), need to do the same with Flask backend
   */
  async function signup(userFormData) {
    const response = await ShareBnBApi.signupUser(userFormData);
    
    // const response = await axios({
    //   url: `${BASE_URL}/signup`,
    //   headers: {"Content-Type": "multipart/form-data"},
    //   method: "POST",
    //   data: userFormData,
    // });
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
