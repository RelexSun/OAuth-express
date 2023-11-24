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

// Don't save sensitive data as cookies
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

router.get("/shopping/cart", (req, res) => {
  const { cart } = req.session;
  if (!cart) {
    res.send("You have no cart session");
  } else {
    res.send(cart);
  }
});
router.post("/shopping/cart/item", (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  const { cart } = req.session;
  console.log(cartItem);
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.send(201);
});

module.exports = router;
