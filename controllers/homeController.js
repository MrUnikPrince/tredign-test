const Crypto = require("../model/cryptoModel");

module.exports.home = async (req, res) => {
    const cryptocurrencies = await Crypto.find().limit(10);
    console.log(cryptocurrencies)
    res.render('crypto', {
        cryptocurrencies
    });
}