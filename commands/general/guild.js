/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};

module.exports = {
    name: 'guild',
    aliases: [],
    description: 'server info...',
    cooldown: 5,
    guildOnly: false,
    args: false,
    execute: async (client, message, args) => {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;

        const GuildEmbed = new MessageEmbed()
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
            .setColor('#FF00FB')
            .setThumbnail(message.guild.iconURL({ dynamic: true })) //dynamic icon true 
            .setDescription(`**<:icon_servers:848607952101441556> ข้อมูลต่างๆ**
            เจ้าของ: ${message.guild.owner}
            เซิฟเวอร์: \`${regions[message.guild.region]}\`
            ชื่อ: \`${message.guild.name}\`
            เซิร์ฟเวอร์ถูกสร้างเมื่อ: \`${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).locale("th").format('LL')} [${moment(message.guild.createdTimestamp).locale("th").fromNow()}]\`
            ความปลอดภัย: \`${verificationLevels[message.guild.verificationLevel]}\`

            \`\`\`จำนวนบทบาท: ${roles.length}\nจำนวนอีโมจิ: ${emojis.size}\nจำนวนสมาชิก: ${message.guild.memberCount}\nจำนวนห้องเสียง: ${channels.filter(channel => channel.type === 'voice').size}\nจำนวนห้องข้อความ: ${channels.filter(channel => channel.type === 'text',).size}\nจำนวนบูสของเซิร์ฟเวอร์: ${message.guild.premiumSubscriptionCount || '0'}\`\`\``)
            .setFooter('meme-ii.admbot.xyz by: lynn_', 'https://cdn.discordapp.com/attachments/804349049192972308/871027730865610822/852905606826426441.gif')
            .setTimestamp();

        message.channel.send(GuildEmbed);
    }

}