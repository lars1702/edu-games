const mongoose = require('mongoose');
const { Schema } = mongoose;

const dictionarySchema = new Schema({
  entry: {
    type: String,
    required: [true, "The game name is required"]
  },
  references: [String]
})

const Dictionary = mongoose.model("Game", dictionarySchema);

module.exports = Dictionary