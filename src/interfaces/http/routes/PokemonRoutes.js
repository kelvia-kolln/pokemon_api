import express from 'express';
import {createPokemon, getPokemons, getPokemonById, updatePokemon, deletePokemon, removePokemonFromZoo, linkPokemonToZoo} from '../controllers/PokemonController.js';
const router = express.Router();

router.post('/pokemons', createPokemon);
router.get('/pokemons', getPokemons);
router.get('/pokemons/:id', getPokemonById);
router.get('/pokemons/no-zoo', listPokemonsWithoutZoological);
router.put('/pokemons/:id', updatePokemon);
router.put('/pokemons/:id/zoological', linkPokemonToZoo);
router.delete('/pokemons/:id/zoological', removePokemonFromZoo);
router.delete('/pokemons/:id', deletePokemon);

export default router;