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
      <p>Check out this cool site, {currentUser.first_name}</p>
    )
  }

  /** Renders links to login/signup forms*/  
  function renderAuthLinks() {
    return (
      <div className="row justify-content-center">
        <Link className="btn btn-primary" to="/login">
          Log in
        </Link>
        <Link className="btn btn-primary" to="/signup">
          Sign up
        </Link>
      </div>
    )
  }

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h2>Welcome to ShareBnB</h2>

        {currentUser ? renderUserDiv() : renderAuthLinks()}
      </div>
    </div>
  );
}

export default Homepage;
