/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

const discord = require('discord.js');
const moment = require("moment");
const ee = require('../../config/embedbuild.json')
module.exports = {
    name: "profile",
    aliases: "pf",
    execute: async (client, message, agrs) => {

        let mentionedMember = message.mentions.members.first() || message.member;

        const roles = mentionedMember.roles.cache
            .sort((a, b) => b.position = a.position)
            .map(role => role.toString())
            .slice(0, -1);
            
        let displayRoles;

        if (roles.length < 20) {
            displayRoles = roles.join(' ')
        } else {
            displayRoles = roles.slice(20).join(' ')
        }

        try {
            const profile = new discord.MessageEmbed()
                .setAuthor(`${mentionedMember.user.username}#${mentionedMember.user.discriminator} `, mentionedMember.user.displayAvatarURL({ dynamic: true }))
                .addField('ชื่อ', `\`${mentionedMember.user.username}\``, true)
                .addField('แท็ก', `\`#${mentionedMember.user.discriminator}\``, true)
                .addField('ไอดี', `\`${mentionedMember.user.id}\``, true)
                .addField('เข้าเซิร์ฟเวอร์นี้เมื่อวันที่', `\`${moment(mentionedMember.user.joinedAt).locale("th").add(543, 'year').format("lll")}\``)
                .addField('สร้างบัญชีเมื่อ', `\`${moment(mentionedMember.user.createdAt).locale("th").add(543, 'year').format("lll")} (${moment(mentionedMember.user.createdTimestamp).locale("th").fromNow()})\``)
                .addField('ยศที่มี', `${roles}`, true)
                .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
                .setColor('#C80CFF')
            message.channel.send(profile)

        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new discord.MessageEmbed()
                .setColor(ee.wrongcolor).setFooter(ee.footertext, ee.footericon)
                .setDescription(':x: เซิฟเวอร์ของคุณไม่มีบทาท')
            );
        }
    }

}

