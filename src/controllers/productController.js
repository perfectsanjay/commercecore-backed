import Product from "../models/Product.js";

// get all the products

export const getProducts = async (req,res, next) => {
    try{
        const products = await Product.find()
        res.json(products)

    }catch{err}{
        next(err)
    }
}

// get product by id

export const getProductsById = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message:"product with the id not found"})
        res.json(product)    

    }catch(err){
        next(err)
    }
}

// create new product

export const createNewProduct = async (req, res, next) => {
     try{
        const {name, description, price,CountInStock} = req.body

        const product = new Product({
            name,
            description,
            price,
            CountInStock
        })

        const createProduct = await product.save()
        res.status(201).json(createProduct)

     }catch(err){
        next(err)
     }
}

// update the product 
export const updateProduct = async (req,res,next) => {
    try{
        const {name, description, price, CountInStock} = req.body;
        const product  = await Product.findById(req.params.id)
        if(!product) return res.status(404).json({message:"Product not found"})

        product.name = name || product.name
        product.description = description || product.description
        product.price = price || product.price
        product.CountInStock = CountInStock || product.CountInStock

        const updatedProduct = await Product.save()
        res.json(updatedProduct)


    }catch(err){
        next(err)
    }
}

// delete the product

export const deleteProduct = async (req, res, next) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product) return res.status(404).json({message: "product is not found"})
        res.json({message: "product removed"})

    }catch(err){
        next(err)
    }
}