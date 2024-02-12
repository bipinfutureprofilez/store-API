
const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    try {
        const {name, featured, company} = req.query
        const queryObject = {}
        if (featured) {
            queryObject.featured = featured;
        }
        if (company){
            queryObject.company = company;
        }
        if (name) {
            queryObject.name = {$regex: name, $options: 'i'};
        }
        
        let result = await Product.find(queryObject)
        res.status(200).json({result, nbHits: result.length})
    } catch (error) {
        res.status(500).json({ msg: error })
    }
    // res.send('Get all products')
}
const createProduct = (req, res) => {
    res.send('Create product')
}
const getSingleProduct = (req, res) => {
    res.send('Get single product')
}
const updateProduct = (req, res) => {
    res.send('Updated product')
}
const deleteProduct = (req, res) => {
    res.send('Deleted product')
}

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
}

