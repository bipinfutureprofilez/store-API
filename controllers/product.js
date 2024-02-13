
const Product = require('../models/product')

const getAllProducts = async (req, res) => {

    const { name, featured, company, sort, fields, numericFilters } = req.query

    // searching the product by key
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }    

    // numericFilters like: price > 30, rate > 4
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        console.log(numericFilters);
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
        console.log(numericFilters);
    }

    var result = Product.find(queryObject)

    // sorting the product
    if (sort) {
        console.log(sort);
        let sortlist = sort.split(',').join(' ');
        result = result.sort(sortlist)
    } else {
        result = result.sort('createdAt')
    }

    // select the custom field to get that data
    if (fields) {
        let fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    // 23
    // 4 7 7 7 2

    const products = await result;
    res.status(200).json({ products, nbHits: products.length })
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

