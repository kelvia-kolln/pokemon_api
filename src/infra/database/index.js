//orquestrador da conexão
import mongoose from "mongoose";

mongoose.connection.on('connected', () => {
    console.log('✅ Yes! MongoDB is connected!')
})
mongoose.connection.on('connecting', () => {
    console.log('⌛ Wait, MongoDB is connecting...')
})

mongoose.connection.on('error', (err) => {
    console.log('❌ Error, unable to connect to MongoDB!')
    console.error(err)
})

const connect = async () => {
    await mongoose.connect(
        'mongodb+srv://kelviakolln_db_user:ClZP8T6p8ej7VxMe@cluster0.k0d1nwp.mongodb.net/api_pokemon'
    )
};

export default connect