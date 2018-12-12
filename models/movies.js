const mongoose = require('mongoose');
const MovieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    genre: { type: String, required: true },
    publisYear: { type: Number, required: true },
    Director: { type: String, required: true },
    Actors: { type: String, required: true },
    ProductionCompanies: { type: String, required: true },
    Producers: { type: String, required: true },
    Budget: { type: String, required: true },
    imdbrating: { type: Number, required: true },
    rottertomattosrating: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    CoverImage: { type: String, required: true }
});
module.exports = mongoose.model('Movie', MovieSchema);