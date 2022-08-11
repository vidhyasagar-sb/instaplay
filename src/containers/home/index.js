import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./home.scss";

import Navbar from "../../components/navbar";
import Card from "../../components/card";

import banner from "../../assets/images/banner.png";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);

  const navigate = useNavigate();

  //trending movies
  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US&page=1"
      );
      setMovies(response.data.results);
    };
    getMovies();
  }, []);

  //Search results
  useEffect(() => {
    const getMovies = async (term) => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US&query=${term}&page=1&include_adult=false`
      );
      console.log(response.data);
      setResult(response.data.results);
    };

    if (searchTerm.length !== 0) {
      const cancelTimeout = setTimeout(() => {
        getMovies(searchTerm);
      }, 2000);

      return () => {
        clearTimeout(cancelTimeout);
      };
    }
  }, [searchTerm]);

  const clickHandler = (id) => {
    navigate(`/detail/${id}`);
  };

  const searchHandler = (data) => {
    setSearchTerm(data);
  };

  return (
    <div className="home">
      <Navbar searchBar={true} searchList={searchHandler} />
      <img className="banner" src={banner} alt="movie banner" />
      <div className="headingContainer">
        <h2>{result.length === 0 ? "Trending" : "Search Results:"}</h2>
      </div>
      <div className="cardWrapper">
        {(result.length === 0 ? movies : result).map((movie, index) => {
          return (
            <Card
              title={movie.title || movie.name}
              image={movie.poster_path}
              rating={(movie.vote_average / 2).toFixed(2)}
              key={index}
              onClicking={() => clickHandler(movie.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
