import React from "react";
import "./card.scss";

import play from "../../assets/images/playButton.svg";
import star from "../../assets/images/star.svg";

const Card = (props) => {
  return (
    <div className="card">
      <div className="imgContainer">
        <img
          src={`https://image.tmdb.org/t/p/original${props.image}`}
          alt="movie poster"
          onClick={props.onClicking}
        />
      </div>
      <div className="cardHead">
        <div className="cardTitleWrapper">
          <h3>{props.title}</h3>
          <div className="rating">
            <img src={star} alt="star" />
            <p>{props.rating}/5</p>
          </div>
        </div>
        <img
          className="play"
          src={play}
          alt="play"
          onClick={props.onClicking}
        />
      </div>
    </div>
  );
};

export default Card;
