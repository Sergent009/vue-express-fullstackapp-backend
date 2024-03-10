import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'

const app = express()
app.use(bodyParser.json())

const products = [{
    id: '123',
    name: 'Running Shoes',
    price: '60.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/assets/shoes-1.jpg',
    averageRating: '5.0',
  }, {
    id: '234',
    name: 'Basketball Shoes',
    price: '120.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/assets/shoes-2.jpg',
    averageRating: '5.0',
  }, {
    id: '345',
    name: 'Bright Red Shoes',
    price: '90.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/assets/shoes-3.jpg',
    averageRating: '5.0',
  }, {
    id: '456',
    name: 'Fancy Shoes',
    price: '190.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/assets/shoes-4.jpg',
    averageRating: '5.0',
  }, {
    id: '567',
    name: 'Skateboard Shoes',
    price: '75.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/assets/shoes-5.jpg',
    averageRating: '5.0',
  }, {
    id: '678',
    name: 'High Heels',
    price: '200.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/assets/shoes-6.jpg',
    averageRating: '5.0',
  }, {
    id: '789',
    name: 'Dark Shoes',
    price: '100.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/assets/shoes-7.jpg',
    averageRating: '5.0',
  }, {
    id: '890',
    name: 'Classic Shoes',
    price: '40.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/assets/shoes-8.jpg',
    averageRating: '5.0',
  }, {
    id: '901',
    name: 'Plain Shoes',
    price: '54.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/assets/shoes-9.jpg',
    averageRating: '5.0',
  },
  {
    id: '912',
    name: 'Teal Dress Shoes',
    price: '330.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/assets/shoes-10.jpg',
    averageRating: '5.0',
  },
  {
    id: '749',
    name: 'Fancy Boots',
    price: '230.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/assets/shoes-11.jpg',
    averageRating: '5.0',
  }, {
    id: '893',
    name: 'Gold Shoes',
    price: '180.00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
    imageUrl: '/assets/shoes-12.jpg',
    averageRating: '5.0',
  }];
  
   let cartItems = [
    products[0],
    products[2],
    products[3],
  ];

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
    const cartItemsIds = user.cartItems
    const cartItems = cartItemsIds.map(id =>
      products.find(product => product.id === id)
      )
      res.status(200).json(cartItems)
      client.close()
})

app.delete('/api/users/:userId/cart/:productId', (req, res) => {
    const {productId} = req.params
    cartItems = cartItems.filter(product => product.id !== productId)
    res.status(200).json(cartItems)
})

app.listen(8000, () => {
    console.log('Server is listening on port 8000')
})