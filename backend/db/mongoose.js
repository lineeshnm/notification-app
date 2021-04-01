const mongoose = require('mongoose')
// const cron = require("node-cron");
// const app = require('../server')
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

// io.of("/api/socket").on("connection", (socket) => {
//     console.log("socket.io: User connected: ", socket.id);
  
//     socket.on("disconnect", () => {
//       console.log("socket.io: User disconnected: ", socket.id);
//     });
//   });

const MONGODB_URL = 'mongodb://127.0.0.1:27017/notifications'
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("MongoDB database connected");

//   console.log("Setting change streams");
//   const notificationChangeStream = connection.collection("notifications").watch();

//   notificationChangeStream.on("change", (change) => {
//     switch (change.operationType) {
//       case "insert":
//         const notification = {
//           _id: change.fullDocument._id,
//           notification_type: change.fullDocument.notification_type,
//           message: change.fullDocument.message,
//           status: change.fullDocument.status,
//         };

//         io.of("/api/socket").emit("newNotification", notification);
//         break;
//       case "update":
//         const changes = {
//             _id: change.fullDocument._id,
//             notification_type: change.fullDocument.notification_type,
//             message: change.fullDocument.message,
//             status: change.fullDocument.status,
//           };
//           io.of("/api/socket").emit("updatedNotification", changes);
//           break;
//       case "delete":
//         io.of("/api/socket").emit("deletedNotification", change.documentKey._id);
//         break;
//     }
//   });
// });

// cron.schedule("0 0 0 * * *", async () => {
//     await connection.collection("thoughts").drop();
  
//     io.of("/api/socket").emit("thoughtsCleared");
//   });
  
// connection.on("error", (error) => console.log("Error: " + error));
  