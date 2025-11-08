import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ConnectToMongodb } from "./db/db.js";
import dotenv from "dotenv";
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import checkoutRoutes from './routes/checkout.route.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/product',productRoutes);
app.use('/api/cart',cartRoutes);
app.use("/api/checkout", checkoutRoutes);

ConnectToMongodb();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));