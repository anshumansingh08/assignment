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

  const handleDeleteApplicant = (id: number) => {
    setApplicants(applicants.filter((applicant) => applicant.id !== id));
  };
  const handleUpdateApplicant = (
    id: number,
    updatedApplicant: Omit<Applicant, "id">
  ) => {
    setApplicants(
      applicants.map((applicant) =>
        applicant.id === id ? { ...updatedApplicant, id } : applicant
      )
    );
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
          element={
            <ApplicantTable
              applicants={applicants}
              onDeleteApplicant={handleDeleteApplicant}
              onUpdateApplicant={handleUpdateApplicant}
            />
          }
        />
      </RouteData>
    </>
  );
};

export default Routes;
