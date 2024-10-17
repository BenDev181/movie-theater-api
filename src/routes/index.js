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

userRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    let user = await User.findByPk(id)
    res.json(user)
})

userRouter.get("/:id/shows", async (req, res) => {
    const id = req.params.id
    let user = await User.findByPk(id, {include: Show})
    res.json(user)
})






// showRouter
showRouter.get("/", async (req, res) => {
    let shows = await Show.findAll()
    res.json(shows)
})

showRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    let show = await Show.findByPk(id)
    res.json(show)
})

showRouter.get("/:id/users", async (req, res) => {
    const id = req.params.id
    let show = await Show.findByPk(id, {include: User})
    res.json(show)
})






module.exports = {
    userRouter,
    showRouter
}