import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShareBnBApi from "../api/api";
import LoadingSpinner from "../LoadingSpinner";

/** Listing Detail page.
 *
 * Renders information about a listing.
 *
 * Routed at /listings/:id
 *
 * ListingItem -> ListingDetail
 */

function ListingDetail() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);

  useEffect(function getListingOnRender() {
    async function getListing() {
      setListing(await ShareBnBApi.getListing(id));
    }

    getListing();
  }, [id]);

  if (!listing) return <LoadingSpinner />;

  return (
      <div className="ListingDetail col-md-8 offset-md-2 card">
        <div className="card-body">
          <img 
            className="card-img" 
            src={listing.photo}
            alt={listing.title}
            />
          <div className="card-text">
            <h4>{listing.title}</h4>
            <p>Description: {listing.description}</p>
            <p>Price: ${listing.price}</p>
            <p>Long: {listing.longitude}</p>
            <p>Lat: {listing.latitude}</p>
            <p># of Beds:{listing.beds}</p>
            <p># of Rooms: {listing.rooms}</p>
            <p># of Bathrooms: {listing.bathrooms}</p>
            <p>Owner: {listing.created_by}</p>
            <p>{listing.rented_by ? "Not Available!" : "Available!"}</p>
          </div>
        </div>
      </div>
  );
}

export default ListingDetail;