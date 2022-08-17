import React, { useEffect, useState } from "react";
import "./card.scss";

import play from "../../assets/images/playButton.svg";
import star from "../../assets/images/star.svg";
import axios from "axios";

const Card = (props) => {
  const [hover, setHover] = useState(false);
  const [video, setVideo] = useState();

  useEffect(() => {
    const getMovieVideo = async (id) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US`
        );

        setVideo(
          response.data.results.filter((movie) => {
            return movie.type === "Trailer";
          })[0]
        );
      } catch (error) {
        console.log("error", error);
      }
    };

    getMovieVideo(props.id);
  }, [props.id]);

  let content;

  console.log(video);

  if (hover && video) {
    content = (
      <div className="videoContainer">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.key}?controls=0&autoplay=1&mute=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div className="card">
      <div
        className="imgContainer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${props.image}`}
          alt="movie poster"
          onClick={props.onClicking}
        />
        {content}
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
