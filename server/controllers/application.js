const Application = require("../models/application");
const fs = require("fs");

const list = async (req, res) => {
    try {
        let applications = await Application.find();
        res.status(200).json({
            data: applications,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false
        });
    }
}

const create = async (req, res) => {
    try {
        let application = new Application(req.body);
        application = await application.save();
        res.status(200).json({
            data: application,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
            success: false
        });
    }
}

const read = async (req, res) => {
    if (!req.params.id)
        return res.status(400).json({
            success: false,
            err: "Bad request",
            message: "The request parameter is absent",
        });

    try {
        let application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                err: "Not found",
                message: "Application not found",
            });
        }
        res.status(200).json(application);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            err: "Internal server error",
            message: err.message,
        });
    }
}

const updateStatus = async (req, res) => {
    if (!req.query.status)
        return res.status(400).json({
            success: false,
            err: "Bad request",
            message: "The query parameter 'status' is absent",
        });
    try {
        let application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({
                success: false,
                err: "Not found",
                message: "Application not found",
            });
        }
        application.status = req.query.status;
        await application.save();
        res.status(200).json(application);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            err: "Internal server error",
            message: err.message,
        });
    }
}

const remove = (req, res) => { }


const getCodeOfConduct = (req, res) => {
    //return code of conduct for download
    try {
        const pdfContent = fs.readFileSync(`${__dirname}/../storage/codeOfConduct.pdf`, 'base64');
        return res.status(200).json({
            pdfContent
        })
    } catch (error) {
        console.log(err);
        return res.status(500).json({
            success: false,
            err: "Internal server error",
            message: err.message,
        });
    }
}

module.exports = { list, create, read, remove, updateStatus, getCodeOfConduct };