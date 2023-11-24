const { Router } = require("express");

const router = Router();

router.use((req, res, next) => {
  if (req.session.user) next();
  else res.send(401);
});

const supermarkets = [
  {
    id: 1,
    store: "KFC",
    miles: 0.6,
  },
  {
    id: 2,
    store: "Burger King",
    miles: 2.6,
  },
  {
    id: 3,
    store: "Carl's Jr",
    miles: 3.6,
  },
  {
    id: 4,
    store: "Psar Derm Kor",
    miles: 1.6,
  },
  {
    id: 5,
    store: "Toul kork",
    miles: 0.7,
  },
];

// route parameters are for identifiying resourses
// query parameters are for filter out or sort out resourses

// review this part
router.get("", (req, res) => {
  const { miles } = req.query;
  const parsedMiles = parseInt(miles);

  if (!isNaN(parsedMiles)) {
    const filteredStores = supermarkets.filter((s) => s.miles <= parsedMiles);
    res.send(filteredStores);
  } else res.send(supermarkets);
});

module.exports = router;
