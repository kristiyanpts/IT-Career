const { Schema, model, Types } = require("mongoose");
const URL_PATTERN = /^https?:\/\/.+$/i;

const cryptoSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "Name must be at least 2 characters long"],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return URL_PATTERN.test(value);
      },
      message: "Image URL is invalid",
    },
  },
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be a positive number"],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, "Description must be at least 10 characters long"],
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: {
      values: ["crypto-wallet", "credit-card", "debit-card", "paypal"],
      message: "Invalid Payment Method",
    },
  },
  bought: {
    type: [{ type: Types.ObjectId, required: true, ref: "User" }],
    default: [],
  },
  owner: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Crypto = model("Crypto", cryptoSchema);

module.exports = Crypto;
