import Product from "../model/product.model.js";

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error in fetching product", error.message)
        res.status(500).json({ success: false, message: "Server Error!" });
    }
}

export const postProduct = async (req, res) => {
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
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted!" })
    } catch (error) {
        console.log("error in deleting product", error.message)
        res.status(404).json({ success: false, message: "Product not found!" })
    }
}

export const putProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product Id!" })
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.log("error in updating product", error.message)
        res.status(500).json({ success: false, message: "Server Error!" });
    }
}