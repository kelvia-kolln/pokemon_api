import Pokemon from '../../../infra/database/models/Pokemon.js';

export const createPokemon = async (req, res) => {
    try {
        //null o campo existe, undefined o campo não foi enviado
        //também da pra verificar se existe ou não o campo so usnado "if (req.body.campo)"
        if (req.body.zoological_id !== undefined && req.body.zoological_id !== null) {
            const numPokemons = await Pokemon.countDocuments({
                zoological_id: req.body.zoological_id
            });
            if (numPokemons >= 30) {
                return res.status(400).json({
                    success: false,
                    message: 'A zoological can have a maximum of 30 pokemons'
                });
            };
        }
        const pokemon = await Pokemon.create(req.body);
        res.status(201).json({
            success: true,
            data: pokemon.toObject()
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const getPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.find().populate('zoological_id');
        res.status(200).json({
            success: true,
            count: pokemons.length,
            data: pokemons,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const getPokemonById = async (req, res) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id).populate('zoological_id');
        if (!pokemon) {
            return res.status(404).json({
                success: false,
                message: 'Pokemon not found'
            });
        }
        res.status(200).json({
            success: true,
            data: pokemon
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Pokemon not found'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updatePokemon = async (req, res) => {
    try {
        const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPokemon) {
            return res.status(404).json({
                success: false,
                message: 'Pokemon not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Pokemon updated successfully',
            data: updatedPokemon
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Pokemon not found'
            });
        }
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const deletePokemon = async (req, res) => {
    try {
        const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);
        if (!deletedPokemon) {
            return res.status(404).json({
                success: false,
                message: 'Pokemon not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Pokemon deleted successfully',
            data: deletedPokemon
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Pokemon not found'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const removePokemonFromZoo = async (req, res) => {
    try {
        const updatedPokemon =  await Pokemon.updateOne(
            { _id: req.params.id },
            { $unset: { zoological_id: undefined } } // remove o campo
            //se quer criar/editar o valor do campo pode usar o { $set: { zoological_id: null } }
        );
        if (updatedPokemon.matchedCount === 0) { // sempre existe em uma atualização ou remoção de um documento
            return res.status(404).json({
                success: false,
                message: 'Pokemon not found'
            });
        }
        //modifiedCount indica quantos documentos foram realmente modificados
        //deletedCount indica quantos documentos foram realmente deletados
        if(updatePokemon.modifiedCount === 0){
            return res.status(400).json({
                success: false,
                message: 'Pokemon is already not associated with any zoological'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Pokemon removed from zoological successfully',
            data: updatedPokemon
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const linkPokemonToZoo = async (req, res) => {
    try {
        const updatedPokemon =  await Pokemon.updateOne(
            { _id: req.params.id },
            { $set: { zoological_id: req.body.zoological_id } }
        );
        if (updatedPokemon.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Pokemon not found'
            });
        }
        if (updatedPokemon.modifiedCount === 0) {
            return res.status(400).json({
                success: false,
                message: 'Pokemon is already associated with this zoological'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Pokemon linked to zoological successfully',
            data: updatedPokemon
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const listPokemonsWithoutZoological = async (req, res) => {
    try {
        const pokemons = await Pokemon.find({ zoological_id: { $exists: false } });
        res.status(200).json({
            success: true,
            message: 'Pokemons without zoological found successfully',
            data: pokemons
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
