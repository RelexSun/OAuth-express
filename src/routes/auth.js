const { Router } = require("express");
const User = require("../database/schemas/userSchema");
const { hashPassword } = require("../utils/helpers");

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (req.session.user) {
      res.send("You are already logged in!");
    } else {
      req.session.user = {
        username,
      };
      res.send(req.session);
    }
  } else res.send(401);
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // $or is a logical operator in MongoDB
    const userDB = await User.findOne({ $or: [{ username }, { email }] });

    if (userDB) {
      res.status(400).send({ msg: "User already exist" });
    } else {
      const password = hashPassword(req.body.password);
      console.log(password);
      const newUser = await User.create({ username, password, email });
      res.send(201);
    }
  } catch (err) {
    console.log("error occured", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
