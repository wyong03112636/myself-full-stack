const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myself", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Users = mongoose.model("users", {
  username: String,
  password: String,
  retype: String
});

module.exports = {
  Users
};
