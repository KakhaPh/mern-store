import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'

dotenv.config();

const PORT = process.env.PORT
const app = express();
app.use(express.json())

app.use("/api/products", productRoutes)

app.listen(PORT, () => {
    ConnectDB();
    console.log("Server started at http://localhost:" + PORT)
})