var express = require("express");
var router = express.Router();
const { User, Car } = require("../models/User");

router.get("/all", async (req, res) => {
  const users = await User.findAll({ include: Car });
  res.status(200).send(users);
});

router.get("/insert", (req, res) => {
  res.redirect("/users/all");
});
//Search user
router.get("/search:name?", async (req, res) => {
  const { name } = req.query;
  const user = await User.findOne({ where: { name } });
  user ? res.send(user.toJSON()) : res.send("Not User Found");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  user ? res.send(user.toJSON()) : res.send("Not User Found");
});

//Edit user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  const editUser = await User.update(req.body, { where: { id } });
  editUser ? res.send(user) : res.send("User has not been modified");
});

//Create user
router.post("/insert", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const newUser = {
      email,
      password,
      name,
    };
    const createdUser = await User.create(newUser);
    res.send(createdUser.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error, Email already in use",
    });
  }
});

//Delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteUser = await User.destroy({ where: { id } });
  res.send(`The user with the id: ${id}, has been deleted`);
});

// CAR
router.post("/add", async (req, res) => {
  try {
    const { model, color, description, UserId } = req.body;
    const newCar = {
      model,
      color,
      description,
      UserId,
    };
    const createCar = await Car.create(newCar);
    res.send(createCar.toJSON());
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Error ",
    });
  }
});

module.exports = router;
