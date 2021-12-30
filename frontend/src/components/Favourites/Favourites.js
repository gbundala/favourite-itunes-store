import React from "react";
import ItunesItem from "../ItunesItem/ItunesItem";

export default function Favourites({ favouriteItunes, setFavouriteItunes }) {
  // FIXME: REVIEW AND DELETE THIS CODE
  //   const [itunesFavouriteItems, setItunesFavouriteItems] = useState();

  function handleRemoveFavouriteItem(uniqueItunesItemId) {
    setFavouriteItunes(
      favouriteItunes.filter((favouriteItem) => {
        //   do stuff here before return
        return favouriteItem.id !== uniqueItunesItemId;
      })
    );
  }

  return (
    <div>
      <h4>Favourite iTunes</h4>
      {favouriteItunes &&
        favouriteItunes.map((itunesItem) => {
          return (
            <ItunesItem
              key={itunesItem.id}
              itunesItem={itunesItem}
              handleRemoveFavouriteItem={handleRemoveFavouriteItem}
            />
          );
        })}
    </div>
  );
}
