import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import ShareBnBApi from "../api/api";
import ListingList from "./ListingList";
import LoadingSpinner from "../LoadingSpinner";

/** Listing for Sharebnb
 *
 * props: none
 *
 * state: listings: array of listing objects 
 *
 * Routes -> Listings -> { ListingItem, SearchForm }
 **/

function Listings(){
  const [listings, setListings] = useState(null);

  useEffect(function getListingsOnMount() {
    console.debug("ListingList useEffect getListingsOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads listings. */
  async function search(searchParams) {
    let listings = await ShareBnBApi.getAllListings(searchParams);
    console.debug("listings= ", listings);
    setListings(listings);
  }

  if (!listings) return <LoadingSpinner />;

  return (
    <div className="Listings">
      <SearchForm searchFor={search} />
      <ListingList listings={listings} />
    </div>
  );
}

export default Listings;
