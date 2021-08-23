/**
 * @INFO
 * website: https://admbot.xyz/ https://lynn-th.tk/
 * Github: https://github.com/JKTheRipperTH/
 * Thank you code from: Looney#0001 & Sansamit_#1449
 */

const Discord = require("discord.js");
module.exports = (client, message) => {
  if (message.author.bot || message.channel.type === 'dm') return;
  const prefix = client.config.discord.prefix;


  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) return message.channel.send(new Discord.MessageEmbed().setAuthor('สวัสดีครับหากไม่รู้ว่าบอทเราคำนำหน้าคืออะไร ดูได้ที่่นี่เล๊ย').setDescription(`**prefix:** \`${prefix}\`\n**example:** \`${prefix}help\``).setFooter('School Life © 2021 By: LYNNYTEAM'));
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  if (!args) return message.reply('Test')
  const command = args.shift().toLowerCase();
  if (command.length === 0) {
    not_allowed = true;
    return message.channel.send(new Discord.MessageEmbed()
      .setColor('#9F9FFF')
      .setFooter('ไม่พบคำ')
      .setTitle('ไม่พบคำสั่ง กรุณาตรวจสอบคำสั่งให้ถูกต้อง!!')
      .setDescription(`หากต้องการดูคำสั่งทั้งหมดให้พิมพ์: \`${prefix}help\` \`\`\`\diff\n- ไม่พบคำสั่งของคุณกรุณาตรวจสอบคำสั่งของคุณให้ถูกต้อง\n\`\`\`\ `)
    );
    return;
  }

  const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

  if (cmd) cmd.execute(client, message, args);
};


