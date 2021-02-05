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
    /** TODO: add card class in here; showing multiple cards on a line */
    <div >
      <div className="card mb-5">
      <Link to={`/listings/${id}`}>
        <img 
          className="card-img-top img-fluid" 
          src={photo}
          alt={title}
          />
      </Link>
        <h4 className="card-title mt-2">{title}</h4>
          <p className="card-text"><b>Price: </b>${price}</p>
          <p className="card-text mb-2"><b>Location:</b> {latitude}, {longitude}</p>
      </div>
    </div>
  )
}

export default ListingItem;
