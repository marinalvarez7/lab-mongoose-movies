const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const Star = require ("../models/star");


const movieSchema = new Schema ({
    title : String,
    genre : String,
    plot : String,
    cast : [ { type : Schema.Types.ObjectId, ref: 'Star' } ],
}, {
    timestamps: {
        createdAt: "created_at",
        updateAt: "updated_at"
    }
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;