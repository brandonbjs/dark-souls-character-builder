import mongoose from 'mongoose'

const WeaponSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    atk: {
        physical: { type: Number },
        magic: { type: Number },
        fire: { type: Number },
        lightning: { type: Number },
        bonus: { type: Number },
    },
    def: {
        physical: { type: Number },
        magic: { type: Number },
        fire: { type: Number },
        lightning: { type: Number },
        stab: { type: Number },
    },
    effects: {
        poison: { type: String },
        bleed: { type: String },
        divine: { type: String },
        occult: { type: String },
    },
    req: {
        strength: { type: Number },
        dexterity: { type: Number },
        intelligence: { type: Number },
        faith: { type: Number },
    },
    scale: {
        strength: { type: String },
        dexterity: { type: String },
        intelligence: { type: String },
        faith: { type: String },
    },
    type: { type: String },
    durability: { type: Number },
    weight: { type: Number },
    attackTypes: [String],
    obtained: [String],
    aotaOnly: { type: Boolean },
})

const WeaponModel = mongoose.model('weapons', WeaponSchema)

export { WeaponModel }
