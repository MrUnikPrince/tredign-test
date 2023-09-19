const mongoose =  require("mongoose");
const cryptoSchema = new mongoose.Schema({
    name: String,
    last: Number,
    buy: Number,
    sell: Number,
    volume: Number,
    symbol: String
});

module.exports = mongoose.model('Crypto', cryptoSchema)