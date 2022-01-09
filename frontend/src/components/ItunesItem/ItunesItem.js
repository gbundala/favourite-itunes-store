// Import React
import React, { useState } from "react";

// Import Boostrap components
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// Import stylesheet
import "./ItunesItem.css";

/**
 *
 * The ItunesItem component is mostly a presentational
 * component to display the individual project Item objects
 *
 * This component is used in two areas. One is in the ItunesStore
 * to render the itunes items fetched from iTunes API. The second
 * place is from the Favourites component to render the items
 * saved as favourites.
 *
 * This enhances efficiency in the code since we re-use a
 * component instead of duplicating the same code. In this
 * case we have a switch in the rendering of the buttons.
 * If the item is coming from ItunesStore it renders the
 * "Add to favourites" button, otherwise it renders the
 * "Remove" button.
 *
 * The main functionality in the componet is to fire
 * the event handlers passed down from parent, depending
 * on where it is rendered. The handleAddToFavouritesItunes
 * passed from the ItunesStore component and the
 * handleRemoveFavouriteItem passed down when it is rendered
 * by the Favourites component
 *
 * The presenational bit of the component is display the
 * card information from its props as passed down from
 * the parent component.
 *
 */

export default function ItunesItem({
  itunesItem,
  isFromStore,
  handleAddToFavouriteItunes,
  handleRemoveFavouriteItem,
}) {
  //Destructuring the keys from the object
  const { collectionName, collectionArtistName, artistName, artworkUrl100 } =
    itunesItem;

  // State variables to determine whether the card has
  // been added to favourites and switch values as well
  // as disable the button
  const [isAddedToFavourites, setIsAddedToFavourites] = useState(false);

  return (
    <div>
      <Card className="container py-5 h-100 card-style">
        <Card.Img variant="top" src={artworkUrl100} />

        <Card.Body>
          <Card.Title>{collectionName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {artistName}
          </Card.Subtitle>
          <Card.Text>{collectionArtistName}</Card.Text>
          <div className="buttons-wrapper">
            {isFromStore ? (
              <Button
                id="favourite-button"
                className="edit-button"
                variant="light"
                onClick={() => {
                  handleAddToFavouriteItunes(itunesItem);
                  setIsAddedToFavourites(true);
                }}
                disabled={isAddedToFavourites}
              >
                {!isAddedToFavourites ? "Add to favourites" : "Already Added!"}
              </Button>
            ) : (
              <Button
                className="delete-button"
                variant="light"
                onClick={() => {
                  handleRemoveFavouriteItem(itunesItem.uniqueId);
                }}
              >
                Remove
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
