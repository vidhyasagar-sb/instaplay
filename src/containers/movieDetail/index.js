import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar";

import "./movieDetail.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../components/modal";

const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [movieVideo, setMovieVideo] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieDetail = async (id) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f`
        );
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    };
    getMovieDetail(params.id);
  }, [params.id]);

  useEffect(() => {
    const getMovieVideo = async (id) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US`
        );
        setMovieVideo(
          response.data.results.filter((movie) => {
            return movie.type === "Trailer";
          })[0]
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    getMovieVideo(params.id);
  }, [params.id]);

  const goBackHomepage = () => navigate(-1);

  if (openModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  if (loading) {
    return <div className="loader">Loading</div>;
  }

  if (Object.keys(movieDetails).length === 0) {
    return <h2>Page not available</h2>;
  }

  if (!loading && Object.keys(movieDetails).length !== 0) {
    return (
      <div className="movieDetail">
        <Navbar logoutFeature={true} />
        <div className="descriptionWrapper">
          <div className="movieDescription">
            <p className="leftArrow" onClick={goBackHomepage}>
              &larr;
            </p>
            <h2>{movieDetails.title}</h2>
            <p className="rating">
              Rating: {movieDetails.vote_average.toFixed(1) / 2}/5
            </p>
            <p className="plot">{movieDetails.overview}</p>
            <div className="releaseDateWrapper">
              <p className="releaseTitle">Release Date</p>
              <p>{movieDetails.release_date.slice(0, 4)}</p>
            </div>
            <div className="languageWrapper">
              <p>Original Language</p>
              <p>
                {movieDetails.spoken_languages
                  .map((lang) => {
                    return lang.english_name;
                  })
                  .join(", ")}
              </p>
            </div>
            {movieVideo ? (
              <button className="trailerBtn" onClick={() => setOpenModal(true)}>
                Play trailer
              </button>
            ) : (
              ""
            )}
            {openModal && (
              <Modal closeModal={setOpenModal} videoKey={movieVideo.key} />
            )}
          </div>
          <div className="backdropContainer">
            <img
              src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
              alt="backdrop"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default MovieDetail;
