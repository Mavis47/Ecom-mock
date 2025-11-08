import { checkout } from 'controllers/checkout.controller.js';
import express from 'express';

const router = express.Router();

router.post('/', checkout);

export default router;