import mongoose from 'mongoose'

const SpellSchema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    uses: {
        type: Number,
    },
    slots: {
        type: Number,
    },
    intelligenceRequirement: {
        type: Number,
    },
    faithRequirement: {
        type: Number,
    },
    spellType: {
        type: String,
    },
})

const SpellModel = mongoose.model('spells', SpellSchema)

export { SpellModel }
