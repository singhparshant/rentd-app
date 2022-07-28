const Order = require("../models/order");

const list = async (req, res) => {
  if (!req.query.userId || !req.query.role)
    return res.status(400).json({
      success: false,
      error: "Bad request",
      message: "userId and role missing!",
    });
  const { userId, role } = req.query;
  try {

    if (role === "customer") {
      //filter orders by customerId
      let orders = await Order.find({ customerId: userId });
      res.status(200).json({
        data: orders,
        success: true,
      });

    } else if (role === "supplier") {

    }

  } catch (err) {
    res.status(400).res.status(500).json({
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
    let order = new Order(req.body);
    order = await order.save();
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Order could not be created",
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
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Not found",
        message: "Order not found",
      });
    }
    res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Order could not be read",
      message: "Internal server error",
    });
  }
};

const update = async (req, res) => {
  let orderId = req.params.id
  let update = req.body
  Order.findByIdAndUpdate(orderId, { $set: update }, { new: true })
    .then(data => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Order not found with id " + req.params.id
        });
      }
      res.status(200).json({
        success: true,
        data: data,
        message: "Order successfully updated"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          message: "Order not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        success: false,
        message: "Error updating order with id " + req.params.id
      });
    });
}

const remove = async (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Order not found with id " + req.params.id
        });
      }
      res.status(200).json({
        success: true,
        data: data,
        message: "Order successfully deleted!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          success: false,
          message: "Order not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        success: false,
        message: "Could not delete order with id " + req.params.id
      });
    });
}

module.exports = { list, create, read, update, remove };

