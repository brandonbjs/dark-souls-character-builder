import mongoose from "mongoose";

const ArmorSchema = mongoose.Schema({
    set: {
        type: String
    },
    name: {
        type: String
    },
    position: {
        type: Number
    },
    poise: {
        type: Number
    },
    weight: {
        type: Number
    },
    physical: {
        type: Number
    },
    magic: {
        type: Number
    },
    fire: {
        type: Number
    },
    lightning: {
        type: Number
    },
    bleed: {
        type: Number
    },
    poison: {
        type: Number
    },
    curse: {
        type: Number
    }
});

const ArmorModel = mongoose.model("armorzeros", ArmorSchema)

export { ArmorModel };