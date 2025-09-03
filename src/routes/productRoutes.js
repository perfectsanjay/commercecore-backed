import express from 'express'
import auth from "../middleware/auth.js";
import {
    getProducts,
    getProductsById,
    createNewProduct,
    updateProduct,
    deleteProduct

} from '../controllers/productController.js'

const router = express.Router()

router.get('/', getProducts)

router.get('/:id', getProductsById)
router.post('/', auth,createNewProduct)
router.put('/:id', auth,updateProduct)
router.delete('/:id', auth, deleteProduct)

export default router;