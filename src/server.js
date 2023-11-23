const express = require("express");

const app = express();
const PORT = 3001;

// this middleware allow us to send json to our server. Parsing data
app.use(express.json());

// this middleware allow us to request body in URL-encoded format.  Parsing data
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Running express server on port ${PORT}!!!`);
});

const groceriesList = [
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
];

app.get("/groceries", (req, res) => {
  res.send(groceriesList);
});

app.get("/groceries/:item", (req, res) => {
  const { item } = req.params;
  const gorceriesItem = groceriesList.find((g) => g.item === item);
  res.send(gorceriesItem);
});

app.post("/groceries", (req, res) => {
  console.log(req.body);
  groceriesList.push(req.body);
  res.send(201);
});
