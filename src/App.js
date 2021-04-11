import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import Navigation from "./routes-nav/Navigation";
import Routes from "./routes-nav/Routes";
import ShareBnBApi from "./api/api";
import useLocalStorage from "./hooks/useLocalStorage";
import LoadingSpinner from "./common/LoadingSpinner";

const TOKEN_STORAGE_ID = "sharebnb-token";

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
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  /** Load user info from API. Until a user is logged in and they have a token,
   * this should not run. It only needs to re-run when a user logs out, so
   * the value of the token is a dependency for this effect.
   **/
  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            // username and is_admin nested in user_claims obj
            let { user_claims } = jwt.decode(token);
            ShareBnBApi.token = token;
            let currentUser = await ShareBnBApi.getCurrentUser(
              user_claims.username
            );
            setCurrentUser(currentUser);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      // set infoLoaded to false while async getCurrentUser runs; once the
      // data is fetched (or even if an error happens!), this will be set back
      // to false to control the spinner.
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  /** signup user with form data to API */
  async function signup(userFormData) {
    let token;
    try {
      token = await ShareBnBApi.signupUser(userFormData);
      setToken(token);
    } catch (errors) {
      console.error("No token received: ", errors);
      return { success: false };
    }

    console.debug("signup response = ", token);
    return { success: true };
  }

  /** login user with form data to API */
  async function login(userFormData) {
    let token;
    try {
      token = await ShareBnBApi.loginUser(userFormData);
      setToken(token);
    } catch (errors) {
      console.error("No token received: ", errors);
      return { success: false };
    }
    console.debug("login response = ", token);
    return {
      success: true,
    };
  }

  /** logout user with API */
  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <Navigation currentUser={currentUser} logout={logout} />
      <div className="App container">
        <Routes signup={signup} login={login} currentUser={currentUser} />
      </div>
      </BrowserRouter>
  );
}

export default App;
