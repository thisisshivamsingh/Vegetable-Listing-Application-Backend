const Vegetable = require("../models/vegetableModel");

exports.createVegetable = async (req, res, next) => {
  const socket = req.app.get("socket");
  try {
    const doc = await Vegetable.create(req.body);

    socket.emit("get-new-data", "real time update");
    socket.broadcast.emit("get-new-data", "real time update");

    res.status(200).json({
      message: "success",
      data: doc,
    });
    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllVegetables = async (req, res, next) => {
  try {
    const doc = await Vegetable.find();
    res.status(200).json({
      message: "success",
      data: doc,
    });
    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getVegetable = async (req, res, next) => {
  try {
    const doc = await Vegetable.findById(req.params.id);
    res.status(200).json({ message: "success", data: doc });
    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteVegetable = async (req, res, next) => {
  const socket = req.app.get("socket");
  try {
    await Vegetable.findByIdAndDelete(req.params.id);

    socket.emit("get-new-data", "real time update");
    socket.broadcast.emit("get-new-data", "real time update");

    res.status(204).json({ status: "success", data: null });
    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateVegetable = async (req, res, next) => {
  const socket = req.app.get("socket");
  try {
    const doc = await Vegetable.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });

    socket.emit("get-new-data", "real time update");
    socket.broadcast.emit("get-new-data", "real time update");

    res.status(200).json({
      status: "success",
      data: doc,
    });

    next();
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};
