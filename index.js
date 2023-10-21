const express =require('express')
const app= express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    // await client.connect();

    const productCollection =client.db("automotive").collection("servicesProduct");
    const brandCollection =client.db("automotive").collection("brand");
    const userCollection =client.db("automotive").collection("user");
    const buycarCollection =client.db("automotive").collection("buycar");


// useer Post 

  app.post('/user',async(req,res)=>{
    const user = req.body;
    const result= await userCollection.insertOne(user);
    res.send(result)
 })
// buy car 

  app.post('/buycar',async(req,res)=>{
    const product = req.body;
    console.log(product)
    const result= await buycarCollection.insertOne(product);
    res.send(result)
 })
  

  app.get('/buycar',async(req,res)=>{
    const cursor = buycarCollection.find();
    const user = await cursor.toArray()
    res.send(user)
   })

  app.delete('/buycar/:id',async(req,res)=>{
    const id =req.params.id
    const query = {_id: new ObjectId(id)}
    const result= await buycarCollection.deleteOne(query)
    res.send(result)
   })
//    update
  app.get('/buycar/:id',async(req,res)=>{
    const id =req.params.id
    const query = {_id: new ObjectId(id)}
    const result= await brandCollection.findOne(query)
    res.send(result)
   })

app.put("/brand/:id",async(req,res)=>{
    const id =req.params.id;
    const filter ={_id: new ObjectId(id)}
    const options = {upsert: true}
    const updateBrandCar =req.body;
    const updateBrand= {
        $set: {
            productName:updateBrandCar.name,
            productBrand:updateBrandCar.productBrand,
            productType:updateBrandCar.productType,
            productPrice:updateBrandCar.productPrice,
            productDescription:updateBrandCar.productDescription,
            productRatings:updateBrandCar.productRatings,
            productURL1:updateBrandCar.productURL1,
            productURL2:updateBrandCar.productURL2,
            productURL3:updateBrandCar.productURL3,
            productURL4:updateBrandCar.productURL1

        }
    }
    const result = await brandCollection.updateOne(filter, updateBrand,options)
    res.send(result)
})






    // get product in browser

   app.get('/product',async(req,res)=>{
    const cursor = productCollection.find();
    const result = await cursor.toArray()
    res.send(result)
   })


    // post product in database 
   app.post('/product',async(req,res)=>{
      const product = req.body;
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
   app.get("/layout/TOYOYTA/:id",async(req,res)=>{
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
// get one mersedes-benz car in database 
app.get("/layout/mar/:id",async(req,res)=>{
    const id = req.params.id;
    const query = {_id : new ObjectId(id)}
    const user = await brandCollection.findOne(query)
    res.send(user)
 })
// get one  HONDA in database 
app.get("/layout/honda/:id",async(req,res)=>{
    const id = req.params.id;
    const query = {_id : new ObjectId(id)}
    const user = await brandCollection.findOne(query)
    res.send(user)
 })
// get one  HONDA in database 
app.get("/layout/yamaha/:id",async(req,res)=>{
    const id = req.params.id;
    const query = {_id : new ObjectId(id)}
    const user = await brandCollection.findOne(query)
    res.send(user)
 })


















    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
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