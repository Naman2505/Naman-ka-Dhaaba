const mongoose = require("mongoose");

//schema
const menuSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 2,
  },
  taste: {
    type: String,
    enum: ["sweet", "sour", "spicy"],
    required: true,
  },
  isDrink: {
    type: Boolean,
    default: false,
  },
  ingredient: {
    type: [String],
    default: [],
  },
  num_sales:{
    type: Number,
    default: 0
  }
});

const MenuItem = mongoose.model("MenuItem", menuSchema);
module.exports = MenuItem;
