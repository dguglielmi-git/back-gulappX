var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    dishId: String,
    fullName: String,
    priceStar: Number,
    locationStar: Number,
    sizeStar: Number,
    attentionStar: Number,
    presentationStar: Number,
    avgStar: Number,
    date: Date,
    title: String,
    body: String
});

var Comments = mongoose.model('Comment', commentsSchema);

console.log("se creo modelo comentarios");
module.exports = Comments;
