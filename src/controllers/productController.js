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
        const {name, description, price,stock,countInStock} = req.body

        const product = new Product({
            name,
            description,
            price,
            stock: stock || countInStock || 0,
        })

        const createProduct = await product.save()
        res.status(201).json(createProduct)

     }catch(err){
        next(err)
     }
}

// update the product 
export const updateProduct = async (req, res, next) => {
    try {
      const { name, description, price, stock } = req.body;
  
      // Find product by ID
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      // Update fields if provided
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.stock = stock ?? product.stock; // allow 0 as valid stock
  
      // Save updated product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
  
    } catch (err) {
      next(err);
    }
  };
  

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