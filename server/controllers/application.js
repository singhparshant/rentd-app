const Application = require("../models/application");
const fs = require("fs");
const { v4: uuid } = require('uuid');
const { sendApplicationEmail } = require("../utils/applicationEmail");

//TODO: convert files to base64
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
        //store file names in db:
        codeOfConduct = req.body.codeOfConduct;
        kycDocs = req.body.KYCDocs;
        //random file names to store in db
        const codeOfConductFileName = uuid();
        const kycFileNames = req.body.KYCDocs.map(_ => uuid());

        req.body.codeOfConduct = codeOfConductFileName;
        req.body.KYCDocs = kycFileNames;

        //sanitize input
        codeOfConduct = codeOfConduct.replace(/^data:application\/pdf;base64,/, "");
        for (let i = 0; i < kycDocs.length; i++) {
            kycDocs[i] = kycDocs[i].replace(/^data:application\/pdf;base64,/, "");
        }

        //store files in storage/applicationDocuments
        fs.writeFile(`${__dirname}/../storage/applicationDocuments/${codeOfConductFileName}.pdf`, codeOfConduct, 'base64', function (err) {
            console.log(err);
        });

        for (let i = 0; i < kycDocs.length; i++) {
            fs.writeFile(`${__dirname}/../storage/applicationDocuments/${kycFileNames[i]}.pdf`, kycDocs[i], 'base64', function (err) {
                console.log(err);
            });
        }

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
        console.log("err", err)
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
    const { status } = req.query;
    if (!status)
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
        application.status = status;
        await application.save();
        //TODO: trigger email informing supplier 
        await sendApplicationEmail(application, status);
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