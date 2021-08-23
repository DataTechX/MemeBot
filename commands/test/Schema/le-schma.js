/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    guildId: String,
    channelId: String
})

module.exports = mongoose.model('leaves', Schema)
