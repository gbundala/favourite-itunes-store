// Import react
import React, { useState } from "react";

// Child components imports
import SearchCriteria from "../SearchCriteria/SearchCriteria";
import ItunesItem from "../ItunesItem/ItunesItem";

// Styles import
import "./ItunesStore.css";

/**
 *
 * This component ItunesStore is the main component which
 * handles all the major business logic of this application.
 *
 * The main action is the GET Request call to the
 * endpoint exposed by the Express application using the fetch
 * method upon user clicking the Search iTunes button in the
 * SearchCriteria child component.
 *
 * The presentational bits of this app have been delegated over
 * to the respective children of this component allowing
 * this component to focus on the logic and data fetching
 * tasks. All event handlers are defined here as well as the
 * data fetching status state variables that are relevant to
 * the most part of the application.
 *
 * The main data state, favouriteItunes & itunesItems have been
 *  lifted to the parent component <App />.
 *
 * This is key in order to not loose the state upon navigating
 * between Home and Favourites. The states data will only be lost
 * upon user unmounts from the entire web page (inline
 * with the Task Requirements) by closing the tab.
 *
 * No useEffect has been used to make the GET request upon
 * mounting of the component on the DOM as we only want to call
 * the data from iTunes API upon user entering the search
 * criteria.
 *
 */

export default function ItunesStore({
  favouriteItunes,
  setFavouriteItunes,
  itunesItems,
  setITunesItems,
}) {
  // Fetching status state variables
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handling of search
  function handleSearchItunes(searchCriteria) {
    const { searchTerm, mediaType } = searchCriteria;

    // Fetching call to our server

    // we pass in the query values the searchTerm
    // and mediaType to be used our Custom API when
    // fetching from iTunes API
    fetch(`/api/?term=${searchTerm}&media=${mediaType}`)
      .then((res) => res.json())
      .then(
        (data) => {
          setITunesItems(data.itunesItemsArrayWithIds);
          setLoading(false);
          setError(null);
        },
        (err) => {
          setError(err);
          setLoading(false);
          console.error("Error in fetching data: ", err);
        }
      );
  }

  // Handling of adding to favourites
  function handleAddToFavouriteItunes(itunesItemAdded) {
    // Before adding, we check if the item is already in the
    // favourites list using the Array.find() method
    const isItemAlreadyAdded = favouriteItunes.find((item) => {
      return item.uniqueId === itunesItemAdded.uniqueId;
    });

    // We only add if the item does not exist in favourites
    // Otherwise we alert to the user that the item has
    // aready been added
    if (!isItemAlreadyAdded) {
      setFavouriteItunes([...favouriteItunes, itunesItemAdded]);
    } else {
      alert("The item is already in favourites");
    }
  }

  return (
    <div className="main-wrapper">
      <h1>iTunes Store Items</h1>

      <SearchCriteria
        setLoading={setLoading}
        handleSearchItunes={handleSearchItunes}
      />

      {loading && <p>Loading...</p>}

      {error && <p>Something is wrong!</p>}

      {!itunesItems.length && (
        <p className="empty-array-note">
          Please enter your search criteria above to get data from iTunes or
          navigate to the Favourites page
        </p>
      )}

      <div className="itunes-items-wrapper">
        {itunesItems &&
          itunesItems.map((itunesItem) => {
            return (
              <ItunesItem
                key={itunesItem.uniqueId}
                itunesItem={itunesItem}
                handleAddToFavouriteItunes={handleAddToFavouriteItunes}
                isFromStore
              />
            );
          })}
      </div>
    </div>
  );
}
