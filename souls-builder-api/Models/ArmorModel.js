import mongoose from "mongoose";

const ArmorSchema = mongoose.Schema({
    set: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    poise: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    physical: {
        type: Number,
        required: true
    },
    magic: {
        type: Number,
        required: true
    },
    fire: {
        type: Number,
        required: true
    },
    lightning: {
        type: Number,
        required: true
    },
    bleed: {
        type: Number,
        required: true
    },
    poison: {
        type: Number,
        required: true
    },
    curse: {
        type: Number,
        required: true
    },
});

const ArmorModel = mongoose.model("armor", ArmorSchema)

export { ArmorModel };