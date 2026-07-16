const mongoose = require('mongoose');

async function ConnectioDB() {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database ✅");
    } catch (error) {
        console.log(error);
        console.log("Not Connected to Database ❌");
    }
}

module.exports = ConnectioDB;