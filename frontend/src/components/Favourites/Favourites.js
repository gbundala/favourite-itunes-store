// Import react
import React from "react";

// Import child component
import ItunesItem from "../ItunesItem/ItunesItem";

// Import stylesheet
import "./Favourites.css";

export default function Favourites({ favouriteItunes, setFavouriteItunes }) {
  // Handler to remove and item from favourites
  // we call the filter method on the array of favourites
  // and return elements that are not equal to the
  // id of the item that has been selected
  function handleRemoveFavouriteItem(uniqueItunesItemId) {
    setFavouriteItunes(
      favouriteItunes.filter(
        (favouriteItem) => favouriteItem.uniqueId !== uniqueItunesItemId
      )
    );
  }

  return (
    <div>
      <h4>Favourite iTunes</h4>
      <div className="favourite-items-wrapper">
        {favouriteItunes &&
          favouriteItunes.map((itunesItem) => {
            return (
              <ItunesItem
                key={itunesItem.uniqueId}
                itunesItem={itunesItem}
                handleRemoveFavouriteItem={handleRemoveFavouriteItem}
              />
            );
          })}
      </div>
    </div>
  );
}
