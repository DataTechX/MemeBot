/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

const discord = require('discord.js');

module.exports = {
    name: 'simjoin',
    description: 'Simulate user join server',
    category: 'test',
    aliases: [], //no aliases
    execute: async (client, message, args) => {
        
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('คุณไม่มีสิทธิ์ในการใช้งาน');
        
        client.on('guildMemberAdd', member => {} )
        client.emit('guildMemberAdd', message.member);
    }
}