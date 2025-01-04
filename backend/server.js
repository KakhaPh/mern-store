import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './config/db.js';
import Product from './model/product.model.js';

dotenv.config();

const app = express();

app.use(express.json())

app.post("/api/products", async (req, res) => {
    const product = req.body

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please fill all fields!" })
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        return res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.error("Error in create product!", error.message);
        return res.status(500).json({ success: true, message: "Server Error!" })
    }
});

console.log(process.env.MONGO_URI)

app.listen(5000, () => {
    ConnectDB();
    console.log("Server started at http://localhost:5000")
})