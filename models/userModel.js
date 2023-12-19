const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
