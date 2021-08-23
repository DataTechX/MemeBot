/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

const Discord = require('discord.js');

module.exports = {
    name: "ping",
    premium: true,

    execute: async (client, message, agrs) => {

        const pingXembed = new Discord.MessageEmbed()
            .setDescription('**กำลังค้นหา API Latency**')
            .setColor('#ff6387')
        const pingEmbed = new Discord.MessageEmbed()
            .setColor('#ff6387')
            .setDescription(`**API Latency is** \`\`${Math.round(client.ws.ping)}ms\`\` `)
        message.channel.send(pingXembed).then((message) => {
            message.edit(pingEmbed).catch(err => console.error(err));
        })
    }
}