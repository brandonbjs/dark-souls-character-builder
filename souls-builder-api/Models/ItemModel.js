import mongoose from "mongoose";

const ItemSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    }
});

const ItemModel = mongoose.model("items", ItemSchema)

export { ItemModel };