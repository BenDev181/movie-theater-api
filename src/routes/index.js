const express = require("express");
const app = express();
const { User, Show } = require("../../models/index.js");
const db = require("../../db/connection.js");

const userRouter = express.Router()
const showRouter = express.Router()
const {check, validationResult} = require("express-validator")

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// userRouter
userRouter.get("/", async (req, res) => {
    let users = await User.findAll()
    res.json(users)
})


// showRouter







module.exports = {
    userRouter,
    showRouter
}