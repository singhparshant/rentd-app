const Delivery = require("../models/delivery");

const list = async (req, res) => {
  try {
    let deliveries = await Delivery.find();
    res.status(200).json({
      data: deliveries,
      success: true,
    });
  } catch (err) {
    res.status(400).res.status(500).json({
      success: false,
      error: "Request for deliveries failed",
      message: err.message
    });
  }
}
const create = async (req, res) => {
  if(Object.keys(req.body).length === 0)
    return res.status(400).json({
      success: false,
      error: "Bad request",
      message: "The request body is empty",
    });
  try {
    let delivery = new Delivery(req.body);
    delivery = await delivery.save();
    res.status(200).json({
      success: true,
      data: delivery
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Delivery could not be created",
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

  try{
    let delivery = await Delivery.findById(req.params.id);
    if (!delivery) {
      return res.status(404).json({
        success: false,
        error: "Not found",
        message: "Delivery not found",
      });
    }
    res.status(200).json(delivery);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Order could not be read",
      message: "Internal server error",
    });
  }
};

const update = async (req, res) => {
  let deliveryId = req.params.id
  let update = req.body
  Delivery.findByIdAndUpdate(deliveryId, {$set: update}, {new: true})
    .then(data => {
      if(!data) {
        return res.status(404).json({
          success: false,
          message: "Delivery not found with id " + req.params.id
        });
      }
      res.status(200).json({
        success: true,
        data: data,
        message: "Delivery successfully updated"
      });
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          message: "Delivery not found with id " + req.params.id
        });
      }
      return res.status(500).send({
          success: false,
          message: "Error updating delivery with id " + req.params.id
      });
    });
}

const remove = async (req, res) => {
  Delivery.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Delivery not found with id " + req.params.id
        });
      }
      res.status(200).json({
        success: true,
        data: data,
        message: "Delivery successfully deleted!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
            success: false,
            message: "Delivery not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete delivery with id " + req.params.id
    });
  });
}

module.exports = {list, create, read, update, remove};