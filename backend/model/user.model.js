const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    userName: {
      type: String,
      required: [true, "Name is required field!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required field!"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required field!"],
      minlength: 8,
      trim: true,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const user = mongoose.model("users", userSchema);

module.exports = user;
