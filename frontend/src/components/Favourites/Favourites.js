import React from "react";
import ItunesItem from "../ItunesItem/ItunesItem";

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
  );
}
