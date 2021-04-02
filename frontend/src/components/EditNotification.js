import React, { useState, useEffect } from "react";
import { NotificationForm } from "./NotificationForm";
import { useRouteMatch, useHistory } from "react-router-dom";
import { getNotification, updateNotification } from "../api";

export const EditNotification = () => {
  const match = useRouteMatch()
  const [notification, setNotification] = useState();
  const history = useHistory()

  useEffect(() => {
    const fetchNotification = async () => {
      const notification = await getNotification(match.params.id)
      setNotification(notification)
    }
    fetchNotification()
  }, []);

  const onSubmit = async (data) => {
    await updateNotification(data, match.params.id)
    history.push("/")
  }

  return notification ? (
    <div className="container">
      <div className="mt-3">
        <h3>Edit Notification Item</h3>
        <NotificationForm notification={notification} onSubmit={onSubmit}/>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};