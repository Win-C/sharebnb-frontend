import { useContext } from 'react';
import { Link } from 'react-router-dom';

/** Homepage for Sharebnb
 *  Shows welcome message or login/signup links
 * 
 * props: none
 * state: none
 * 
 * Routes -> Homepage
 **/  

 function Homepage() {
   return (
     <div className="Homepage">
       <div className="container text-center">
         <h2>Welcome to ShareBnB</h2>
         <div className="row justify-content-center">
           <Link className="btn btn-primary" to="/login">
             Log in
           </Link>
           <Link className="btn btn-primary" to="/signup">
             Sign up
           </Link>
         </div>
       </div>
     </div>
   )
 }

 export default Homepage;