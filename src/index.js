const express = require("express");
const burgerRoute = require("./routes/burgers");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(burgerRoute);
app.use(express.static("public"));

app.use((req, res, next) => {
  res
    .status(404)
    .send({ Error: "Bad request, the page you want to find does not exist" });
});

app.listen(PORT, () => console.log(`Server is running in Port ${PORT}`));
