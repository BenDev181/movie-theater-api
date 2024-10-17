const express = require("express")
const app = express();

const { userRouter, showRouter } = require("./routes/index.js")

app.use(express.json())

app.use("/users", userRouter);
app.use("/shows", showRouter);


module.exports = app;