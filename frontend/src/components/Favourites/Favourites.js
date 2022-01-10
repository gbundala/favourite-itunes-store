// Import react
import React from "react";

// Import child component
import ItunesItem from "../ItunesItem/ItunesItem";

// Import stylesheet
import "./Favourites.css";

/**
 *
 * The Favourites component handles the rendering of the items
 * saved as favourites. Similar to the ItunesStore component
 * this component also has lifted up the state to parent <App>
 * Component which passes down the favouritesItunes as well as
 * the Setter function.
 *
 * Furthermore, this component handles the event of Removing
 * items from the favourites list. The function is then
 * passed down to the ItunesItem child component to trigger
 * the removal of an item from favourites
 *
 */
export default function Favourites({ favouriteItunes, setFavouriteItunes }) {
  // Handler to remove and item from favourites
  // we call the filter method on the array of favourites
  // and return elements that are not equal to the
  // id of the item that has been selected. We pass
  // the id of the item selected for removal when calling
  // this function in the child component

  // The Array.filter method creates an entirely new array
  // hence no mutation is made to the state.
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

      {!favouriteItunes.length && (
        <p className="empty-array-note">
          You have not yet added any favourites. Navigate to Home page to Search
          for your iTunes and click the Add to favourites button to add!
        </p>
      )}

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
