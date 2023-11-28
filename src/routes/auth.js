const { Router } = require("express");
const passport = require("passport");
const User = require("../database/schemas/userSchema");
const { hashPassword, comparePassword } = require("../utils/helpers");

const router = Router();

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.send(400);

//     const userDB = await User.findOne({ email });
//     if (!userDB) return res.send(401);

//     const isValid = comparePassword(password, userDB.password);
//     if (isValid) {
//       console.log("Welcome");
//       req.session.user = userDB;
//       return res.send(200);
//     } else {
//       console.log("Login failed");
//       return res.send(401);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// Don't have to write the code above
router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged in");
  res.send(200);
});

router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;

    // $or is a logical operator in MongoDB
    const userDB = await User.findOne({ email });

    if (userDB) {
      res.status(400).send({ msg: "User already exist" });
    } else {
      const password = hashPassword(req.body.password);
      console.log(password);
      const newUser = await User.create({ password, email });
      res.send(201);
    }
  } catch (err) {
    console.log("error occured", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
