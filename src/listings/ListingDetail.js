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
      <div className="ListingDetail col-md-8 offset-md-2">
        <div className="">
          <img 
            className="" 
            src={listing.photo}
            alt={listing.title}
            />
          <h4>{listing.title}</h4>
          <p>{listing.description}</p>
          <p>{listing.price}</p>
          <p>{listing.longitude}</p>
          <p>{listing.latitude}</p>
          <p>{listing.beds}</p>
          <p>{listing.rooms}</p>
          <p>{listing.bathrooms}</p>
          <p>{listing.created_by}</p>
          <p>{listing.rented_by ? "Not Available!" : "Available!"}</p>
        </div>
      </div>
  );
}

export default ListingDetail;