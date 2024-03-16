const express=require('express')
const app=express()
const mongoose=require('mongoose')
const Product=require('./models/productModel')

//middleware
app.use(express.json())

app.use (express.urlencoded({extended:false}))
//routes

//Send Products to Database
app.post('/products',async(req,res)=>{
    try {
        const product=await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
        
    }
})

//Get All Products from Database
app.get('/products',async(req,res)=>{
    try {
        const products=await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})


//Get a Product by ID

app.get('/products/:id',async(req,res)=>{
   try {
    const {id}=req.params;
    const product=await Product.findById(id);
    res.status(200).json(product)

   } catch (error) {
    res.status(500).json({message:error.message})

   }
})


// Update a product

app.put('/products/:id',async(req,res) =>{
    try {
        const {id}=req.params
        const product=await Product.findByIdAndUpdate(id,req.body)
        //we cannot update any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct=await Product.findById(id)

        res.status(200).json(updatedProduct)
        
    } catch (error) {
        res.status(500).json({message:error.message})

    }
})


// Delete a Product

app.delete('/products/:id',async(req,res) =>{
    try {
        const {id}=req.params
        const product=await Product.findByIdAndDelete(id)
        //we cannot delete any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }

        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message:error.message})

    }
})


mongoose.
connect('mongodb+srv://shaikabzal626:Mohammad970@crud.siev6fs.mongodb.net/Node-API?retryWrites=true&w=majority&appName=CRUD')
.then(()=>{
    console.log("Connected to MongoDB")
    app.listen(8000,()=>{
        console.log("Server is live on port 8000")
    })
})
.catch((error)=>{
    console.log(error)
})