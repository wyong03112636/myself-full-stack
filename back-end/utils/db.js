/* eslint-disable linebreak-style */
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myself", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Users = mongoose.model("users", {
  username: String,
  password: String,
  retype: String,
});
const product = mongoose.model("products", {
  productname: String,
  producttitle: String,
  productprice: String,
});

module.exports = {
  Users,
  product,
};
