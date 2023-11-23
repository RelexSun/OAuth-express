const express = require("express");
const groceriesRoutes = require("./routes/gorceries");
const marketsRoutes = require("./routes/markets");

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

// a good practice is to prefix '/api/v1'
app.use("/api/v1/groceries", groceriesRoutes);
app.use("/api/v1/markets", marketsRoutes);

app.listen(PORT, () => {
  console.log(`Running express server on port ${PORT}!!!`);
});
