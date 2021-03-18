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
 * ListingDetail
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
        <div className="card-body">
          <img 
            className="card-img-top" 
            src={listing.photo}
            alt={listing.title}
            />
          <div className="card-title mt-3 mb-0">
            <h4><b>{listing.title}</b></h4>
          </div>
          <div className="card-body mt-0">
            <p>{listing.description}</p>
            <p><b>Price: </b>${listing.price}</p>
            <p><b>Long: </b>{listing.longitude}</p>
            <p><b>Lat: </b>{listing.latitude}</p>
            <p><b># of Beds: </b>{listing.beds}</p>
            <p><b># of Rooms: </b>{listing.rooms}</p>
            <p><b># of Bathrooms: </b>{listing.bathrooms}</p>
            <p><b>Owner: </b>{listing.created_by}</p>
            <p><b>{listing.rented_by ? "Not Available!" : "Available!"}</b></p>
          </div>
        </div>
      </div>
  );
}

export default ListingDetail;