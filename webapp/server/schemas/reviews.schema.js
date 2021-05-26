const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    FirstName: String,
    LastName: String,
    mail: String,
    avatar: String,
    publicDate: {type: Date, default: Date.now},
    rating: String,
    message: String,
    product: { type: Types.ObjectId, ref: 'Product' }
})

  module.exports = model("Reviews", schema)