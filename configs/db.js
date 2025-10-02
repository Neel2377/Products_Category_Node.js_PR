const { default: mongoose } = require("mongoose")

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected.');
        
    } catch (error) {
        error.message;
    }
};

module.exports = db;