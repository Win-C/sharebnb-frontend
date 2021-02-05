import { Link } from "react-router-dom";

/** ListingItem for Sharebnb
 *
 * props: listing obj 
 *
 * state: none
 *
 * ListingList -> ListingItem
 **/

function ListingItem({ id, title, photo, price, longitude, latitude }){

  return (
    <Link to={`/listings/${id}`}>
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
