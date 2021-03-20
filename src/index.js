const express = require("express");
const customerRoute = require("./routes/customer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

app.use(customerRoute);
app.use(express.static("public"));

app.use((req, res, next) => {
  res.status(404).send({ Error: "Bad request" });
});

app.listen(PORT, () => console.log(`Server is running in Port ${PORT}`));
