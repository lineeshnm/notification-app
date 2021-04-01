import React, { useEffect } from "react";
import { NotificationForm } from "./NotificationForm";
import { createNotifications } from "./api";
import { useHistory } from "react-router-dom";
import { isAuth } from './actions/auth';

export const CreateNotification = () => {
  const history = useHistory()
  
  useEffect(() => {
    // console.log(isAuth())
    !isAuth() && history.push("/");
  }, []);

  const onSubmit = async (data) => {
    // console.log(data)
    await createNotifications(data)
    history.push("/")
  };

  return (
    <div className="container">
      <div className="mt-3">
        <h3>Create Notification</h3>
        <NotificationForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};