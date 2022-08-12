import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../card";
import "./pagination.scss";
import leftArrow from "../../assets/images/leftArrow.svg";
import rightArrow from "../../assets/images/rightArrow.svg";

const Pagination = ({ data, heading, findPage, pageLimit, totalPage }) => {
  const navigate = useNavigate();
  const [pages] = useState(totalPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    findPage(currentPage);
    window.scrollTo({ behavior: "smooth", top: "0px" });
  }, [currentPage]);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, index) => start + index + 1);
  };

  const clickHandler = (id) => {
    navigate(`/detail/${id}`);
  };
  return (
    <div>
      <div className="headingContainer">
        <h2>{heading}</h2>
      </div>
      <div className="cardWrapper">
        {data.map((movie, index) => {
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

      {/* pagination*/}

      <div className="pagination">
        {/* previous button */}
        <img
          src={leftArrow}
          alt="left arrow"
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        />

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? "active" : ""}`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <img
          src={rightArrow}
          alt="right arrow"
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        />
      </div>
    </div>
  );
};

export default Pagination;
