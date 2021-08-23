/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'clear',
    description: 'ลบข้อความ',
     execute: async(client, message, args) => {
        const ml = new MessageEmbed()
        .setColor('RED')
        .setDescription('คุณไม่สามารถใช้งานคำสั่งนี้ได้เนื่องจากตำแหน่งของคุณต่ำจนเกินไป')
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(ml)

        if (isNaN(args[0]))
            return message.channel.send('กรุณาใส่จำนวน `1-1000`');

        if (args[0] > 1000)
            return message.channel.send('จำนวนที่จะลบต้องน้อยกว่า `1000`');

        if (args[0] < 1)
            return message.channel.send('กรุณาใส่ตัวเลขที่มากกว่า `1`');
        
        let sus = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`ลบเรียบร้อยแล้ว ✅ \`${args[0]}/${args[0]}\` ข้อความ`)
        message.channel.bulkDelete(args[0])
            message.channel.send(sus).then(msg => {msg.delete({ timeout: 5000 })});
    }
}