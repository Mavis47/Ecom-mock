import express from 'express';
import { addToCart, deleteCartItem, getAllCartItems } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/addToCart',addToCart);
router.get('/getAllCartItems',getAllCartItems);
router.delete("/:id", deleteCartItem);


export default router;