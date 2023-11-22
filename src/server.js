const express = require("express");

const app = express();
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Running express server on port ${PORT}!!!`);
});

app.get("/groceries", (req, res) => {
  res.send([
    {
      item: "milk",
      quantity: 2,
    },
    {
      item: "cereal",
      quantity: 1,
    },
    {
      item: "coke",
      quantity: 3,
    },
  ]);
});
