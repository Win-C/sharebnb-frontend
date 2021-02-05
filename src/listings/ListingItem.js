import { Link } from "react-router-dom";
import ListingDetail from "./ListingDetail";

/** ListingItem for Sharebnb
 *
 * props: none
 *
 * state: none
 *
 * ListingList -> ListingItem
 **/

function ListingItem({ id, title, photo, price, longitude, latitude }){

  return (
    <Link exact path to={`/listings/${id}`}>
        <div className="card-body bg-light mb-3">
          <img 
            className="card-img-top" 
            src={photo}
            alt={title}
            />
          <h3 className="card-title mt-3">
            {title}
          </h3>
          <div className="card-text">
            <p><b>${price}</b></p>
            <span><small>{latitude}, {longitude}</small></span>
          </div>
        </div>
    </Link>
  )
}

export default ListingItem;
