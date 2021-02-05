import React, { useState } from "react";
import "../forms.css";

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
  max_price: "",
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
    <div className="SearchForm mx-auto col-12 col-sm-10 col-md-8 col-lg-6 mt-5">
      <form 
        className="SearchForm" 
        onSubmit={handleSubmit}>

        <div className="form-group formField mb-4">
          <input
            className="formInput"
            type="number"
            id="max_price"
            name="max_price"
            value={formData.max_price}
            onChange={handleChange}
          />
          <label 
            className="formLabel"
            htmlFor="max_price">Max price of: 
          </label>
        </div>

        <div className="form-group formField mb-4">
          <input
            className="formInput"
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
          <label 
            className="formLabel"
            htmlFor="latitude">Location latitude: 
          </label>
        </div>

        <div className="form-group formField mb-4">
          <input
            className="formInput"
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
          <label 
            className="formLabel"
            htmlFor="longitude">Location longitude: 
          </label>
        </div>

        <div className="form-group formField mb-4">
          <input
            className="formInput"
            type="number"
            id="beds"
            name="beds"
            value={formData.beds}
            onChange={handleChange}
          />
          <label 
            className="formLabel"
            htmlFor="beds">Beds: 
          </label>
        </div>

        <div className="form-group formField mb-4">
          <input
            className="formInput"
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />
          <label 
            className="formLabel"
            htmlFor="bathrooms">Bathrooms: 
          </label>
        </div>

        <button 
          type="submit" 
          className="btn btn btn-primary mb-3">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
