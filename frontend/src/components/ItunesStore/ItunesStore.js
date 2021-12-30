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

export default function ItunesStore({ favouriteItunes, setFavouriteItunes }) {
  const [itunesItems, setiTunesItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSearchiTunes(searchCriteria) {
    const { searchTerm, mediaType } = searchCriteria;

    fetch(`/api/?term=${searchTerm}&media=${mediaType}`)
      .then((res) => res.json())
      .then(
        (data) => {
          setiTunesItems(data.itunesItemsArray);
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
    console.log("handled", itunesItemAdded);
    setFavouriteItunes([...favouriteItunes, itunesItemAdded]);
  }

  // We create a function to generate unique number IDs
  // Below is a reference to MDN on random number generation
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function createNewID() {
    const newID = Math.floor(Math.random() * Date.now());
    return newID;
  }

  return (
    <div className="main-wrapper">
      <h1>iTunes Store Items</h1>

      <SearchCriteria
        setLoading={setLoading}
        handleSearchiTunes={handleSearchiTunes}
      />

      {loading && <p>Loading...</p>}

      {error && <p>Something is wrong!</p>}

      <div className="project-items-wrapper">
        {itunesItems &&
          itunesItems.map((itunesItem) => {
            // TODO:  put this id into every object (itunesItem) before displaying it so that it can go with the object when added to the favourites array. Also rectify all areas that used the unique id patter above
            //FIXME: Fix the bug where the this ID is recreated on each and re-render and this is a problem because whenever the item is added to favourites in the top level App component it causes a render cycle wave that affect all the children including this hence recreating these children elements
            const id = createNewID();
            const itunesItemWithId = { ...itunesItem, id };

            console.log(id);
            return (
              <ItunesItem
                key={id}
                itunesItem={itunesItemWithId}
                handleAddToFavouriteItunes={handleAddToFavouriteItunes}
                isFromStore
              />
            );
          })}
      </div>
    </div>
  );
}

/* <WebProjectItem
                key={webProjectItem.id}
                projectItem={webProjectItem}
                handleEditItem={handleEditItem}
                handleDeleteItem={handleDeleteItem}
              />
           <ItunesItem
                key={itunesItem[uniqueId]}
                collectionName={collectionName}
                collectionArtistName={collectionArtistName}
                trackName={trackName}
                artistName={artistName}
                artworkUrl100={artworkUrl100}
              />   
              
              */
