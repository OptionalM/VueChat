const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  },
);

const Message = model('Message', MessageSchema);

module.exports = { Message };
