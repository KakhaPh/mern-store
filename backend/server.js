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
        res.status(400).json({ success: false, message: "Please fill all fields!" })
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.error("Error in create product!", error.message);
        res.status(500).json({ success: true, message: "Server Error!" })
    }
});

app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted!" })
    } catch (error) {
        res.status(404).json({success: false, message: "Product not found!"})
    }
})

app.listen(5000, () => {
    ConnectDB();
    console.log("Server started at http://localhost:5000")
})