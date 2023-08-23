import mongoose from "mongoose";

const CharacterBuildSchema = new mongoose.Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    gender: { type: String, required: true },
    covenant: { type: String, required: true },
    level: { type: Number, required: true },
    attributes: {
      vitality: { type: Number, required: true },
      attunement: { type: Number, required: true },
      endurance: { type: Number, required: true },
      strength: { type: Number, required: true },
      dexterity: { type: Number, required: true },
      resistance: { type: Number, required: true },
      intelligence: { type: Number, required: true },
      faith: { type: Number, required: true },
      humanity: { type: Number, required: true }
    },
    equipment: {
      weapons: [
        {
          leftHand1: {
            name: { type: String },
            upgradeNum: { type: Number },
            upgradePath: { type: String }
          },
          rightHand1: {
            name: { type: String },
            upgradeNum: { type: Number },
            upgradePath: { type: String }
          }
        },
        {
          leftHand2: {
            name: { type: String },
            upgradeNum: { type: Number },
            upgradePath: { type: String }
          },
          rightHand2: {
            name: { type: String },
            upgradeNum: { type: Number },
            upgradePath: { type: String }
          }
        }
      ],
      armor: {
        head: {
          name: { type: String },
          upgradeNum: { type: Number }
        },
        chest: {
          name: { type: String },
          upgradeNum: { type: Number }
        },
        hands: {
          name: { type: String },
          upgradeNum: { type: Number }
        },
        legs: {
          name: { type: String },
          upgradeNum: { type: Number }
        }
      },
      ringSlot1: { type: String },
      ringSlot2: { type: String },
      spells: [String],
      arrowSlot1: { type: String },
      arrowSlot2: { type: String },
      boltSlot1: { type: String },
      boltSlot2: { type: String },
      itemSlot1: { type: String },
      itemSlot2: { type: String },
      itemSlot3: { type: String },
      itemSlot4: { type: String },
      itemSlot5: { type: String }
    }
  });

const CharacterBuildModel = mongoose.model("characterBuilds", CharacterBuildSchema)

export { CharacterBuildModel };