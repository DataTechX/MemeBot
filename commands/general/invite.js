/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

 const discord = require('discord.js');
 const moment = require("moment");
 
 module.exports = {
     name: "invite",
     category: "0",
     cooldow: "0",
     permissions: "0",
     descriptions: "",
     execute: async (client, message, agrs) => {
         const invite = new discord.MessageEmbed()
         .setDescription('💗 [ลิ้งก์เชิญบอท](https://meme-ii.admbot.xyz/)')
         .setColor('#FF00D1')
         message.channel.send(invite)
        }
 
 }
 