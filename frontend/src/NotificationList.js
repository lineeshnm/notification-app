import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { getNotifications, removeNotification } from "./api"
import { useHistory } from "react-router-dom";

import { Button } from 'react-bootstrap';
import { isAuth } from './actions/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

export const NotificationList = () => {
  const [items, setItems] = useState([])
  const history = useHistory()
  // console.log(items)

  useEffect(() => {
    const fetchItems = async () => {
      const notifications = await getNotifications()
      setItems(notifications)
    }
    fetchItems()
  }, [items])

  const deleteConfirm = _id => {
    let answer = window.confirm("Are you sure to delete this Item?")
    if (answer) {
      removeNotification(_id)
      history.push("/")
    }
  }

  return (
    <div className="container">
      <div className="mt-3">
        <h3>Current Notification List</h3>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Type</th>
              <th>Message</th>
              <th>Status</th>
              { isAuth() && (
                <React.Fragment>
                  <th>Edit</th>
                  <th>Delete</th>
                </React.Fragment>
              )}
            </tr>
          </thead>
          <tbody>
            {
              items.map(notification => (
                <tr key={notification._id}>
                  <td>
                    {notification.notification_type}
                  </td>
                  <td>
                    {notification.message}
                  </td>
                  <td>
                    {notification.status}
                  </td>
                  { isAuth() && (
                    <React.Fragment>
                    <td>
                      <Link to={`/edit/${notification._id}`}>Edit</Link>  
                    </td>
                    <td>
                      <Button variant="danger" type='submit' onDoubleClick={() => deleteConfirm(notification._id)} title="Double Click to delete!" >Delete</Button>
                    </td>
                    </React.Fragment> 
                    )}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};