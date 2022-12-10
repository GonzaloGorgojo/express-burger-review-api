const mongoose = require("mongoose");
require("dotenv").config();

const USER = process.env.user;
const PASS = process.env.pass;
const DB = process.env.db;
const SERVER = process.env.server;

const URLDB = `mongodb+srv://${USER}:${PASS}@${SERVER}/${DB}?retryWrites=true&w=majority`;

mongoose.connect(URLDB, { useNewUrlParser: true, useUnifiedTopology: true });

const BurgerSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  shop: { type: String, required: true },
  country: { type: String, required: true },
  burger: { type: String, required: true },
  ranking: { type: Number, required: true, min: 0, max: 100 },
  comment: { type: String },
  status: { type: Number, default: 1 },
});

module.exports = mongoose.model("reviews", BurgerSchema);
