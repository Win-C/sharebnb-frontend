import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from './homepage/Homepage';
import SignupForm from './auth/SignupForm';

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

function Routes( { signup }) {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/signup">
        <SignupForm signup={signup}/>
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes;
