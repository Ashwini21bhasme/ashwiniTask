const mongoose = require("mongoose");

const { Schema } = mongoose;
const ratingSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId },
  ratings: { type: Number },
});
const userSchema = new Schema({
  user_name: { type: String, required: true },
  user_email: { type: String, required: true },
  user_phone: { type: String, required: true },
  rating: { type: [ratingSchema] },
  created_at: { type: Schema.Types.Date },
  updated_at: { type: Schema.Types.Date },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
