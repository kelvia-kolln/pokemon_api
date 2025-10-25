import Users from "../../../infra/database/models/Users.js";

export const createUser = async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.status(201).json({
            success: true,
            data: user.toObject()
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await Users.find().lean();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id).lean();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        // Erro que é gerado quando é passado um parametro que não é um ObjectId válido
        if(error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await Users.deleteOne({_id: req.params.id});
        //Não deletou nenhum documento
        if (user.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (error) {
        // Erro que é gerado quando é passado um parametro que não é um ObjectId válido
        if(error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}