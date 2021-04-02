import React, { useState, useEffect } from "react";
import { getNotifications } from "../api"

import { Button, Carousel, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Carousels = () => {
  const [items, setItems] = useState([])

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
        <h3>Notification Carousels</h3>
        <h2 className="blink"><i className="fa fa-bullhorn blink" />{' '}Accouncement</h2>
        <Button type="submit" variant='primary' onClick={handleClick} >Refresh the data</Button>
        <p>Auto refresh is coming up</p>
        <Carousel>
            {
              items && items.sort((a, b) => a.notification_type > b.notification_type ? 1: -1).map(notification => (
                <Carousel.Item key={notification._id} >
                <Image
                className="d-block w-100"
                src="../assets/logo512.png"
                alt={notification.notification_type}
                fluid 
                />
                <Carousel.Caption>
                    <h3>{notification.message}</h3>
                    <p>{notification.status}</p>
                </Carousel.Caption>
                </Carousel.Item>
              ))
            }
        </Carousel>
      </div>
    </div>
  );
};

export default Carousels