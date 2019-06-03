const mongoose = require('mongoose');
const { Schema } = mongoose;

const dictionarySchema = new Schema({
  term: {
    type: String,
    required: [true, "Dictionary entries a term is required"]
  },
  entry: {
    type: String,
    required: [true, "The dict entry is required"]
  },
  references: [String]
})

const Dictionary = mongoose.model("Dictionary", dictionarySchema);

module.exports = Dictionary