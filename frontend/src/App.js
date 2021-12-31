import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Favourites from "./components/Favourites/Favourites";
import Header from "./components/Header/Header";
import ItunesStore from "./components/ItunesStore/ItunesStore";

function App() {
  const [favouriteItunes, setFavouriteItunes] = useState([]);
  const [itunesItems, setITunesItems] = useState([]);

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
