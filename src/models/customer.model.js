const mongoose = require("mongoose");
require("dotenv").config();

const USER = process.env.user;
const PASS = process.env.pass;
const DB = process.env.db;
const SERVER = process.env.server;

const URLDB = `mongodb+srv://${USER}:${PASS}@${SERVER}/${DB}?retryWrites=true&w=majority`;

mongoose.connect(URLDB, { useNewUrlParser: true, useUnifiedTopology: true });

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Customer", CustomerSchema);
