import React, { useState, useEffect } from "react";
import { getNotifications } from "../api"

import { Alert, Badge, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css'

const PreviewNotification = () => {
  const [items, setItems] = useState([])

  const typeTable = {
    Event : 'primary',
    Activity: 'success',
    Incident: 'danger',
    News: 'info'
  }

  const iconTable = {
    Event : 'fa-calendar',
    Activity: 'fa-wrench',
    Incident: 'fa-indent',
    News: 'fa-newspaper-o'
  }

  const statusTable = {
    Scheduled: 'primary',
    New: 'secondary',
    Progress: 'warning',
    Current: 'danger',
    Fixed: 'success',
    Completed: 'info',
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const notifications = await getNotifications()
    setItems(notifications)
    // console.log(items)
  }

  const handleClick = () => {
    fetchItems()
  }

  return (
    <div className="container">
      <div className="mt-3">
        <h3>Preview Notifications</h3>
        <h2 className="blink"><i className="fa fa-bullhorn blink" />{' '}Accouncement</h2>
        <Button type="submit" variant='primary' onClick={handleClick} >Refresh the data</Button>
        <p>Auto refresh is coming up</p>
            {
              items && items.sort((a, b) => a.notification_type > b.notification_type ? 1: -1).map(notification => (
                <React.Fragment key={notification._id} >
                <Alert variant={typeTable[notification.notification_type]} >
                <i class={"fa fa-2x " + iconTable[notification.notification_type]} aria-hidden="true"></i>
                {' '}{notification.message}{' '}
                <Badge pill variant={statusTable[notification.status]} >{notification.status}</Badge>
                </Alert>
                </React.Fragment>
              ))
            }
      </div>
    </div>
  );
};

export default PreviewNotification