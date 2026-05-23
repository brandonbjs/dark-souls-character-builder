import mongoose from 'mongoose'

const RingSchema = mongoose.Schema({
    name: {
        type: String,
    },
    effect: {
        type: String,
    },
})

const RingModel = mongoose.model('rings', RingSchema)

export { RingModel }
