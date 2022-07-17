const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const connectionString = process.env.ATLAS_UIR;
const productsRouter = require("./routes/products.js");
const ordersRouter = require("./routes/orders.js");
const shoppingCartRouter = require("./routes/shoppingCart.js");
const userRouter = require("./routes/user.js");
const applicationRouter = require("./routes/application.js");
const stripeWebhookRouter = require("./routes/webHook");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const User = require("./models/user");
const checkoutRouter = require("./routes/checkout.js");
const categoryRouter = require("./routes/category.js");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");

//set up db connection
const options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ignoreUndefined: true,
};

mongoose.connect(connectionString, options, (err) => {
  if (err) console.log(err);
});

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/stripeWebhook",
  express.raw({ type: "application/json" }),
  stripeWebhookRouter
);
app.use(bodyParser.json({ limit: "5mb" }));
app.use(express.json());
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/shoppingCarts", shoppingCartRouter);
app.use("/users", userRouter);
app.use("/applications", applicationRouter);
app.use("/categories", categoryRouter);
app.use("/payment", checkoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
