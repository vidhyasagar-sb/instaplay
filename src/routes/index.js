import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "../components/privateRoutes";
import Home from "../containers/home";
import Login from "../containers/login";
import MovieDetail from "../containers/movieDetail";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<MovieDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<h1> page not found </h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
