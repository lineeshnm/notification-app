const express = require("express");
const cors = require("cors");
require('./db/mongoose')
const userRouter = require('./routes/user')
const NotificationRouter = require('./routes/notification')

const app = express();
// const port = process.env.PORT;
const port = 4000

app.use(cors());
app.use(express.json());
app.use(userRouter)
app.use(NotificationRouter)

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

module.exports = app