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

export default function ItunesStore() {
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

  return (
    <div className="main-wrapper">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
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
            //Destructing the keys from the object
            const { wrapperType } = itunesItem;

            const uniqueId = wrapperType + "Id";

            return (
              <ItunesItem key={itunesItem[uniqueId]} itunesItem={itunesItem} />
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
