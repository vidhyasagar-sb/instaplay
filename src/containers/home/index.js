import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.scss";

import loading from "../../assets/images/loading.gif";

import Navbar from "../../components/navbar";
import Pagination from "../../components/pagination";
import Slider from "../../components/slider";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loader, setLoader] = useState(false);
  const [bannerMovies, setBannerMovies] = useState([]);

  const navigate = useNavigate();

  //trending movies
  useEffect(() => {
    const getMovies = async () => {
      // try{}
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&page=${page}`
      );
      setMovies(response.data.results);
    };
    getMovies();
  }, [page]);

  //Banner carousel
  useEffect(() => {
    const getPopularMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US&page=1`
      );
      setBannerMovies(response.data.results.slice(0, 5));
    };
    getPopularMovies();
  }, []);

  //Search results
  useEffect(() => {
    const getMovies = async (term) => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=d0605f7c77a7e9ffd22f6f77c12e0f8f&language=en-US&query=${term}&page=${page}&include_adult=false`
      );
      setTotalPages(response.data.total_pages);
      setResult(response.data.results);
      setLoader(false);
    };

    if (searchTerm.length !== 0) {
      const cancelTimeout = setTimeout(() => {
        getMovies(searchTerm);
      }, 1000);

      return () => {
        clearTimeout(cancelTimeout);
      };
    }
    if (searchTerm.length === 0) {
      setLoader(false);
    }
  }, [searchTerm, page]);

  const pageHandler = (num) => {
    setPage(num);
  };

  const searchHandler = (data) => {
    setSearchTerm(data);
    setLoader(true);
    setPage(1);
  };

  const redirectHome = () => {
    navigate(0);
  };

  let content;

  if (searchTerm.length !== 0 && loader) {
    content = <img className="loader" src={loading} alt="loading" />;
  }

  if (searchTerm.length === 0) {
    content = (
      <Pagination
        originalData={[...movies]}
        data={movies}
        heading={"Trending"}
        findPage={pageHandler}
        pageLimit={6}
        totalPage={totalPages}
      />
    );
  }

  if (result.length !== 0 && searchTerm.length !== 0) {
    content = (
      <Pagination
        originalData={[...result]}
        data={result}
        heading={"Search results:"}
        findPage={pageHandler}
        pageLimit={totalPages > 6 ? 6 : totalPages}
        totalPage={totalPages}
      />
    );
  }
  if (totalPages === 0) {
    content = (
      <>
        <div className="headingContainer">
          <h2>Search results:</h2>
        </div>
        <h2 className="noResult">No movies found</h2>
        <p className="homepageRedirect">
          <span onClick={redirectHome}>click here</span> to go back to homepage
        </p>
      </>
    );
  }
  return (
    <div className="home">
      <Navbar
        searchBar={true}
        searchList={searchHandler}
        loader={loader}
        logoutFeature={true}
      />
      {bannerMovies.length !== 0 && <Slider movie={bannerMovies} />}
      {content}
    </div>
  );
};

export default Home;
