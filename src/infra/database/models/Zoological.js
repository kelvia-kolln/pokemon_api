import mongoose from "mongoose";

const {Schema} = mongoose; // tirando o objeto Schema do mongoose

//objeto
const ZoologicalSchema = new Schema({
    name: String, //propriedade 
    address: {
        street: String,
        number: Number,
        city: String,
    },
    pokemons: Number,
    responsable: String,
    employers: Number
});

export default mongoose.model('Zoological', ZoologicalSchema, 'zoological')
// Nome do modelo
// Schema do banco de dados
// Nome da collection

//Tipos de dados: String, Number, Boolean, Array, Object 
// objeto()
// array []