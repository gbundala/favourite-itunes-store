// Imports
// Import react
import { useState } from "react";

// Import react-router
import { Route, Routes } from "react-router-dom";

// Import stylesheet
import "./App.css";

// Import child components
import Favourites from "./components/Favourites/Favourites";
import Header from "./components/Header/Header";
import ItunesStore from "./components/ItunesStore/ItunesStore";

function App() {
  // State variables for favouritesItunes and the fetched
  // iTunes Items. We keep the state in the parent App
  // component here in order to avoid the sibling
  // components being oosing state after navigating
  // between them. Also to ensure components are kept as
  // pure functions.
  const [favouriteItunes, setFavouriteItunes] = useState([]);
  const [itunesItems, setITunesItems] = useState([]);

  // Inside the return we call the <link> tag at the top
  // level with bootstrap links to ensure the entire app
  // is served with the boostrap styles

  // Then we pass the respective setter and getters
  // from useState into the respective components
  // to be called in there as necessary
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />

      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ItunesStore
              itunesItems={itunesItems}
              setITunesItems={setITunesItems}
              setFavouriteItunes={setFavouriteItunes}
              favouriteItunes={favouriteItunes}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              favouriteItunes={favouriteItunes}
              setFavouriteItunes={setFavouriteItunes}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
