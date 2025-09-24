// controller para lidar com operações relacionadas ao zoologico
import Zoological from '../../../infra/database/models/Zoological.js';
import Pokemon from '../../../infra/database/models/Pokemon.js';
// quando importa o model para que a collection dentro do mongo

export const createZoo = async (req, res) => {
    try {
        console.log(req.body);
        /* console.log(req.body);
        console.log(req.payload); */
        const numZoos = await Zoological.countDocuments({ 'address.city': req.body.address.city });
        if (numZoos >= 5) {
            return res.status(400).json({
                success: false,
                message: 'A city can have a maximum of 5 zoos'
            });
        };
        const zoo = await Zoological.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Zoological created successfully',
            data: zoo.toObject() // transforma o documento mongoose em um objeto JavaScript simples
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const getZoos = async (req, res) => {
    try {
        const zoos = await Zoological.find().lean(); // .lean() retorna objetos JavaScript simples em vez de documentos mongoose
        res.status(200).json({
            success: true,
            count: zoos.length,
            data: zoos,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const getZooById = async (req, res) => {
    try {
        const zoo = await Zoological.findById(req.params.id).lean();
        if (!zoo) {
            return res.status(404).json({
                success: false,
                message: 'Zoological not found'
            });
        }
        res.status(200).json({
            success: true,
            data: zoo
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Zoological not found'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateZoo = async (req, res) => {
    try {
        const updatedZoo = await Zoological.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // retorna o documento atualizado
                runValidators: true // garante que as validações do schema sejam aplicadas
            }
        ).lean();
        if (!updatedZoo) {
            return res.status(404).json({
                success: false,
                message: 'Zoological not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Zoological updated successfully',
            data: updatedZoo
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Zoological not found'
            });
        }
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

//Fazer um update é mais leve
export const updateOneZoo = async (req, res) => {
    try {
        const updatedZoo = await Zoological.updateOne(
            { _id: req.params.id },
            { $set: req.body } // usa $set para atualizar apenas os campos fornecidos
        );
        if (updatedZoo.matchedCount === 0) { // verifica se algum documento foi encontrado para atualização
            return res.status(404).json({
                success: false,
                message: 'Zoological not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Zoological updated successfully',
            data: updatedZoo
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Zoological not found'
            });
        }
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteZoo = async (req, res) => {
    try {
        const numPokemons = await Pokemon.exists({ zoological: req.params.id });
        if (numPokemons) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete zoological with associated pokemons'
            });
        }
        const deletedZoo = await Zoological.deleteOne(
            { _id: req.params.id }
        );
        if (deletedZoo.deletedCount === 0) { // == compara valores, === compara valores e tipos
            return res.status(404).json({
                success: false,
                message: 'Zoological not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Zoological deleted successfully'
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Zoological not found'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

/* export const delete_Zoo = async (req, res) => {
    try {
        const deletedZoo = await Zoological.deleteOne(
            { _id: req.params.id }
        );
        if (deletedZoo.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Zoological not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Zoological deleted successfully'
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Zoological not found'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
} */