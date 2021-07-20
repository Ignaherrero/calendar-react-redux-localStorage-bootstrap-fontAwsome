import moment from "moment";
import { types } from "../types/types";

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: "algo",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      allDay: true,
      user: {
        _id: "123",
        name: "nacho",
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.eventSetActive:
      return { ...state, activeEvent: payload };
    case types.eventAddNew:
      return { ...state, events: [...state.events, payload] };
    case types.eventClearActive:
      return { ...state, activeEvent: null };
    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map((e) => (e.id === payload.id ? payload : e)),
      };
    case types.eventDelete:
      return {
        ...state,
        events: state.events.filter((e) => e.id !== state.activeEvent.id),
        activeEvent: null,
      };
    default:
      return state;
  }
};
