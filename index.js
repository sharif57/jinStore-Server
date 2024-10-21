const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors())
app.use(express.json())

// jinStore
// 13ugFBYvjfCf0lP0

const uri = "mongodb+srv://jinStore:13ugFBYvjfCf0lP0@cluster0.cwjeixv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const teaCollection = client.db('jinStore').collection('tea')
    const waterCollection = client.db('jinStore').collection('water')
    const juiceCollection = client.db('jinStore').collection('juice')
    const drinksCollection = client.db('jinStore').collection('drinks')
    const shopCollection = client.db('jinStore').collection('shop')
    const addCartCollection = client.db('jinStore').collection('addCart')
    const fruitsCartCollection = client.db('jinStore').collection('fruits')





    // tea api related
    app.get('/tea', async (req, res) => {
      const cursor = teaCollection.find();
      const result = await cursor.toArray();
      res.send(result)
      console.log(result);
    })

    app.get('/tea/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await teaCollection.findOne(query)
      res.send(result)
    })

    // water api related
    app.get(('/water'), async (req, res) => {
      const cursor = waterCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get(('/water/:id'), async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await waterCollection.findOne(query);
      res.send(result)
    })

    //juice api related
    app.get('/juice', async (req, res) => {
      const cursor = juiceCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get('/juice/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await juiceCollection.findOne(query);
      res.send(result)
    })

    //drinks api related
    app.get('/drinks', async (req, res) => {
      const cursor = drinksCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get('/drinks/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await drinksCollection.findOne(query);
      res.send(result)
    })


    //shop api related
    app.get('/shop', async (req, res) => {
      const cursor = shopCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get('/shop/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await shopCollection.findOne(query)
      res.send(result)
    })

    //addCart api related
    app.get('/addCart/:email', async (req, res) => {
      console.log(req.params.email);
      const email = req.params.email;
      const query = { email: email }
      const result = await addCartCollection.find(query).toArray();
      res.send(result)
      console.log(result);
    })

    app.post('/addCart', async (req, res) => {
      const newUsers = req.body;
      console.log(newUsers);
      const result = await addCartCollection.insertOne(newUsers)
      res.send(result)
    })

    app.delete('/deleteItem/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await addCartCollection.deleteOne(query)
      res.send(result)
    })

    // fruits related api
    app.get('/fruits', async (req, res) => {
      const cursor = fruitsCartCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('jinStore server is running')
})

app.listen(port, () => {
  console.log(`jinStore server is running on port ${port}`)
})