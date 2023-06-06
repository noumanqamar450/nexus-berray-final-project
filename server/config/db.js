const mongoose = require('mongoose');

const uri = process.env.MONGO_DB;
const db = () => {
    mongoose.connect(uri).then(() => console.log('DB connected.')).catch((err) => console.error('DB not connected.', err));
}

module.exports = db
