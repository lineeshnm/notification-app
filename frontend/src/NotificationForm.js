import React from "react";
import { useForm } from "react-hook-form";

import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const NotificationForm = ({ notification, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { 
      message: notification ? notification.message : "",
      notification_type: notification ? notification.notification_type: "",
      status: notification ? notification.status: ""
   },
  });

  const submitHandler = handleSubmit((data) => {
    console.log("data" + data)
    onSubmit(data)
  });

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label>Notification Type</Form.Label>
        <Form.Control as="select" name="notification_type" ref={register}>
          <option aria-label="None" value="" />
          <option value="Event">Event</option>
          <option value="Activity">Activity</option>
          <option value="Incident">Incident</option>
          <option value="News">News</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Notification Message</Form.Label>
        <Form.Control ref={register} name="message" type="text" placeholder="Enter notification message" />
        <Form.Text className="text-muted">
          eg: Patching activity in NP GL2 Cluster.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Notification Status</Form.Label>
        <Form.Control as="select" name="status" ref={register}>
          <option aria-label="None" value="" />
          <option value="Progress">Progress</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Fixed">Fixed</option>
          <option value="Current">Current</option>
          <option value="Completed">Completed</option>
        </Form.Control>
      </Form.Group>
      <Button type="submit" variant='primary'>
        Save Notification
      </Button>
    </Form>
  );
};