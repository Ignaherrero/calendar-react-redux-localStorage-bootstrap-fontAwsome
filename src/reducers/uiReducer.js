import { types } from "../types/types";

const initialState = {
  modalOpen: false,
};

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.uiOpenModal:
      return { ...state, modalOpen: true };
    case types.uiCloseModal:
      return { ...state, modalOpen: false };
    default:
      return state;
  }
};

export default uiReducer;
