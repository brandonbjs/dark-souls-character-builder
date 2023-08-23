import mongoose from "mongoose";

const WeaponSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    atk: {
        physical: { type: Number, required: true },
        magic: { type: Number, required: true },
        fire: { type: Number, required: true },
        lightning: { type: Number, required: true },
        bonus: { type: Number, required: true }
    },
    def: {
        physical: { type: Number, required: true },
        magic: { type: Number, required: true },
        fire: { type: Number, required: true },
        lightning: { type: Number, required: true },
        stab: { type: Number, required: true }
    },
    effects: {
        poison: { type: String, required: true },
        bleed: { type: String, required: true },
        divine: { type: String, required: true },
        occult: { type: String, required: true }
    },
    req: {
        strength: { type: Number, required: true },
        dexterity: { type: Number, required: true },
        intelligence: { type: Number, required: true },
        faith: { type: Number, required: true }
    },
    scale: {
        strength: { type: String, required: true },
        dexterity: { type: String, required: true },
        intelligence: { type: String, required: true },
        faith: { type: String, required: true }
    },
    durability: { type: Number, required: true },
    weight: { type: Number, required: true },
    attackTypes: [String],
    obtained: [String],
    aotaOnly: { type: Boolean, required: true }
});

const WeaponModel = mongoose.model("weapons", WeaponSchema)

export { WeaponModel };