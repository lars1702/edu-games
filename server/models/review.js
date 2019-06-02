const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const reviewSchema = new mongoose.Schema({  
    title: String,
    comment: String,
    _user: {type: Schema.Types.ObjectId, ref: "User"},
},
{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }  
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;