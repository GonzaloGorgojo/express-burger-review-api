const express = require("express");
const burgerRoute = require("./routes/routes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const swaggerOptions = {
  swaggerDefinition: {
    components: {},
    info: {
      version: "1.0.0",
      title: "Burgers REST API",
      description: "Burgers Reviews API",
      contact: {
        name: "Gonzalo Gorgojo",
      },
    },
  },

  apis: ["./routes/routes.js"],
};

app.use(cors());
app.use(express.json());
app.use(burgerRoute);
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use((req, res, next) => {
  res.status(404).send({
    Error: `Bad request, the page you want to find does not exist, try https://burgers-reviews.herokuapp.com/api/documentation`,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
