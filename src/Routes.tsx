import React from "react";
import { Route, Routes as RouteData } from "react-router";
import FormData from "./component/FormData";
import NavBar from "./component/NavBar";
import TableData from "./component/TableData";

const Routes: React.FC = () => {
  return (
    <>
      <NavBar />
      <RouteData>
        <Route path="/" element={<FormData />} />
        <Route path="/table" element={<TableData />} />
      </RouteData>
    </>
  );
};

export default Routes;
