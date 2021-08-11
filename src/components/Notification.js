import React from "react";

const Notification = ({ message, isError }) => {
  const notificationStyle = {
    color: "green",
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 8,
    marginBottom: 8
  };
  const errorStyle = { ...notificationStyle, color: "red" };

  return message === null 
  ? null 
  : <div style={isError ? errorStyle : notificationStyle}>{message}</div>;
};

export default Notification;
