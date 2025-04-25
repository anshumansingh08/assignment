import React from "react";
import { Route, Routes as RouteData, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ApplicantForm from "./component/ApplicantForm";
import ApplicantTable from "./component/ApplicantTable";
import NavBar from "./component/NavBar";
import {
  Applicant,
  addApplicant,
  deleteApplicant,
  selectApplicants,
  updateApplicant,
} from "./features/form/formSlice";

const Routes: React.FC = () => {
  const applicants = useAppSelector(selectApplicants);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddApplicant = (applicant: Applicant) => {
    dispatch(addApplicant(applicant));
    navigate("/table");
  };

  const handleDeleteApplicant = (id: number) => {
    dispatch(deleteApplicant(id));
  };

  const handleUpdateApplicant = (
    id: number,
    updatedApplicant: Omit<Applicant, "id">
  ) => {
    dispatch(updateApplicant({ id, updatedApplicant }));
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

export default React.memo(Routes);
