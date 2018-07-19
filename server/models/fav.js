const mongoose = require('mongoose');
const { Schema } = mongoose;

const favSchema = new Schema({
  title: String,
  _games: [{type: Schema.Types.ObjectId, ref: "Game"}],
  _owner: {type: Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model('Fav', favSchema);