const Category = require("../models/category");

const list = async (req, res) => {
    try {
        let categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Request for orders failed",
            message: err.message
        });
    }
}
const create = async (req, res) => {
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            success: false,
            error: "Bad request",
            message: "The request body is empty",
        });
    try {
        let category = new Category(req.body);
        category = await category.save();
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "category could not be created",
            message: err.message,
        });
    }
}

const read = async (req, res) => {
    if (!req.params.id)
        return res.status(400).json({
            success: false,
            error: "Bad request",
            message: "The request parameter is absent",
        });

    try {
        let category = await Category.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                error: "Not found",
                message: "Category not found",
            });
        }
        res.status(200).json(order);
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Category could not be read",
            message: "Internal server error",
        });
    }
};

const update = async (req, res) => { }

const remove = async (req, res) => { }

module.exports = { list, create, read, update, remove };

