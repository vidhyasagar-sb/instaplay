import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../containers/home";
import MovieDetail from "../containers/movieDetail";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
