import React, { useState } from "react";
import Maps, { Marker, Popup } from "react-map-gl";
import placesData from "../data";
import Details from "./Details";
import pin from "../images/pin.png";

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    width: "100vw",
    height: "100vh",
    zoom: 12,
  });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState(placesData);
  const [price, setPrice] = useState("All");
  const [time, setTime] = useState("All");

  const handleTime = (event) => {
    setTime(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleFilter = () => {
    if (price !== "All") {
      if (time === "M") {
        setPlaces(
          placesData.filter(
            (place) => place.opening.morning === true && place.price === price
          )
        );
      } else if (time === "E") {
        setPlaces(
          placesData.filter(
            (place) => place.opening.evening === true && place.price === price
          )
        );
      } else {
        setPlaces(placesData.filter((place) => place.price === price));
      }
    } else {
      if (time === "M") {
        setPlaces(placesData.filter((place) => place.opening.morning === true));
      } else if (time === "E") {
        setPlaces(placesData.filter((place) => place.opening.evening === true));
      } else {
        setPlaces(placesData);
      }
    }
  };

  return (
    <>
      <Maps
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiaGFtbWFtNjE5IiwiYSI6ImNrYnA1ZXgzdTBuZ3IycHBuNGpoZGV6N24ifQ.sfHZ784od4twDcAK_6vF9w"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {places.map((place) => (
          <Marker
            key={place.title}
            latitude={place.latitude}
            longitude={place.longitude}
          >
            <img
              onClick={(e) => {
                e.preventDefault();
                setSelectedPlace(place);
              }}
              style={{ width: "3.7vw", height: "100%" }}
              src={pin}
              alt={place.title}
              title={place.title}
              className="img-responsive"
            />
            {viewport.zoom >= 11.5 && (
              <h6
                style={{
                  textShadow:
                    "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
                }}
              >
                {place.title}
              </h6>
            )}
          </Marker>
        ))}
        {selectedPlace && (
          <Popup
            latitude={selectedPlace.latitude}
            longitude={selectedPlace.longitude}
            onClose={() => setSelectedPlace(null)}
          >
            <Details place={selectedPlace} />
          </Popup>
        )}
        <div
          className="container"
          style={{ position: "fixed", zIndex: "999", marginLeft: "40%" }}
        >
          <div className="row">
            <div className="form-group">
              <h6
                style={{
                  textShadow:
                    "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
                }}
              >
                Opening time:
              </h6>
              <select
                className="form-control "
                onChange={handleTime}
                value={time}
              >
                <option value="M">Morning</option>
                <option value="E">Evening</option>
                <option value="All">All</option>
              </select>
            </div>
            <div class="form-group ml-5">
              <h6
                style={{
                  textShadow:
                    "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
                }}
              >
                Prices:
              </h6>
              <select
                className="form-control"
                onChange={handlePrice}
                value={price}
              >
                <option vlaue="premium">premium</option>
                <option value="normal">normal</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-info"
            style={{ marginRight: "78%" }}
            onClick={() => handleFilter()}
          >
            Filter
          </button>
        </div>
      </Maps>
    </>
  );
}
