import React from "react";

export default function Details(props) {
  const { place } = props;
  return (
    <div style={{ width: "15vw" }}>
      <img
        class="card-img-top"
        src={place.img}
        style={{ width: "14vw", height: "14vh" }}
        alt={place.title}
      />

      <div class="card-body">
        <h5 class="card-title">{place.title}</h5>
        {place.opening.morning ? (
          <h6>opening : 8:00 AM</h6>
        ) : (
          <h6> opening : 4:00 PM </h6>
        )}

        {place.opening.evening ? (
          <h6> closing : 1:00 AM </h6>
        ) : (
          <h6>closing : 3:30 PM</h6>
        )}
        {place.price === "premium" ? (
          <h6>avarage price per meal : 35-60 € </h6>
        ) : (
          <h6>avarage price per meal : 15-30 € </h6>
        )}
      </div>
    </div>
  );
}
