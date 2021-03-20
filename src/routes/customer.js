const CustomerModel = require("../models/customer.model");
const express = require("express");
const { json } = require("express");
const router = express.Router();

router.get("/customers", (req, res) => {
  CustomerModel.find({})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/customer/:name", (req, res) => {
  if (!req.params.name) {
    return res.status(400).send({ error: "We Ned a name to find a customer" });
  }
  CustomerModel.findOne({
    name: req.params.name,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/customer", (req, res) => {
  let model = new CustomerModel(req.body);
  model
    .save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        return res.status(400).send(doc);
      } else {
        res.status(201).send(doc);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/customer/:email", (req, res) => {
  if (!req.params.email) {
    return res
      .status(400)
      .send({ error: "You Need to send Email to update user" });
  }
  CustomerModel.findOneAndUpdate(
    {
      email: req.params.email,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/customer/:email", (req, res) => {
  if (!req.params.email) {
    return res.status(400).send({ Error: "Missing Email" });
  }
  CustomerModel.findOneAndRemove({
    email: req.params.email,
  })
    .then((doc) => {
      if (doc == null) {
        return res.status(400).send({ Error: "No User with that Email" });
      } else {
        res.json(doc);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
