import React, { useCallback, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./ItunesItem.css";

/**
 *FIXME: UPDATE THE PARAGRAPHS 2 and 3
 * The ItunesItem component is mostly a presentational
 * component to display the individual project Item objects
 *
 * For efficiency we have included the functionality to allow
 * the user to edit some properties in the object or to delete
 * the entire item. The business logic for handling the PUT
 * and DELETE requests have been handed over to the parent
 * component WebProjects.
 *
 * However we handle the local state of the individiual project
 * items in this component including toggling the edit mode to
 * allow the user to edit the item, also handlign the form
 * input control handled by React. These states are local and
 * ephemeral and hence best handled here in the child
 *
 *
 */

export default function ItunesItem({
  itunesItem,
  isFromStore,
  handleAddToFavouriteItunes,
  handleRemoveFavouriteItem,
}) {
  // Object destructuring of the project item
  // We destructure the properties of the object
  // to be used in the below
  //Destructing the keys from the object
  const {
    wrapperType,
    collectionName,
    collectionArtistName,
    trackName,
    artistName,
    artworkUrl100,
  } = itunesItem;

  // State variables
  const [isAddedToFavourites, setIsAddedToFavourites] = useState(false);

  // FIXME: fix this it is not working
  const handleClick = useCallback(() => {
    handleAddToFavouriteItunes(itunesItem);
    setIsAddedToFavourites(true);
  }, [itunesItem, handleAddToFavouriteItunes]);

  if (!itunesItem)
    return <p>Search the iTunes and Apple Books Store to see the items</p>;

  // TODO: See where to put the link to the actual item in itunes (refer to the props from the json objects)
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />

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
                onClick={handleClick}
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
