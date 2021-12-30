import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./ItunesItem.css";

/**
 *
 * The WebProjectItem component is mostly a presentational
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
 * An interesting pattern implemented below is the dynamic
 * display of the value of the properties or the Form Control
 * depending on whether the user has toggled the edit mode on
 * or off. This is deemed the efficient and clean pattern rather
 * than having multiple return statements. The JavaScript
 * ternary operator has been useful here!
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

  // We use a single event handler using the [ and ] braces in
  // line with the guidance in the new React Docs
  // https://beta.reactjs.org/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax

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
                  handleRemoveFavouriteItem(itunesItem.id);
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
