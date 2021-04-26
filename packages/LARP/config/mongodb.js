"use strict";
let db
try {
    const mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/larp", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
    db = mongoose.connection;
    console.log("[INFO]: Conectado correctamente");
} catch (error) {
    db.on('error', (error) => {
        console.error('MongoDB connection error:)', error.message)
        process.exit(0)
    })
}

module.exports = db;