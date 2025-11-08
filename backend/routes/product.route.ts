import express from 'express';
import { createMockProducts, deleteMockProducts, getProducts } from '../controllers/product.controller.ts';

const router = express.Router();

router.post('/createProduct',createMockProducts);
router.get('/getProduct',getProducts);
router.delete('/deleteProduct',deleteMockProducts);



export default router;