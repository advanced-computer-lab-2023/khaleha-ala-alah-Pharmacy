const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, require: true },
    title: { type: String, require: true },
    text: { type: String, require: true },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('notification', notificationSchema)