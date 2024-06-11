/* eslint-disable no-console */
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
require('dotenv').config()

const app = express();

// set up route here
const parkirRoute = require("./routes/parking");

app.get("/", (req, res) => res.status(200).json({
  status: true,
  message: "Server running"
}));

// make use of morgan
app.use(logger("dev"));
// allow collection of payload from body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use("/", parkirRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 400);
  res.json({ error: err.message, message: "Operation failed" });
});

app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))


module.exports = app;

