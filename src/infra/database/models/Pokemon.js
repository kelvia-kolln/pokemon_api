import mongoose from "mongoose";

const {Schema} = mongoose;

const PokemonSchema = new Schema({
    name: String,
    weight: Number,
    attribute: String,
    food: [String],
    species: String,
    endangered: Boolean,
    aggressiveness: Number,
    zoological_id: { type: Schema.Types.ObjectId, ref: 'Zoological' }
});

export default mongoose.model('Pokemon', PokemonSchema, 'pokemon')
