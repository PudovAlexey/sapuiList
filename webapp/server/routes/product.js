const { Router, request } = require('express')
const mongoose = require('mongoose')
// const { update } = require('../schemas/productSchema')
const Category = require('../schemas/productCategory.schema')
const Product = require('../schemas/product.schema')
const router = Router()

router.get('/', async (req, res) => {
  const body = req.body;

  let productCategory = await Category.find({})
  let product = await Product.find({})

 let CategoryModel = productCategory.map(cat => {
  let productModel = product.filter(prod => {


    if (cat._id.toString() === prod.parentCategory.toString()) {


      return prod
    }

  })
  return {...cat._doc, product: productModel}
 })


  res.json(CategoryModel)
})

let update = {volumeInStock: 50}

router.get('/test', async (req, res) => {
  const update = { volumeInStock: 50 };

  let test = await Product.findOne({product: {$elemMatch: {name: "nike"}}})

  // await test.save()
  })

module.exports = router