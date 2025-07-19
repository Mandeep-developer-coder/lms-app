const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: String,

  userName: {
    type: String,
    required: true
  },

  fatherName: {
    type: String,
    required: false 
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  address: {
    type: String,
    required: false 
  },

  batch: {
    type: String,
    required: false 
  },

  course: {
    type: String,
    required: false 
  },

  semester: {
    type: String,
    required: false 
  },

  rollNumber: {
    type: String,
    required: false 
  },

  number: {
    type: String,
    required: false 
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }

}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
