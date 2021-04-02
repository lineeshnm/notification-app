import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { getNotifications, removeNotification } from "../api"
import { useHistory } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import BackupIcon from '@material-ui/icons/Backup'
import BugReportIcon from '@material-ui/icons/BugReport'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import ScheduleIcon from '@material-ui/icons/Schedule'
import AddAlertIcon from '@material-ui/icons/AddAlert'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import { Button } from 'react-bootstrap';
import { isAuth } from '../actions/auth';
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

  const typeIcons = {
    News: AnnouncementRoundedIcon,
    Event: CalendarTodayIcon,
    Activity: BackupIcon,
    Incident: BugReportIcon
  }

  const statysIcons = {
    New: NewReleasesIcon,
    Scheduled: ScheduleIcon,
    Progress: AddAlertIcon,
    Current: AutorenewIcon,
    Fixed: GpsFixedIcon,
    Completed: CheckCircleOutlineIcon
  }
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
                    <Fab colour="secondary" fontSize="large" component={typeIcons[notification.notification_type]}></Fab>
                    {' '}{notification.notification_type}
                  </td>
                  <td>
                    {notification.message}
                  </td>
                  <td>
                    <Fab colour="secondary" fontSize="large" component={statysIcons[notification.status]}></Fab>
                    {' '}{notification.status}
                  </td>
                  { isAuth() && (
                    <React.Fragment>
                    <td>
                      <Link to={`/edit/${notification._id}`}><Fab color="secondary" aria-label="edit"><EditIcon /></Fab></Link>
                    </td>
                    <td>
                      <Fab colour="secondary" aria-label="delete" onClick={() => deleteConfirm(notification._id)}><DeleteIcon /></Fab>
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