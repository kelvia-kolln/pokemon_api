import express from 'express';
import {createPokemon, getPokemons, getPokemonById, updatePokemon, deletePokemon} from '../controllers/PokemonController.js';
const router = express.Router();

router.post('/pokemons', createPokemon);
router.get('/pokemons', getPokemons);
router.get('/pokemons/:id', getPokemonById);
router.put('/pokemons/:id', updatePokemon);
router.delete('/pokemons/:id', deletePokemon);

export default router;