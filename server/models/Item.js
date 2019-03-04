const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: false
  },

  pictures: {
    type: [String],
    required: false
  },

  available: {
    type: Boolean,
    required: true,
    default: true
  },

  time: {
    type: Date,
    default: Date.now
  },
  
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

const Item = mongoose.model("Item", itemsSchema);
module.exports = Item;
