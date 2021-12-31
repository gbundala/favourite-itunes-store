import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./SearchCriteria.css";

/**
 *
 * The Search Criteria component is a presentational component
 * to handle the presentation of the user interface that
 * allows for the user to enter Search Term and Media type
 * to search itunes and Apple Books Store
 *
 * Not much is happening in this component except for the setting
 * of the parent loading state as well as receiving the and
 * firing the handleSerachiTunes event handler from the parent
 * component to invoke the event of fetching for the items from iTunes
 */

export default function SearchCriteria({ setLoading, handleSearchItunes }) {
  const [searchCriteria, setSearchCriteria] = useState({
    searchTerm: "",
    mediaType: "",
  });

  // the deep dive section in the new react docs provide
  // incredible guidance on updating the fields in
  // a form using a single event handler
  // https://beta.reactjs.org/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax
  function handleChange(e) {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="add-item-wrapper">
      <h4 className="add-item-title">Search iTunes and Apple Books Store</h4>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Enter Search Term"
          name="searchTerm"
          value={searchCriteria.searchTerm}
          onChange={handleChange}
        />
        <FormControl
          placeholder="Enter Media Type"
          name="mediaType"
          value={searchCriteria.mediaType}
          onChange={handleChange}
        />

        <Button
          variant="outline-secondary"
          onClick={() => {
            setLoading(true);
            setSearchCriteria({ searchTerm: "", mediaType: "" });
            handleSearchItunes(searchCriteria);
          }}
        >
          Search iTunes
        </Button>
      </InputGroup>
    </div>
  );
}
