const { Router, request } = require('express')
const mongoose = require('mongoose')
// const { update } = require('../schemas/productSchema')

const Product = require('../schemas/product.schema')
const Reviews = require('../schemas/reviews.schema')
const router = Router()

router.get('/:id', async (req, res) => {
    let rewiews = await Reviews.find({product: req.params.id})

    console.log(rewiews)
  
  
    res.json(rewiews)
  })

  router.put('/post/:id', async (req, res) => {
      let {FirstName, 
        LastName, 
        mail, 
        avatar, 
        publicDate,
        rating,
        message} = req.body
  
  
    let reviews = new Reviews(
        {LastName, mail, avatar, rating, message, product: req.params.id});

            await reviews.save()

            res.json(reviews)


  })

  module.exports = router