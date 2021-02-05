import React, { useState } from "react";

/** Search widget.
 *
 * Appears on Listing so that these can be filtered down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 * 
 * Props: fn passed down by parent to handle search
 * 
 * State: formData with keys for search_params: 
 *    { max_price, latitude, longitude, beds, bathrooms } 
 *
 * Listing -> SearchForm
 */

const INITIAL_FORM_DATA = {
  max_price: 1000,
  latitude: "",
  longitude: "",
  beds: "",
  bathrooms: "",
};

function SearchForm({ searchFor, initialFormData = INITIAL_FORM_DATA }) {
  console.debug("SearchForm", "searchFor=", typeof searchFor);
  const [formData, setFormData] = useState(initialFormData);

  /** Handle input changes and update form state */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  /** Tell parent to filter */
  function handleSubmit(evt) {
    evt.preventDefault();
    const filteredData = {};
    for (let k in formData) {
      if (formData[k] !== "") {
        filteredData[k] = formData[k];
      }
    }
    searchFor(filteredData);
    setFormData(initialFormData);
  }

  return (
    <div className="SearchForm container mb-4 ">
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="my-1">
          <label htmlFor="max_price">Max price of: </label>
          <input
            type="number"
            id="max_price"
            name="max_price"
            value={formData.max_price}
            placeholder="max_price"
            onChange={handleChange}
          />
        </div>
        <div className="my-1">
          <label htmlFor="latitude">Location latitude: </label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            placeholder="latitude"
            onChange={handleChange}
          />
        </div>
        <div className="my-1">
          <label htmlFor="longitude">Location longitude: </label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            placeholder="longitude"
            onChange={handleChange}
          />
        </div>
        <div className="my-1">
          <label htmlFor="beds">Beds: </label>
          <input
            type="number"
            id="beds"
            name="beds"
            value={formData.beds}
            placeholder="beds"
            onChange={handleChange}
          />
        </div>
        <div className="my-1">
          <label htmlFor="bathrooms">Bathrooms: </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            placeholder="bathrooms"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-lg btn-primary">
          Search
          </button>
      </form>
    </div>
  );
}

export default SearchForm;
