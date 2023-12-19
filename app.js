const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
// const hpp = require("hpp");

const vegetableRouter = require("./routes/vegetableRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 400,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(cors({ origin: "*" }));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(hpp({ whitelist: [] }));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //   console.log(req.headers);
  next();
});

// 3) ROUTE
app.use("/v1/vegetables", vegetableRouter);
app.use("/v1/vegetable", vegetableRouter);
app.use("/v1/users", userRouter);
// app.use("/v1/users", );

module.exports = app;
