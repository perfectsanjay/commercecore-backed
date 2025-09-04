import express from 'express'
import auth from "../middleware/auth.js";
import {
    getProducts,
    getProductsById,
    createNewProduct,
    updateProduct,
    deleteProduct

} from '../controllers/productController.js'
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router()

router.get('/', getProducts)

router.get('/:id', getProductsById)
router.post('/', auth ,isAdmin, createNewProduct)
router.put('/:id', auth, isAdmin, updateProduct)
router.delete('/:id', auth ,isAdmin, deleteProduct)

export default router;