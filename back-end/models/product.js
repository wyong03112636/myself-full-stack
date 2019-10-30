const {
  product
} = require('../utils/db');

const save = (data) => {
  return new product(data).save();
}
const findAll = () => {
  return product.find({}).sort({
    _id: -1
  });
}
const upData = async (data) => {
  return await product.findByIdAndUpdate(data.id, data)
}
const findOne = async (id) => {
  return await product.findById(id)
}
const remove = async (id) => {
  return await product.findByIdAndDelete(id)
}
const search = async (keywords) => {
  let reg = new RegExp(keywords, 'gi');
  return await product.find({}).or([{
    productname: reg
  }, {
    producttitle: reg
  }, {
    productprice: reg
  }])
}
module.exports = {
  save,
  findAll,
  upData,
  findOne,
  remove,
  search
}