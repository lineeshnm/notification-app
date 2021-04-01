export const getNotifications = () => fetch("http://localhost:4000/notifications").then(res => res.json())
// export const getNotifications = () => fetch("http://localhost:4000/notifications?sortBy=createdAt:desc").then(res => res.json())

export const createNotifications = (notification) => fetch("http://localhost:4000/notifications", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(notification)
}) 

export const updateNotification = (notification, id) => fetch(`http://localhost:4000/notifications/${id}`, {
  method: "PATCH",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(notification)
})  

export const removeNotification = (id) => fetch(`http://localhost:4000/notifications/${id}`, {
  method: "DELETE",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
})  

export const getNotification = (id) => fetch(`http://localhost:4000/notifications/${id}`).then(res => res.json())