const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const starSchema = new Schema ({
    name : String,
    occupation : String,
    catchphrase : String
}, {
    timestamps: {
        createdAt: "created_at",
        updateAt: "updated_at"
    }
});

const Star = mongoose.model("Star", starSchema);

module.exports = Star;