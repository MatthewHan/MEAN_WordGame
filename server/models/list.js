var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
  creator: { type: String, trim: true },
  creatorId: { type: String },
  isDefault: { type: Boolean },
  title: { type: String },
  description: { type: String },
  tags: { type: Array },
  list: { type: Array },
  created_at: { type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

mongoose.model('List', ListSchema);
