import express from 'express';
import {createZoo, getZoos, getZooById, updateOneZoo, deleteZoo} from '../controllers/ZoologicalController.js';
const router = express.Router();

router.post('/zoos', createZoo);
router.get('/zoos', getZoos);
router.get('/zoos/:id', getZooById);
router.put('/zoos/:id', updateOneZoo);
router.delete('/zoos/:id', deleteZoo);

export default router;