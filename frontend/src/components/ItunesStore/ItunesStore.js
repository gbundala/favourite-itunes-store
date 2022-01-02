import React, { useState } from "react";
import SearchCriteria from "../SearchCriteria/SearchCriteria";
import ItunesItem from "../ItunesItem/ItunesItem";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSearchItunes(searchCriteria) {
    const { searchTerm, mediaType } = searchCriteria;

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

  function handleAddToFavouriteItunes(itunesItemAdded) {
    // FIXME: Delete consolelog
    console.log("handled", itunesItemAdded);
    const isItemAlreadyAdded = favouriteItunes.find((item) => {
      return item.uniqueId === itunesItemAdded.uniqueId;
    });

    if (!isItemAlreadyAdded) {
      // FIXME: Delete consolelog
      // TODO: Also find a way so that the ItunesItem component does not clear its state when returning back to the home page
      console.log("added?", isItemAlreadyAdded);
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

      <div className="project-items-wrapper">
        {itunesItems.length ? (
          itunesItems.map((itunesItem) => {
            return (
              <ItunesItem
                key={itunesItem.uniqueId}
                itunesItem={itunesItem}
                handleAddToFavouriteItunes={handleAddToFavouriteItunes}
                isFromStore
              />
            );
          })
        ) : (
          <p>
            Please enter your search criteria above to get data from iTunes or
            navigate to the Favourites page
          </p>
        )}
      </div>
    </div>
  );
}
