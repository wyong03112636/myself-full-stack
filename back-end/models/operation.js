const {
  Users
} = require("../utils/db");

const insert = function (data) {
  return new Users(data).save();
};
const findOne = function (condition) {
  return Users.findOne(condition);
};


module.exports = {
  insert,
  findOne
};