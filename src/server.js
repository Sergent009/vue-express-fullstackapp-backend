import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import path from 'path'

const app = express()
app.use(bodyParser.json())


// we want to serve the assets directory whenever whenever a request is recieved on this /images route
app.use('/assets', express.static(path.join(__dirname, '../assets')))

app.get('/api/products',async (req, res) => {
  // connecting to mongodb database named 'vue-db'
  const client = await MongoClient.connect(
    'mongodb://localhost:27017',
    {useNewUrlParser: true, useUnifiedTopology: true},
    {serverSelectionTimeoutMS: 5000, }
  )
  const db = client.db('vue-db')
  const products = await db.collection('products').find({}).toArray()  
  res.status(200).json(products)
  client.close()

})

app.get('/api/users/:userId/cart',async (req, res) => {
  const {userId} = req.params
  
  // connecting to mongodb database named 'vue-db'
  const client = await MongoClient.connect(
    'mongodb://localhost:27017',
    {useNewUrlParser: true, useUnifiedTopology: true},
    {serverSelectionTimeoutMS: 5000, }
  )
  const db = client.db('vue-db')  
  const user = await db.collection('users').findOne({ id: userId})
  
  // if the user doesn't exists
  if(!user) return res.status(404).json('Could Not Find The User!')
  // else if the user exists
  const products = await db.collection('products').find({}).toArray()
  const cartItemsIds = user.cartItems
  const cartItems = cartItemsIds.map(id => 
    products.find(product => product.id === id)
    )
  
  res.status(200).json(cartItems)
  client.close()
})

app.get('/api/products/:productId',async (req, res) => {
    const {productId} = req.params

    // connecting to mongodb database named 'vue-db'
    const client = await MongoClient.connect(
    'mongodb://localhost:27017',
    {useNewUrlParser: true, useUnifiedTopology: true},
    {serverSelectionTimeoutMS: 5000, }
  )
  const db = client.db('vue-db')
  const product = await db.collection('products').findOne({id: productId}) 


    // if product exists
    if(product){
        res.status(200).json(product)
    }
    else{
        res.status(404).json('We are unable to find the product')
    }
    client.close()
})

app.post('/api/users/:userId/cart',async (req, res) => {
  const {userId} = req.params  
  const {productId} = req.body

    // connecting to mongodb database named 'vue-db'
    const client = await MongoClient.connect(
      'mongodb://localhost:27017',
      {useNewUrlParser: true, useUnifiedTopology: true},
      {serverSelectionTimeoutMS: 5000, }
    )
    const db = client.db('vue-db')
    await db.collection('users').updateOne({id: userId}, {
      // it will add the product id which we are getting up from the request body to the users cart items array property without duplicates
      $addToSet: {cartItems: productId}
    })
    // get the updates user
    const user = await db.collection('users').findOne({id: userId})
    const products = await db.collection('products').find({}).toArray()
    const cartItemsIds = user.cartItems
    const cartItems = cartItemsIds.map(id =>
      products.find(product => product.id === id)
      )
      res.status(200).json(cartItems)
      client.close()
})

app.delete('/api/users/:userId/cart/:productId',async (req, res) => {
    const {userId, productId} = req.params

    // connecting to mongodb database named 'vue-db'
    const client = await MongoClient.connect(
      'mongodb://localhost:27017',
      {useNewUrlParser: true, useUnifiedTopology: true},
      {serverSelectionTimeoutMS: 5000, }
    )
    const db = client.db('vue-db')

    await db.collection('users').updateOne({id: userId}, {
      // deleting the product id from the user's cart items
      $pull: {cartItems: productId}
    })
    const user = await db.collection('users').findOne({id: userId})
    const products = await db.collection('products').find({}).toArray()
    const cartItemsIds = user.cartItems
    const cartItems = cartItemsIds.map(id => {
      products.find(product => product._id === id)
    })

    res.status(200).json(cartItems)
    client.close()
})

app.listen(8000, () => {
    console.log('Server is listening on port 8000')
})