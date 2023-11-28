const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../database/schemas/userSchema");
const { comparePassword } = require("../utils/helpers");

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      console.log(email);
      console.log(password);
      try {
        if (!email || !password) {
          done(new Error("No username or password"), null);
          // done with with authentication
          // done() takes in 2 arguments first one is error and second one is status
        }
        const userDB = await User.findOne({ email });
        if (!userDB) throw new Error("User not found");

        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
          console.log("Welcome");
          done(null, userDB);
        } else {
          console.log("Invalid email or password");
          done(null, null);
        }
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    }
  )
);
