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

userRouter.put('/:userId/shows/:showId', async (req, res) => {
    const userId = req.params.userId;
    const showId = req.params.showId;
    const user = await User.findByPk(userId);
    const show = await Show.findByPk(showId);
    
    // Associate the user with the show
    await user.addShow(show);
  
    let foundUser = await User.findByPk(userId, {include: Show})
    res.json(foundUser)
  });






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

showRouter.put('/:id/available', async (req, res) => {
    const id = req.params.id
    const show = await Show.findByPk(id);
    if(show.available == false) {
        await Show.update({available: true}, {where: {available: false}});
    } else {
        await Show.update({available: false}, {where: {available: true}});
    }
    res.json(show)
});

showRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    await Show.destroy({where: {id: id}})
    let shows = await Show.findAll()
    res.json(shows)
})



module.exports = {
    userRouter,
    showRouter
}