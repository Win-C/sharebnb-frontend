import { NavLink, Link } from "react-router-dom";
import "./Navigation.css"

/** Navigation bar to render list of NavLinks for site
 *
 * props:
 * - logout: fn passed from parent
 * - currUser: user obj 
 *
 * state:
 * - none
 *
 * App -> Navigation
 * */

function Navigation({ currentUser, logout }) {
  /** Helper to render auth links if no logged in user*/
  function renderLoggedOutLinks() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
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
          <NavLink className="nav-link" to="/listings">Listings</NavLink>
        </li>
        <li className="nav-item mr-4">
          <Link className="nav-link" to="/" onClick={logout}>
            Log out { currentUser.first_name || currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-lg">
      <NavLink className="navbar-brand font-weight-bold" exact to="/">
        ShareBnB
      </NavLink>
      {currentUser ? renderLoggedInLinks() : renderLoggedOutLinks()}
    </nav>
  );
}

export default Navigation;
