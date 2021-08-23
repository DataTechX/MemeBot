/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu} = require("discord-buttons");
module.exports = {
    name: 'help',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async(client, message, args) => {
        const Home = new MessageMenuOption()
        .setLabel('Home')
        .setDescription('Home Page') 
        .setEmoji('😥') 
        .setValue('home')
  

      const Game = new MessageMenuOption()
        .setLabel('Game')
        .setDescription('Game Page') 
        .setEmoji('😴') 
        .setValue('game') 
  

      const Admin = new MessageMenuOption()
        .setLabel('Admin') 
        .setDescription('Admin Page') 
        .setEmoji('🙄')
        .setValue('admin')
  
  
      const Menu = new MessageMenu()
        .setID('menu')
        .setPlaceholder('เลือกสักอัน')
        .addOption(Home)
        .addOption(Game)
        .addOption(Admin)
  
  
      const Menupage = new MessageActionRow()
        .addComponent(Menu)
  
      message.channel.send(`เลือกสักอัน`, {
        component: Menupage
      })
  
      const emned1 = new MessageEmbed()
      .setDescription('1')
      const emned2 = new MessageEmbed()
      .setDescription('2')
      const emned3 = new MessageEmbed()
      .setDescription('3')
  
      client.on('clickMenu', async m => {
        if (m.values[0] === 'home') { 
          m.reply.send(emned1, true)
        } else if (m.values[0] === 'game') { 
          m.reply.send(emned2, true)
        } else if (m.values[0] === 'admin') {
          m.reply.send(emned3, true)
        }
      })
    }
}