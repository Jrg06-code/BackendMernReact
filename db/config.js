const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = async()=>{

    try {
        await mongoose.connect(process.env.DB_CNN
        );

        console.log('DB online')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora d einicializar base de datos')
    }
}

module.exports = {
    dbConnection
}