var mongoose = require('mongoose').set('debug', true);
var Schema = mongoose.Schema;

var dishSchema = new Schema({
    dishName: String,
    restaurantName: String,
    branchName: String,
    restaurantAddress: String,
    dishDescription: String,
    dishDetailedDesc: String,
    imageUrl: String,
    distance: String,
    starAverage: Number,
    pricing: Number,
    geo: []
});
var Dishes = mongoose.model('dishes', dishSchema);
module.exports = Dishes;
