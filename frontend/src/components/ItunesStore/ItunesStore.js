import React, { useState } from "react";
import SearchCriteria from "../SearchCriteria/SearchCriteria";
import ItunesItem from "../ItunesItem/ItunesItem";
import "./ItunesStore.css";

/**
 *
 * The WebProjects component is the main component which
 * handles all the major business logic of this application
 * of making the GET, POST, PUT and DELETE calls to the
 * endpoints exposed by the Express application using the fetch
 * method.
 *
 * The presentational bits of this app have been delegated over
 * to the respective children of this component allowing
 * this component to focus on the logic and data fetching
 * tasks. All event handlers are defined here as well as the
 * main state variables that are relevant to the most part
 * of the application.
 *
 * The useEffect has been used to make the GET request upon
 * mounting of the component on the DOM. Whereas the event
 * handlers has been used to make the POST, PUT and DELETE
 * request. The PUT and POST method includes headers and body
 * to pass data from the React app to the Express server
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
