const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The game name is required"]
  },
  description: {
    type: String,
    required: [true, "Give a short description of the game"]
  },
  _reviews: [{type: Schema.Types.ObjectId, ref: "Game"}],
  keywords: [String],
  imgURL: String, //not sure what the best choice for this one is yet. Where to get the images from will be the deciding factor.
  gameURL: String,
  // author: String, //who made the game - person or company for instance
  uploader: String, //not always the same as author
  ageGroup: String, //will likely be non-required dropdown-menu, and mostly to show, not so much for functionality
  references: [String] //in case you want to reference scientific articles later, this can be stored like this. 
});


const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
