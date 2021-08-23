/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

const { MessageEmbed } = require('discord.js');
const Schema = require('./Schema/we-schma')
module.exports = {
    name: 'setwelcome',
    execute: async (client, message, args) => {
        
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('คุณไม่มีสิทธิ์ในการใช้งาน');
         
        const channel  = message.mentions.channels.first();
        if(!channel ) return message.reply('โปรดระบุห้องที่ต้องการ')

        // const msg = args.slice(1).join(" ");
        // if(!msg) return message.reply('โปรดระบุข้อความ')

        Schema.findOne({guildId: message.guild.id }, async (err, data) => {
            if(data){ 
                data.chaอnnelId = channel.id; //ดึงค่าไปบันทึกยัง mongodb
                //data.MessageBox = msg;
                data.save();
            } else {
                new Schema({
                    guildId: message.guild.id,
                   //MessageBox: msg,
                    channelId: channel.id,
                }).save();
            }
            message.reply(`คุณได้ตั้งค่าเข้าเซิฟเวอร์เป็น: ${channel}`)
        })
    }
}