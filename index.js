const express =require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app= express();
const port = process.env.PORT|| 5000;


// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.vjcdyry.mongodb.net/?retryWrites=true&w=majority`;


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

    const productCollection =client.db("automotive").collection("servicesProduct");
    const brandCollection =client.db("automotive").collection("brand");

    // get product in browser

   app.get('/product',async(req,res)=>{
    const cursor = productCollection.find();
    const result = await cursor.toArray()
    res.send(result)
   })


    // post product in database 
   app.post('/product',async(req,res)=>{
      const product = req.body;
    //   console.log(product)
      const result= await productCollection.insertOne(product);
      res.send(result)
   })

//    -----------------------------

   // get product in browser

   app.get('/brand',async(req,res)=>{
    const cursor = brandCollection.find();
    const result = await cursor.toArray()
    res.send(result)
   })
    // post brand car in database 
   app.post('/brand',async(req,res)=>{
      const product = req.body;
      console.log(product)
      const result= await brandCollection.insertOne(product);
      res.send(result)
   })
    // get one bmw car in database 
   app.get("/layout/BMW/:id",async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const user = await brandCollection.findOne(query)
      res.send(user)
   })
    // get one toyota car in database 
   app.get("/layout/toyota/:id",async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const user = await brandCollection.findOne(query)
      res.send(user)
   })

// get one toyota car in database 
app.get("/layout/tesla/:id",async(req,res)=>{
    const id = req.params.id;
    const query = {_id : new ObjectId(id)}
    const user = await brandCollection.findOne(query)
    res.send(user)
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

// -------------



app.get("/",(req,res)=>{
    res.send('Coffee making server is running')
})
app.listen(port, ()=>{
    console.log(`coffee server is running on ${port}`)
})