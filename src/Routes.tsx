import React, { useState } from "react";
import { Route, Routes as RouteData, useNavigate } from "react-router";
import ApplicantForm from "./component/ApplicantForm";
import ApplicantTable from "./component/ApplicantTable";
import NavBar from "./component/NavBar";
import { Applicant } from "./features/form/formSlice";

const Routes: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const navigate = useNavigate();
  const handleAddApplicant = (applicant: Applicant) => {
    console.log(applicant);
    setApplicants([...applicants, applicant]);
    navigate("/table");
  };
  return (
    <>
      <NavBar />
      <RouteData>
        <Route
          path="/"
          element={<ApplicantForm onApplicantAdded={handleAddApplicant} />}
        />
        <Route
          path="/table"
          element={<ApplicantTable applicants={applicants} />}
        />
      </RouteData>
    </>
  );
};

export default Routes;
