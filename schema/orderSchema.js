const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId },
  product_name: { type: String },
  amount: { type: Number },
  created_at: { type: Schema.Types.Date },
  updated_at: { type: Schema.Types.Date },
});

const order = mongoose.model("order", orderSchema);

module.exports = order;
