let express = require('express')
let routes = require('./routes/servers')
let MongoClient = require('mongodb').MongoClient;
let {createServer} = require('http')
let mongoose = require('mongoose')
let app = express();

mongoose.connect('mongodb://localhost:27017/marchoShop?readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
  useNewUrlParser: true
})
.then(() => console.log('connected'))
.catch(err => console.log('ERR'))

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  types: {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    required: true
  },

  icon: {
    type: String,
    required: true
  },

  product: {
    type: Array,
    required: true
  },
})
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(routes)

const Product = mongoose.model("products", productSchema)

app.get('/product', (req, res) => {
  const body = req.body;
  let test = Product.find({})

  test.then(data => res.send(data))
})

app.post('/product/:categoryId/product/:productId', (req, res) => {
  let body = req.body
  let categoryId = req.params.categoryId
  let productId = req.params.productId

  let test = Product.find({})

  test.then(data => res.send())
})

let PORT = 3000

let server = createServer(app);

server.listen(PORT, () => {
  console.log(`server has been started on port ${PORT}...`)
})
