import React, { useEffect, useState } from "react";
import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import { messages } from "../helpers/calendar-messages-es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../actions/uiActions";
import { eventClearActive, eventSetActive } from "../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");
const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const [lastView, setLastView] = useState(localStorage.getItem("lastView"));
  const { events: myEventsList, activeEvent } = useSelector(
    (state) => state.calendar
  );
  const dispatch = useDispatch();

  const onDoubleclick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActive());
  };
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: "0.8",
      display: "block",
      color: "white",
    };
    return { style };
  };

  useEffect(() => {
    setLastView(localStorage.getItem("lastView"));
  }, []);

  return (
    <>
      <Navbar />
      <h1>Calendar</h1>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleclick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        onSelectSlot={onSelectSlot}
        selectable={true}
      />
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
    </>
  );
};

export default CalendarScreen;
