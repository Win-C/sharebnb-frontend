import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from './homepage/Homepage';
import SignupForm from './auth/SignupForm';
import LoginForm from "./auth/LoginForm";
import Listings from "./listings/Listings";
import ListingDetail from "./listings/ListingDetail";
import PrivateRoute from './PrivateRoute';


/** Routes for ShareBnB
 * 
 * props:
 * - signup: fn to be called in App
 * - login: fn to be called in App
 * 
 * state: none
 * 
 * App -> Routes ->
 *    Homepage
 *    LoginForm, SignupForm
 *    Listings
 *    Redirect - to Homepage
 **/  

function Routes( { signup, login, currentUser }) {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage currentUser={currentUser} />
      </Route>
      <PrivateRoute exact path="/listings" currentUser={currentUser}>
        <Listings />
      </PrivateRoute>
      <PrivateRoute exact path="/listings/:id" currentUser={currentUser}>
        <ListingDetail />
      </PrivateRoute>
      <Route exact path="/signup">
        <SignupForm signup={signup} />
      </Route>
      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
