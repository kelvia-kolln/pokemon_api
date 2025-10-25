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
    zoological_id: { type: Schema.Types.ObjectId, ref: 'Zoological' } // Se colocar o required: true, toda vez que criar um pokémon, ele precisará estar vinculado a um zoológico
})

export default mongoose.model('Pokemon', PokemonSchema, 'pokemon')