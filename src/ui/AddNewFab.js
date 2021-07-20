import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../actions/uiActions";

export const AddNewFab = () => {
  const dispatch = useDispatch();
  const handleCreateNewEvent = (e) => {
    dispatch(uiOpenModal());
  };

  return (
    <button className="btn btn-primary fab" onClick={handleCreateNewEvent}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
