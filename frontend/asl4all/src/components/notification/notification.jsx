import React from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const InfoNotificationComponent = () => {
  const createInfoNotification = () => {
    NotificationManager.info("Info message");
  };

  return (
    <div>
      <button className="btn btn-info" onClick={createInfoNotification}>
        Info
      </button>
      <NotificationContainer />
    </div>
  );
};

export default InfoNotificationComponent;
