/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'say',
  description: 'The say Command',
  category: 'Utility',
  aliases: [], //no aliases
  execute: async (client, message, args) => {
    
    if (!args.join(' ')) {
      return message.channel.send(`กรุณาพิมพ์ข้อความที่จะพูด`);
    }
    message.channel.send(new MessageEmbed().setColor('#F800FF').setDescription(args.join(' ')))
  }
}