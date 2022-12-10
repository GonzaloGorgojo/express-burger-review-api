const express = require("express");
const router = express.Router();
const BurgerModel = require("../models/burger.model");

// Routes
/**
 * @swagger
 * /api/reviews:
 *  get:
 *    description: Use to request all the reviews
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Bad Request, page not Found
 *      '500':
 *         description: Some server error
 */
router.get("/api/reviews", (req, res) => {
  BurgerModel.find({})
    .select("userName shop country burger ranking comment status -_id")
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/**
 * @swagger
 * /api/review/{userName}:
 *  get:
 *    parameters:
 *      - name: userName
 *        in: path
 *        description: Name of userName
 *        required: true
 *    description: Use to request one particular user review
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request, need to send valid Username
 *      '500':
 *         description: Some server error
 */
router.get("/api/review/:userName", (req, res) => {
  if (!req.params.userName) {
    return res
      .status(400)
      .send({ Error: "We Need a User Name to find the review !" });
  }
  BurgerModel.findOne({
    userName: req.params.userName,
  })
    .select("userName shop country burger ranking comment status -_id")
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

/**
 * @swagger
 * /api/review:
 *   post:
 *     description: Use to to send one Burger review (need a unique UserName).
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: review
 *        description: The review to send.
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *            - country
 *            - shop
 *            - burger
 *            - ranking
 *          properties:
 *            userName:
 *              type: string
 *            country:
 *              type: string
 *            shop:
 *              type: string
 *            burger:
 *              type: string
 *            ranking:
 *              type: number
 *            comment:
 *              type: string
 *     responses:
 *       201:
 *         description: Your review has been uploaded.
 *       400:
 *          description: Bad request, missing body, Path {x} is required
 *       500:
 *         description: Some server error
 */
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
      res.status(400).json(err.message);
    });
});

/**
 * @swagger
 * /api/review/{_id}:
 *  put:
 *    summary: Only Admin can do this.
 *    parameters:
 *      - in: path
 *        name: _id
 *    description: Use to Update one particular user review.
 *    requestBody:
 *      required: true
 *    responses:
 *      200:
 *        description: The review has been updated.
 *      400:
 *        description: You Need to send id to update a Review.
 *      500:
 *        description: Some server error.
 */
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

/**
 * @swagger
 * /api/review/{_id}:
 *  delete:
 *    summary: Only Admin can do this.
 *    parameters:
 *      - in: path
 *        name: _id
 *    description: Use to delete one particular user review.
 *    requestBody:
 *      required: true
 *    responses:
 *      200:
 *        description: The review has been removed.
 *      400:
 *        description: You Need to send id to delete a Review.
 *      404:
 *        description: No Review with that id.
 *      500:
 *        description: Some server error.
 */
router.delete("/api/review/:_id", (req, res) => {
  if (!req.params._id) {
    return res
      .status(400)
      .send({ Error: "You Need to send the id to delete a Review" });
  }
  BurgerModel.findOneAndRemove({
    _id: req.params._id,
  })
    .then((doc) => {
      if (doc == null) {
        return res.status(404).send({ Error: "No Review with that id" });
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
