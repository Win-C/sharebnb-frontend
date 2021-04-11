// import "./Homepage.css";
import { Link } from "react-router-dom";

/** Homepage for Sharebnb
 *  Shows welcome message or login/signup links
 *
 * props: currentUser, user obj
 *
 * state: none
 *
 * Routes -> Homepage
 **/

function Homepage({ currentUser }) {

  /** Renders logged in user info for homepage */  
  function renderUserDiv() {
    return (
      <p>
        Welcome Back, {currentUser.first_name || currentUser.username}!
      </p>
    )
  }

  /** Renders links to login/signup forms*/  
  function renderAuthLinks() {
    return (
      <div className="row justify-content-center">
        <Link 
          to="/login"
          className="btn btn-primary mx-2" 
          >
          Log in
        </Link>
        <Link 
          to="/signup"
          className="btn btn-primary mx-2" 
          >
          Sign up
        </Link>
      </div>
    )
  }

  return (
    <div className="Homepage">
      <div className="container text-center mt-5">
        <h3>Welcome to ShareBnB!</h3>
        {currentUser ? renderUserDiv() : renderAuthLinks()}
      </div>
    </div>
  );
}

export default Homepage;
