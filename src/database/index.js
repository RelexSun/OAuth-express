const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://sun:12345@cluster0.zdgud6i.mongodb.net/geroceries")
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log(err);
  });
