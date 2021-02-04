import { NavLink, Link } from "react-router-dom";

/** Navigation bar to render list of NavLinks for site
 *
 * props:
 * - logout: fn passed from parent
 * - curr_user: user obj (may change this to React Context instead of props)
 *
 * state:
 * - none
 *
 * App -> Navigation
 * */

function Navigation() {
  /** Helper to render auth links if no logged in user*/
  function renderLoggedOutLinks() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </ul>
    );
  }

  /** Helper to render links for logged in user
   * TODO:  Add more links as more routes added
   */
  function renderLoggedInLinks() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink to="/listings">Listings</NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">
        ShareBnB
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {renderLoggedOutLinks()}
      </div>
    </nav>
  );
}

export default Navigation;
