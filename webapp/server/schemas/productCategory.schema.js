const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  Category: String,
  productInCategory: Number,
  id: Number,
  icon: String,
  product: [{ type: Types.ObjectId, ref: 'Product' }]
})

  module.exports = model("productcategories", schema)