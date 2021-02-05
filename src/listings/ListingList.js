import ListingItem from "./ListingItem";

/** ListingList for Sharebnb
 *
 * props: listings: array of listing objects
 * 
 * state: none
 *
 * Listing -> ListingList
 **/

function ListingList({ listings }){
  return (
    <div className="ListingList mx-auto col-12 col-sm-10 col-md-8 col-lg-6 mt-5">
        {listings.length
            ? (
                <div className="card-deck">
                  {listings.map(l => (
                      <ListingItem
                          key={l.id}
                          id={l.id}
                          title={l.title}
                          photo={l.photo}
                          price={l.price}
                          longitude={l.longitude}
                          latitude={l.latitude}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
  );
}

export default ListingList;
