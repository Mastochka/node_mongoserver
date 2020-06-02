const mongoose = require('mongoose');
const validators = require('mongoose-validators');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: validators.isURL(),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: 0,
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('card', cardSchema);
