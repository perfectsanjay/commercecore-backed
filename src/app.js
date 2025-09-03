import express from "express";
import morgan from "morgan";
// import authRoutes from './routes/authRoutes.js'
// import productRoutes from './routes/productRoutes.js'
// import errorHandler from './middleware/errorHandler.js'

const app = express()

// Middleware

app.use(express.json())
app.use(morgan("dev"))

// // Routes
// app.use("/api/auth",authRoutes)
// app.use("/api/products",productRoutes)

// // error handling
// app.use(errorHandler);

export default app;