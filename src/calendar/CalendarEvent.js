import React from "react";

export const CalendarEvent = ({ event }) => {
  const { title, user } = event;
  return (
    <>
      <h1>{title}</h1>
      <p>{user?.name}</p>
    </>
  );
};
