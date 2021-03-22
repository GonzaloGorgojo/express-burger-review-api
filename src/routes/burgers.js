const BurgerModel = require("../models/burger.model");
const express = require("express");
const { json } = require("express");
const router = express.Router();

router.get("/api/reviews", (req, res) => {
  BurgerModel.find({})
    .select("userName shop country burger ranking comment -_id")
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/api/review/:userName", (req, res) => {
  if (!req.params.userName) {
    return res
      .status(400)
      .send({ Error: "We Need a User Name to find the review !" });
  }
  BurgerModel.findOne({
    userName: req.params.userName,
  })
    .select("userName shop country burger ranking comment -_id")
    .then((doc) => {
      if (doc == null) {
        return res.status(400).send({ Error: "No Review with that Username" });
      } else {
        res.json(doc);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/api/review", (req, res) => {
  let model = new BurgerModel(req.body);
  model
    .save()
    .then((doc) => {
      if (!doc || doc.length === 0) {
        return res.status(400).send(doc);
      } else {
        res.status(201).send({ Success: "Your review has been uploaded" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/api/review/:_id", (req, res) => {
  if (!req.params._id) {
    return res
      .status(400)
      .send({ Error: "You Need to send the id to update a Review" });
  }
  BurgerModel.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      res.json({ Success: "Your review has been updated" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/api/review/:_id", (req, res) => {
  if (!req.params._id) {
    return res
      .status(400)
      .send({ Error: "You Need to send the id to delete a Burger" });
  }
  BurgerModel.findOneAndRemove({
    _id: req.params._id,
  })
    .then((doc) => {
      if (doc == null) {
        return res.status(400).send({ Error: "No Review with that id" });
      } else {
        res.json({
          Success: `The review of User: ${doc.userName} has been removed`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
