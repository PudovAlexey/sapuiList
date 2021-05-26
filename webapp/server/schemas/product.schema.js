const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: String,
    goodArticle: Number,
    icon: String,
    volumeInStock: Number,
    choosedItems: Number,
    TotalAmount: Number,
    productRating: Number,
    availableSizes: [String],
    choosedSize: String,
    choosedColor: String,
    avalibleColor: String,
    tags: [String],
    img: [String],
    currentPrice: Number,
    priceBeforeDiscount: Number,
    discountPercentage: Number,
    description: String,
    curreny: String,
    parentCategory: { type: Types.ObjectId, ref: 'Category' },
    reviews: { type: Types.ObjectId, ref: 'Reviews' }
})

  module.exports = model("Product", schema)