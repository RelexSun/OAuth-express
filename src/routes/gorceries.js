const { Router } = require("express");

const router = Router();

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

// add cookies and set expire cookies time
router.get("/", (req, res) => {
  res.cookie("visited", true, {
    maxAge: 60000,
  });
  res.send(groceriesList);
});

router.get("/:item", (req, res) => {
  console.log(req.cookies);
  const { item } = req.params;
  const gorceriesItem = groceriesList.find((g) => g.item === item);
  res.send(gorceriesItem);
});

router.post("/", (req, res) => {
  console.log(req.body);
  groceriesList.push(req.body);
  res.send(201);
});

module.exports = router;
